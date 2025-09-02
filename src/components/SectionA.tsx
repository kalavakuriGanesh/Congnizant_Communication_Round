import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, RotateCcw, ArrowRight, Clock } from 'lucide-react';
import AudioRecorder from './AudioRecorder';

interface SectionAProps {
  onComplete: () => void;
}

const SectionA: React.FC<SectionAProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [sectionTimer, setSectionTimer] = useState(16 * 60); // 16 minutes
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  // Sample questions data
  const sentences = [
    "Last year the best author received a cash prize and a trophy.",
    "After his retirement, his decision is to immediately satisfy his ardent desire of becoming a navigator.",
    "Her exposure to different cultures during her travels broadened her perspective on the world and sparked a newfound passion for painting. With zeal she joined art classes to refine her skills and push the boundaries of her creativity.",
    "The innovative technology company revolutionized the industry with their groundbreaking artificial intelligence solutions.",
    "Despite facing numerous challenges, the determined entrepreneur never gave up on her dream of creating sustainable products.",
    "The magnificent cathedral stood as a testament to the architectural brilliance of the medieval period.",
    "Scientists discovered that regular exercise significantly improves cognitive function and memory retention.",
    "The harmonious blend of traditional and modern elements created a unique aesthetic appeal in the building design.",
    "Environmental conservation requires collective effort from individuals, communities, and governments worldwide.",
    "The sophisticated algorithm efficiently processes large amounts of data to generate accurate predictions."
  ];

  const wordGroups = [
    ["Sphere", "van", "puffy", "valuable", "graphic", "available", "hyphen", "viral"],
    ["Civil", "pharmacy", "avoid", "suffer", "convince", "phobia", "clever", "safari"],
    ["Revision", "bend", "set", "division", "usual", "vision"],
    ["Magnificent", "celebrate", "journey", "opportunity", "experience", "challenge"],
    ["Technology", "innovation", "creativity", "collaboration", "inspiration", "dedication"]
  ];

  const audioClips = [
    "The weather forecast predicts heavy rainfall throughout the weekend.",
    "Effective communication skills are essential for professional success.",
    "The research team published their findings in a prestigious scientific journal.",
    "Cultural diversity enriches our understanding of different perspectives.",
    "The marathon runner displayed incredible endurance and determination.",
    "Advanced technology has transformed the way we learn and work.",
    "The chef's creativity resulted in an exceptional culinary experience.",
    "Sustainable practices are crucial for environmental protection."
  ];

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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (currentQuestion < 23) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleRecordingComplete = (audioBlob: Blob) => {
    // Store the audio recording
    const audioUrl = URL.createObjectURL(audioBlob);
    setAnswers(prev => ({ ...prev, [currentQuestion]: audioUrl }));
  };

  const renderQuestion = () => {
    if (currentQuestion <= 10) {
      // Sentences to read
      return (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Question {currentQuestion}: Read the following sentence aloud
          </h3>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-8">
            <p className="text-lg leading-relaxed text-gray-900 font-medium">
              {sentences[currentQuestion - 1]}
            </p>
          </div>
        </div>
      );
    } else if (currentQuestion <= 15) {
      // Word groups
      const groupIndex = currentQuestion - 11;
      return (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Question {currentQuestion}: Read the following words clearly
          </h3>
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 mb-8">
            <div className="flex flex-wrap justify-center gap-4">
              {wordGroups[groupIndex]?.map((word, index) => (
                <span 
                  key={index} 
                  className="bg-white px-4 py-2 rounded-lg border border-green-200 text-lg font-medium text-gray-800"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      // Audio clips (listen and repeat)
      const clipIndex = currentQuestion - 16;
      return (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Question {currentQuestion}: Listen to the audio and repeat
          </h3>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-8 mb-8">
            <div className="mb-6">
              <button 
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center justify-center mx-auto transition-colors"
                onClick={() => {
                  // Simulate audio playback
                  const utterance = new SpeechSynthesisUtterance(audioClips[clipIndex]);
                  speechSynthesis.speak(utterance);
                }}
              >
                <Play className="w-5 h-5 mr-2" />
                Play Audio
              </button>
            </div>
            <p className="text-gray-600 italic">
              Listen carefully and then record yourself repeating what you heard
            </p>
            <p className="text-sm text-purple-700 mt-2 font-medium">
              Audio will play only once. Take notes if required.
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Section A - Reading & Listening</h2>
            <p className="text-gray-600">Questions {currentQuestion} of 23</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-blue-600">
              <Clock className="w-5 h-5" />
              <span className="text-xl font-bold">{formatTime(sectionTimer)}</span>
            </div>
            <p className="text-sm text-gray-600">Time Remaining</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentQuestion / 23) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
        {renderQuestion()}
        
        {/* Audio Recorder */}
        <div className="mt-8">
          <AudioRecorder 
            key={currentQuestion} 
            onRecordingComplete={handleRecordingComplete} 
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center bg-white rounded-2xl shadow-xl p-6">
        <div className="text-sm text-gray-600">
          Question {currentQuestion} of 23 • Section A
        </div>
        
        <button
          onClick={handleNext}
          disabled={!answers[currentQuestion]}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg flex items-center transition-colors font-medium"
        >
          {currentQuestion === 23 ? 'Complete Section A' : 'Next Question'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default SectionA;