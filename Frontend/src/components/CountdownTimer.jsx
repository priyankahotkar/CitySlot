import { useState, useEffect } from 'react';

export const CountdownTimer = ({ expiresAt, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = expiresAt - Date.now();
      return Math.max(0, difference);
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft === 0) {
        clearInterval(timer);
        onExpire();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt, onExpire]);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  const isLowTime = timeLeft < 60000;

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
      isLowTime ? 'bg-red-50 border-2 border-red-500' : 'bg-green-50 border-2 border-green-500'
    }`}>
      <span className={`text-2xl font-bold ${isLowTime ? 'text-red-700' : 'text-green-700'}`}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
      <span className={`text-sm ${isLowTime ? 'text-red-600' : 'text-green-600'}`}>
        remaining
      </span>
    </div>
  );
};
