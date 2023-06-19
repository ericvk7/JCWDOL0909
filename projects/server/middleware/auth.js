const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  if (!token) {
    throw new Error("Access Denied");
  }

  token = token.split(" ")[1];
  if (token === "null" || !token) {
    throw new Error("Access Denied");
  }

  try {
    let verifiedUser = jwt.verify(token, "six6");
    if (!verifiedUser) {
      throw new Error("Access Denied");
    }

    return verifiedUser;
  } catch (error) {
    throw new Error("Invalid Token");
  }
};

const verifyTokenF = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Access Denied" });
  }

  try {
    let verifiedUser = await jwt.verify(token, "forgotPass123");
    if (!verifiedUser) {
      return res.status(401).json({ error: "Access Denied" });
    }

    req.user = verifiedUser;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired" });
    }
    return res.status(401).json({ error: "Invalid Token" });
  }
};

const checkRole = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    let verifiedUser = verifyToken(token);
    if (verifiedUser.isAdmin) {
      return next();
    }
    return res.status(401).send("Access Denied, you're not an admin");
  } catch (error) {
    return res.status(401).send(error.message);
  }
};

module.exports = { verifyToken, verifyTokenF, checkRole };
