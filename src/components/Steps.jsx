import Step from './Step';

const Steps = () => {
  return (
    <>
      <div className='flex flex-col w-full h-auto items-stretch my-10 heart-element relative'>
        <Step
          title={'Početak naše bajke\nRestoran Stare Vrbe'}
          time='17:00'
          image='./wedding-arch-gold.webp'
        />
        <Step
          title='Ceremonija ljubavi'
          time='18:00'
          image='./marriage-gold.webp'
        />
        <Step
          title={'Trenutak samo za nas\nPrvi ples'}
          time='19:30'
          image='./dance-gold.webp'
        />
        <Step
          title={'Slatki početak\nzajedničkog života'}
          time='20:00'
          image='./cake-gold.webp'
        />
      </div>
    </>
  );
};

export default Steps;
