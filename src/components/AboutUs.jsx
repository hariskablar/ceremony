import { useState, useEffect } from 'react';
const images = [
  '/aboutus1.webp',
  '/aboutus2.webp',
  '/aboutus3.webp',
  '/aboutus4.webp',
];

const AboutUs = () => {
  // const [index, setIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex((i) => (i + 1) % images.length);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);
  return (
    <div className='w-full bg-beige-1 overflow-hidden relative'>
      <img src='/paper-mask-top.webp' className='absolute top-0' />
      <h2 className='caligraphy text-4xl text-center mb-4 mt-15 text-beige-7'>
        Kako je sve počelo
      </h2>
      <p className='text-beige-6 px-5 py-5 text-md  leading-4'>
        Naši putevi su se spojili 2019. godine, a tri zajedničke godine na
        Ilidži pretvorile su dvoje kolega u najbolje prijatelje. Ljubav iz
        prijateljstva je posebna, a kod nas se bas desila u od tada je nastavila
        da raste.
      </p>
      <p className='text-beige-6 text-md  leading-4 px-5 mb-5'>
        Rado putujemo, idemo na utakmice, provodimo duge dane na Chiemseeu,
        družimo se, igramo Remija. Haris pronalazi radost u igricama, Amra u
        knjigama i druženju – i baš u toj različitosti nalazimo savršenu
        ravnotežu.
      </p>
      <p className='text-beige-6 text-md leading-4 px-5 mb-10'>
        Sada smo na korak do cilja, hvala Vam što ćete biti dio našeg vjenčanja
        i svojim prisustvom učiniti našu priču još ljepšom.
      </p>
      <div className='flex flex-wrap flex-row z-3 relative'>
        <img src='/paper-mask-top-beige.webp' className='absolute top-0' />
        {images.map((image, index) => (
          <img src={image} key={index} className='basis-1/4 w-1/4 ' />
        ))}
        <img src='/paper-mask-bottom.webp' className='absolute bottom-0' />
      </div>
    </div>
  );
};

export default AboutUs;
