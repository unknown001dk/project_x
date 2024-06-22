import mongoose from "mongoose";
import User from "../models/User-model.js";

export const registerUser = async(req, res) => {
  const { name, email, password } = req.body;

  if (!name ||!email ||!password) {
    return res.status(400).json({ 
      message: 'Please fill all fields',
      status: 400,
      success: false
    });
  }

  if( email ) {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ 
        message: 'Email already exists',
        status: 400,
        success: false
      });
    }
  }

  const newUser = new User({
    name,
    email,
    password,
  });

  try {
    await newUser.save();
    return res.status(200).json({ 
      message: 'Register sucessfully',
      status: 201,
      success: true
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = (req, res) => {
  res.status(200).json({ 
    message: 'Login sucessfully' 
  });
};

export const updateUser = (req, res) => {
  res.status(200).json({ 
    message: 'Update sucessfully' 
  });
};

export const logoutUser = (req, res) => {
  res.status(200).json({ 
    message: 'Logout sucessfully' 
  });
};

export const deleteUser = (req, res) => {
  res.status(200).json({ 
    message: 'Delete sucessfully' 
  });
};