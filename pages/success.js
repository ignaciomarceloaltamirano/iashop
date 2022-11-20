import { AiOutlineCheckCircle } from 'react-icons/ai';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Success = () => {
  return (
    <main className="success-wrapper container">
      <motion.div
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          type: 'spring',
          bounce: 0.4,
        }}
        className="success"
      >
        <p className="check-icon">
          <AiOutlineCheckCircle />
        </p>
        <h4>Congratulations!</h4>
        <h4>Your order was successfully placed.</h4>
        <Link href="/">
          <a className="btn mt-3">Back to Home</a>
        </Link>
      </motion.div>
    </main>
  );
};

export default Success;
