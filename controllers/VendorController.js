const {
    check,
    validationResult
} = require('express-validator')
const Vendor = require('../models/Vendor')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const registerVendor = async (req, res) => {
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
        let vendor = await Vendor.findOne({
            email
        })
        if (vendor) {
            return res.status(400).json({
                success: false,
                errors: [{
                    msg: 'Vendor already exists'
                }]
            })
        }
        vendor = new Vendor({
            name,
            email,
            password,
        })
        const salt = await bcrypt.genSalt(10)
        vendor.password = await bcrypt.hash(password, salt)
        await vendor.save()
        const payload = {
            vendor: {
                id: vendor.id
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
exports.registerVendor = registerVendor