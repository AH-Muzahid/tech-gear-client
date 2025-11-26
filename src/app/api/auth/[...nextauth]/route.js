import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/db"; 
import User from "@/models/User";
import bcrypt from "bcryptjs";

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
          // connect to the database
          await connectDB();
          // console.log(" NextAuth DB Connected");

          // find the user by email
          const user = await User.findOne({ email });
          
          if (!user) {
            // console.log("User Not Found in Database:", email);
            return null; 
          }
          // console.log(" User Found:", user.email);

          // compare the password
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            // console.log("Password did NOT match");
            return null; 
          }

          // console.log(" Login Successful!");
          return user; 

        } catch (error) {
          // console.log("Auth Error: ", error);
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
        }
        return token;
    },
    async session({ session, token }) {
        if (session?.user) {
            session.user.role = token.role;
            session.user.image = token.picture;
        }
        return session;
    }
  }
});

export { handler as GET, handler as POST };