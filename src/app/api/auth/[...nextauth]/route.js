import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import logger from "@/lib/logger";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectDB();

          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;

        } catch (error) {
          logger.error("Auth Error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.picture = user.image;
        token.id = user._id?.toString() || user.id;

        // Create a JWT token that can be verified by the server
        if (process.env.NEXTAUTH_SECRET) {
          try {
            const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
            token.accessToken = await new jose.SignJWT({
              id: token.id,
              email: user.email,
              role: user.role || 'user',
            })
              .setProtectedHeader({ alg: 'HS256' })
              .setIssuedAt()
              .setExpirationTime('7d')
              .sign(secret);
          } catch (error) {
            logger.error('Error creating access token:', error);
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.image = token.picture;
        session.user.id = token.id;
        session.accessToken = token.accessToken;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };