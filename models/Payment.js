import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const PaymentSchema = new Schema({
  name: { type: String, required: true },
  to_user: { type: String, required: true },
  oid: { type: String, required: true },
  message: { type: String, required: true },
  amount: { type: Number, required: true },
  done: { type: Boolean, default: false },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Check if the model is already compiled and use it, otherwise define it
const Payment = models?.Payment || model("Payment", PaymentSchema);

export default Payment;
