import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, FileText } from 'lucide-react';

interface AudioRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
  key?: string | number; // Add key prop to force re-render
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcription, setTranscription] = useState<string>('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscription(prev => prev + finalTranscript + ' ');
        }
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
      };
      
      recognitionRef.current.onend = () => {
        setIsTranscribing(false);
      };
    }
    
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      // Reset transcription
      setTranscription('');
      setIsTranscribing(true);
      
      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });
      
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const audioChunks: BlobPart[] = [];
      
      mediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });
      
      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        onRecordingComplete(audioBlob);
        
        // Stop all tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
        
        // Stop speech recognition
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
      });
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Unable to access microphone. Please ensure you have granted microphone permissions.');
      setIsTranscribing(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      // Stop speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
  };

  const playRecording = () => {
    if (audioRef.current && audioURL) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
      <div className="text-center">
        <h4 className="text-lg font-semibold mb-4 text-gray-800">Audio Recording</h4>
        
        {!audioURL ? (
          <div className="space-y-4">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl flex items-center justify-center mx-auto transition-colors font-medium"
              >
                <Mic className="w-6 h-6 mr-2" />
                Start Recording
              </button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                  <span className="text-red-600 font-medium">Recording: {formatTime(recordingTime)}</span>
                </div>
                <button
                  onClick={stopRecording}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-xl flex items-center justify-center mx-auto transition-colors font-medium"
                >
                  <Square className="w-6 h-6 mr-2" />
                  Stop Recording
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium mb-2">Recording Complete ✓</p>
              <audio 
                ref={audioRef}
                src={audioURL}
                onEnded={() => setIsPlaying(false)}
                className="w-full"
                controls
              />
            </div>
            <button
              onClick={() => {
                setAudioURL(null);
                setRecordingTime(0);
                setTranscription('');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              Record Again
            </button>
          </div>
        )}
        
        {/* Transcription Display */}
        {transcription && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <FileText className="w-5 h-5 text-blue-600 mr-2" />
                <h5 className="text-lg font-semibold text-blue-800">What you spoke:</h5>
              </div>
              <div className="bg-white border border-blue-300 rounded-lg p-4">
                <p className="text-gray-900 leading-relaxed">
                  {transcription.trim() || 'Processing speech...'}
                </p>
              </div>
              <p className="text-sm text-blue-700 mt-2">
                This is an automated transcription of your speech for reference.
              </p>
            </div>
          )}
        
        {isTranscribing && isRecording && (
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-800 flex items-center">
            <div className="w-2 h-2 bg-yellow-600 rounded-full animate-pulse mr-2"></div>
            Listening and transcribing your speech...
          </p>
        </div>
      )}
        
        <p className="text-sm text-gray-600 mt-4">
          Click "Start Recording" to record your answer. Make sure to speak clearly and loudly.
        </p>
      </div>
      
      {!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) && (
        <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-3">
          <p className="text-sm text-orange-800">
            Speech-to-text feature is not available in your browser. Your audio will still be recorded.
          </p>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;