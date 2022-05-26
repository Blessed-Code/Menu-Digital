
function checkIsCustomer(req, res, next) {
    console.log(req.session.role);
    if (req.session.role !== "customer") {
        const error = 'Anda bukan customer!';
        res.redirect(`/admin?error=${error}`);
    } else {
        next();
    }
}

module.exports = checkIsCustomer;