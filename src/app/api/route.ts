import { connectToDatabase } from '../lib/db';
import User from '../lib/UserModel'; 

export async function GET() {
    await connectToDatabase();
    
  try {
    const allUsers = await User.find();
    return new Response(JSON.stringify(allUsers), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({
      status: "error",
      message: "Internal server error"
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
}
