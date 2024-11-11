const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require('crypto');


exports.register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, studentId, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User already exists.", 400));
  }

  user = new User({ name, email, studentId, password });
  await user.save();


  res.status(200).json({ success: true, message: "User Registered Successfully" });
});

exports.get = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findById(req.user.id);
  res.status(200).json({success: true, user});

});

exports.getAll = catchAsyncErrors(async (req, res, next) => {

  const users = await User.find();
  res.status(200).json({success: true, users});

});

exports.sendVerificationEmail = catchAsyncErrors(async (req, res, next) => {

  const {email} = req.body;

  const { token, hash, expiration } = generateToken();

  const user = await User.findOne({email: email});

  if (!user) {
    next(new ErrorHandler("Email does not exists", 404));
  }

  user.verificationToken.status = false;
  user.verificationToken.otp = hash;
  user.verificationToken.expiration = expiration;
  await user.save();

  await sendEmail({ name: user.name, email: user.email, subject: "Verify Email", otp: token });

  res.status(200).json({success: true, message: "Verification OPT sent to your email"});

});

exports.verifyCallback = catchAsyncErrors(async (req, res, next) => {

  const {token} = req.body;

  if (!token) {
    return next(new ErrorHandler("Token is missing", 404));
  }

  const hash = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({ "verificationToken.otp": hash });

  if (!user) {
    return next(new ErrorHandler("Invalid OTP", 404));
  }

  if (Date.now() > user.verificationToken.expiration) {
    return next(new ErrorHandler("Token has expired. Please enter you email again.", 400));
  }

  user.verificationToken.status = true;
  user.verificationToken.otp = undefined;
  user.verificationToken.expiration = undefined;

  await user.save();

  return res.status(200).json({ success: true, message: "Token verified successfully" });
});

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {

  const {email, newPassword} = req.body;

  const user = await User.findOne({email: email}).select("+password");

  if(!user) {
    return next(new ErrorHandler("Email does not exists", 404));
  }

  const isEmailVerified = user.verificationToken.status;

  if (!isEmailVerified) {
    return next(new ErrorHandler("This email is not verified", 404));
  }

  user.verificationToken.status = false;
  user.password = newPassword;
  await user.save();

  sendToken(user, 200, res);

});

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid password", 401));
  }

  sendToken(user, 200, res);
});

exports.check = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorHandler("Unauthorized", 403));
  }
  res.status(200).json({success: true, user});
});

exports.logout = catchAsyncErrors(async (req, res, next) => {

  res.clearCookie('token');
  res.status(200).json({success: true, message: "Logged Out"});

});