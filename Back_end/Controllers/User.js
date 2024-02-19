import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import mongoose from "mongoose";
import validator from "validator";
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "test", error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "User not found!" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "user not found!" });
    }

    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const register = async (req, res) => {
  const {  password, confirmPassword, email, firstName, lastName,phone } =
    req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

  try {
  

    // Check if the email is already in use
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use!" });
    }

    // Check if the email follows a valid structure
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format!" });
    }

    // Check if the password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }

    // Create the user
    const user = await User.create({
      password: hashedPassword,
      email,
      firstName,
      lastName,
      balance: 0,
      phone
    });

    res.status(201).json({ message: "User created successfully!", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  const secretKey = process.env.JWT_SECRET;

  try {
    if (!secretKey) {
      throw new Error("JWT secret key not configured.");
    }

    // Check if the provided value is an email
    const isEmail = usernameOrEmail.includes("@");
    let user;

    // Find user by either username or email
    if (isEmail) {
      user = await User.findOne({ email: usernameOrEmail });
    } else {
      user = await User.findOne({ username: usernameOrEmail });
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid username or password!" });
    }

    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1h" });
    res.status(200).json({ message: "Logged in Successfully!", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "User not found!" });
    }

    const user = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    res.status(200).json({ message: "User was updated successfully!", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "User not found!" });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    res.status(200).json({ message: "User was deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
