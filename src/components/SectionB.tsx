import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import AudioRecorder from './AudioRecorder';

interface SectionBProps {
  onComplete: () => void;
}

const SectionB: React.FC<SectionBProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [sectionTimer, setSectionTimer] = useState(7 * 60); // 7 minutes
  const [thinkingTimer, setThinkingTimer] = useState(30); // 30 seconds thinking time
  const [speakingTimer, setSpeakingTimer] = useState(60); // 60 seconds speaking time
  const [phase, setPhase] = useState<'thinking' | 'speaking' | 'completed'>('thinking');
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const topics = [
    "Should students be allowed to drop subjects they are not interested in? Give reasons for your answer.",
    "Describe a dish that you like and explain why it's special to you.",
    "Talk about a time you had to stay away from home for few days and share your experience."
  ];

  const allTopics = [
    "Should students be allowed to drop subjects they are not interested in? Give reasons for your answer.",
    "Describe a dish that you like and explain why it's special to you.",
    "Talk about a time you had to stay away from home for few days and share your experience.",
    "Describe an unforgettable scene from one of your favourite movies.",
    "What are some ways in which schools and parents can keep a check on peer pressure and bullying?",
    "Talk about a movie you watched recently.",
    "Talk about a modern invention you are thankful for and explain why.",
    "If you could live the life of a famous personality, who would you choose? Give reasons for your answer.",
    "Explain how social media influences people to buy things they don't need. Give some examples and reasons for your answer.",
    "Describe either a sport or craft you want to learn.",
    "What is your opinion on the growing disconnect between different generations in society?",
    "Talk about your favourite thing to do on holiday.",
    "Talk about your memorable day spent with your family.",
    "Talk about a time when you were pleased with the customer service you received.",
    "What would motivate people to work harder - recognition or financial rewards? Give reasons for your answer.",
    "Talk about things you like to do at shopping mall.",
    "Talk about a time you tried something new that scared you.",
    "What can we do to build strong and impactful interpersonal relationships in our lives?",
    "Describe your free time activity when you were younger.",
    "Talk about the last time you felt grateful for something that someone did for you."
  ];

  // Randomly select 3 topics from the full list
  const [selectedTopics] = useState(() => {
    const shuffled = [...allTopics].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setSectionTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    if (phase === 'thinking') {
      const timer = setInterval(() => {
        setThinkingTimer(prev => {
          if (prev <= 1) {
            setPhase('speaking');
            setSpeakingTimer(60);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    } else if (phase === 'speaking') {
      const timer = setInterval(() => {
        setSpeakingTimer(prev => {
          if (prev <= 1) {
            setPhase('completed');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [phase]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (currentQuestion < 3) {
      setCurrentQuestion(prev => prev + 1);
      setPhase('thinking');
      setThinkingTimer(30);
      setSpeakingTimer(60);
    } else {
      onComplete();
    }
  };

  const handleRecordingComplete = (audioBlob: Blob) => {
    const audioUrl = URL.createObjectURL(audioBlob);
    setAnswers(prev => ({ ...prev, [currentQuestion]: audioUrl }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Section B - Speaking</h2>
            <p className="text-gray-600">Question {currentQuestion} of 3</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-green-600">
              <Clock className="w-5 h-5" />
              <span className="text-xl font-bold">{formatTime(sectionTimer)}</span>
            </div>
            <p className="text-sm text-gray-600">Section Time Remaining</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentQuestion / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Speaking Topic {currentQuestion}
          </h3>
          
          {/* Phase Timer */}
          <div className="mb-6">
            {phase === 'thinking' && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 text-blue-600 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-2xl font-bold">{formatTime(thinkingTimer)}</span>
                </div>
                <p className="text-blue-800 font-medium">Thinking Time</p>
                <p className="text-sm text-blue-700">Use this time to organize your thoughts</p>
              </div>
            )}
            
            {phase === 'speaking' && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 text-red-600 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-2xl font-bold">{formatTime(speakingTimer)}</span>
                </div>
                <p className="text-red-800 font-medium">Speaking Time</p>
                <p className="text-sm text-red-700">Record your response now</p>
              </div>
            )}
            
            {phase === 'completed' && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-green-800 font-medium">Time's up! You can move to the next question.</p>
              </div>
            )}
          </div>
          
          {/* Topic */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-8 mb-8">
            <p className="text-lg leading-relaxed text-gray-900 font-medium">
              {selectedTopics[currentQuestion - 1]}
            </p>
          </div>
        </div>
        
        {/* Audio Recorder - Only show during speaking phase */}
        {phase === 'speaking' && (
          <div className="mt-8">
            <AudioRecorder 
              key={currentQuestion} 
              onRecordingComplete={handleRecordingComplete} 
            />
          </div>
        )}
        
        {phase === 'thinking' && (
          <div className="text-center p-6 bg-blue-50 rounded-xl">
            <p className="text-blue-800">
              Take your time to think about the topic above. You have {formatTime(thinkingTimer)} to prepare your thoughts.
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center bg-white rounded-2xl shadow-xl p-6">
        <div className="text-sm text-gray-600">
          Question {currentQuestion} of 3 • Section B
        </div>
        
        <button
          onClick={handleNext}
          disabled={phase !== 'completed' && !answers[currentQuestion]}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg flex items-center transition-colors font-medium"
        >
          {currentQuestion === 3 ? 'Complete Section B' : 'Next Question'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default SectionB;