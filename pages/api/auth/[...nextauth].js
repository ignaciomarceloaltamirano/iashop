import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.googleClientId,
      clientSecret: process.env.googleSecret,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  adapter: FirestoreAdapter({
    apiKey: 'AIzaSyBUAWA6pK0Tr-gWmsWbHPZXHsTv2NSx464',
    authDomain: 'pro-shop-3e8b8.firebaseapp.com',
    projectId: 'pro-shop-3e8b8',
    storageBucket: 'pro-shop-3e8b8.appspot.com',
    messagingSenderId: '651299952049',
    appId: '1:651299952049:web:7c9de76e2215e825f59990',
  }),
  callbacks: {
    async session({ session, user }) {
      session.user.tag = session.user.name
        .split(' ')
        .join('')
        .toLocaleLowerCase();

      session.user.uid = user.id;
      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
});
