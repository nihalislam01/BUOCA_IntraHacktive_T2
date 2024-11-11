const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please Enter Your Name"]
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [
        {
          validator: validator.isEmail,
          message: 'Please provide a valid email',
        },
        {
          validator: function (v) {
            return /@(g\.)?bracu\.ac\.bd$/.test(v);
          },
          message: props => `${props.value} must be a G Suite email ending with @g.bracu.ac.bd`,
        },
      ]
    },
    studentId: {
      type: String,
    },
    password: {
      type: String,
      select: false,
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    role: {
      type: String,
      default: "user",
    },
    isEnable: {
      type: Boolean,
      default: true
    },
    verificationToken: {
      status: {type: Boolean },
      otp: {type: String },
      expiration: {type: Date }
    }
  });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;