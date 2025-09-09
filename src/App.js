import React, { useState, useEffect } from 'react';
import api from './api';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import HairAnalysis from './components/HairAnalysis';
import CarePlans from './components/CarePlans';
import ProgressTracking from './components/ProgressTracking';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [journalEntries, setJournalEntries] = useState([]);
  const [activeReminders, setActiveReminders] = useState([]);
  const [backendStatus, setBackendStatus] = useState('unknown');
  // API response states
  const [hairAnalysis, setHairAnalysis] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [carePlan, setCarePlan] = useState(null);
  const [progressHistory, setProgressHistory] = useState([]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  const commonProps = {
    currentPage,
    navigateToPage,
    handleLogout,
    capturedImage,
    setCapturedImage,
    completedSteps,
    setCompletedSteps,
    journalEntries,
    setJournalEntries,
    activeReminders,
    setActiveReminders,
    // API state
    hairAnalysis,
    setHairAnalysis,
    sessionId,
    setSessionId,
    carePlan,
    setCarePlan,
    progressHistory,
    setProgressHistory
  };

  useEffect(() => {
    let mounted = true;
    api.get('/')  // FastAPI root endpoint
      .then(res => {
        if (mounted) setBackendStatus('online: ' + (res.data?.message ?? 'ok'));
      })
      .catch(() => {
        if (mounted) setBackendStatus('offline');
      });
    return () => { mounted = false };
  }, []);

  if (currentPage === 'login') {
    return <Login onLogin={handleLogin} navigateToPage={navigateToPage} />;
  }

  if (currentPage === 'signup') {
    return <Signup onSignup={handleLogin} navigateToPage={navigateToPage} />;
  }

  if (currentPage === 'home') {
    return (
      <>
        <div style={{padding:8, textAlign:'center', background:'#f3f4f6'}}>
          Backend: {backendStatus}
        </div>
        <Home {...commonProps} />
      </>
    );
  }

  if (currentPage === 'analysis') {
    return <HairAnalysis {...commonProps} />;
  }

  if (currentPage === 'plan') {
    return <CarePlans {...commonProps} />;
  }

  if (currentPage === 'tracking') {
    return <ProgressTracking {...commonProps} />;
  }

  return null;
};

export default App;