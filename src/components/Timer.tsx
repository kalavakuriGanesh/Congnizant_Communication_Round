import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  startTime: Date | null;
  duration: number; // in seconds
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ startTime, duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      const remaining = duration - elapsed;

      if (remaining <= 0) {
        setTimeLeft(0);
        clearInterval(interval);
        onTimeUp();
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, duration, onTimeUp]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    const percentageLeft = (timeLeft / duration) * 100;
    if (percentageLeft <= 10) return 'text-red-600';
    if (percentageLeft <= 25) return 'text-yellow-600';
    return 'text-blue-600';
  };

  return (
    <div className="flex items-center space-x-2">
      <Clock className={`w-5 h-5 ${getTimerColor()}`} />
      <div className="text-right">
        <p className="text-sm font-medium text-gray-600">Time Remaining</p>
        <p className={`text-xl font-bold ${getTimerColor()}`}>
          {formatTime(timeLeft)}
        </p>
      </div>
    </div>
  );
};

export default Timer;