const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const {
    check,
    validationResult
} = require('express-validator')
const AuthController = require('../../controllers/AuthController')

//@route GET api/auth/user
//@desc Get auth user
//@access Public
router.get('/user', auth('user'), AuthController.getAuthUser)


//@route POST api/auth/user
//@desc Authenticate and get token
//@access Public
router.post('/user', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
], AuthController.authenticateUser)

//@route GET api/auth/admin
//@desc Get auth admin
//@access Public
router.get('/admin', auth('admin'), AuthController.getAuthAdmin)


//@route POST api/auth/admin
//@desc Authenticate and get token
//@access Public
router.post('/admin', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
], AuthController.authenticateAdmin)


module.exports = router