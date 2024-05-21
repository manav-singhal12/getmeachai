import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDB from "@/db/connectDb";
 
export const POST = async (req) => {
    try {
        // Connect to the database
        await connectDB();

        // Parse form data
        let body = await req.formData();
        body = Object.fromEntries(body);

        // Check if razorpay_order_id is present in the server's database
        let payment = await Payment.findOne({ oid: body.razorpay_order_id });
        if (!payment) {
            return NextResponse.json({ success: false, message: "Order ID Not found" });
        }

        // Verify the payment using Razorpay's utility function
        let isVerified = validatePaymentVerification(
            {
                order_id: body.razorpay_order_id,
                payment_id: body.razorpay_payment_id
            },
            body.razorpay_signature,
            process.env.KEY_SECRET
        );

        if (isVerified) {
            // Update payment status in the database
            const updatedPayment = await Payment.findOneAndUpdate(
                { oid: body.razorpay_order_id },
                { done: true },
                { new: true }
            );

            // Return a response indicating successful payment and redirect URL
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`);
        } else {
            // Return a response indicating payment verification failure
            return NextResponse.json({ success: false, message: "Payment Verification Failed" });
        }
    } catch (error) {
        console.error("Error processing payment verification:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" });
    }
};
