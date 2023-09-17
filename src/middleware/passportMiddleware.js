import passport from "passport";
import passportConfig from "../config/passportConfig.js";

passportConfig(passport);

export default async function (req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    req.user = user;
    return next();
  })(req, res, next);
}
