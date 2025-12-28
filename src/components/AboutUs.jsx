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
      <p className='text-beige-6 px-5 py-5 text-xl  leading-5'>
        Naši putevi su se spojili 2019. godine, a tri zajedničke godine na
        Ilidži pretvorile su dvoje kolega u najbolje prijatelje. Iz tog
        prijateljstva, polako i iskreno, rodila se ljubav – posebna, tiha, ali
        snažna. Od tada, naš odnos je iz dana u dan postajao dublji, sigurniji i
        ljepši, vodeći nas ka odluci da zajedno započnemo novo poglavlje života.
      </p>
      <p className='text-beige-6 text-xl  leading-5 px-5 mb-5'>
        Volimo putovati i zajedno stvarati uspomene, pratiti Željine utakmice i
        provoditi bezbrižne, duge dane na obali Chiemseea. Uživamo u druženjima
        i tihim večerima uz Remi. Haris pronalazi radost u svijetu igrica, Amra
        u knjigama i toplim razgovorima – a upravo u tim našim različitostima
        pronašli smo savršenu ravnotežu i sklad.
      </p>
      <p className='text-beige-6 text-xl leading-5 px-5 mb-10'>
        Sada smo na korak do cilja, hvala Vam što ćete biti dio našeg vjenčanja
        i svojim prisustvom učiniti našu priču još ljepšom.
      </p>
      <div className='flex flex-wrap flex-row z-3 relative'>
        <img src='/paper-mask-top-beige.webp' className='absolute top-0 z-3' />
        {images.map((image, index) => (
          <img src={image} key={index} className='basis-1/4 w-1/4 ' />
        ))}
        <div className='bg-[#9887768c] h-full w-full z-2 absolute'></div>
        <img src='/paper-mask-bottom.webp' className='absolute bottom-0 z-3' />
      </div>
    </div>
  );
};

export default AboutUs;
