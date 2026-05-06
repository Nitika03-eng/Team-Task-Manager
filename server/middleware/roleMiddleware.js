export const isAdmin = (req, res, next) => {
  // authMiddleware ne req.user set kar diya hai
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admin only." });
  }
};