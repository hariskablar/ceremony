import Step from './Step';

const Steps = () => {
  return (
    <>
      <div className='flex flex-col w-full h-auto items-stretch my-10 heart-element relative'>
        <Step
          title='Restoran Stare Vrbe'
          time='17:00'
          image='./wedding-arch.webp'
          reverse={false}
        />
        <Step
          title='Ceremonija'
          time='18:00'
          image='./marriage.webp'
          reverse={true}
        />
        <Step
          title='Prvi ples'
          time='19:30'
          image='./dance.webp'
          reverse={false}
        />
        <Step title='Torta' time='20:00' image='./cake.webp' reverse={true} />
      </div>
    </>
  );
};

export default Steps;
