import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Banner = ({ products }) => {
  const product = products.slice(0, 1);

  return (
    <motion.div
      initial={{
        opacity: 0,
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
      }}
      animate={{
        opacity: 1,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      }}
      transition={{
        type: 'spring',
        clipPath: { duration: 0.7 },
        stiffness: 120,
      }}
      className="banner row mt-md-5 mt-0"
    >
      <div className="col-md-6 d-flex justify-content-center  mx-auto my-4 flex-column">
        <h2>{product[0].title}</h2>
        <p className="my-4">{product[0].description}</p>
        <Link href={`/product/${product[0].id}`}>
          <a className="btn align-self-center me-auto">Buy Now</a>
        </Link>
      </div>
      <div className="col-md-6 pb-4 d-flex justify-content-center align-items-center">
        <Image
          src={product[0].image}
          alt="Banner Image"
          width={400}
          height={400}
        />
      </div>
    </motion.div>
  );
};

export default Banner;
