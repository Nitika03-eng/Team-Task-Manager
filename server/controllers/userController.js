import User from "../models/User.js";

// Sirf "Member" role waale users ko fetch karne ke liye
export const getTeamMembers = async (req, res) => {
  try {
    // Password ko exclude karke sirf members fetch kar rahe hain
    const members = await User.find({ role: "Member" }).select("-password"); 
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};