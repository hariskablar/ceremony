import Step from './Step';

const stepData = [
  {
    title: 'Početak naše bajke\nRestoran Stare Vrbe',
    time: '17:00',
    image: './wedding-arch-gold.webp',
  },
  {
    title: 'Ceremonija ljubavi',
    time: '18:00',
    image: './marriage-gold.webp',
  },
  {
    title: 'Trenutak samo za nas\nPrvi ples',
    time: '19:30',
    image: './dance-gold.webp',
  },
  {
    title: 'Slatki početak\nzajedničkog života',
    time: '20:00',
    image: './cake-gold.webp',
  },
];

const Steps = () => {
  return (
    <>
      <div className='flex flex-col w-full h-auto items-stretch my-10 heart-element relative'>
        {stepData.map((step) => (
          <Step
            key={step.time}
            title={step.title}
            time={step.time}
            image={step.image}
          />
        ))}
      </div>
    </>
  );
};

export default Steps;
