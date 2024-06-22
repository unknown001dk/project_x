
export const registerUser = (req, res) => {
  res.status(200).json({ 
    message: 'Register sucessfully' 
  });
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