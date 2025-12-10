import { motion, scale } from 'framer-motion';

const Step = ({ title, time, image }) => {
  return (
    <div
      className={`flex w-full ml-[100px] relative items-center justify-start gap-10 h-[150px] `}
    >
      <div className='h-full w-[2px] bg-beige-7'></div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeIn', delay: 0.2 }}
        viewport={{ once: true, amount: 0.9 }}
        className='w-[75px] h-[75px] absolute -left-[35px] bg-white p-3 border-2 border-beige-7 rounded-full'
      >
        <img src={image} className='relative' />
      </motion.div>
      <div className='flex flex-col justify-center ml-5'>
        <motion.p
          initial={{ opacity: 0, x: '30px' }}
          whileInView={{ opacity: 1, x: '0px' }}
          transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.4 }}
          viewport={{ once: true, amount: 0.9 }}
          className='caligraphy text-2xl whitespace-pre-line leading-6'
        >
          {title}
        </motion.p>
        <p
          initial={{ opacity: 0, x: '30px' }}
          whileInView={{ opacity: 1, x: '0px' }}
          transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.5 }}
          viewport={{ once: true, amount: 0.9 }}
          className='text-xl text-beige-5 leading-4'
        >
          {time}
        </p>
      </div>
    </div>
  );
};

export default Step;
