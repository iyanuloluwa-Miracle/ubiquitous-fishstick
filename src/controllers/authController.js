// authController.js
const User = require('../models/User');
const argon2 = require('argon2');
const { loginSchema, signupSchema } = require('../Validators/userValidator');
const {
    // generateAccessToken,
    generateRefreshToken,
    generateLongToken,
  } = require("../helper/authUtils");
// Controller for user sign-up
const signupUser = async (req, res) => {
    try {
        const { error, value } = signupSchema.validate(req.body);

        if (error) {
        return res.status(400).json({
            success: false,
            data: null,
            error: error.details[0].message,
            message: "Signup failed",
        });
        }
        
      const { email, password } = req.body;
  
      // Check if the username is already taken
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Invalid credential' });
      }
  
      // Hash the password using Argon2
      const hashedPassword = await argon2.hash(password);
  
      // Create a new user
      const user = await User.create({ email, password: hashedPassword });
  
      // Generate a refresh token
      const refreshToken = generateRefreshToken();
      user.refreshToken = refreshToken;
      await user.save();
  
      // Send the refresh token in the response
      res.status(201).json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
          },
          refreshToken,
        },
        message: 'User registration successful',
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({
        success: false,
        data: null,
        error: err.message,
        message: 'User registration failed',
      });
    }
};

const signInUser = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        data: null,
        error: error.details[0].message,
        message: "Login failed",
      });
    }

    const { email, password } = value;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credential", data: null });
    }

    // Compare the password using Argon2
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credential", data: null });
    }

    // Verification related code removed

    // Generate the access token and refresh token
    const refreshToken = generateRefreshToken();
    // Store the refresh token in the user document
    user.refreshToken = refreshToken;
    await user.save();

    // Combine access and refresh tokens into a single cookie
    const combinedToken = `${refreshToken}`;

    // Set a single cookie with the combined token

    res.cookie("authToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 604800000,
      path: "/",
    });

    // Send both tokens in the response
    return res.status(200).json({
      success: true,
      data: {
        user,
        refreshToken,
      },
      error: null,
      message: "Login Successful",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
      error: err.message,
      message: null,
    });
  }
};

// Controller for user logout
const logoutUser = async (req, res) => {
  try {
    // Extract token from Authorization header
    const refreshToken = req.headers.authorization?.split(" ")[1];

    // Verification related code removed

    res.status(200).json({
      success: true,
      data: null,
      message: "Logged out successfully!",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
      error: err.message,
      message: null,
    });
  }
};

module.exports = {
  signupUser,
  signInUser,
  logoutUser,
};
