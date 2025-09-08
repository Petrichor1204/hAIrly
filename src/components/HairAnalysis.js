import React, { useState, useRef, useCallback } from 'react';
import Navigation from './Navigation';
import { Camera, Upload, ArrowRight } from 'lucide-react';

const HairAnalysis = ({ 
  currentPage, 
  navigateToPage, 
  handleLogout, 
  capturedImage, 
  setCapturedImage 
}) => {
  const [analyzing, setAnalyzing] = useState(false);
  const fileInputRef = useRef(null);

  // Mock hair analysis results
  const mockAnalysis = {
    hairType: "4B Coily",
    porosity: "Medium",
    density: "High",
    condition: "Dry with minor breakage",
    recommendations: [
      "Deep conditioning treatments 2x/week",
      "Protective styling",
      "Regular trimming every 8-10 weeks",
      "Gentle detangling when wet"
    ]
  };

  const handleImageCapture = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target.result);
        setAnalyzing(true);
        
        // Simulate AI analysis
        setTimeout(() => {
          setAnalyzing(false);
        }, 3000);
      };
      reader.readAsDataURL(file);
    }
  }, [setCapturedImage]);

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
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto transition-colors"
                >
                  <Upload className="w-5 h-5" />
                  Choose Photo
                </button>
              </div>
            )}
            
            {analyzing ? (
              <div className="text-center">
                <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Analyzing Your Hair</h3>
                <p className="text-gray-600">Our AI is examining your hair type, porosity, and condition...</p>
              </div>
            ) : capturedImage && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Analysis Complete!</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-purple-800">Hair Type</h4>
                    <p className="text-purple-600">{mockAnalysis.hairType}</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-blue-800">Porosity</h4>
                    <p className="text-blue-600">{mockAnalysis.porosity}</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-green-800">Density</h4>
                    <p className="text-green-600">{mockAnalysis.density}</p>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-orange-800">Condition</h4>
                    <p className="text-orange-600">{mockAnalysis.condition}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => navigateToPage('plan')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  Get My Custom Plan
                  <ArrowRight className="w-5 h-5" />
                </button>
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