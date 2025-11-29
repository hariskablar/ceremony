import Countdown from './components/Countdown';
import AboutUs from './components/AboutUs';

function App() {
  return (
    <>
      <div className='h-svh w-screen overflow-hidden relative'>
        <img src='/bg1.png' className='object-cover h-full ' />
        <img
          src='/amra.png'
          className='absolute top-0 -left-10 drop-shadow-xs drop-shadow-gray-900'
        />
        <img
          src='/and.png'
          className='absolute top-12 drop-shadow-xs drop-shadow-gray-900'
        />
        <img
          src='/haris.png'
          className='absolute top-25 left-7 drop-shadow-xs drop-shadow-gray-900'
        />
        <img src='/cut2.webp' className='absolute bottom-0 left-0 w-full ' />
      </div>
      <div className='w-full mt-10 mb-5'>
        <p className='text-center text-4xl text-earth-4'>
          Trenuci do našeg dana
        </p>
      </div>
      <div>
        <Countdown target='2026-08-31T17:00:00' />
      </div>
      <div>
        <AboutUs />
      </div>
    </>
  );
}

export default App;
