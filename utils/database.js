import mongoose from "mongoose";

let isConnected = false; // track the connection status

// To set up MongoDB:
//
// Step 01 - Navigate to https://www.mongodb.com/atlas/ and either sign in with your Google account or try free
// Step 02 - Create a new MongoDB cluster - Let's use the free M0 cluster for this example
// Step 03 - Click "Create"
// Step 04 - On the left-hand menu, navigate to "Database Access"
// Step 05 - Click "Add New Database User" to define a username and password
//  Username - "promptopia-demo"
//  Password - <Autogenerate Secure Password> - "MFs3odLqwm4COlnn"
// Step 06 - Select the "Built-in Role" so the user can "Read and write to any database"
// Step 07 - Click "Add User"
// Step 08 - IMPORTANT! On the left-hand menu, navigate to "Network Access"
// Step 09 - Click "Add current IP address"
// Step 10 - Click "Add IP Address" and then select "Allow access from anywhere"
// Step 11 - On the left-hand menu, navigate to "Database" and click "Connect" for your cluster
// Step 12 - Click "Drivers" and you should see the full URI to connect
//  Make sure you change <password> in the MongoDB URI to be the password for your account

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
};
