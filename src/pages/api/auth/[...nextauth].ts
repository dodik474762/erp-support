/* eslint-disable react-hooks/rules-of-hooks */
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import axios from "axios";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      type: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        nik: { label: "Nik", type: "text" },
        username: { label: "Kode License", type: "text" },
      },
      async authorize(request) {
        const { email, password, token, nik, username } = request as {
          email: string;
          password: string;
          token: string;
          nik: string;
          username: string;
        };
        const login : any= await axios({
          method: "post",
          url: process.env.API_BASE_URL + "/auth/login",
          data: {
            username: username,
            password: password,
          },
        });

        if (login.data.is_valid) {
          const user = {
            id: login.data.data.id,
            username: login.data.data.username,
            token: login.data.token,
            email: login.data.data.username,
          };

          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user.username;
        token.name = user.username;
        token.id = user.id;
        token.username = user.username;
        token.token = user.token;
      }

      return token;
    },
    async session({ session, token }: any) {
      // console.log("token", token);
      if ("email" in token) {
        session.user.username = token.username;
        session.user.token = token.token;
        session.user.id = token.id;
      }
      return session;
    },
    async signIn({ user, account, profile, email, credentials }: any) {
      // console.log("user", user, account, profile, email, credentials);
      if (account?.provider === "credentials") {
        return true;
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);
export default handler;
// export { handler as GET, handler as POST, authOptions };
