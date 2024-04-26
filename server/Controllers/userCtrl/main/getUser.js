const errGen = require("../../../config/errGen")
const userModel = require("../../../Models/userModel")


module.exports = async (req, res, next) => {
    try {
        const user = await userModel.find()
        return res.json({data:user[0], })
    } catch (error) {
        return next(errGen(error.message))
    }
}