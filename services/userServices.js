const User = require("../models/User");


  // Create and Save a new user
  exports.create = (req, res) => {};

  // Retrieve and return all users from the database.
  exports.fetchAllUsers = async () => {
    
    const user = await new User.find({}, (err, user) => {
    if(err){
        console.log(err)
    } else {
        return user;
    }
  });
}

  // Find a single user with a userId



  // Update a user identified by the userId in the request
  exports.update = (req, res) => {};

  // Delete a user with the specified userId in the request
  exports.delete = (req, res) => {};

