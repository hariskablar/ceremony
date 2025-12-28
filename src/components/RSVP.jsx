import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PopUp from './PopUp';
import LogoAnimation from './LogoAnimation';

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
  const [dataReady, setDataReady] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const markReady = () => setIsReady(true);

    if (document.readyState === 'complete') {
      markReady();
      return;
    }
    window.addEventListener('load', markReady, { once: true });

    return () => window.removeEventListener('load', markReady);
  }, []);

  useEffect(() => {
    if (!familySlug) return;

    setDataReady(false);

    fetch(`/api/invitation?family=${familySlug}`)
      .then((r) => r.json())
      .then((data) => {
        setFamily(data.family);
        setGuests(data.guests);
        // console.log(data.family);
        // console.log(data.guests);

        const initialSelected = {};
        (data.guests || []).forEach((g) => {
          initialSelected[g.id] = !!g.accepted;
        });
        setSelected(initialSelected);
        setDataReady(true);
      })
      .catch((err) => {
        console.log(err);
        setDataReady(true);
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
  const openInvString =
    family?.welcome === 'f'
      ? 'otvorila'
      : family?.welcome === 'm'
      ? 'otvorio'
      : 'otvorili';

  const welcome =
    family?.welcome === 'f'
      ? 'Dobrodošla'
      : family?.welcome === 'm'
      ? 'Dobrodošao'
      : 'Dobrodošli';

  const canFinishLoader = isReady && dataReady;
  return (
    <AnimatePresence mode='wait'>
      {showLoader && (
        <motion.div
          key='logo'
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className='fixed inset-0'
        >
          <LogoAnimation
            canFinish={canFinishLoader}
            onComplete={() => setShowLoader(false)}
          />
        </motion.div>
      )}
      {!showLoader && (
        <motion.div
          key='content'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className='relative inset-0'
        >
          <div className='bg-beige-1 h-screen flex flex-col justify-center'>
            <img
              src='/lines_with_birds.webp'
              className='mb-10 w-[90%] mx-auto'
            />

            <div className='animate-height'>
              <h2 className='caligraphy text-4xl text-center mb-2 text-beige-7 leading-11'>
                {welcome}, drag{family?.prefix} naš
                {guests?.length < 2 && family?.welcome === 'm'
                  ? ` `
                  : family?.prefix}{' '}
                {family?.invite_string}
              </h2>
              <p className=' text-xl text-center text-beige-6 px-2'>
                {guests.length < 2
                  ? `Hvala što si ${openInvString} našu pozivnicu.`
                  : `Hvala vam što ste otvorili našu pozivnicu.`}
              </p>
              <p className=' text-xl text-center text-beige-6 leading-5 px-2 my-2'>
                {guests.length < 2
                  ? `Tvoje prisustvo za nas znači mnogo i iskreno bismo se radovali da
              ovaj poseban dan podijelimo sa tobom.`
                  : `Vaše prisustvo za nas znači mnogo i iskreno bismo se radovali da
              ovaj poseban dan podijelimo sa vama.`}
              </p>
              <p className=' text-xl text-center text-beige-6 px-2'>
                {guests.length < 2
                  ? `Ispod potvrdi svoj dolazak.`
                  : `Molimo vas ispod potvrdite svoj dolazak.`}
              </p>
              <ul className='mt-5'>
                {guests?.map((guest) => (
                  <li key={guest.full_name} className='ml-[35%] mt-3'>
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

            <img src='/without_birds.webp' className='mt-10 w-[90%] mx-auto' />
            {showPopup && (
              <PopUp showModal={showPopup} setShowPopup={setShowPopup} />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RSVP;
