import { Strategy } from "passport-jwt";
import passport from "passport";

const cookieExtractor = (req) => {
  var token = null;
  if (req && req.signedCookies) token = req?.signedCookies["token"];
  return token;
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
        done("Unauthorized", false);
      }
      return done(null, jwt_payload);
    } catch (err) {
      done(err);
    }
  })
);
