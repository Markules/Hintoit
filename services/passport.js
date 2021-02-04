const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
const gravatar = require("gravatar");


const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOneAndUpdate({ googleId: profile.id} , 
        {$set: {userToken: accessToken } });

      if (existingUser) {
        return done(null, existingUser);
      } 
      const avatar = gravatar.url(profile._json.email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

        const user = await new User({ googleId: profile.id, email: profile._json.email, firstName: profile.name.givenName, lastName: profile.name.familyName, userImage: profile.photos[0].value, userToken: accessToken, avatar }).save()
        done(null, user);
      }
  )
);
