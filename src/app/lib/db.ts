import mongoose from "mongoose";

let isConnected: boolean = false; // Track the connection status

const connectionString = 'mongodb+srv://madegbenro908:59q5S9eb6bcFWoLp@cluster0.cxpgvz9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

export async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    isConnected = true;
    console.log('Connected to Database');
  } catch (error) {
    console.error('Failed to connect to Database:', error);
  }
}