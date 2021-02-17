const passport = require("passport");


// @route GET api/auth/google
// @desc google Oauth route
// access Public 

module.exports = (app) => {
  app.get(
    "auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "auth/google/callback",
   passport.authenticate("google"),
   (req, res) => {
     res.redirect('/');
   }
   );

// @route GET api/auth/logout
// @desc logout user
// access Private

app.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect("/login");
})

// @route GET api/auth/current_user
// @desc fetch user data 
// access Private
  app.get('/api/current_user', (req, res) =>{
    let loginParams = {
      id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      userToken: req.user.userToken,
      gifts: req.user._gifts,
      following: req.user.following,
      followers: req.user.followers,
      avatar: req.user.avatar
    }
    res.send(loginParams);
  });
};