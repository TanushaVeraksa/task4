const bcrypt = require('bcrypt');
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')

const generateJwt = (id, email) => {
    return jwt.sign({id, email}, "SECRET_KEY", {
        expiresIn: '24h'
    })
}

class UserController {
    async registration(req, res, next) {
        const {email, name, password} = req.body;

        if(!email || !password) {
            return next("Unccorect email or password")
        }
        const candidate = await User.findOne({email: email});
        if(candidate) {
            return next(ApiError.badRequest("There is already a user with this email"))
        }
        const hashPass = await bcrypt.hash(password, 5);
        let date = new Date();
        let currentDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        const user = await User({email, name, password: hashPass, authorization: currentDate});
        await user.save();
        const token = generateJwt(user.id, user.email)
        return res.json({token})
    }
    async login(req, res, next) {
        const {email, password} = req.body;
        const user = await User.findOne({email: email})
        if(!user) {
            return next(ApiError.internal("User is not found"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword) {
            return next(ApiError.internal("You input unccorect password"))
        }
        if(user.block === 'Block') {
            return next(ApiError.internal("You are blocked"))
        }
        let date = new Date();
        let currentDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        await User.findOneAndUpdate({email: email}, {authorization: currentDate})
        const token = generateJwt(user.id, user.email)
        return res.json({token});
    }
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email)
        const candidate = await User.findOne({_id: req.user.id});
        return res.json({token})
    }
    async isBlock(req, res) {
        const {id} = req.body;
        const candidate = await User.findOne({_id: id})
        if(candidate.block === "Block") {
           return res.send('true')
        } else {
           return res.send('false')
        }
    }
}

module.exports = new UserController();