import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight, CheckCircle } from 'lucide-react';

interface SectionCProps {
  onComplete: () => void;
}

const SectionC: React.FC<SectionCProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [sectionTimer, setSectionTimer] = useState(20 * 60); // 20 minutes
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  // Grammar questions data
  const questions = [
    // Subject-Verb Questions (1-8)
    {
      id: 1,
      type: 'mcq',
      category: 'Subject-Verb',
      question: "The team of researchers _____ working on the project for months.",
      options: ["is", "are", "was", "were"],
      correct: 0
    },
    {
      id: 2,
      type: 'mcq',
      category: 'Subject-Verb',
      question: "Neither the manager nor the employees _____ satisfied with the decision.",
      options: ["was", "were", "is", "are"],
      correct: 1
    },
    {
      id: 3,
      type: 'mcq',
      category: 'Subject-Verb',
      question: "Mathematics _____ my favorite subject in school.",
      options: ["is", "are", "was", "were"],
      correct: 0
    },
    {
      id: 4,
      type: 'mcq',
      category: 'Subject-Verb',
      question: "The news about the merger _____ spreading quickly.",
      options: ["is", "are", "was", "were"],
      correct: 0
    },
    {
      id: 5,
      type: 'mcq',
      category: 'Subject-Verb',
      question: "Each of the students _____ required to submit their assignment.",
      options: ["is", "are", "was", "were"],
      correct: 0
    },
    {
      id: 6,
      type: 'mcq',
      category: 'Subject-Verb',
      question: "The scissors _____ lying on the table.",
      options: ["is", "are", "was", "were"],
      correct: 1
    },
    {
      id: 7,
      type: 'mcq',
      category: 'Subject-Verb',
      question: "A number of people _____ attending the conference.",
      options: ["is", "are", "was", "were"],
      correct: 1
    },
    {
      id: 8,
      type: 'mcq',
      category: 'Subject-Verb',
      question: "The committee _____ reached a unanimous decision.",
      options: ["has", "have", "had", "having"],
      correct: 0
    },
    
    // Tense Questions (9-16) - Fill in the blanks
    {
      id: 9,
      type: 'fill',
      category: 'Tenses',
      question: "By next year, I _______ (complete) my degree.",
      answer: "will have completed"
    },
    {
      id: 10,
      type: 'fill',
      category: 'Tenses',
      question: "She _______ (work) at the company for five years when she got promoted.",
      answer: "had been working"
    },
    {
      id: 11,
      type: 'fill',
      category: 'Tenses',
      question: "They _______ (discuss) the project when the manager arrived.",
      answer: "were discussing"
    },
    {
      id: 12,
      type: 'fill',
      category: 'Tenses',
      question: "I _______ (never see) such a beautiful sunset before.",
      answer: "have never seen"
    },
    {
      id: 13,
      type: 'fill',
      category: 'Tenses',
      question: "The train _______ (leave) by the time we reach the station.",
      answer: "will have left"
    },
    {
      id: 14,
      type: 'fill',
      category: 'Tenses',
      question: "He _______ (study) medicine before switching to engineering.",
      answer: "had studied"
    },
    {
      id: 15,
      type: 'fill',
      category: 'Tenses',
      question: "We _______ (wait) for the results for weeks now.",
      answer: "have been waiting"
    },
    {
      id: 16,
      type: 'fill',
      category: 'Tenses',
      question: "The company _______ (expand) its operations globally next quarter.",
      answer: "will be expanding"
    },

    // Articles Questions (17-22)
    {
      id: 17,
      type: 'mcq',
      category: 'Articles',
      question: "She is _____ honest person who always tells _____ truth.",
      options: ["a, the", "an, the", "the, a", "an, a"],
      correct: 1
    },
    {
      id: 18,
      type: 'mcq',
      category: 'Articles',
      question: "_____ sun rises in _____ east.",
      options: ["A, the", "The, the", "The, an", "A, an"],
      correct: 1
    },
    {
      id: 19,
      type: 'mcq',
      category: 'Articles',
      question: "I need _____ advice from _____ expert.",
      options: ["an, the", "the, an", "a, an", "no article, an"],
      correct: 3
    },
    {
      id: 20,
      type: 'mcq',
      category: 'Articles',
      question: "_____ university where I studied is famous for _____ research.",
      options: ["A, the", "The, the", "The, no article", "A, no article"],
      correct: 1
    },
    {
      id: 21,
      type: 'mcq',
      category: 'Articles',
      question: "He plays _____ piano beautifully and also _____ guitar.",
      options: ["the, the", "a, a", "the, a", "a, the"],
      correct: 0
    },
    {
      id: 22,
      type: 'mcq',
      category: 'Articles',
      question: "_____ information you provided was _____ great help.",
      options: ["The, a", "An, the", "The, the", "A, a"],
      correct: 0
    },

    // Prepositions Questions (23-28)
    {
      id: 23,
      type: 'mcq',
      category: 'Prepositions',
      question: "The meeting is scheduled _____ 3 PM _____ Monday.",
      options: ["at, on", "on, at", "in, on", "at, in"],
      correct: 0
    },
    {
      id: 24,
      type: 'mcq',
      category: 'Prepositions',
      question: "She is interested _____ learning _____ different cultures.",
      options: ["in, about", "on, of", "at, in", "for, on"],
      correct: 0
    },
    {
      id: 25,
      type: 'mcq',
      category: 'Prepositions',
      question: "The book is _____ the table _____ the living room.",
      options: ["on, in", "in, on", "at, in", "on, at"],
      correct: 0
    },
    {
      id: 26,
      type: 'mcq',
      category: 'Prepositions',
      question: "He apologized _____ being late _____ the important meeting.",
      options: ["for, to", "of, for", "for, for", "to, for"],
      correct: 2
    },
    {
      id: 27,
      type: 'mcq',
      category: 'Prepositions',
      question: "The company specializes _____ providing solutions _____ small businesses.",
      options: ["in, for", "on, to", "at, for", "in, to"],
      correct: 0
    },
    {
      id: 28,
      type: 'mcq',
      category: 'Prepositions',
      question: "She graduated _____ university _____ honors.",
      options: ["from, with", "of, in", "in, with", "from, in"],
      correct: 0
    },

    // Voice Questions (29-31)
    {
      id: 29,
      type: 'mcq',
      category: 'Voice',
      question: "The passive voice of 'They are building a new school' is:",
      options: [
        "A new school is being built by them",
        "A new school was being built by them", 
        "A new school is built by them",
        "A new school will be built by them"
      ],
      correct: 0
    },
    {
      id: 30,
      type: 'mcq',
      category: 'Voice',
      question: "Convert to active voice: 'The letter was written by John.'",
      options: [
        "John writes the letter",
        "John wrote the letter",
        "John has written the letter",
        "John will write the letter"
      ],
      correct: 1
    },
    {
      id: 31,
      type: 'mcq',
      category: 'Voice',
      question: "The passive voice of 'She will complete the project' is:",
      options: [
        "The project will be completed by her",
        "The project is completed by her",
        "The project was completed by her",
        "The project has been completed by her"
      ],
      correct: 0
    },

    // Grammar Correction Questions (32-34)
    {
      id: 32,
      type: 'mcq',
      category: 'Grammar Correction',
      question: "Choose the correct sentence:",
      options: [
        "Each students have their own textbook",
        "Each student have their own textbook",
        "Each student has their own textbook",
        "Each students has their own textbook"
      ],
      correct: 2
    },
    {
      id: 33,
      type: 'mcq',
      category: 'Grammar Correction',
      question: "Which sentence is grammatically correct?",
      options: [
        "Neither of the options are suitable",
        "Neither of the options is suitable", 
        "Neither of the option is suitable",
        "Neither of the option are suitable"
      ],
      correct: 1
    },
    {
      id: 34,
      type: 'mcq',
      category: 'Grammar Correction',
      question: "Identify the correct sentence:",
      options: [
        "The team are discussing their strategy",
        "The team is discussing their strategy",
        "The team are discussing its strategy", 
        "The team is discussing its strategy"
      ],
      correct: 1
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
    if (currentQuestion < 34) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answer }));
  };

  const currentQuestionData = questions[currentQuestion - 1];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Section C - Grammar</h2>
            <p className="text-gray-600">Question {currentQuestion} of 34 • {currentQuestionData?.category}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-purple-600">
              <Clock className="w-5 h-5" />
              <span className="text-xl font-bold">{formatTime(sectionTimer)}</span>
            </div>
            <p className="text-sm text-gray-600">Time Remaining</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentQuestion / 34) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              {currentQuestionData?.category}
            </span>
            {answers[currentQuestion] && (
              <CheckCircle className="w-6 h-6 text-green-600" />
            )}
          </div>
          
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Question {currentQuestion}
          </h3>
          
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-8">
            <p className="text-lg leading-relaxed text-gray-900">
              {currentQuestionData?.question}
            </p>
          </div>
        </div>

        {/* Answer Options */}
        {currentQuestionData?.type === 'mcq' && (
          <div className="space-y-3">
            {currentQuestionData.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index.toString())}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  answers[currentQuestion] === index.toString()
                    ? 'border-purple-500 bg-purple-50 text-purple-800'
                    : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50'
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
        )}

        {currentQuestionData?.type === 'fill' && (
          <div>
            <input
              type="text"
              value={answers[currentQuestion] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
              placeholder="Type your answer here..."
            />
            <p className="text-sm text-gray-600 mt-2">
              Fill in the blank with the correct form of the verb.
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center bg-white rounded-2xl shadow-xl p-6">
        <div className="text-sm text-gray-600">
          Question {currentQuestion} of 34 • Section C
        </div>
        
        <button
          onClick={handleNext}
          disabled={!answers[currentQuestion]}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg flex items-center transition-colors font-medium"
        >
          {currentQuestion === 34 ? 'Complete Section C' : 'Next Question'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default SectionC;