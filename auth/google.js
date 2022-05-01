import { config } from "dotenv";
import { Strategy } from "passport-google-oauth20";
import passport from "passport";
import { _checkWithProvider as findUser } from "../controller/users.js";
import { _checkWithProvider as findSeller } from "../controller/sellers.js";
config({ path: "../.env" });

const setupGoogleStrategy = (role = "user") => {
  const callbackURL = `http://localhost:8080/v1/auth/google/${role}`;
  return async (_req, _res, next) => {
    passport.use(
      new Strategy(
        {
          clientID: process.env.GOOGLE_0AUTH_CLIENT_ID,
          clientSecret: process.env.GOOGLE_0AUTH_CLIENT_SECRET,
          callbackURL,
        },
        async (_req, _accessToken, _refreshToken, profile, cb) => {
          try {
            const email = profile.emails[0].value;
            const googleId = profile.id;

            if (role === "user") {
              const token = await findUser({
                email,
                provider: { source: "googleId", id: googleId },
              });
              return cb(null, token);
            } else if (role === "seller") {
              const token = await findSeller({
                email,
                provider: { source: "googleId", id: googleId },
              });
              return cb(null, token);
            } else throw new Error("Invalid role");
          } catch (error) {
            return cb(error, null);
          }
        }
      )
    );
    next();
  };
};

export { setupGoogleStrategy };
