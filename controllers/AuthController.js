const User = require('../models/User');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

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
      errors: [
        {
          msg: 'Server Error',
        },
      ],
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
  const { email, password } = req.body;
  try {
    let user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        errors: [
          {
            msg: 'Invalid Credentials',
          },
        ],
      });
    }
    const passcheck = await bcrypt.compare(password, user.password);
    if (!passcheck) {
      return res.status(400).json({
        success: false,
        errors: [
          {
            msg: 'Invalid Credentials',
          },
        ],
      });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
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
      errors: [
        {
          msg: 'Server Error',
        },
      ],
    });
  }
};

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
      errors: [
        {
          msg: 'Server Error',
        },
      ],
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
  const { email, password } = req.body;
  try {
    let admin = await Admin.findOne({
      email,
    });
    if (!admin) {
      return res.status(400).json({
        success: false,
        errors: [
          {
            msg: 'Invalid Credentials',
          },
        ],
      });
    }
    const passcheck = await bcrypt.compare(password, admin.password);
    if (!passcheck) {
      return res.status(400).json({
        success: false,
        errors: [
          {
            msg: 'Invalid Credentials',
          },
        ],
      });
    }
    const payload = {
      admin: {
        id: admin.id,
      },
    };
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
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
      errors: [
        {
          msg: 'Server Error',
        },
      ],
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
      errors: [
        {
          msg: 'Current and New Password cannot be same!',
        },
      ],
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
      errors: [
        {
          msg: 'Invalid Credentials',
        },
      ],
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
  if (!req.files) {
    return res.status(400).json({
      success: false,
      errors: [
        {
          msg: 'Please upload an image.',
        },
      ],
    });
  }
  const file = req.files.file;
  if (!file.mimetype.startsWith('image')) {
    return res.status(400).json({
      success: false,
      errors: [
        {
          msg: 'Please upload an image file.',
        },
      ],
    });
  }
  if (file.size > config.get('maxPhotoSize')) {
    return res.status(400).json({
      success: false,
      errors: [
        {
          msg: `Please upload an image less than ${
            config.get('maxPhotoSize') / 1000000
          } mb`,
        },
      ],
    });
  }
  file.name = `photo_${uuidv4()}${path.parse(file.name).ext}`;
  file.mv(`${config.get('fileUploadUser')}/${file.name}`, async (err) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({
        success: false,
        errors: [
          {
            msg: 'Problem with image upload',
          },
        ],
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
    user,
  });
};

exports.getAuthUser = getAuthUser;
exports.authenticateUser = authenticateUser;
exports.getAuthAdmin = getAuthAdmin;
exports.authenticateAdmin = authenticateAdmin;
exports.updateUserDetails = updateUserDetails;
exports.updateUserPassword = updateUserPassword;
exports.uploadUserPhoto = uploadUserPhoto;
