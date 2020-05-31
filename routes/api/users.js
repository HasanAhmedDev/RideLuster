const express = require('express')
const router = express.Router()
const {
    check,
    validationResult
} = require('express-validator')
const UserController = require('../../controllers/UserController')

//@route POST api/users
//@desc Register user
//@access Public

router.post('/', [
    check('firstname', 'FirstName is required').not().isEmpty(),
    check('lastname', 'LastName is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 8 or more characters').isLength({
        min: 8
    })
], UserController.registerUser)

//@route GET api/users/getareas
//@desc Get areas of registered service stations
//@access Public
router.get('/getareas', UserController.getRegisteredAreas)

module.exports = router