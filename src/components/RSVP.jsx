import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// function useQuery() {
//   const location = useLocation();
//   return new URLSearchParams(location.search);
// }

const RSVP = () => {
  // const query = useQuery();
  // const familySlug = query.get('family') || '';
  // const [family, setFamily] = useState(null);
  // const [guests, setGuests] = useState([]);
  // const [selected, setSelected] = useState({});

  // useEffect(() => {
  //   if (!familySlug) return;
  //   fetch(`/api/invitation?family=${familySlug}`)
  //     .then((r) => r.json())
  //     .then((data) => {
  //       setFamily(data.family);
  //       setGuests(data.guests);
  //       console.log(data.guests);

  //       const initialSelected = {};
  //       (data.guests || []).forEach((g) => {
  //         initialSelected[g.id] = !!g.accepted;
  //       });
  //       setSelected(initialSelected);
  //     });
  // }, [familySlug]);

  // const toggleId = (id) => {
  //   setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  // };

  // const handleSubmit = async () => {
  //   const updates = guests.map((g) => ({
  //     id: g.id,
  //     accepted: !!selected[g.id],
  //   }));
  //   await fetch('/api/rsvp', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ updates }),
  //   });
  //   alert('Hvala na potvrdi <3');
  // };
  return (
    <>
      <h2>DOBRODOŠLI</h2>
      {/* <ul>
        {guests?.map((guest) => (
          <li key={guest.id}>
            <label>
              <input
                type='checkbox'
                checked={!!selected[guest.id]}
                onChange={() => toggleId(guest.id)}
              />
              {guest.full_name}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Potvrdi</button> */}
    </>
  );
};

export default RSVP;
