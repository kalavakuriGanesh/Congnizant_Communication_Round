import React from 'react';
import { Clock, Headphones, Mic, AlertTriangle, CheckCircle } from 'lucide-react';

interface WelcomePageProps {
  onStartTest: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onStartTest }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Communication Round Assessment</h2>
          <p className="text-lg text-gray-600">Please read the instructions carefully before starting the test</p>
        </div>

        {/* Test Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-xl p-6 text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Duration</h3>
            <p className="text-blue-600 font-bold">58 Minutes</p>
          </div>
          <div className="bg-green-50 rounded-xl p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Questions</h3>
            <p className="text-green-600 font-bold">72 Questions</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-6 text-center">
            <div className="w-8 h-8 bg-purple-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <span className="text-white font-bold">4</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Sections</h3>
            <p className="text-purple-600 font-bold">A, B, C, D</p>
          </div>
        </div>

        {/* Mandates */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
            <h3 className="text-xl font-semibold text-red-800">MANDATORY REQUIREMENTS</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
              <p className="text-gray-800">Give test in a <strong>Quiet Environment</strong></p>
            </div>
            <div className="flex items-center">
              <Headphones className="w-5 h-5 text-red-600 mr-3" />
              <p className="text-gray-800">Use <strong>Wired headset with microphone</strong> (good quality mic)</p>
            </div>
            <div className="flex items-center">
              <Mic className="w-5 h-5 text-red-600 mr-3" />
              <p className="text-gray-800">Talk <strong>loud and clear</strong></p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-yellow-100 rounded-lg">
            <p className="text-sm text-gray-800">
              <strong>NOTE:</strong> Don't use computer mic, Bluetooth buds, wired earphones, neck bands
            </p>
            <p className="text-sm text-gray-800 mt-2">
              You have to click on <strong>start and stop</strong> to record and submit your answer for every question
            </p>
          </div>
        </div>

        {/* Section Breakdown */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
            <h3 className="font-bold text-blue-900 mb-4">Section A - Reading (16 min)</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Q1-10: Read sentences aloud</li>
              <li>• Q11-15: Read word groups</li>
              <li>• Q16-23: Listen & repeat audio</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
            <h3 className="font-bold text-green-900 mb-4">Section B - Speaking (7 min)</h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• 3 speaking topics</li>
              <li>• 30 sec to think</li>
              <li>• 1 minute to speak each</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
            <h3 className="font-bold text-purple-900 mb-4">Section C - Grammar (20 min)</h3>
            <ul className="space-y-2 text-sm text-purple-800">
              <li>• Subject/Verb, Tenses</li>
              <li>• Articles, Prepositions</li>
              <li>• Voice, Grammar correction</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
            <h3 className="font-bold text-orange-900 mb-4">Section D - Listening (15 min)</h3>
            <ul className="space-y-2 text-sm text-orange-800">
              <li>• 4 audio clips</li>
              <li>• 3 questions per clip</li>
              <li>• Audio plays once only</li>
            </ul>
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <button
            onClick={onStartTest}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-12 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Start Communication Assessment
          </button>
          <p className="text-sm text-gray-600 mt-4">
            Make sure you have set up your environment according to the requirements above
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;