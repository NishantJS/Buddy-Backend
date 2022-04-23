import { config } from "dotenv";
import { Strategy } from "passport-facebook";
import passport from "passport";
import { _checkWithProvider as findUser } from "../controller/users.js";
import { _checkWithProvider as findSeller } from "../controller/sellers.js";
config({ path: "../.env" });

const setupFBStrategy = (role = "user") => {
  const callbackURL = `http://localhost:5000/v1/auth/facebook/${role}`;
  return async (_req, _res, next) => {
    passport.use(
      new Strategy(
        {
          clientID: process.env.FACEBOOK_0AUTH_CLIENT_ID,
          clientSecret: process.env.FACEBOOK_0AUTH_CLIENT_SECRET,
          callbackURL,
          profileFields: ["id", "email"],
        },
        async (_accessToken, _refreshToken, profile, cb) => {
          try {
            const email = profile.emails[0].value;
            const facebookId = profile.id;

            if (role === "user") {
              const token = await findUser({
                email,
                provider: { source: "facebookId", id: facebookId },
              });
              return cb(null, token);
            } else if (role === "seller") {
              const token = await findSeller({
                email,
                provider: { source: "facebookId", id: facebookId },
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

export { setupFBStrategy };
