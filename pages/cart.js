import { useDispatch, useSelector } from 'react-redux';
import { selectItems, selectTotal, reset } from '../slices/cartSlice';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import CheckoutProduct from '../Components/CheckoutProduct';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';

const Cart = () => {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC);

  const clearCart = () => {
    dispatch(reset());
  };

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    if (items.length === 0) {
      toast.error('Your cart is empty.');
      return;
    }

    const res = await axios.post(`/api/checkout_session`, {
      items,
      email: session.user.email,
    });

    if (res.statusCode === 500) return;

    toast.loading('Redirecting...');

    const data = await res.data;

    stripe.redirectToCheckout({ sessionId: data.id });

    clearCart();
  };

  return (
    <main className="container cart">
      <div className="d-flex align-items-center justify-content-between my-4">
        <h2>Shopping Cart</h2>
        <Link href="/">
          <a className="btn">Go Back</a>
        </Link>
      </div>
      <div className="row border-top mb-4">
        <div className="col-md-9">
          {items?.length === 0 && (
            <>
              <h4 className="my-3">There are no items in your cart.</h4>
              <Link href="/">
                <a className="btn">Go Shopping</a>
              </Link>
            </>
          )}
          {items?.map((item) => (
            <CheckoutProduct
              key={item.id}
              id={item.id}
              title={item.title}
              rating={item.rating.rate}
              price={item.price}
              description={item.description}
              category={item.category}
              image={item.image}
              qty={item.qty}
            />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { opacity: { duration: 1 } },
          }}
          className="col-md-3 mb-3"
        >
          <p className="my-3">
            Subtotal ({items?.length} items) : <b>${total?.toFixed(2)}</b>
          </p>
          {items.length >= 1 && (
            <button onClick={clearCart} className="btn d-block mb-3">
              Clear Cart
            </button>
          )}
          {session ? (
            <button className="btn" onClick={createCheckoutSession}>
              Procced to Checkout
            </button>
          ) : (
            <button className="btn" onClick={() => signIn({ callback: '/' })}>
              Sign In to Checkout
            </button>
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default Cart;
