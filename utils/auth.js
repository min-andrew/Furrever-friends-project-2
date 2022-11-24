const withAuth = (req, res, next) => {
    // If user is not logged in, redirected to login route
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;