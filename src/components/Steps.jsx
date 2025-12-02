import Step from './Step';

const Steps = () => {
  return (
    <>
      <div className='flex flex-col w-full h-auto items-stretch my-10 heart-element relative'>
        <Step
          title={'Početak naše bajke\nRestoran Stare Vrbe'}
          time='17:00'
          image='./wedding-arch.webp'
          reverse={false}
        />
        <Step
          title='Ceremonija ljubavi'
          time='18:00'
          image='./marriage.webp'
          reverse={true}
        />
        <Step
          title={'Trenutak samo za nas\nPrvi ples'}
          time='19:30'
          image='./dance.webp'
          reverse={false}
        />
        <Step
          title={'Slatki početak\nzajedničkog života'}
          time='20:00'
          image='./cake.webp'
          reverse={true}
        />
      </div>
    </>
  );
};

export default Steps;
