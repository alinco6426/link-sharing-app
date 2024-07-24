import { connectToDatabase } from '../../lib/db';
import User from '../../lib/UserModel'; 

export async function POST(request: Request) {
  await connectToDatabase();
  try {
    const { email, password } = await request.json();

    const user = await User.findOne({ email: email });
    if (user) {
      return new Response(JSON.stringify({ message: "User exists" }), {
        headers: { 'Content-Type': 'application/json' },
        status: 403
      });
    }

    // Create a new user if they do not exist
    const newUser = new User({ email, password });
    await newUser.save();

    return new Response(JSON.stringify({ message: "User created" }), {
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
