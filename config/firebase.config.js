import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBUAWA6pK0Tr-gWmsWbHPZXHsTv2NSx464',
  authDomain: 'pro-shop-3e8b8.firebaseapp.com',
  projectId: 'pro-shop-3e8b8',
  storageBucket: 'pro-shop-3e8b8.appspot.com',
  messagingSenderId: '651299952049',
  appId: '1:651299952049:web:7c9de76e2215e825f59990',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore();

export default app;
export { auth, db };
