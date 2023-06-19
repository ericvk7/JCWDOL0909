// Verify Token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, "your_secret_key_here");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

// Check Role
const checkRole = (requiredRole) => (req, res, next) => {
  const { role } = req.user;

  if (role !== requiredRole) {
    return res.status(403).json({
      success: false,
      message: "Insufficient permissions",
    });
  }

  next();
};

module.exports = { verifyToken, checkRole, authTokenF };
