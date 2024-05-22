// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' }
//       },
//       async authorize(credentials) {
//         const res = await fetch('http://192.168.18.103:8000/api/login', {
//           method: 'POST',
//           body: JSON.stringify(credentials),
//           headers: { 'Content-Type': 'application/json' }
//         });
//         const user = await res.json();

//         // Adjust the following condition based on your API response structure
//         if (res.ok && user) {
//           return user;
//         } else {
//           throw new Error('Login failed');
//         }
//       }
//     })
//   ],
//   pages: {
//     signIn: '/auth/signin',
//     error: '/auth/error' // Redirect here on error
//   },
//   callbacks: {
//     async jwt(token, user) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session(session, token) {
//       session.user.id = token.id;
//       return session;
//     }
//   }
// });
// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const res = await fetch('http://192.168.18.103:8000/api/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' }
          });
          const user = await res.json();

          if (res.ok && user && user.token) {
            return { ...user, email: credentials.email };
          } else {
            throw new Error('Login failed');
          }
        } catch (error) {
          throw new Error('Login failed');
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id || null;
        token.accessToken = user.token || null;
      }
      return token;
    },
    async session(session, token) {
      if (token) {
        session.user.id = token.id || null;
        session.user.accessToken = token.accessToken || null;
      }
      return session;
    }
  },
  session: {
    jwt: true
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true
  },
  secret: process.env.NEXTAUTH_SECRET,
});