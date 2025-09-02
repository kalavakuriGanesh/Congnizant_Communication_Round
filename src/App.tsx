import React, { useState, useEffect } from 'react';
import { Clock, Mic, Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';
import WelcomePage from './components/WelcomePage';
import SectionA from './components/SectionA';
import SectionB from './components/SectionB';
import SectionC from './components/SectionC';
import SectionD from './components/SectionD';
import CompletionPage from './components/CompletionPage';
import Timer from './components/Timer';
import ProgressBar from './components/ProgressBar';

export type TestPhase = 'welcome' | 'section-a' | 'section-b' | 'section-c' | 'section-d' | 'completed';

function App() {
  const [currentPhase, setCurrentPhase] = useState<TestPhase>('welcome');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [isTestActive, setIsTestActive] = useState(false);

  const handleStartTest = () => {
    setCurrentPhase('section-a');
    setStartTime(new Date());
    setIsTestActive(true);
  };

  const handleSectionComplete = (nextSection: TestPhase) => {
    setCurrentPhase(nextSection);
  };

  const handleTestComplete = () => {
    setCurrentPhase('completed');
    setIsTestActive(false);
  };

  const getCurrentProgress = () => {
    switch (currentPhase) {
      case 'welcome': return 0;
      case 'section-a': return 25;
      case 'section-b': return 50;
      case 'section-c': return 75;
      case 'section-d': return 90;
      case 'completed': return 100;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Communication Assessment</h1>
                <p className="text-sm text-gray-600">Cognizant Technology Solutions</p>
              </div>
            </div>
            
            {isTestActive && (
              <div className="flex items-center space-x-6">
                <Timer 
                  startTime={startTime} 
                  duration={58 * 60} 
                  onTimeUp={handleTestComplete}
                />
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600">Progress</p>
                  <p className="text-lg font-bold text-blue-600">{getCurrentProgress()}%</p>
                </div>
              </div>
            )}
          </div>
          
          {isTestActive && (
            <div className="mt-4">
              <ProgressBar progress={getCurrentProgress()} />
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentPhase === 'welcome' && (
          <WelcomePage onStartTest={handleStartTest} />
        )}
        {currentPhase === 'section-a' && (
          <SectionA onComplete={() => handleSectionComplete('section-b')} />
        )}
        {currentPhase === 'section-b' && (
          <SectionB onComplete={() => handleSectionComplete('section-c')} />
        )}
        {currentPhase === 'section-c' && (
          <SectionC onComplete={() => handleSectionComplete('section-d')} />
        )}
        {currentPhase === 'section-d' && (
          <SectionD onComplete={handleTestComplete} />
        )}
        {currentPhase === 'completed' && (
          <CompletionPage />
        )}
      </main>
    </div>
  );
}

export default App;