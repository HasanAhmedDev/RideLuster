const User = require('../models/User');
const Admin = require('../models/Admin');
const Vendor = require('../models/Vendor');
const Booking = require('../models/Booking');
const ServiceStation = require('../models/ServiceStation');
const socketio = require('../socket.io/socket');
const userSocket = require('../socket.io/user');
const vendorSocket = require('../socket.io/vendor');
const notifications = require('../models/Notifications');
const sendEmail = require('../utils/sendEmail')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {
  check,
  validationResult
} = require('express-validator');
const {
  v4: uuidv4
} = require('uuid');
const path = require('path');
const fs = require('fs');


// User Routes Functions

const getAuthUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      errors: [{
        msg: 'Server Error',
      }, ],
    });
  }
};

const authenticateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  const {
    email,
    password
  } = req.body;
  try {
    let user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        errors: [{
          msg: 'Invalid Credentials',
        }, ],
      });
    }
    const passcheck = await bcrypt.compare(password, user.password);
    if (!passcheck) {
      return res.status(400).json({
        success: false,
        errors: [{
          msg: 'Invalid Credentials',
        }, ],
      });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      config.get('jwtSecret'), {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      errors: [{
        msg: 'Server Error',
      }, ],
    });
  }
};

const updateUserDetails = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  const fieldstoupdate = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req.user.id, fieldstoupdate, {
    new: true,
    runValidators: true,
  }).select('-password');
  res.status(200).json({
    success: true,
    user,
  });
};

const updateUserPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  if (req.body.currentPassword == req.body.newPassword) {
    return res.status(400).json({
      success: false,
      errors: [{
        msg: 'Current and New Password cannot be same!',
      }, ],
    });
  }
  const user = await User.findById(req.user.id);
  const passcheck = await bcrypt.compare(
    req.body.currentPassword,
    user.password
  );
  if (!passcheck) {
    return res.status(400).json({
      success: false,
      errors: [{
        msg: 'Invalid Credentials',
      }, ],
    });
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.newPassword, salt);
  await user.save();
  const newuser = await User.findById(user._id).select('-password');
  res.status(200).json({
    success: true,
    user: newuser,
  });
};

const uploadUserPhoto = async (req, res) => {
  console.log("called")
  if (!req.files) {
    return res.status(400).json({
      success: false,
      errors: [{
        msg: 'Please upload an image.',
      }, ],
    });
  }
  const file = req.files.file;
  if (!file.mimetype.startsWith('image')) {
    return res.status(400).json({
      success: false,
      errors: [{
        msg: 'Please upload an image file.',
      }, ],
    });
  }
  if (file.size > config.get('maxPhotoSize')) {
    return res.status(400).json({
      success: false,
      errors: [{
        msg: `Please upload an image less than ${
            config.get('maxPhotoSize') / 1000000
          } mb`,
      }, ],
    });
  }
  file.name = `photo_${uuidv4()}${path.parse(file.name).ext}`;
  file.mv(`${config.get('fileUploadUser')}/${file.name}`, async (err) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({
        success: false,
        errors: [{
          msg: 'Problem with image upload',
        }, ],
      });
    }
  });
  const user = await User.findById(req.user.id).select('-password');
  if (!user.photo.startsWith('//www')) {
    const del = `${config.get('fileUploadUser')}/${user.photo}`;
    fs.unlink(del, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }

  user.photo = file.name;
  await user.save();
  res.status(200).json({
    success: true,
    user
  });
};

const BookService = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  const {
    vehicleType,
    vehicleMake,
    vehicleModel,
    vehicleNo,
    contactNo,
    serviceType,
    serviceStationId,
    createdAt
  } = req.body;
  try {
    let booking = await Booking.findOne({
      vehicleType,
      vehicleMake,
      vehicleModel,
      vehicleNo,
      contactNo,
      serviceType,
      client: req.user.id,
      serviceStation: serviceStationId,
      isApproved: false
    });
    if (booking) {
      return res.status(400).json({
        success: false,
        msg: "Booking Already Exist"
      })
    }
    let serviceStation = await ServiceStation.findById(serviceStationId);
    if (!serviceStation) {
      return res.status(400).json({
        success: false,
        errors: [{
          msg: "Service Station does not exist"
        }]
      });
    }
    if (serviceStation.status === 'Closed') {
      return res.status(400).json({
        success: false,
        errors: [{
          msg: "Service Station is closed"
        }]
      });
    }
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        errors: [{
          msg: "User did not recognize, You need to sign in again"
        }]
      });
    }
    booking = new Booking({
      vehicleType,
      vehicleMake,
      vehicleModel,
      vehicleNo,
      serviceType,
      contactNo,
      client: req.user.id,
      serviceStation: serviceStationId,
      createdAt
    });
    await booking.save();
    let notify = new notifications({
      senderID: req.user.id,
      receiverID: serviceStation.owner,
      payload: [{
        id: 200,
        msg: `New Booking from Client`,
        booking: booking
      }]
    });
    await notify.save();
    vendorSocket.sendNotificationToVendor(notify);
    return res.status(200).json({
      success: true,
      bookingRequestAt: booking.createdAt,
      msg: "Request sent successfully!"
    });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      errors: [{
        msg: "Server Error"
      }]
    });
  }
}

const searchServiceStation = async (req, res) => {
  try {
    let query = {
      area: req.body.area,
      approved: 'true'
    };
    if (!req.body.area) {
      return res.status(400).json({
        success: false,
        error: [{
          msg: "Invalid Search"
        }]
      })
    }
    let pageNo = +req.body.page
    if (!pageNo || pageNo == 0) {
      pageNo = 1
    }
    var options = {
      sort: {
        date: -1
      },
      populate: {
        path: 'owner',
        select: 'name email createdAt',
      },
      page: pageNo,
      limit: +config.get('perPage')
    };
    ServiceStation.paginate(query, options, function (err, result) {
      if (err) {
        throw err
      }
      if (result.docs.length == 0) {
        return res.status(404).json({
          success: false,
          errors: [{
            msg: "No Service Station Found"
          }]
        })
      }
      res.status(200).json({
        success: true,
        docs: result.docs,
        totaldocs: result.totalDocs,
        page: result.page,
        totalpages: result.totalPages,
        hasnext: result.hasNextPage,
        nextpage: result.nextPage,
        hasprev: result.hasPrevPage,
        prevpage: result.prevPage,
      })
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: [{
        msg: "Server Error"
      }]
    });
  }
}

const getCompletedBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      isCompleted: 'true',
      client: req.user.id
    })
    if (bookings.length == 0) {
      return res.status(404).json({
        success: false,
        errors: [{
          msg: "No Bookings found."
        }]
      })
    }
    res.status(200).json({
      success: true,
      bookings
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      errors: [{
        msg: "Server Error"
      }]
    });
  }
}

// Admin Routes Funtions

const getAuthAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    res.json({
      success: true,
      admin,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      errors: [{
        msg: 'Server Error',
      }, ],
    });
  }
};

const authenticateAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  const {
    email,
    password
  } = req.body;
  try {
    let admin = await Admin.findOne({
      email,
    });
    if (!admin) {
      return res.status(400).json({
        success: false,
        errors: [{
          msg: 'Invalid Credentials',
        }, ],
      });
    }
    const passcheck = await bcrypt.compare(password, admin.password);
    if (!passcheck) {
      return res.status(400).json({
        success: false,
        errors: [{
          msg: 'Invalid Credentials',
        }, ],
      });
    }
    const payload = {
      admin: {
        id: admin.id,
      },
    };
    jwt.sign(
      payload,
      config.get('jwtSecret'), {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      errors: [{
        msg: 'Server Error',
      }, ],
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    if (users.length == 0) {
      return res.status(400).json({
        success: false,
        errors: [{
          msg: 'No users registered.',
        }, ],
      });
    }
    return res.status(200).json({
      success: true,
      users
    })
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      errors: [{
        msg: 'Server Error',
      }, ],
    });
  }
}

const delUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({
        success: false,
        errors: [{
          msg: 'User not found',
        }, ],
      });
    }
    if (!user.photo.startsWith('http')) {
      const del = `${config.get('fileUploadUser')}/${user.photo}`;
      fs.unlink(del, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }
    await user.remove()
    return res.status(200).json({
      success: true,
      user: []
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      errors: [{
        msg: 'Server Error',
      }, ],
    });
  }
}

const getAllServiceStations = async (req, res) => {
  try {
    const allss = await ServiceStation.find({
      "approved": "true"
    }).populate({
      path: 'owner',
      select: 'name email'
    })
    if (allss.length == 0) {
      return res.status(404).json({
        success: false,
        errors: [{
          msg: 'No service station registered.',
        }, ],
      });
    }
    return res.status(200).json({
      success: true,
      servicestations: allss
    })
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      errors: [{
        msg: 'Server Error',
      }, ],
    });
  }
}

const approveServiceStationById = async (req, res) => {
  try {
    const fieldstoupdate = {
      approved: true
    }
    const ss = await ServiceStation.findByIdAndUpdate(req.params.id, fieldstoupdate, {
      new: true,
      runValidators: true
    }).populate({
      path: 'owner',
      select: 'name email'
    })
    if (!ss) {
      return res.status(404).json({
        success: false,
        errors: [{
          msg: 'Service Station not found',
        }, ],
      });
    }
    const emailsending = await sendEmail({
      email: ss.owner.email,
      subject: 'Service Station registration Approved',
      message: `Congratulations! Your service station has been registered in our portal. You can now start managing you service station using our portal.\nThe details of your service station is:\nOwner Name: ${ss.owner.name}\nService Station Name: ${ss.name}\nArea: ${ss.area}\nServices Provided: ${ss.services}\nServing Vehicles: ${ss.vehicles}`
    })
    return res.status(200).json({
      success: true,
      servicestation: ss
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      errors: [{
        msg: 'Server Error',
      }, ],
    });
  }
}

const getAllRequests = async (req, res) => {
  try {
    const allss = await ServiceStation.find({
      "approved": "false"
    }).populate({
      path: 'owner',
      select: 'name email'
    })
    if (allss.length == 0) {
      return res.status(404).json({
        success: false,
        errors: [{
          msg: 'No request registered.',
        }, ],
      });
    }
    return res.status(200).json({
      success: true,
      ssRequests: allss
    })
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      errors: [{
        msg: 'Server Error',
      }, ],
    });
  }
}

const delServiceStationById = async (req, res) => {
  try {
    const ss = await ServiceStation.findById(req.params.id)
    if (!ss) {
      return res.status(404).json({
        success: false,
        errors: [{
          msg: 'Service Station not found',
        }, ],
      });
    }
    if (!ss.photo.startsWith('no')) {
      const del = `${config.get('fileUploadServiceStation')}/${ss.photo}`;
      fs.unlink(del, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }
    await ss.remove()
    return res.status(200).json({
      success: true,
      servicestation: []
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      errors: [{
        msg: 'Server Error',
      }, ],
    });
  }
}

// Vendor Routes Functions

const getAuthVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.vendor.id).select('-password');
    res.json({
      success: true,
      vendor,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      errors: [{
        msg: 'Server Error',
      }, ],
    });
  }
};

const authenticateVendor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  const {
    email,
    password
  } = req.body;
  try {
    let vendor = await Vendor.findOne({
      email,
    });
    if (!vendor) {
      return res.status(400).json({
        success: false,
        errors: [{
          msg: 'Invalid Credentials',
        }, ],
      });
    }
    const passcheck = await bcrypt.compare(password, vendor.password);
    if (!passcheck) {
      return res.status(400).json({
        success: false,
        errors: [{
          msg: 'Invalid Credentials',
        }, ],
      });
    }
    const payload = {
      vendor: {
        id: vendor.id,
      },
    };
    const ss = await ServiceStation.findOne({
      owner: vendor.id,
      approved: true
    })
    if (ss) {
      ss.status = 'Open'
      await ss.save()
    }
    jwt.sign(
      payload,
      config.get('jwtSecret'), {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      errors: [{
        msg: 'Server Error',
      }, ],
    });
  }
}

const updateVendorDetails = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  const fieldstoupdate = {
    name: req.body.name,
    email: req.body.email,
  };
  const vendor = await Vendor.findByIdAndUpdate(req.vendor.id, fieldstoupdate, {
    new: true,
    runValidators: true,
  }).select('-password');
  res.status(200).json({
    success: true,
    vendor,
  });
}

const updateVendorPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  if (req.body.currentPassword == req.body.newPassword) {
    return res.status(400).json({
      success: false,
      errors: [{
        msg: 'Current and New Password cannot be same!',
      }, ],
    });
  }
  const vendor = await Vendor.findById(req.vendor.id);
  const passcheck = await bcrypt.compare(
    req.body.currentPassword,
    vendor.password
  );
  if (!passcheck) {
    return res.status(400).json({
      success: false,
      errors: [{
        msg: 'Invalid Credentials',
      }, ],
    });
  }
  const salt = await bcrypt.genSalt(10);
  vendor.password = await bcrypt.hash(req.body.newPassword, salt);
  await vendor.save();
  const newvendor = await Vendor.findById(vendor._id).select('-password');
  res.status(200).json({
    success: true,
    vendor: newvendor,
  });
}

const addServiceStation = async (req, res) => {
  try {
    let ss = await ServiceStation.findOne({
      owner: req.vendor.id
    })
    if (ss) {
      return res.status(400).json({
        success: false,
        errors: [{
          msg: "This vendor already has a service station"
        }]
      })
    }
    const {
      name,
      area,
      vehicles,
      services,
      location,
    } = req.body;
    ss = new ServiceStation({
      name,
      area,
      vehicles,
      services,
      location,
    })
    ss.owner = req.vendor.id
    let validate = Array()
    let empty = false
    if (!vehicles) {
      validate.push({
        msg: "Types of vehicles served are required"
      })
      empty = true
    }
    if (!services) {
      validate.push({
        msg: "Types of services provided are required"
      })
      empty = true
    }
    if (empty) {
      return res.status(400).json({
        success: false,
        errors: validate
      })
    }
    await ss.save()
    return res.status(200).json({
      success: true,
      servicestation: ss
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const msg = Object.values(error.errors).map(val => JSON.parse(`{ "msg":"${val.message}"}`))
      return res.status(400).json({
        success: false,
        errors: msg
      })
    } else {
      console.log(error.message)
      res.status(500).json({
        success: false,
        errors: [{
          msg: 'Server Error',
        }, ],
      });
    }
  }
}

const closeServiceStation = async (req, res) => {
  try {
    const ss = await ServiceStation.findOne({
      owner: req.vendor.id,
      approved: true
    })
    if (ss) {
      ss.status = 'Closed'
      await ss.save()
      return res.status(200).json({
        success: true,
        servicestation: ss
      })
    }
    return res.status(200).json({
      success: true
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      errors: [{
        msg: 'Server Error',
      }, ],
    });
  }
}

const uploadServiceStationPhoto = async (req, res) => {
  if (!req.files) {
    return res.status(400).json({
      success: false,
      errors: [{
        msg: 'Please upload an image.',
      }, ],
    });
  }
  const file = req.files.file;
  if (!file.mimetype.startsWith('image')) {
    return res.status(400).json({
      success: false,
      errors: [{
        msg: 'Please upload an image file.',
      }, ],
    });
  }
  if (file.size > config.get('maxPhotoSize')) {
    return res.status(400).json({
      success: false,
      errors: [{
        msg: `Please upload an image less than ${
            config.get('maxPhotoSize') / 1000000
          } mb`,
      }, ],
    });
  }
  file.name = `photo_${uuidv4()}${path.parse(file.name).ext}`;
  file.mv(`${config.get('fileUploadServiceStation')}/${file.name}`, async (err) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({
        success: false,
        errors: [{
          msg: 'Problem with image upload',
        }, ],
      });
    }
  });
  const ss = await ServiceStation.findOne({
    owner: req.vendor.id
  })
  if (!ss.photo.startsWith('ss')) {
    const del = `${config.get('fileUploadServiceStation')}/${ss.photo}`;
    fs.unlink(del, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }

  ss.photo = file.name;
  await ss.save();
  res.status(200).json({
    success: true,
    servicestation: ss
  });
}

const getUnhandledBookings = async (req, res, next) => {
  const {
    id
  } = req.body;
  try {
    const Bookings = await Booking.find({
      isApproved: false,
      isCompleted: false,
      serviceStation: id
    });
    return res.status(200).json({
      success: true,
      bookings: Bookings
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      errors: [{
        msg: 'Server Error',
      }],
    });
  }
}

const handleBookingRequest = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  const {
    approved,
    bookingId,
    timeForService
  } = req.body;
  try {
    const bookingExist = await Booking.findById(bookingId);
    if (!bookingExist) {
      return res.status(400).json({
        success: false,
        errors: [{
          msg: 'Booking does not exist any longer!'
        }]
      })
    }
    const serviceStation = await ServiceStation.findById(bookingExist.serviceStation);
    if (!serviceStation) {
      res.status(400).json({
        success: false,
        errors: [{
          msg: "Service Station does not exist"
        }]
      })
    }
    if (approved === false) {
      await Booking.findByIdAndDelete(bookingId);
      let notify = new notifications({
        senderID: req.vendor.id,
        receiverID: bookingExist.client,
        payload: [{
          isApproved: approved,
          booking: bookingExist
        }]
      })
      await notify.save();
      userSocket.sendNotificationToClient(notify)
      return res.status(200).json({
        success: true,
        msg: "Request Denied Successfully!"
      })
    }


    let time = 0
    let allServiceStationBookings = serviceStation.bookings ? serviceStation.bookings : [];
    let allActiveProcess = serviceStation.activeProcess ? serviceStation.activeProcess : [];
    allServiceStationBookings.forEach(async (val) => {
      const bk = await Booking.findById(val)
      time += bk.estimatedTime
    })
    allActiveProcess.forEach(async (val) => {
      const bk = await Booking.findById(val)
      const dt = new Date()
      const newdt = dt - bk.startedAt
      if (newdt.getMinutes() < timeForService) {
        time += newdt.getMinutes()
      }
    })
    estimatedstart = bookingExist.createdAt
    estimatedstart = estimatedstart.setMinutes(estimatedstart.getMinutes() + time)

    await Booking.findByIdAndUpdate(bookingId, {
      isApproved: true,
      status: 'Waiting',
      timeForService,
      estimatedTime: time,
      estimatedStartTime: estimatedstart
    })
    allServiceStationBookings.push(bookingId)
    await ServiceStation.findByIdAndUpdate(serviceStation._id, {
      bookings: allServiceStationBookings
    });

    let notify = new notifications({
      senderID: req.vendor.id,
      receiverID: bookingExist.client,
      payload: [{
        isApproved: approved,
        booking: bookingExist,
        estimatedStartTime:estimatedstart
      }]
    })
    await notify.save();
    userSocket.sendNotificationToClient(notify)
    return res.status(200).json({
      success: true,
      msg: "Request Accepted Successfully!"
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      errors: [{
        msg: 'Server Error',
      }],
    });
  }
}

const updateProcess = async (req, res, next) => {
  const {
    bookingId,
    status,
  } = req.body;
  try {
    let booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(400).json({
        success: false,
        errors: [{
          msg: "Booking expired or dont exist anymore"
        }]
      })
    }
    let serviceStation = await ServiceStation.findById(booking.serviceStation);
    if (!serviceStation) {
      res.status(400).json({
        success: false,
        msg: "Service Station does not exist"
      })
    }
    let notify;
    switch (status) {
      case 'Waiting':
        booking.status = 'Active';
        booking.startedAt = new Date()
        let allActiveProcess = serviceStation.activeProcess;
        let alreadyExist = allActiveProcess.find(id => id == bookingId)
        if (alreadyExist) {
          return res.status(400).json({
            success: false,
            msg: "Already Serving this Process"
          })
        }
        allActiveProcess.push(bookingId);
        let updatedBookings = serviceStation.bookings.filter((book) => {
          return book != bookingId;
        })
        await ServiceStation.findByIdAndUpdate((await serviceStation)._id, {
          activeProcess: allActiveProcess,
          bookings: updatedBookings
        })
        await Booking.findByIdAndUpdate(bookingId, booking);
        notify = new notifications({
          senderID: req.vendor.id,
          receiverID: booking.client,
          payload: [{
            status: booking.status,
            booking: booking
          }]
        })
        await notify.save();
        userSocket.sendNotificationToClient(notify);
        return res.status(200).json({
          success: true,
          active: allActiveProcess,
          bookings: updatedBookings
        })
      case 'Active':
        let filteredActiveProcess = serviceStation.activeProcess.filter((activeBookings) => {
          return activeBookings != bookingId;
        })
        booking.status = 'Completed';
        booking.isCompleted = true;
        await ServiceStation.findByIdAndUpdate((await serviceStation)._id, {
          activeProcess: filteredActiveProcess
        })
        await Booking.findByIdAndUpdate(bookingId, booking);
        notify = new notifications({
          senderID: req.vendor.id,
          receiverID: booking.client,
          payload: [{
            status: booking.status,
            booking: booking
          }]
        })
        await notify.save();
        userSocket.sendNotificationToClient(notify);
        return res.status(200).json({
          success: true,
          active: filteredActiveProcess,
          bookings: serviceStation.bookings
        })
      default:
        res.status(400).json({
          success: false,
          msg: "Unknown status sent by vendor"
        })
    }
  } catch (errors) {
    console.log(errors);
    return res.status(500).json({
      success: false,
      errors: [{
        msg: errors
      }]
    })
  }
}

const getServiceStationByVendorId = async (req, res) => {
  try {
    const ss = await ServiceStation.findOne({
      "owner": req.vendor.id
    }).populate({
      path: 'owner',
      select: 'name email'
    }).populate('bookings').populate('activeProcess');
    if (!ss) {
      return res.status(404).json({
        success: false,
        errors: [{
          msg: 'No registered service station found.'
        }]
      })
    }
    res.status(200).json({
      success: true,
      servicestation: ss
    })

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      errors: [{
        msg: 'Server Error'
      }]
    })
  }
}

exports.getAuthUser = getAuthUser;
exports.authenticateUser = authenticateUser;
exports.updateUserDetails = updateUserDetails;
exports.updateUserPassword = updateUserPassword;
exports.uploadUserPhoto = uploadUserPhoto;
exports.bookService = BookService;
exports.searchserviceStation = searchServiceStation
exports.getCompletedBookings = getCompletedBookings

exports.getAuthAdmin = getAuthAdmin;
exports.authenticateAdmin = authenticateAdmin;
exports.getAllUsers = getAllUsers
exports.delUserById = delUserById
exports.getAllServiceStations = getAllServiceStations
exports.approveServiceStationById = approveServiceStationById
exports.getUnhandledBookings = getUnhandledBookings
exports.delServiceStationById = delServiceStationById

exports.getAuthVendor = getAuthVendor
exports.authenticateVendor = authenticateVendor
exports.updateVendorDetails = updateVendorDetails
exports.updateVendorPassword = updateVendorPassword
exports.addServiceStation = addServiceStation
exports.closeServiceStation = closeServiceStation
exports.uploadServiceStationPhoto = uploadServiceStationPhoto
exports.getAllRequests = getAllRequests
exports.handleBookingRequest = handleBookingRequest
exports.updateProcess = updateProcess
exports.getServiceStationByVendorId = getServiceStationByVendorId

