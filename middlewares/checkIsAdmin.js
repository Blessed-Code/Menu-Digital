
function checkIsAdmin(req, res, next) {
    console.log(req.session.role);
    if (req.session.role !== "admin") {
        const error = 'Anda bukan admin!';
        res.redirect(`/order?error=${error}`);
    } else {
        next();
    }
}

module.exports = checkIsAdmin;