const {User, MemberCard, Menu, Order, OrderMenu} = require("../models")
const finalPrice = require("../helpers/totalPrice")

class Controller {
    static index(req, res) {
        // console.log(req.query)
        const { email } = req.query

        if(!email){
            res.render('home')
        }

        // User.findOne({
        //     where: {
        //         email: email
        //     }
        // })            
        //     .then((user) => {
        //         res.redirect(`/${user.id}/order`)
        //     })
        //     .catch((err) => {
        //         res.send(err)
        //     })
    }

    static pageOrders(req, res){
        // console.log(req.params)
        const { UserId } = req.params
        const { memberCard } = req.query

        const option = {
            where: {
                UserId: +UserId
            },
            include: {
                model: User,
                include: {
                    model: Order,
                    include: {
                        model: Menu
                    }
                }
            }
        }

        MemberCard.findOne(option)
            .then((member) => {
                if(memberCard){
                    MemberCard.update({type: "Gold"}, {
                        where: {
                            UserId: +UserId
                        }
                    })
                }
                res.render('orders', {member, UserId, finalPrice})
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static newOrder(req, res){
        const { UserId } = req.params

        Order.create({UserId: +UserId, status: "uncompleted"})
            .then((order) => {
                res.redirect(`/${UserId}/order/${order.id}`)
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static pageMenu(req, res){
        const { UserId, OrderId } = req.params
        let { err, category } = req.query
        // console.log(err)
        let option = {}

        if(category){
            option = {
                where: {
                    category
                }
            }
        }
        
        Menu.findAll(option)
            .then((menus) => {
                res.render('menus', {menus, UserId, OrderId, err})
            })
            .catch((err) => {
                res.send(err)
            })
    }
    
    static createOrderMenu(req, res){
        const { UserId, OrderId } = req.params
        const { MenuId } = req.body

        OrderMenu.create({
            OrderId: +OrderId,
            MenuId: +MenuId
        })
            .then(() => {
                res.redirect(`/${UserId}/order/${OrderId}`)
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static updateOrder(req, res){
        const { UserId, OrderId } = req.params
        const err = `You have to order first to checkout`
        
        let memberType
        OrderMenu.findOne({
            where: {
                OrderId: +OrderId
            }
        })
            .then((orderMenu) => {
                if(!orderMenu){
                    res.redirect(`/${UserId}/order/${OrderId}/?err=${err}`)
                }
                return MemberCard.findOne({
                    where: {
                        UserId: +UserId
                    }
                })
            })
            .then((member) => {
                memberType = member.type

                return Order.findByPk( +OrderId, {
                    include: Menu
                })
            })
            .then((order) =>{
                let sumPrice = 0
                order.Menus.map((el) => {
                    sumPrice += el.price
                })
                sumPrice = Order.priceByMember(sumPrice, memberType)

                return Order.update({status: "completed", totalPrice: sumPrice}, {
                    where: {
                        id: +OrderId
                    }
                })
            })
            .then(() => {
                res.redirect(`/${UserId}/order`)
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static cancelOrder(req, res){
        const { UserId, OrderId } = req.params

        Order.destroy({
            where: {
                id: +OrderId
            }
        })
            .then(() => {
                res.redirect(`/${UserId}/order`)
            })
            .catch((err) => {
                res.send(err)
            })
    }
}

module.exports = Controller;