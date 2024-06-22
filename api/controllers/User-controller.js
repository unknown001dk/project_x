import User from "../models/User-model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
  const hashedPasword = await bcrypt.hashSync(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPasword,
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

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email ||!password) {
    return res.status(400).json({ 
      message: 'Please fill all fields',
      status: 400,
      success: false
    });
  }

  try {
    const validUser = await User.findOne({ email });
    
    if(!validUser) {
      return res.status(400).json({ 
        message: 'You are not Register. Please Register first',
        status: 400,
        success: false
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, validUser.password);
    if(!isPasswordValid) {
      return res.status(400).json({
        message: 'Please enter valid password',
        status: 400,
        success: false
      });
    }

    const token = jwt.sign({ id: validUser._id}, process.env.JWT_TOKEN);

    const { password: hashedPasword, ...rest} = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000)
    res
      .cookie('token', token, { httpOnly:true, expires: expiryDate })
      .status(200)
      .json({
        message: 'Login sucessfully',
        status: 200,
        success: true,
        ...rest,
      })

  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async(req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndUpdate(id, req.body);
    return res.status(200).json({ 
      message: 'Update sucessfully',
      status: 200,
      success: true
    });
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ 
    message: 'Logout sucessfully',
    status: 200,
    success: true
  });
};

export const deleteUser = async(req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    return res.status(200).json({ 
      message: 'Delete sucessfully',
      status: 200,
      success: true
    });
  } catch (error) {
    console.log(error);
  }
};