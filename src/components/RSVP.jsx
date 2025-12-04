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
  const [guests, setGuests] = useState(null);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    if (!familySlug) return;
    fetch(`/api/invitation?family=${familySlug}`)
      .then((r) => r.json())
      .then((data) => {
        setFamily(data.family);
        setGuests(data.guests);
        console.log(data.guests);
      });
  }, []);
  return (
    <>
      <h2>DOBRODOŠLI</h2>
      {guests?.map((guest) => (
        <p key={guest.id}></p>
      ))}
    </>
  );
};

export default RSVP;
