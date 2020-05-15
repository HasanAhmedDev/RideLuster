const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {
    check,
    validationResult
} = require('express-validator')

const getAuthUser = async (req, res) => {
    try {
        const user = await (await User.findById(req.user.id).select('-password'))
        res.json(user)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')

    }
}

const authenticateUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const {
        email,
        password
    } = req.body
    try {
        let user = await User.findOne({
            email
        })
        if (!user) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid Credentials'
                }]
            })
        }
        const passcheck = await bcrypt.compare(password, user.password)
        if (!passcheck) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid Credentials'
                }]
            })
        }
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
                token
            })
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }

}

exports.getAuthUser = getAuthUser
exports.authenticateUser = authenticateUser