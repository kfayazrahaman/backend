import jwt from "jsonwebtoken";

async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    let isAuth = true;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      isAuth = false;
    }

    req.user = decoded;
    req.isAuth = isAuth;

    next();
  } catch (error) {
    console.log("Error authenticating token:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

export { authenticateToken };
