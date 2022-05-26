const {User, MemberCard, Menu, Order, OrderMenu} = require("../models")
const finalPrice = require("../helpers/totalPrice")
const nodemailer = require('nodemailer');
require('dotenv').config()
const { Op } = require("sequelize")

class Controller {
    static index(req, res) {
        res.render('home')
    }

    static pageOrders(req, res){
        const UserId = req.session.userId
        let role = req.session.role;
        const {error} = req.query;
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
                console.log(member, finalPrice, role, error);
                res.render('orders', {member, finalPrice, role, error})
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static newOrder(req, res){
        const UserId = req.session.userId

        Order.create({UserId: +UserId, status: "uncompleted"})
            .then((order) => {
                res.redirect(`/order/${order.id}`)
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static pageMenu(req, res){
        const UserId = req.session.userId
        const { OrderId } = req.params
        let { err, search } = req.query
        let role = req.session.role;
        console.log(search)
        let option = {}

        if(search){
            option = {
                where: {
                    name: {
                        [Op.iLike]: `%${search}%`
                    }
                }
            }
        }
        
        Menu.findAll(option)
            .then((menus) => {
                res.render('menus', {menus, UserId, OrderId, err, role})
            })
            .catch((err) => {
                res.send(err)
            })
    }
    
    static createOrderMenu(req, res){
        const { OrderId } = req.params
        const { MenuId } = req.body

        OrderMenu.create({
            OrderId: +OrderId,
            MenuId: +MenuId
        })
            .then(() => {
                res.redirect(`/order/${OrderId}`)
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static updateOrder(req, res){
        const UserId = req.session.userId

        const { OrderId } = req.params

        let error;
        
        let memberType
        OrderMenu.findOne({
            where: {
                OrderId: +OrderId
            }
        })
            .then((orderMenu) => {
                if(!orderMenu){
                    error = true;
                    throw new Error("error");
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
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        type: 'OAuth2',
                        user: "bernarduuuus@gmail.com",
                        pass: "bernardus",
                        clientId: "300342072016-kgqpjgkc8n738uvf3evsje6feru3s0oo.apps.googleusercontent.com",
                        clientSecret: "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",
                        refreshToken: "1//04q7LeAk_iuQICgYIARAAGAQSNwF-L9IrI0C1L_XS_Q9auKFvYCA73SOhSc_JQMhzYfFAg6zYWQy29TwPoJL_5BuwId2Ore8rL5U"
                    }
                })

                let extraMsg = memberType === "Regular" ? `Upgrade membership kamu menjadi Gold untuk mendapatkan diskon sebesar 15%!` : `Jangan bosan-bosan belanja dimari yah!`

                let mailOptions = {
                    from: "bernarduuuus@gmail.com",
                    to: req.session.userEmail,
                    subject: 'Menu Digital Order Notif',
                    text: `Terimakasih sudah memesan melalui aplikasi MenuDigital\nMember anda saat ini ${memberType}!\n${extraMsg}`
                };
        
                transporter.sendMail(mailOptions, function(err, data) {
                    if (err) {
                        console.log("Error " + err);
                    } else {
                        console.log("Email sent successfully");
                    }
                })

                res.redirect(`/order`)
            })
            .catch((err) => {
                if (error) {
                    return res.redirect(`/order/${OrderId}/?err=err`)
                }
                res.send(err)
            })
    }

    static cancelOrder(req, res){
        const { OrderId } = req.params

        Order.destroy({
            where: {
                id: +OrderId
            }
        })
            .then(() => {
                res.redirect(`/order`)
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static updateMember(req, res){
        const UserId = req.session.userId
        
        MemberCard.update({type: "Gold"}, {
            where: {
                UserId: +UserId
            }
        })
            .then(() => {
                res.redirect('/order')
            })
            .catch((err) => {
                res.send(err)
            })
    }
}

module.exports = Controller;