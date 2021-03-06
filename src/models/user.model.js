const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      minlength: 1,
    },
    lastname: {
      type: String,
      required: true,
      minlength: 1,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    wallet: {
      type: Number,
      required: true,
      min: 0,
      default: 10000000,
    },
  },
  { timestamps: true }
);

UserSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual("reverseName").get(function () {
  return `${this.lastName}, ${this.firstName}`;
});

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const rounds = 10;
    this.password = await bcrypt.hash(this.password, rounds);
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
