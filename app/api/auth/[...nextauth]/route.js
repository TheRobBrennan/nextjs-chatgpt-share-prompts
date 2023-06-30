import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
    //    Authorized redirect URIs - "http://localhost:3000"
    //  Step 14 - Click "Create"
    //  Step 15 - Copy and paste the Client ID and Client Secret to environment variables in your .env file
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {},
  async signIn({ profile }) {
    try {
      // Serverless function that will spin up a connection to our database server every time it is invoked
    } catch (error) {}
  },
});

export { handler as GET, handler as POST };
