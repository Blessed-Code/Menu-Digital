const {User, MemberCard, Menu, Order, OrderMenu} = require("../models")

class AdminController {
    static showAllMenus(req, res){
        let role = req.session.role;
        const {error} = req.query
        Menu.findAll()
            .then((menus) => {
                res.render('adm-Menus', {menus, role, error})
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static formAddMenu(req, res){
        let role = req.session.role;
        res.render('adm-AddMenu', {role})
    }
    static addMenu(req, res){
        const {name, imageUrl, price, category} = req.body
        const input = {
            name,
            imageUrl,
            price,
            category
        }
        Menu.create(input)
            .then(() => {
                res.redirect('/admin')
            })
            .catch(err => {
                if (err.name === "SequelizeValidationError") {
                    err = err.errors.map(e => e.message);
                }
                res.send(err);
            });
    }
    static formEditMenu(req, res){
        const { menuId } = req.params
        let role = req.session.role;
        Menu.findByPk(menuId)
            .then((menu) => {
                res.render('adm-edit', {menu, role})
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static updateMenu(req, res){
        const { menuId } = req.params
        const {name, imageUrl, price, category} = req.body
        const input = {
            name,
            imageUrl,
            price,
            category
        }
        Menu.update(input, {
            where: {
                id: +menuId
            }
        })
            .then(() => {
                res.redirect('/admin')
            })
            .catch(err => {
                if (err.name === "SequelizeValidationError") {
                    err = err.errors.map(e => e.message);
                }
                res.send(err);
            });
    }

    static deleteMenu(req, res){
        const { menuId } = req.params

        Menu.destroy({
            where: {
                id: +menuId
            }
        })
            .then(() => {
                res.redirect('/admin')
            })
            .catch((err) => {
                res.send(err)
            })
    }
}

module.exports = AdminController