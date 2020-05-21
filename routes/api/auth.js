const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const {
    check,
    validationResult
} = require('express-validator')
const AuthController = require('../../controllers/AuthController')

// User Routes

//@route GET api/auth/user
//@desc Get auth user
//@access Private
router.get('/user', auth('user'), AuthController.getAuthUser)


//@route POST api/auth/user
//@desc Authenticate and get token
//@access Public
router.post('/user', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
], AuthController.authenticateUser)

//@route PUT api/auth/user/updatedetails
//@desc Update user details
//@access Private
router.put('/user/updatedetails', [
    check('firstname', 'FirstName is required').not().isEmpty(),
    check('lastname', 'LastName is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail()
], auth('user'), AuthController.updateUserDetails)

//@route PUT api/auth/user/updatepassword
//@desc Update user password
//@access Private
router.put('/user/updatepassword', [check('currentPassword', 'Current Password is required').exists(), check('newPassword', 'Please enter a password with 8 or more characters').isLength({
    min: 8
})], auth('user'), AuthController.updateUserPassword)

//@route PUT api/auth/user/updatepassword
//@desc Update user password
//@access Private
router.put('/user/uploadphoto', auth('user'), AuthController.uploadUserPhoto)



// Admin Routes

//@route GET api/auth/admin
//@desc Get auth admin
//@access Private
router.get('/admin', auth('admin'), AuthController.getAuthAdmin)


//@route POST api/auth/admin
//@desc Authenticate and get token
//@access Public
router.post('/admin', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
], AuthController.authenticateAdmin)

//@route GET api/auth/admin/getusers
//@desc Get all registred users
//@access Private
router.get('/admin/getusers', auth('admin'), AuthController.getAllUsers)

//@route DELETE api/auth/admin/deleteuser/:id
//@desc Delete user with id
//@access Private
router.delete('/admin/deleteuser/:id', auth('admin'), AuthController.delUserById)



// Vendor Routes

//@route GET api/auth/vendor
//@desc Get auth vendor
//@access Private
router.get('/vendor', auth('vendor'), AuthController.getAuthVendor)

//@route POST api/auth/vendor
//@desc Authenticate and get token
//@access Public
router.post('/vendor', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
], AuthController.authenticateVendor)

//@route PUT api/auth/vendor/updatedetails
//@desc Update vendor details
//@access Private
router.put('/vendor/updatedetails', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail()
], auth('vendor'), AuthController.updateVendorDetails)

//@route PUT api/auth/vendor/updatepassword
//@desc Update user password
//@access Private
router.put('/vendor/updatepassword', [check('currentPassword', 'Current Password is required').exists(), check('newPassword', 'Please enter a password with 8 or more characters').isLength({
    min: 8
})], auth('vendor'), AuthController.updateVendorPassword)

module.exports = router