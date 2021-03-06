const bcryptjs = require("bcryptjs");
const {User, MemberCard} = require("../models");
class AuthController {
    static showRegisterForm(req, res) {
        res.render('register');
    }

    static registerUser(req, res) {
        let {fullName, email, password, role} = req.body;

        let newUser = {fullName, email, password, role}

        if (role === "admin") {
            return User.create(newUser)
            .then(() => {
                return res.redirect("/login");
            })
            .catch(err => {
                if (err.name === "SequelizeValidationError") {
                    err = err.errors.map(e => e.message);
                }
                res.send(err);
            });
        } else {
            User.create(newUser)
            .then((data) => {
                let newMember = {
                    type: "Regular",
                    UserId: data.id
                }
                return MemberCard.create(newMember)
            })
            .then(() => {
                res.redirect("/login");
            })
            .catch(err => {
                if (err.name === "SequelizeValidationError") {
                    err = err.errors.map(e => e.message);
                }

                if (err.name === "SequelizeUniqueConstraintError") {
                    err = err.errors.map(e => e.message);
                }
                res.send(err);
            });
        }
    }

    static showLoginForm(req, res) {
        const {error} = req.query

        res.render('login', {error});
    }

    static loginUser(req, res) {
        const {fullName, password} = req.body;
        
        User.findOne({where: {fullName}})
        .then(user => {
            if (user) {
                const isValidPassword = bcryptjs.compareSync(password, user.password);

                req.session.userId = user.id
                req.session.userEmail = user.email
                req.session.role = user.role

                if (isValidPassword) {
                    if (user.role === "customer") {
                        return res.redirect(`/order`);
                    } else {
                        return res.redirect(`/admin`);
                    }
                } else {
                    const error = "invalid username/password"
                    return res.redirect(`/login?error=${error}`);
                }

            } else {
                const error = "invalid username/password"
                return res.redirect(`/login?error=${error}`);
            }
        })
        .catch(err => {
            res.send(err);
        });
    }

    static logoutUser(req, res) {
        req.session.destroy(err => {
            if (err) {
                res.send(err);
            } else {
                res.redirect('/login');
            }
        });
    }
}

module.exports = AuthController;