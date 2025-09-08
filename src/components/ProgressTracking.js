import React from 'react';
import Navigation from './Navigation';
import { TrendingUp, Calendar, Bell, BookOpen, Plus, X, Clock, Camera } from 'lucide-react';

const ProgressTracking = ({ 
  currentPage, 
  navigateToPage, 
  handleLogout, 
  completedSteps,
  journalEntries,
  setJournalEntries,
  activeReminders,
  setActiveReminders 
}) => {
  // Mock plan steps count for progress calculation
  const totalSteps = 4;

  const addJournalEntry = () => {
    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      photos: [],
      notes: "",
      mood: "good"
    };
    setJournalEntries([entry, ...journalEntries]);
  };

  const removeReminder = (id) => {
    setActiveReminders(activeReminders.filter(r => r.id !== id));
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Hair Journey Tracking</h2>
            <button
              onClick={() => navigateToPage('plan')}
              className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              View Plan
            </button>
          </div>
          
          {/* Progress Overview */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 text-center">
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800">Progress</h3>
              <p className="text-2xl font-bold text-green-500">
                {Math.round((completedSteps.size / totalSteps) * 100)}%
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-4 text-center">
              <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800">Days Active</h3>
              <p className="text-2xl font-bold text-blue-500">7</p>
            </div>
          </div>
          
          {/* Active Reminders */}
          {activeReminders.length > 0 && (
            <div className="bg-white rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Active Reminders
              </h3>
              <div className="space-y-2">
                {activeReminders.map((reminder) => (
                  <div key={reminder.id} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-800">{reminder.title}</p>
                      <p className="text-sm text-blue-600">{reminder.time}</p>
                    </div>
                    <button
                      onClick={() => removeReminder(reminder.id)}
                      className="text-blue-400 hover:text-blue-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Hair Journal */}
          <div className="bg-white rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Hair Journal
              </h3>
              <button
                onClick={addJournalEntry}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Entry
              </button>
            </div>
            
            {journalEntries.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Start documenting your hair journey!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {journalEntries.map((entry) => (
                  <div key={entry.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800">{entry.date}</span>
                      <span className="text-sm text-gray-500">Progress Photo</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center mb-3">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                    <textarea
                      placeholder="How is your hair feeling today? Any changes you've noticed?"
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none"
                      rows="3"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-white hover:bg-gray-50 p-4 rounded-xl text-center transition-colors">
              <Clock className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-800">Schedule Reminder</span>
            </button>
            
            <button
              onClick={() => navigateToPage('analysis')}
              className="bg-white hover:bg-gray-50 p-4 rounded-xl text-center transition-colors"
            >
              <Camera className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-800">New Analysis</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;