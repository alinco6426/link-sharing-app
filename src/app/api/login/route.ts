import { connectToDatabase } from '../../lib/db';
import User from '../../lib/UserModel';
import jwt from 'jsonwebtoken';

const secretKey = 'defaultSecretKey'; 

export async function POST(req: Request, res: Response) {
  await connectToDatabase();
  try {
    const { email, password } = await req.json();

    // Find the user by email
    const user = await User.findOne({ email: email }).select('+password');
    if (!user) {
      return new Response(JSON.stringify({
        status: "Not found",
        message: "Email not found",
      }), {
        headers: { 'Content-Type': 'application/json' },
        status: 404
      });
    }

    // Check if the password is correct
    const correctPassword = await user.checkPassword(password);
    if (!correctPassword) {
      return new Response(JSON.stringify({
        status: "Forbidden",
        message: "Password not correct",
      }), {
        headers: { 'Content-Type': 'application/json' },
        status: 403
      });
    }

    // If the user is verified successfully
    const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1d' });
    const userData = user.toObject();
    delete userData.password;

    return new Response(JSON.stringify({
      status: "Success",
      message: "User verified successfully",
      token: token,
      user: userData
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({
      status: "error",
      message: "An error occurred",
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
}
