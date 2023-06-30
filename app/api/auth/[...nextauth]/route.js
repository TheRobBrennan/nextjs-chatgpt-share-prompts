import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    // To set up Google Authentication:
    //
    //  Step 01 - Navigate to https://console.cloud.google.com/
    //  Step 02 - Sign in with your Google credentials
    //  Step 03 - Create a new project with a name of "promptopia"
    //  Step 04 - Select the newly created project
    //  Step 05 - Open the top left hamburger menu and select "APIs & Services > OAuth consent screen"
    //  Step 06 - Click "Create"
    //    App name - "Promptopia"
    //    Email - <your email>
    //    Developer contact information - <your email>
    //  Step 07 - Click "Save and continue"
    //  Step 08 - Click "Save and continue" from the Scopes screen
    //  Step 09 - Click "Save and continue" from the Test Users screen
    //  Step 10 - Click "Back to Dashboard" from the Edit app registration of the OAuth consent screen
    //  Step 11 - From the opened hamburger menu, select "APIs & Services > Credentials"
    //  Step 12 - Go to "Credentials"
    //  Step 13 - Click "+ Create credentials > OAuth client ID"
    //    Application type - "Web application"
    //    Name - "Web client 1" is the default, but you can call it whatever you'd like
    //    Authorized JavaScript origins - "http://localhost:3000"
    //    Authorized JavaScript origins [PRODUCTION] - "https://nextjs-chatgpt-share-prompts.vercel.app"
    //    Authorized redirect URIs - "http://localhost:3000"
    //    Authorized redirect URIs - "http://localhost:3000/api/auth/callback/google"
    //    Authorized redirect URIs [PRODUCTION] - "https://nextjs-chatgpt-share-prompts.vercel.app"
    //    Authorized redirect URIs [PRODUCTION] - "https://nextjs-chatgpt-share-prompts.vercel.app/api/auth/callback/google"
    //  Step 14 - Click "Create"
    //  Step 15 - Copy and paste the Client ID and Client Secret to environment variables in your .env file
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();

      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDB();

        // check if a user already exists
        const userExists = await User.findOne({ email: profile.email });

        // If not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
