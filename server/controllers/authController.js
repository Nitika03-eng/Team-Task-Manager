import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Signup Function
export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    
    // User create karte waqt role ko handle karna
    const result = await User.create({ 
      email, 
      password: hashedPassword, 
      name, 
      role: role || 'employee' 
    });

    // TOKEN MEIN ROLE DAALNA ZAROORI HAI (Fix for Access Denied)
    const token = jwt.sign(
      { email: result.email, id: result._id, role: result.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" } // 1h se badha kar 7d kar diya taaki jaldi expire na ho
    );

    res.status(201).json({ result, token });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Something went wrong during signup" });
  }
};

export const register = signup;

// Login Function
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    // TOKEN MEIN ROLE DAALNA ZAROORI HAI (Fix for Access Denied)
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id, role: existingUser.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Something went wrong during login" });
  }
};