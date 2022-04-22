import { config } from "dotenv";
import { Strategy } from "passport-jwt";
import passport from "passport";
config({ path: "../.env" });

const cookieExtractor = (req) => {
  return req?.signedCookies ? req.signedCookies["token"] : null;
};

const opt = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(opt, (jwt_payload, done) => {
    try {
      const { expiration } = jwt_payload;
      if (Date.now() > expiration) {
        return done("Unauthorized", false);
      }
      return done(null, jwt_payload);
    } catch (err) {
      return done(err);
    }
  })
);
