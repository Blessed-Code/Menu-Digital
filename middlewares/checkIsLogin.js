function checkIsLoggedIn(req, res, next) {
    console.log(req.session.userId);

    if (!req.session.userId) {
        const error = 'Please login first!';
        res.redirect(`/login?error=${error}`);
    } else {
        next();
    }
}

module.exports = checkIsLoggedIn;