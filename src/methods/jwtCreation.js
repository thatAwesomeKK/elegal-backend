import jwt from "jsonwebtoken";

const PRIV_KEY = process.env.PRIVATE_KEY;
const EMAIL_PRIV_KEY = process.env.EMAIL_PRIV_KEY;
const FORGOT_PASS_PRIV_KEY = process.env.FORGOT_PASS_PRIV_KEY;

export const getAccessToken = (payload) => {
  const expiresIn = "1d";
  const signedToken = jwt.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });
  return signedToken;
};

export const getConfirmEmailToken = (userId) => {
  const payload = {
    id: userId,
  };
  const expiresIn = "10m";
  const signedToken = jwt.sign(payload, EMAIL_PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });
  return signedToken;
};

export const getForgotPassToken = (userId) => {
  const payload = {
    id: userId,
  };
  const expiresIn = "10m";
  const signedToken = jwt.sign(payload, FORGOT_PASS_PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });
  return signedToken;
};
