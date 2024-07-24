import mongoose  from "mongoose";


const connectionString  : string = 'mongodb+srv://madegbenro908:59q5S9eb6bcFWoLp@cluster0.cxpgvz9.mongodb.net/_link_sharing_app?retryWrites=true&w=majority&appName=Cluster0st:27017/_link_sharing_app';

let isConnected : boolean = false; // Track the connection status

export async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(connectionString);
    isConnected = true;
    console.log('Connected to Database');
  } catch (error) {
    console.error('Failed to connect to Database:', error);
  }
}
