const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
   passport.authenticate("google"),
   (req, res) => {
     res.redirect('/');
   }
   );

app.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect("/login");
})

  app.get('/api/current_user', (req, res) =>{
    let loginParams = {
      id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      userToken: req.user.userToken,
      gifts: req.user._gifts,
      following: req.user.following,
      followers: req.user.followers,
      image: req.user.profileImage,
      likes: req.user.likes
    }
    res.send(loginParams);
  });
};