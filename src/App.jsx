import Countdown from './components/Countdown';
import AboutUs from './components/AboutUs';
import Steps from './components/Steps';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className='relative bg-black min-h-screen '>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
        className='relative inset-0 bg-beige-1 z-50 pointer-events-none'
      >
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
          <p className='text-center text-4xl text-earth-4 caligraphy'>
            Trenuci do našeg dana
          </p>
        </div>
        <div>
          <Countdown target='2026-08-29T17:00:00' />
        </div>
        <div>
          <p className='text-center text-2xl text-earth-4 caligraphy mb-5'>
            U kalendaru srcem zaokruženo
          </p>
          <div className='flex gap-4 w-full justify-center items-center text-earth-4 mb-10'>
            <span className='py-1 border-t border-b border-earth-4 font-medium px-5 tracking-widest'>
              SUBOTA
            </span>
            <span className='text-5xl font-medium caligraphy'>29</span>
            <span className='py-1 border-t border-b border-earth-4 font-medium px-5 tracking-widest'>
              AUGUST
            </span>
          </div>
        </div>
        <AboutUs />
        <Steps />
      </motion.div>
    </div>
  );
}

export default App;
