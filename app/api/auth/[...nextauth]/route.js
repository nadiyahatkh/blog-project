import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          const res = await fetch('http://192.168.18.103:8000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });

          if (!res.ok) {
            throw new Error('Login failed');
          }
          
          const user = await res.json();
          console.log(user);

          if (user && user.data.email) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error('Error in authorize function:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === "credentials") {
        token.email = user.data.email;
        token.name = user.data.name;
        token.role = user.data.role;
        token.token = user.token; // Save the token
      }
      return token;
    },
    async session({ session, token }) {
  
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("name" in token) {
        session.user.fullname = token.fullname;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      if ("token" in token) {
        session.user.token = token.token;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// import { NextAuthOptions } from "next-auth";
// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";

// const authOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   providers: [
//     CredentialsProvider({
//       type: "credentials",
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const { email, password } = credentials;

//         try {
//           const res = await fetch('http://192.168.18.103:8000/api/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, password })
//           });

//           if (!res.ok) {
//             throw new Error('Login failed');
//           }
          
//           const user = await res.json();
//           console.log(user)

//           if (user && user.data.email) {
//             return user;
//           } else {
//             return null;
//           }
//         } catch (error) {
//           console.error('Error in authorize function:', error);
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, account, profile, user }) {
//       if (account?.provider === "credentials" && user) {
//         token.email = user.data.email;
//         token.fullname = user.data.name;
//         token.role = user.data.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if ("email" in token) {
//         session.user.email = token.email;
//       }
//       if ("fullname" in token) {
//         session.user.fullname = token.fullname;
//       }
//       if ("role" in token) {
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },

//   pages: {
//     signIn: "/login",
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
