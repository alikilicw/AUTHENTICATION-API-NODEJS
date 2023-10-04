const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    sparse: true,
    required: true,
  },
  personal_email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  firstname: {
    type: String,
    trim: true,
  },
  lastname: {
    type: String,
    trim: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  gender: {
    type: String,
    trim: true,
  },
  forget_pass_code: {
    type: String,
    trim: true,
  },
  enroll_date: {
    type: Date,
    default: new Date(),
    unmodifiable: true,
  },
  phone_number: {
    type: String,
    unique: true,
    trim: true,
  }
});

const User = mongoose.model("users", UserSchema);

const UserForVerificationSchema = new mongoose.Schema({
  personal_email: {
    type: String,
    trim: true,
    unique: true,
    require: true,
  },
  verification_code: {
    type: String,
    trim: true,
    require: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

const UserForVerification = mongoose.model(
  "users_unverified",
  UserForVerificationSchema
);

module.exports = {
  User,
  UserForVerification,
};
