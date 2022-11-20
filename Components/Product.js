import Image from 'next/image';
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const Product = ({ product }) => {
  const { id, title, price, description, image, rating } = product;
  const dispatch = useDispatch();
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
  return (
    <div className="d-flex align-items-center justify-content-center flex-column p-3 w-100 text-center">
      <p className="text-capitalize mb-3 ms-md-auto">{product.category}</p>
      <Link href={`/product/${product.id}`}>
        <a className="link">
          <div className="d-flex justify-content-center">
            <Image
              src={product.image}
              alt="Product Image"
              width={250}
              height={250}
            />
          </div>
          <h5 className="mt-3">{product.title}</h5>
          <div className="d-flex justify-content-center align-items-center">
            <i style={{ fontSize: '1.3rem', color: '#eab308' }}>
              <AiFillStar />
            </i>
            <p className="ms-1">
              <b>{product.rating.rate}</b>
            </p>
          </div>
          <h4 className="mt-3">${product.price}</h4>
        </a>
      </Link>
      <div className="d-flex mt-3">
        <Link href={`/product/${product.id}`}>
          <a className="btn me-2">View More</a>
        </Link>
        <button className="btn" onClick={addItemToCart}>
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
