import React from 'react';
import { CheckCircle, Clock, Award, Download } from 'lucide-react';

const CompletionPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="bg-white rounded-2xl shadow-xl p-12">
        <div className="mb-8">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Assessment Complete!</h2>
          <p className="text-xl text-gray-600">
            Congratulations! You have successfully completed the Cognizant Communication Round Assessment.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-blue-50 rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Section A</h3>
            <p className="text-blue-600 font-bold">23/23 Questions</p>
            <p className="text-sm text-gray-600">Reading & Listening</p>
          </div>
          
          <div className="bg-green-50 rounded-xl p-6">
            <div className="w-12 h-12 bg-green-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Section B</h3>
            <p className="text-green-600 font-bold">3/3 Questions</p>
            <p className="text-sm text-gray-600">Speaking</p>
          </div>
          
          <div className="bg-purple-50 rounded-xl p-6">
            <div className="w-12 h-12 bg-purple-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Section C</h3>
            <p className="text-purple-600 font-bold">34/34 Questions</p>
            <p className="text-sm text-gray-600">Grammar</p>
          </div>
          
          <div className="bg-orange-50 rounded-xl p-6">
            <div className="w-12 h-12 bg-orange-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Section D</h3>
            <p className="text-orange-600 font-bold">12/12 Questions</p>
            <p className="text-sm text-gray-600">Listening Comprehension</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-2xl p-8 mb-8">
          <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Assessment Summary</h3>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <div className="flex items-center mb-3">
                <Clock className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-medium">Total Questions Attempted:</span>
              </div>
              <p className="text-2xl font-bold text-blue-600 mb-4">72/72</p>
              
              <div className="flex items-center mb-3">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-medium">Sections Completed:</span>
              </div>
              <p className="text-2xl font-bold text-green-600">4/4</p>
            </div>
            
            <div>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600">Reading & Listening</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600">Speaking Tasks</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600">Grammar & Language</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">What happens next?</h3>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="font-semibold text-blue-900 mb-3">Evaluation Process</h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Your responses are being processed and evaluated</li>
                <li>• Speaking sections will be reviewed by language experts</li>
                <li>• Grammar and comprehension sections are auto-graded</li>
                <li>• Results will be compiled into a comprehensive report</li>
              </ul>
            </div>
            
            <div className="bg-green-50 rounded-xl p-6">
              <h4 className="font-semibold text-green-900 mb-3">Next Steps</h4>
              <ul className="space-y-2 text-sm text-green-800">
                <li>• Results will be available within 3-5 business days</li>
                <li>• You will receive an email with your detailed scorecard</li>
                <li>• HR team will contact you regarding next interview rounds</li>
                <li>• Keep checking your registered email for updates</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <p className="text-gray-700 mb-4">
            <strong>Thank you for taking the Cognizant Communication Assessment.</strong>
          </p>
          <p className="text-sm text-gray-600">
            Your assessment ID: <span className="font-mono bg-gray-200 px-2 py-1 rounded">CCA-2025-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Please save this ID for future reference. You can close this browser window now.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompletionPage;