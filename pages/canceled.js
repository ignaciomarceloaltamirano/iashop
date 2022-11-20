import { AiOutlineCloseCircle } from 'react-icons/ai';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Canceled = () => {
  return (
    <main className="cancel-wrapper container">
      <motion.div
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          type: 'spring',
          bounce: 0.4,
        }}
        className="cancel"
      >
        <p className="cancel-icon">
          <AiOutlineCloseCircle />
        </p>
        <h4>Something went wrong.</h4>
        <h4>Your payment wasn´t completed.</h4>
        <Link href="/cart">
          <a className="btn mt-3">Please Try Again</a>
        </Link>
      </motion.div>
    </main>
  );
};

export default Canceled;
