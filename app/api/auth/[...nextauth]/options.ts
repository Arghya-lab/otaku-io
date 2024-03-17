import User from "@/models/User";
import Preference from "@/models/Preference";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const existingUser = await User.findOne({ email: user.email });

      if (existingUser) {
        await User.updateOne(
          { email: user.email },
          {
            name: user.name,
            email: user.email,
            image: user.image,
            authType: account?.type,
            provider: account?.provider,
          }
        );
        user.id = existingUser._id;
      } else {
        const newUser = await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          authType: account?.type,
          provider: account?.provider,
        });
        await Preference.create({ email: user.email });
        user.id = newUser._id;
      }
      return true;
    },
  },
};
