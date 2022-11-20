import { getProviders, signIn as SignIntoProvider } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';

const signIn = ({ providers }) => {
  return (
    <main className="sign-in">
      {Object?.values(providers).map((provider) => (
        <motion.div
          whileTap={{ scale: 0.6 }}
          className="px-2 py-1 rounded sign-in-btn"
          key={provider?.name}
        >
          <p
            className="d-inline-block"
            onClick={() => SignIntoProvider(provider.id, { callbackUrl: '/' })}
          >
            <FcGoogle />
            &nbsp; Sign in with {provider?.name}
          </p>
        </motion.div>
      ))}
    </main>
  );
};

export default signIn;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
