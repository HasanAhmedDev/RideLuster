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

//@route PUT api/auth/user/uploadphoto
//@desc Upload user photo
//@access Private
router.put('/user/uploadphoto', auth('user'), AuthController.uploadUserPhoto)

//@route POST api/booking/user
router.post('/user/bookService', [
    check('vehicleType', 'Vehicle Type is required').not().isEmpty(),
    check('vehicleMake', 'Vehicle Make is required').not().isEmpty(),
    check('vehicleModel', 'Vehicle Model is required').not().isEmpty(),
    check('vehicleNo', 'Vehicle Number is required').not().isEmpty(),
    check('serviceType', 'Service Type is required').not().isEmpty(),
    check('contactNo', 'Contact Number is required').not().isEmpty(),
    check('serviceStationId', 'Service ID is required').not().isEmpty(),
], auth('user'), AuthController.bookService);

//@route GET api/auth/user/searchservicestation
//@desc Get service stations
//@access Private
router.get('/user/searchservicestation', auth('user'), AuthController.searchserviceStation)



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

//@route GET api/auth/admin/getservicestations
//@desc Get all approved registred service stations
//@access Private
router.get('/admin/getservicestations', auth('admin'), AuthController.getAllServiceStations)

//@route PUT api/auth/admin/approveservicestation/:id
//@desc Approve a service station by id
//@access Private
router.put('/admin/approveservicestation/:id', auth('admin'), AuthController.approveServiceStationById)

//@route GET api/auth/admin/getallrequest
//@desc Get all requests of service station
//@access Private
router.get('/admin/getallrequests', auth('admin'), AuthController.getAllRequests)

//@route DELETE api/auth/admin/deleteservicestation/:id
//@desc Delete service station with id
//@access Private
router.delete('/admin/deleteservicestation/:id', auth('admin'), AuthController.delServiceStationById)

// Vendor Routes

//@route GET api/auth/vendor
//@desc Get auth vendor
//@access Private
router.get('/vendor', AuthController.getAuthVendor)

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

//@route POST api/auth/vendor/addservicestation
//@desc Add service station
//@access Public
router.post('/vendor/addservicestation', auth('vendor'), AuthController.addServiceStation)

//@route PUT api/auth/vendor/closeservicestation
//@desc Update user password
//@access Private
router.put('/vendor/closeservicestation', auth('vendor'), AuthController.closeServiceStation)

//@route PUT api/auth/vendor/uploadservicestationphoto
//@desc Upload service station photo
//@access Private
router.put('/vendor/uploadservicestationphoto', auth('vendor'), AuthController.uploadServiceStationPhoto)

//@route GET api/auth/vendor/getUnhandledBookings
router.get('/vendor/getUnhandledBookings', auth('vendor'), AuthController.getUnhandledBookings);

//@route POST api/auth/vendor/handleBookingRequest
router.post('/vendor/handleRequest', [
    check('approved', 'Approval is required').not().isEmpty(),
    check('bookingId', 'Booking is required').not().isEmpty()
], auth('vendor'), AuthController.handleBookingRequest);

router.post('/vendor/updateProcess', auth('vendor'), AuthController.updateProcess);

module.exports = router