const User = require('../models/User')

class ControlController {
    async getAll(req, res) {
        const users = await User.find({});
        res.json(users);
    }
    async delete(req, res) {
        const {email} = req.body; 
        await User.deleteOne({email: email});
        res.json({message: "User deleted"});
    }
    async block(req, res) {
        const {email} = req.body; 
        await User.findOneAndUpdate({email: email}, {block: "Block"});
        res.json({message: "User blocked"});
    }
    async unblock(req, res) {
        const {email} = req.body; 
        await User.findOneAndUpdate({email: email}, {block: "Unblock"});
        res.json({message: "User unblocked"});
    }
}

module.exports = new ControlController();