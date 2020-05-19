const express = require('express')
const router = express.Router()
const {
    check,
    validationResult
} = require('express-validator')
const AdminController = require('../../controllers/AdminController')

//@route POST api/admins
//@desc Register admin
//@access Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 8 or more characters').isLength({
        min: 8
    })
], AdminController.registerAdmin)

module.exports = router