import React, { useState, useRef, useCallback } from 'react';
import Navigation from './Navigation';
import { Camera, Upload, ArrowRight, AlertCircle } from 'lucide-react';
import api from '../api';

// Upload photo and get hair analysis
export const uploadHairPhoto = async (photoFile) => {
  try {
    const formData = new FormData();
    formData.append('file', photoFile);
    
    const response = await api.post('/upload', formData);
    
    return {
      success: true,
      sessionId: response.data.session_id,
      analysis: response.data.analysis,
      message: response.data.message
    };
  } catch (error) {
    console.error('Error uploading photo:', error);
    return {
      success: false,
      error: error.response?.data?.detail || 'Failed to upload photo'
    };
  }
};

const HairAnalysis = ({ 
  currentPage, 
  navigateToPage, 
  handleLogout, 
  capturedImage, 
  setCapturedImage,
  hairAnalysis,
  setHairAnalysis,
  setSessionId
}) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageCapture = useCallback(async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setError(null);
    setAnalyzing(true);

    // Display image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setCapturedImage(e.target.result);
    };
    reader.readAsDataURL(file);

    // Upload to backend using the helper function
    const result = await uploadHairPhoto(file);
    
    if (result.success) {
      setSessionId(result.sessionId);
      setHairAnalysis(result.analysis);
      // Store sessionId for other components to use
      localStorage.setItem('hairly_session_id', result.sessionId);
    } else {
      setError(result.error);
      setCapturedImage(null); // Clear image on error
    }
    
    setAnalyzing(false);
  }, [setCapturedImage, setSessionId, setHairAnalysis]);

  const handleRetry = () => {
    setError(null);
    setCapturedImage(null);
    setHairAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navigation 
        currentPage={currentPage} 
        navigateToPage={navigateToPage} 
        handleLogout={handleLogout} 
      />
      <div className="p-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Hair Analysis</h1>
            <p className="text-gray-600">Upload a clear photo of your hair to get personalized care recommendations</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            {capturedImage ? (
              <div className="mb-6">
                <img 
                  src={capturedImage} 
                  alt="Captured hair" 
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Take or Upload Photo</h3>
                <p className="text-gray-500 text-sm mb-6">For best results, take a clear photo in natural light</p>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageCapture}
                  className="hidden"
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={analyzing}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto transition-colors disabled:opacity-50"
                >
                  <Upload className="w-5 h-5" />
                  Choose Photo
                </button>
              </div>
            )}
            
            {error ? (
              <div className="text-center text-red-600 p-4">
                <AlertCircle className="w-12 h-12 mx-auto mb-2" />
                <p className="mb-4">{error}</p>
                <button
                  onClick={handleRetry}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : analyzing ? (
              <div className="text-center">
                <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Analyzing Your Hair</h3>
                <p className="text-gray-600">Our AI is examining your hair type, porosity, and condition...</p>
              </div>
            ) : capturedImage && hairAnalysis && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Analysis Complete!</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-purple-800">Hair Type</h4>
                    <p className="text-purple-600 capitalize">{hairAnalysis.hair_type}</p>
                    <p className="text-sm text-purple-500 mt-1">Confidence: {(hairAnalysis.confidence * 100).toFixed(1)}%</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-blue-800">Characteristics</h4>
                    <ul className="mt-2 space-y-1">
                      {hairAnalysis.characteristics.map((char, idx) => (
                        <li key={idx} className="text-blue-600 text-sm">• {char}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={() => navigateToPage('plan')}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    Get My Custom Plan
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={handleRetry}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-xl font-medium transition-colors"
                  >
                    Analyze Another Photo
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {!capturedImage && (
            <div className="bg-white rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Tips for best results:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Use natural lighting</li>
                <li>• Show your hair texture clearly</li>
                <li>• Include both length and crown area</li>
                <li>• Hair should be clean and detangled</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HairAnalysis;