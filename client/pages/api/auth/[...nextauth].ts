/** @format */

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
  providers: [
    // OAuth authentication providers...
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID || "",
      clientSecret: process.env.FACEBOOK_SECRET || "",
    }),
    GoogleProvider({
      clientId:
        process.env.GOOGLE_ID ||
        "372038205027-1v152av1nldjambd952e6r33sfemcn6s.apps.googleusercontent.com",
      clientSecret:
        process.env.GOOGLE_SECRET || "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",
    }),
  ],
};

export default NextAuth(authOptions);
