const {
    check,
    validationResult
} = require('express-validator')
const User = require('../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const normalize = require('normalize-url')


const registerUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }
    const {
        firstname,
        lastname,
        email,
        password
    } = req.body
    try {
        let user = await User.findOne({
            email
        })
        if (user) {
            return res.status(400).json({
                success: false,
                errors: [{
                    msg: 'User already exists'
                }]
            })
        }
        const photo = normalize(
            gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            }), {
                forceHttps: true
            }
        );
        user = new User({
            firstname,
            lastname,
            email,
            password,
            photo
        })
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        await user.save()
        const payload = {
            user: {
                id: user.id
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

exports.registerUser = registerUser