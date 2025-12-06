import { Link } from 'react-router-dom';
import { useState } from 'react';

const PopUp = ({ setShowPopup }) => {
  const [isClosing, setIsClosing] = useState(false);
  const animation = isClosing ? 'animate-fadeOut' : 'animate-fadeIn';

  function handleClose() {
    setIsClosing(true);
    setTimeout(() => {
      setShowPopup(false);
      setIsClosing(false);
    }, 1000);
  }
  return (
    <div className='fixed inset-0 bg-black/30 flex items-center justify-center z-50'>
      <div
        className={`bg-beige-1 rounded-lg p-6 text-center w-[90%] shadow-xl ${animation}`}
      >
        <span
          className='absolute top-5 right-5 text-3xl text-beige-8 leading-0'
          onClick={() => handleClose()}
        >
          x
        </span>
        <h2 className='caligraphy text-2xl text-beige-7 mb-3'>Hvala vam!</h2>
        <p className='text-beige-6 mb-6 text-lg'>
          Vaša potvrda je uspješno zabilježena.
        </p>
        <Link
          to='/'
          className=' text-beige-7 flex w-fit mx-auto border border-beige-6 px-10 py-1 rounded-md text-lg'
        >
          Početna stranica
        </Link>
      </div>
    </div>
  );
};

export default PopUp;
