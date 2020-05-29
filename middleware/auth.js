const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const Admin = require('../models/Admin')
const Vendor = require('../models/Vendor')

module.exports = function (type) {
    return async (req, res, next) => {
        console.log("auth called")
        const token = req.header('x-auth-token')
        if (!token) {
            return res.status(401).json({
                success: "false",
                errors: [{
                    msg: 'No token, authorization denied'
                }]
            })
        }
        try {
            if (type === 'user') {
                const decoded = jwt.verify(token, config.get('jwtSecret'))
                if (!decoded.user) {
                    return res.status(403).json({
                        success: "false",
                        errors: [{
                            msg: 'Route not accessible.'
                        }]
                    })
                }
                const user = await User.findById(decoded.user.id)
                if (!user) {
                    return res.status(401).json({
                        success: false,
                        errors: [{
                            msg: "Token not valid"
                        }]
                    })
                }
                req.user = decoded.user
            }
            if (type === 'admin') {
                const decoded = jwt.verify(token, config.get('jwtSecret'))
                if (!decoded.admin) {
                    return res.status(403).json({
                        success: "false",
                        errors: [{
                            msg: 'Route not accessible.'
                        }]
                    })
                }
                const admin = await Admin.findById(decoded.admin.id)
                if (!admin) {
                    return res.status(401).json({
                        success: false,
                        errors: [{
                            msg: "Token not valid"
                        }]
                    })
                }
                req.admin = decoded.admin
            }
            if (type === 'vendor') {
                const decoded = jwt.verify(token, config.get('jwtSecret'))
                if (!decoded.vendor) {
                    return res.status(403).json({
                        success: "false",
                        errors: [{
                            msg: 'Route not accessible.'
                        }]
                    })
                }
                const vendor = await Vendor.findById(decoded.vendor.id)
                if (!vendor) {
                    return res.status(401).json({
                        success: false,
                        errors: [{
                            msg: "Token not valid"
                        }]
                    })
                }
                req.vendor = decoded.vendor
            }
            next()
        } catch (error) {
            res.status(401).json({
                success: false,
                errors: [{
                    msg: "Token not valid"
                }]
            })
        }
    }
}