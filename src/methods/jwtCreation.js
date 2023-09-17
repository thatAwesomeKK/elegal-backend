import jwt from "jsonwebtoken";

const PRIV_KEY = process.env.PRIVATE_KEY

export const getAccessToken = (payload) => {
  const expiresIn = "1d";
  const signedToken = jwt.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });
  return signedToken;
};
