import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name cannot be empty.'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'email cannot be empty.'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'username cannot be empty.'],
  },
  password: {
    type: String,
    required: [true, 'password cannot be empty.'],
  },
}, { timestamps: true })

export default mongoose.models.User || mongoose.model('User', UserSchema)
