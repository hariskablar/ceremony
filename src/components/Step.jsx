const Step = ({ title, time, image, reverse }) => {
  return (
    <div
      className={`flex w-full relative items-center justify-center gap-10 h-[150px] ${
        reverse ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      <div
        className={`grow basis-1/2 flex ${
          reverse ? 'justify-start' : 'justify-end'
        }`}
      >
        <img src={image} className='w-[60px] h-[60px]' />
      </div>
      <div className='w-[2px] bg-earth-4 h-full'></div>
      <div
        className={`flex flex-col grow basis-1/2 ${
          reverse ? 'text-right' : 'text-left'
        }`}
      >
        <p className='mb-1 text-earth-4 font-medium text-3xl leading-none caligraphy'>
          {title}
        </p>
        <p className='text-earth-3 font-medium text-md leading-none caligraphy'>
          {time}
        </p>
      </div>
    </div>
  );
};

export default Step;
