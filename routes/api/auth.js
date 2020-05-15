const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const {
    check,
    validationResult
} = require('express-validator')
const AuthController = require('../../controllers/AuthController')

//@route GET api/auth
//@desc Get auth user
//@access Public
router.get('/', auth, AuthController.getAuthUser)


//@route POST api/auth
//@desc Authenticate and get token
//@access Public
router.post('/', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
], AuthController.authenticateUser)

module.exports = router