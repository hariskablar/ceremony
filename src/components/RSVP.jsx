import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import PopUp from './PopUp';

function useQuery() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}

const RSVP = () => {
  const query = useQuery();
  const familySlug = query.get('family') || '';
  const [family, setFamily] = useState(null);
  const [guests, setGuests] = useState([]);
  const [selected, setSelected] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!familySlug) return;

    fetch(`/api/invitation?family=${familySlug}`)
      .then((r) => r.json())
      .then((data) => {
        setFamily(data.family);
        setGuests(data.guests);
        console.log(data.family);
        console.log(data.guests);

        const initialSelected = {};
        (data.guests || []).forEach((g) => {
          initialSelected[g.id] = !!g.accepted;
        });
        setSelected(initialSelected);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, [familySlug]);

  const toggleId = (id) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = async () => {
    const updates = guests.map((g) => ({
      id: g.id,
      accepted: !!selected[g.id],
    }));
    try {
      await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      });
    } catch (err) {
      console.log(err);
    } finally {
      setShowPopup(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className='relative inset-0  z-50 pointer-events-none'
    >
      <div className='bg-beige-1 h-screen flex flex-col justify-center'>
        <img src='./lines_with_birds.webp' className='mb-10 w-[90%] mx-auto' />
        {isLoading ? (
          <p className='w-full text-center text-beige-5 text-7xl caligraphy loading-animation'>
            A & H
          </p>
        ) : (
          <div className='animate-height'>
            <h2 className='caligraphy text-4xl text-center mb-2 text-beige-7'>
              Dobrodošli, draga porodico {family?.family_name}
            </h2>
            <p className=' text-xl text-center text-beige-6 px-2'>
              Hvala vam što ste otvorili našu pozivnicu.
            </p>
            <p className=' text-xl text-center text-beige-6 leading-5 px-2 my-2'>
              Vaše prisustvo za nas znači mnogo i iskreno bismo se radovali da
              ovaj poseban dan podijelimo sa vama.
            </p>
            <p className=' text-xl text-center text-beige-6 px-2'>
              Molimo vas ispod potvrdite svoj dolazak.
            </p>
            <ul className='mt-5'>
              {guests?.map((guest) => (
                <li key={guest.id} className='ml-[35%] mt-3'>
                  <label className='caligraphy text-beige-6 text-2xl '>
                    <input
                      type='checkbox'
                      checked={!!selected[guest.id]}
                      onChange={() => toggleId(guest.id)}
                      className='mr-3 accent-beige-5'
                    />
                    {guest.full_name}
                  </label>
                </li>
              ))}
            </ul>
            <button
              onClick={handleSubmit}
              className=' text-beige-7 flex mx-auto mt-10 border border-beige-6 px-10 py-1 rounded-md text-2xl'
            >
              Potvrdi dolazak
            </button>
          </div>
        )}

        <img src='./without_birds.webp' className='mt-10 w-[90%] mx-auto' />
        {showPopup && (
          <PopUp showModal={showPopup} setShowPopup={setShowPopup} />
        )}
      </div>
    </motion.div>
  );
};

export default RSVP;
