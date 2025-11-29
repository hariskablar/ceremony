import { useState, useEffect } from 'react';
const images = [
  '/aboutus1.webp',
  '/aboutus2.webp',
  '/aboutus3.webp',
  '/aboutus4.webp',
];

const AboutUs = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className='w-full bg-earth-1 pt-5 pb-10'>
      <div
        className='flex
      '
      >
        <div
          className='blob-mask w-[1000px] h-[200px] transition-all duration-700 bg-center bg-cover'
          style={{ backgroundImage: `url(${images[index]})` }}
        ></div>
        <p className='text-earth-4 px-5 py-5 text-md leading-4'>
          Naši putevi su se spojili 2019. godine, a tri zajedničke godine na
          Ilidži pretvorile su dvoje kolega u najbolje prijatelje.Ljubav iz
          prijateljstva je posebna,a kod nas se bas desila u od tada je
          nastavila da raste.
        </p>
      </div>
      <p className='text-earth-4 text-md leading-4 px-5 mb-5'>
        Rado putujemo,idemo na utakmice, provodimo duge dane na
        Chiemseeu,družimo se,igramo Remija.. Haris pronalazi radost u igricama,
        Amra u knjigama i druženju – i baš u toj različitosti nalazimo savršenu
        ravnotežu.
      </p>
      <p className='text-earth-4 text-md leading-4 px-5'>
        Sada smo na korak do cilja,hvala vam što ćete biti dio našeg vjencanja i
        svojim prisustvom uciniti našu priču još ljepšom.
      </p>
    </div>
  );
};

export default AboutUs;
