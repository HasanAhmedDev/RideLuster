const User = require('../models/User')
const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {
    check,
    validationResult
} = require('express-validator')

const getAuthUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json({
            success: true,
            user
        })

    } catch (err) {
        console.error(err.message)
        res.status(500).json({
            success: false,
            errors: [{
                msg: "Server Error"
            }]
        })
    }
}

const authenticateUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
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
                success: false,
                errors: [{
                    msg: 'Invalid Credentials'
                }]
            })
        }
        const passcheck = await bcrypt.compare(password, user.password)
        if (!passcheck) {
            return res.status(400).json({
                success: false,
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

const getAuthAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id).select('-password')
        res.json({
            success: true,
            admin
        })

    } catch (err) {
        console.error(err.message)
        res.status(500).json({
            success: false,
            errors: [{
                msg: "Server Error"
            }]
        })
    }
}

const authenticateAdmin = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }
    const {
        email,
        password
    } = req.body
    try {
        let admin = await Admin.findOne({
            email
        })
        if (!admin) {
            return res.status(400).json({
                success: false,
                errors: [{
                    msg: 'Invalid Credentials'
                }]
            })
        }
        const passcheck = await bcrypt.compare(password, admin.password)
        if (!passcheck) {
            return res.status(400).json({
                success: false,
                errors: [{
                    msg: 'Invalid Credentials'
                }]
            })
        }
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

exports.getAuthUser = getAuthUser
exports.authenticateUser = authenticateUser
exports.getAuthAdmin = getAuthAdmin
exports.authenticateAdmin = authenticateAdmin