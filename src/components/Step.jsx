const Step = ({ title, time, image }) => {
  return (
    <div
      className={`flex w-full ml-[100px] relative items-center justify-start gap-10 h-[150px] `}
    >
      <div className='h-full w-[2px] bg-beige-7'></div>
      <div className='w-[75px] h-[75px] absolute -left-[35px] bg-white p-3 border-2 border-beige-7 rounded-full'>
        <img src={image} className='relative' />
      </div>
      <div className='flex flex-col justify-center mb-10'>
        <p className='caligraphy text-2xl whitespace-pre-line leading-6'>
          {title}
        </p>
        <p className='text-xl text-beige-5 leading-4'>{time}</p>
      </div>
    </div>
  );
};

export default Step;
