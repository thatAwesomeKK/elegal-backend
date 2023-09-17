import jwt from "jsonwebtoken";
import cookieConfig from "../config/cookieConfig.js";

const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;

//Verify Refresh Token
export const verifyRefreshToken = async (req, res, next) => {
  try {
    const token = await req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ success: false, error: "Not Authorized" });
    }
    req.verify = jwt.verify(token, jwtRefreshSecret);
  } catch (error) {
    res.clearCookie("refreshToken", cookieConfig);
    return res.status(403).json({ success: false, error: "Not Authorized" });
  }
  next();
};

//Verify Access Token
export const verifyAccessToken = async (req, res, next) => {
  try {
    const token = await req.headers.accesstoken.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, error: "Not Authorized" });
    }
    req.verify = jwt.verify(token, jwtAccessSecret);
  } catch (error) {
    return res.status(401).json({ success: false, error: "Not Authorized" });
  }
  next();
};
