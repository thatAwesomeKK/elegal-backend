import jwt from "jsonwebtoken";
const EMAIL_PUB_KEY = process.env.EMAIL_PUB_KEY;
const FORGOT_PASS_PUB_KEY = process.env.FORGOT_PASS_PUB_KEY;

//Verify Confirm Email Token
export const verifyConfirmEmailToken = async (req, res, next) => {
  try {
    const token = await req.headers.authorization
    if (!token) {
      return res.status(401).json({ success: false, error: "Token Invalid" });
    }
    req.verify = jwt.verify(token, EMAIL_PUB_KEY);
  } catch (error) {
    return res.status(401).json({ success: false, error: "Token Invalid" });
  }
  next();
};

//Verify Forgot Password Token
export const verifyForgotPassToken = async (req, res, next) => {
  try {
    const token = await req.headers.authorization
    if (!token) {
      return res.status(401).json({ success: false, error: "Token Invalid" });
    }
    req.verify = jwt.verify(token, FORGOT_PASS_PUB_KEY);
  } catch (error) {
    return res.status(401).json({ success: false, error: "Token Invalid" });
  }
  next();
};
