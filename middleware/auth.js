const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (type) {
    return (req, res, next) => {
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
                req.admin = decoded.admin
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