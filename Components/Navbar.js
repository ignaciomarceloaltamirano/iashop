import { signIn, signOut, useSession, getSession } from 'next-auth/react';
import Link from 'next/link';
import { BiShoppingBag } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/cartSlice';
import SearchInput from './SearchInput';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { data: session } = useSession();
  const items = useSelector(selectItems);
  return (
    <>
      <nav className="p-1 sticky-top">
        <div className="container">
          <header className="d-flex justify-content-between align-items-center">
            <Link href="/">IAShop</Link>
            <SearchInput />
            <div className="d-flex align-items-center">
              {session ? (
                <>
                  <p className="d-none d-md-block">{session?.user.tag}</p>
                  <motion.button
                    whileTap={{ scale: 0.6 }}
                    className="btn ms-md-3"
                    onClick={() => signOut()}
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.6 }}
                  className="btn mx-3 sign-in-nav"
                  onClick={() => signIn({ callback: '/' })}
                >
                  Sign In
                </motion.button>
              )}
              <Link href="/cart">
                <motion.i whileTap={{ scale: 0.6 }} className="ms-3 me-1">
                  <BiShoppingBag />
                </motion.i>
              </Link>
              <div className="d-flex justify-content-center align-items-center bg-danger rounded mb-1 px-1 py-0">
                {items?.length >= 1 && (
                  <span className="items-count pb-1">{items?.length}</span>
                )}
              </div>
            </div>
          </header>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
