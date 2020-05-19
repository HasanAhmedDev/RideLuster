const {
    check,
    validationResult
} = require('express-validator')
const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const registerAdmin = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }
    const {
        name,
        email,
        password
    } = req.body
    try {
        let admin = await Admin.findOne({
            email
        })
        if (admin) {
            return res.status(400).json({
                success: false,
                errors: [{
                    msg: 'Admin already exists'
                }]
            })
        }
        admin = new Admin({
            name,
            email,
            password
        })
        const salt = await bcrypt.genSalt(10)
        admin.password = await bcrypt.hash(password, salt)
        await admin.save()
        const payload = {
            admin: {
                id: admin.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err
            res.json({
                success: true,
                token
            })
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            errors: [{
                msg: "Server Error"
            }]
        })
    }

}
exports.registerAdmin = registerAdmin