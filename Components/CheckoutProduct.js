import Image from 'next/image';
import Link from 'next/link';
import { AiFillStar, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { increaseQty, decreaseQty, removeFromCart } from '../slices/cartSlice';
import { motion } from 'framer-motion';

const CheckoutProduct = ({
  image,
  title,
  price,
  description,
  id,
  qty,
  rating,
}) => {
  const dispatch = useDispatch();

  const increaseItemQty = () => {
    const product = {
      id,
      image,
      title,
      rating,
      price,
      description,
    };
    dispatch(increaseQty(product));
  };

  const decreaseItemQty = () => {
    dispatch(decreaseQty({ id }));
  };

  const removeItemFromCart = async () => {
    dispatch(removeFromCart({ id }));
  };
  return (
    <>
      <motion.div
        className="row my-4"
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ opacity: { duration: 1 } }}
      >
        <div
          className="col-3 d-flex justify-content-center align-items-center flex-column"
          key="product-img"
        >
          <Link href={`/product/${id}`}>
            <a>
              <Image
                role="button"
                src={image}
                alt="Product Image"
                width={220}
                height={220}
              />
            </a>
          </Link>
          <button className="btn mt-3" onClick={removeItemFromCart}>
            Remove
          </button>
        </div>
        <div className="col-4" key="product-info">
          <p className="my-3">
            <b>{title}</b>
          </p>
          <div className="d-flex align-items-center">
            <i
              style={{
                cursor: 'default',
                fontSize: '1.3rem',
                color: '#eab308',
              }}
            >
              <AiFillStar />
            </i>
            <p className="ms-1">
              <b>{rating}</b>
            </p>
          </div>
          <p className="mt-3 d-none d-md-block">{description}</p>
          <h5 className="mt-3">
            <b>${price}</b>
          </h5>
        </div>
        <div
          className="col-5 d-flex justify-content-center align-items-center"
          key="product-qty"
        >
          <button className="btn" onClick={increaseItemQty}>
            <AiOutlinePlus />
          </button>
          <p className="mx-2">{qty}</p>
          <button className="btn" onClick={decreaseItemQty}>
            <AiOutlineMinus />
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default CheckoutProduct;
