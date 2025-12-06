import Countdown from './components/Countdown';
import AboutUs from './components/AboutUs';
import Steps from './components/Steps';
import { motion } from 'framer-motion';

function App() {
  return (
    // <div className='relative bg-black min-h-screen '>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className='relative inset-0 bg-white z-50 pointer-events-none'
    >
      <div className='h-svh w-screen overflow-hidden relative'>
        <img src='/bg2.png' className='object-cover h-full ' />
        <img
          src='/heart-gold.webp'
          className='absolute w-7 h-7 top-36 left-20'
        />
        <img
          src='/heart-beige.webp'
          className='absolute w-10 h-10 top-28 left-46 rotate-y-180'
        />
        <p className='caligraphy absolute text-7xl top-20 left-10 text-beige-7'>
          Amra
        </p>
        <p className='caligraphy absolute text-4xl top-35 left-30 text-beige-7'>
          &
        </p>
        <p className='caligraphy absolute text-7xl top-40 left-30 text-beige-7'>
          Haris
        </p>
        <img
          src='/paper-mask-bottom.webp'
          className='absolute bottom-0 left-0 w-full '
        />
      </div>
      <div className='w-full mt-10 mb-5'>
        <p className='text-center text-4xl text-beige-7 caligraphy'>
          Trenuci do našeg dana
        </p>
      </div>
      <div>
        <Countdown target='2026-08-29T17:00:00' />
      </div>
      <div>
        <p className='text-center text-2xl text-beige-7 caligraphy mb-5'>
          U kalendaru srcem zaokruženo
        </p>
        <div className='flex gap-4 w-full justify-center items-center text-beige-6 mb-10'>
          <span className='py-1 border-t border-b border-beige-6 font-medium px-5 tracking-widest'>
            SUBOTA
          </span>
          <span className='text-5xl font-medium caligraphy text-beige-5'>
            29
          </span>
          <span className='py-1 border-t border-b border-beige-6 font-medium px-5 tracking-widest'>
            AUGUST
          </span>
        </div>
      </div>
      <AboutUs />
      <Steps />
    </motion.div>
    // </div>
  );
}

export default App;
