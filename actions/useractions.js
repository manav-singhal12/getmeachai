"use server";
import Razorpay from 'razorpay';
import Payment from '@/models/Payment';
import connectDB from '@/db/connectDb';
import User from '@/models/User';
import { notFound } from 'next/navigation';
export const initiate = async (amount, to_username, paymentform) => {
  await connectDB();

  // Ensure environment variables are available
  if (!process.env.NEXT_PUBLIC_KEY_ID || !process.env.KEY_SECRET) {
    throw new Error('Razorpay API keys not found in environment variables.');
  }

  const instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  const options = {
    amount: Number.parseInt(amount) * 100, // Razorpay expects amount in paise
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
    notes: {
      key1: 'value3',
      key2: 'value2',
    },
  };

  try {
    const x = await instance.orders.create(options);
    console.log('Order created:', x);

    // Pending payments in database
    await Payment.create({
      oid: x.id,
      amount: amount,
      to_user: to_username,
      name: paymentform.name,
      message: paymentform.message,
    });

    return x;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw new Error('Order creation failed');
  }
};

export const fetchuser = async (username) => {
  await connectDB();
  const u = await User.findOne({ username: username });
  const user = u.toObject({ flattenObjectIds: true });
  return user;
};

export const fetchpayments = async (username) => {
  await connectDB();
  // find all payments sorted by decreasing order of amount and flatten objects
  const p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).limit(10).lean();
  return p;
};

export const updateProfile = async (data, oldusername) => {
  await connectDB(); // Ensure database connection is established

  // Check if username is being updated and if it's available
  if (data.username && data.username !== oldusername) {
    const existingUser = await User.findOne({ username: data.username });
    if (existingUser) {
      return { error: "Username already exists" };
    }
    
  }

  // Update user profile
  const updatedUser = await User.updateOne({ email: data.email }, data);

  if (updatedUser.nModified === 0) {
    return { error: "Profile update failed" };
  }

  return { success: true, data: updatedUser };
};
