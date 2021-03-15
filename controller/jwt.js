import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";

const opt = {};
opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opt.secretOrKey = process.env.JWT_SECRET;

passport.use(
  new Strategy(opt, (jwt_payload, done) => {
    try {
      return done(null, jwt_payload);
    } catch (err) {
      done(err);
    }
  })
);
