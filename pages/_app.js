import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss';
import '@fontsource/raleway';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from '../store/store';
import Layout from '../Components/Layout';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Router from 'next/router';
import Loader from '../Components/Loader';

let persistor = persistStore(store);

const pageVariant = {
  pageInitial: { opacity: 0 },
  pageAnimate: { opacity: 1 },
};

function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
  const [loading, setLoading] = useState(false);

  Router.events.on('routeChangeStart', (url) => {
    setLoading(true);
  });
  Router.events.on('routeChangeComplete', (url) => {
    setLoading(false);
  });
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <motion.div
              key={router.router}
              initial="pageInitial"
              animate="pageAnimate"
              variants={pageVariant}
            >
              <Toaster />
              {loading ? <Loader /> : <Component {...pageProps} />}
            </motion.div>
          </Layout>
        </PersistGate>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
