// Function to prompt login if idle or logged out
const sessionAuth = (req, res, next) => {
  console.log("authorizing session")
    if (!req.session.user_id) {  // checks if the user is logged in or not
      res.redirect('/');
    } else {
      next();
    }
  };

module.exports = sessionAuth;