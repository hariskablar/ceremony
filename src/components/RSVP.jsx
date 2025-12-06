import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
    await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updates }),
    });
  };
  return (
    <div className='bg-1 h-screen flex flex-col justify-center'>
      <img src='./lines_with_birds.webp' className='mb-10 w-[90%] mx-auto' />
      <h2 className='caligraphy text-4xl text-center mb-2 text-7'>
        Dobro došli, draga porodico {family?.family_name}
      </h2>
      <p className=' text-xl text-center text-6'>
        Hvala vam što ste otvorili našu pozivnicu.
      </p>
      <p className=' text-xl text-center text-6 leading-3'>
        Vaše prisustvo za nas znači mnogo i iskreno bismo se radovali da ovaj
        poseban dan podijelimo zajedno.
      </p>
      <p className=' text-xl text-center text-6'>
        Molimo vas ispod potvrdite svoj dolazak.
      </p>
      <ul className='mt-5'>
        {guests?.map((guest) => (
          <li key={guest.id} className='ml-[35%] mt-3'>
            <label className='caligraphy text-6 text-2xl '>
              <input
                type='checkbox'
                checked={!!selected[guest.id]}
                onChange={() => toggleId(guest.id)}
                className='mr-3 accent-5'
              />
              {guest.full_name}
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={handleSubmit}
        className=' text-5 flex mx-auto mt-10 border-1 px-10 py-1 rounded-md text-2xl'
      >
        Potvrdi dolazak
      </button>
      <img src='./without_birds.webp' className='mt-10 w-[90%] mx-auto' />
    </div>
  );
};

export default RSVP;
