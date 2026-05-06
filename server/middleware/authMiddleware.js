import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    
    if (!token || token === "null" || token === "undefined") {
       return res.status(401).json({ message: "Token is invalid" });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    
    // Decoded data ko request mein save karein
    req.user = decodedData; 
    
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(401).json({ message: "Session expired, please login again" });
  }
};

export default authMiddleware;