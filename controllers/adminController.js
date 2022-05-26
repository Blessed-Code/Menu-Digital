const {User, MemberCard, Menu, Order, OrderMenu} = require("../models")

class AdminController {
    static showAllMenus(req, res){
        Menu.findAll()
            .then((menus) => {
                res.render('adm-Menus', {menus})
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static formAddMenu(req, res){
        res.render('adm-AddMenu')
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
        Menu.findByPk(menuId)
            .then((menu) => {
                res.render('adm-edit', {menu})
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