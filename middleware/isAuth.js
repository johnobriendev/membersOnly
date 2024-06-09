
// module.exports = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/auth/log-in');
// };


// middleware/authMiddleware.js

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/log-in');
};

// Middleware to check if the authenticated user is an admin
const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }
  res.redirect('/');
};

module.exports = {
  isAuthenticated,
  isAdmin,
};
