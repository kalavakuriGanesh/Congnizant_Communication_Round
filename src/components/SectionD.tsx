import React, { useState, useEffect, useRef } from 'react';
import { Clock, ArrowRight, Play, Volume2, CheckCircle } from 'lucide-react';

interface SectionDProps {
  onComplete: () => void;
}

const SectionD: React.FC<SectionDProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [sectionTimer, setSectionTimer] = useState(15 * 60); // 15 minutes
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [currentClip, setCurrentClip] = useState(1);
  const [hasPlayedAudio, setHasPlayedAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Audio clips data with questions
  const audioClips = [
    {
      id: 1,
      title: "Business Meeting",
      text: "Good morning everyone. Today we're discussing our quarterly sales performance. Our revenue has increased by fifteen percent compared to the same period last year. The marketing team's new digital campaign has been particularly successful, generating over two million impressions and increasing our customer engagement by thirty percent. However, we need to focus on reducing operational costs in the next quarter to maintain our profit margins.",
      questions: [
        {
          question: "What was the increase in revenue compared to last year?",
          options: ["10%", "15%", "20%", "25%"],
          correct: 1
        },
        {
          question: "How many impressions did the digital campaign generate?",
          options: ["1 million", "1.5 million", "2 million", "2.5 million"],
          correct: 2
        },
        {
          question: "What does the company need to focus on next quarter?",
          options: ["Increasing revenue", "Reducing operational costs", "Hiring more staff", "Expanding globally"],
          correct: 1
        }
      ]
    },
    {
      id: 2,
      title: "University Lecture",
      text: "Climate change represents one of the most significant challenges of our time. Rising global temperatures have led to melting ice caps, rising sea levels, and extreme weather patterns. Scientists predict that if current trends continue, global temperatures could rise by two to four degrees Celsius by the end of this century. This would have devastating effects on ecosystems, agriculture, and human settlements, particularly in coastal areas.",
      questions: [
        {
          question: "What is mentioned as one of the most significant challenges of our time?",
          options: ["Economic crisis", "Climate change", "Population growth", "Technology advancement"],
          correct: 1
        },
        {
          question: "By how much could global temperatures rise by the end of this century?",
          options: ["1-2 degrees", "2-4 degrees", "3-5 degrees", "4-6 degrees"],
          correct: 1
        },
        {
          question: "Which areas are particularly vulnerable to the effects mentioned?",
          options: ["Mountain regions", "Desert areas", "Coastal areas", "Forest regions"],
          correct: 2
        }
      ]
    },
    {
      id: 3,
      title: "Technology News",
      text: "Artificial Intelligence is revolutionizing the healthcare industry. Machine learning algorithms can now analyze medical images with accuracy rates exceeding ninety-five percent, helping doctors detect diseases earlier than ever before. A recent study involving fifty thousand patients showed that AI-assisted diagnosis reduced misdiagnosis rates by forty percent. Major hospitals worldwide are implementing these technologies to improve patient outcomes and reduce healthcare costs.",
      questions: [
        {
          question: "What accuracy rate do machine learning algorithms achieve in analyzing medical images?",
          options: ["85%", "90%", "95%", "99%"],
          correct: 2
        },
        {
          question: "How many patients were involved in the recent study?",
          options: ["25,000", "40,000", "50,000", "75,000"],
          correct: 2
        },
        {
          question: "By what percentage did AI-assisted diagnosis reduce misdiagnosis rates?",
          options: ["30%", "35%", "40%", "45%"],
          correct: 2
        }
      ]
    },
    {
      id: 4,
      title: "Travel Documentary",
      text: "The ancient city of Petra in Jordan is one of the world's most remarkable archaeological sites. Built by the Nabataeans over two thousand years ago, this UNESCO World Heritage Site attracts more than one million visitors annually. The famous Treasury building, carved directly into the red sandstone cliff face, stands forty meters tall and represents the pinnacle of Nabataean architecture. Archaeological excavations have revealed that the city once housed approximately thirty thousand inhabitants.",
      questions: [
        {
          question: "Who built the ancient city of Petra?",
          options: ["Romans", "Greeks", "Nabataeans", "Egyptians"],
          correct: 2
        },
        {
          question: "How many visitors does Petra attract annually?",
          options: ["500,000", "750,000", "1 million", "1.5 million"],
          correct: 2
        },
        {
          question: "How tall is the Treasury building?",
          options: ["30 meters", "35 meters", "40 meters", "45 meters"],
          correct: 2
        }
      ]
    }
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
    const currentClipQuestions = audioClips[currentClip - 1].questions;
    const clipQuestionNumber = ((currentQuestion - 1) % 3) + 1;
    
    if (clipQuestionNumber === 3 && currentClip === 4) {
      // Last question of last clip
      onComplete();
    } else if (clipQuestionNumber === 3) {
      // Move to next audio clip
      setCurrentClip(prev => prev + 1);
      setCurrentQuestion(prev => prev + 1);
      setHasPlayedAudio(false);
    } else {
      // Move to next question in same clip
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const playAudio = () => {
    // Using speech synthesis for demonstration
    const utterance = new SpeechSynthesisUtterance(audioClips[currentClip - 1].text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
    setHasPlayedAudio(true);
  };

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answer }));
  };

  const getCurrentQuestionData = () => {
    const clip = audioClips[currentClip - 1];
    const questionIndex = ((currentQuestion - 1) % 3);
    return clip.questions[questionIndex];
  };

  const clipQuestionNumber = ((currentQuestion - 1) % 3) + 1;
  const currentQuestionData = getCurrentQuestionData();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Section D - Listening Comprehension</h2>
            <p className="text-gray-600">Audio Clip {currentClip} • Question {clipQuestionNumber} of 3</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-orange-600">
              <Clock className="w-5 h-5" />
              <span className="text-xl font-bold">{formatTime(sectionTimer)}</span>
            </div>
            <p className="text-sm text-gray-600">Time Remaining</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentQuestion / 12) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Audio Player Section */}
      {clipQuestionNumber === 1 && (
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Audio Clip {currentClip}: {audioClips[currentClip - 1].title}
            </h3>
            
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-6">
              <Volume2 className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <p className="text-orange-800 font-medium mb-4">
                Listen carefully to the audio clip. It will play only once.
              </p>
              
              {!hasPlayedAudio ? (
                <button
                  onClick={playAudio}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl flex items-center justify-center mx-auto transition-colors font-medium"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Play Audio Clip
                </button>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-green-800 font-medium">Audio played. You can now proceed to the questions.</p>
                </div>
              )}
            </div>
            
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> Take notes while listening. You cannot replay the audio once you move to the questions.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Question Content */}
      {(hasPlayedAudio || clipQuestionNumber > 1) && (
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                Listening Comprehension
              </span>
              {answers[currentQuestion] && (
                <CheckCircle className="w-6 h-6 text-green-600" />
              )}
            </div>
            
            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              Question {currentQuestion} ({currentClip}.{clipQuestionNumber})
            </h3>
            
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
              <p className="text-lg leading-relaxed text-gray-900">
                {currentQuestionData.question}
              </p>
            </div>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestionData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index.toString())}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  answers[currentQuestion] === index.toString()
                    ? 'border-orange-500 bg-orange-50 text-orange-800'
                    : 'border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50'
                }`}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium mr-4">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center bg-white rounded-2xl shadow-xl p-6">
        <div className="text-sm text-gray-600">
          Question {currentQuestion} of 12 • Section D
        </div>
        
        <button
          onClick={handleNext}
          disabled={!hasPlayedAudio || !answers[currentQuestion]}
          className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg flex items-center transition-colors font-medium"
        >
          {currentQuestion === 12 ? 'Complete Assessment' : 'Next Question'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default SectionD;