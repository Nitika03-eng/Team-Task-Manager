import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"] 
  },
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    unique: true 
  },
  password: { 
    type: String, 
    required: [true, "Password is required"] 
  },
  role: { 
    type: String, 
    enum: ["Admin", "Member"], 
    default: "Member" 
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;