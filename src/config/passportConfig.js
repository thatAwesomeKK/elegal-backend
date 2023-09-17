import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/User.js";

const PUB_KEY = process.env.PUBLIC_KEY

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

export default function (passport) {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await User.findOne({ _id: payload.id });
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(err, false);
      }
    })
  );
}
