import { useEffect, useState } from 'react';

function getTimeLeft(targetDate) {
  const totalMs = targetDate - new Date();

  if (totalMs <= 0) {
    return {
      totalMs: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const totalSeconds = Math.floor(totalMs / 1000);

  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const seconds = Math.floor(totalSeconds % 60);

  return {
    totalMs,
    days,
    hours,
    minutes,
    seconds,
  };
}

export default function Countdown({ target }) {
  // `target` can be a date string like "2025-12-31T23:59:59"
  const targetDate = new Date(target);

  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    // cleanup when component unmounts
    return () => clearInterval(intervalId);
  }, [target]);

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className='w-full flex justify-center gap-5 mb-10'>
      <div className='flex flex-col items-center justify-center leading-none'>
        <span className='text-3xl font-extrabold text-brown'>
          {days.toString()}
        </span>
        <span className='text-brown'>dana</span>
      </div>
      <div className='flex flex-col items-center justify-center leading-none'>
        <span className='text-3xl font-extrabold text-brown'>
          {hours.toString().padStart(2, '0')}
        </span>
        <span className='text-brown'>sati</span>
      </div>
      <div className='flex flex-col items-center justify-center leading-none'>
        <span className='text-3xl font-extrabold text-brown'>
          {minutes.toString().padStart(2, '0')}
        </span>
        <span className='text-brown'>minuta</span>
      </div>
      <div className='flex flex-col items-center justify-center leading-none'>
        <span className='text-3xl font-extrabold text-brown'>
          {seconds.toString().padStart(2, '0')}
        </span>
        <span className='text-brown'>sekundi</span>
      </div>
    </div>
  );
}
