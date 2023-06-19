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
    let verifiedUser = jwt.verify(token, "six6"); // Change the secret key to match your desired key
    if (!verifiedUser) {
      throw new Error("Access Denied");
    }

    return verifiedUser;
  } catch (error) {
    throw new Error("Invalid Token");
  }
};

const verifyTokenF = async (token) => {
  if (!token) {
    throw new Error("Access Denied");
  }

  try {
    let verifiedUser = await jwt.verify(token, "forgotPass123");
    if (!verifiedUser) {
      throw new Error("Access Denied");
    }

    return verifiedUser;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Token has been expired");
    }
    throw new Error("Invalid Token");
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
