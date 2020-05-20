const express = require('express')
const router = express.Router()
const {
    check,
    validationResult
} = require('express-validator')
const VendorController = require('../../controllers/VendorController')


//@route POST api/vendors
//@desc Register vendor
//@access Public

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 8 or more characters').isLength({
        min: 8
    })
], VendorController.registerVendor)

module.exports = router