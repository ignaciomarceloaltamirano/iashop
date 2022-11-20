import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../slices/cartSlice';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

const ProductPage = ({ product, products }) => {
  const dispatch = useDispatch();
  const { id, title, price, description, image, rating } = product;

  const addItemToCart = () => {
    const product = {
      id,
      title,
      price,
      description,
      image,
      rating,
    };
    dispatch(addToCart(product));
  };

  const containerVariant = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        scale: { duration: 0.7 },
        type: 'spring',
        stiffness: 120,
      },
    },
  };

  const similarProducts = products?.filter((product) => product.id !== id);

  return (
    <main className="product-main container mt-4">
      <Link href="/">
        <a className="btn mb-4">Go Back</a>
      </Link>
      <div className="row">
        <motion.div
          initial={{ opacity: 0, x: '-100%' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: 'spring',
            bounce: 0.4,
          }}
          className="col-md-6 d-flex align-items-center justify-content-center"
        >
          <Image
            src={image}
            alt={title}
            className="product-im"
            height={400}
            width={400}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: 'spring',
            bounce: 0.4,
          }}
          className="col-md-6 mt-4 mt-md-0 d-flex flex-column 0align-items-start justify-content-center"
        >
          <h2>{title}</h2>
          <div className="d-flex align-items-center my-4">
            <i style={{ fontSize: '1.3rem', color: '#eab308' }}>
              <AiFillStar />
            </i>
            <p className="me-1">
              <b>{rating.rate}</b>
            </p>
          </div>
          <h4>
            Price: <b> ${price}</b>
          </h4>
          <p className="text-capitalize mt-4">{description}</p>
          <button className="btn my-4 mx-auto w-50" onClick={addItemToCart}>
            Add to cart
          </button>
        </motion.div>
      </div>
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        spaceBetween={15}
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        loop={true}
        autoplay={{ delay: 4000 }}
      >
        {similarProducts.slice(0, 10).map((product) => (
          <SwiperSlide key={product.id}>
            <div className="similar-products my-5">
              <Link href={`/product/${product.id}`}>
                <motion.div
                  variants={containerVariant}
                  initial="hidden"
                  animate="visible"
                  className="d-flex justify-content-center align-items-center flex-column mx-auto my-3"
                >
                  <p className="my-3 text-center">{product.title}</p>
                  <motion.div whileHover={{ scale: 1.2 }} role="button">
                    <Image
                      src={product.image}
                      alt="Banner Image"
                      width={150}
                      height={150}
                    />
                  </motion.div>
                </motion.div>
              </Link>
              <div className="pb-3 d-flex">
                <Link href={`/product/${product.id}`}>
                  <a className="btn mx-auto">View More</a>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
};

export default ProductPage;

export async function getStaticPaths() {
  const { data: products } = await axios.get(
    'https://fakestoreapi.com/products'
  );

  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { id } }) {
  const { data: products } = await axios.get(
    `https://fakestoreapi.com/products/`
  );

  const { data: product } = await axios.get(
    `https://fakestoreapi.com/products/${id}`
  );

  return {
    props: {
      products,
      product,
    },
  };
}
