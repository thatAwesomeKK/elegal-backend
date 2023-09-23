const cookieConfig = {
  sameSite: process.env.NODE_ENV === "production" ? "none" : false,
  secure: process.env.NODE_ENV === "production" ? true : false,
  domain: process.env.COOKIE_DOMAIN,
  httpOnly: true,
};
export default cookieConfig;
