import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fname: { type: String, required: true },
    surname:{ type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone:{type: Number, required: true },
    residence:{type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
