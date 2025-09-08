import React from 'react';
import Navigation from './Navigation';
import { CheckCircle, Play, Bell } from 'lucide-react';

const CarePlans = ({ 
  currentPage, 
  navigateToPage, 
  handleLogout, 
  completedSteps, 
  setCompletedSteps,
  setActiveReminders,
  activeReminders 
}) => {
  // Mock personalized plan
  const mockPlan = {
    title: "4B Coily Hair Revival Plan",
    duration: "8 weeks",
    steps: [
      {
        id: 1,
        title: "Weekly Deep Conditioning",
        description: "Apply protein-free deep conditioner for 30-45 minutes",
        frequency: "2x per week",
        videoUrl: "#",
        products: ["Shea Moisture Deep Treatment Mask", "Aussie 3 Minute Miracle"],
        completed: false
      },
      {
        id: 2,
        title: "Gentle Cleansing",
        description: "Use sulfate-free shampoo or co-wash",
        frequency: "1x per week",
        videoUrl: "#",
        products: ["DevaCurl No-Poo", "As I Am Coconut CoWash"],
        completed: false
      },
      {
        id: 3,
        title: "Moisturize & Seal",
        description: "Apply leave-in conditioner followed by natural oil",
        frequency: "Daily",
        videoUrl: "#",
        products: ["Cantu Leave-In", "Jojoba Oil"],
        completed: false
      },
      {
        id: 4,
        title: "Protective Styling",
        description: "Style hair in low-manipulation protective styles",
        frequency: "Change every 1-2 weeks",
        videoUrl: "#",
        products: ["Silk/satin scrunchies", "Edge control"],
        completed: false
      }
    ]
  };

  const handleStepComplete = (stepId) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  const addReminder = (title, time) => {
    const reminder = {
      id: Date.now(),
      title,
      time,
      active: true
    };
    setActiveReminders([...activeReminders, reminder]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navigation 
        currentPage={currentPage} 
        navigateToPage={navigateToPage} 
        handleLogout={handleLogout} 
      />
      <div className="p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{mockPlan.title}</h2>
                <p className="text-gray-600">{mockPlan.duration} program</p>
              </div>
              <button
                onClick={() => navigateToPage('tracking')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                Start Tracking
              </button>
            </div>
            
            <div className="space-y-4">
              {mockPlan.steps.map((step) => (
                <div key={step.id} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => handleStepComplete(step.id)}
                      className={`mt-1 w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                        completedSteps.has(step.id)
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-green-500'
                      }`}
                    >
                      {completedSteps.has(step.id) && <CheckCircle className="w-4 h-4" />}
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-800">{step.title}</h4>
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                          {step.frequency}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">{step.description}</p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <button className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-colors">
                          <Play className="w-3 h-3" />
                          Watch Tutorial
                        </button>
                        <button
                          onClick={() => addReminder(step.title, "Daily at 9:00 AM")}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-colors"
                        >
                          <Bell className="w-3 h-3" />
                          Set Reminder
                        </button>
                      </div>
                      
                      <div className="border-t pt-3">
                        <h5 className="text-xs font-semibold text-gray-700 mb-1">Recommended Products:</h5>
                        <div className="flex flex-wrap gap-1">
                          {step.products.map((product, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                              {product}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarePlans;