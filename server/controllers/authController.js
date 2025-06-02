import User from "../models/User.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // check
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "provide name, email and password",
      });
    }

    // check if user already exists
    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.createUser({ name, email, password });

    res.status(201).json({
      success: true,
      message: "User register successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //check email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }
    const user = await User.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    //check password
    const isPasswordCorrect = await User.comparePassword(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      success: true,
      message: `Login successfully, xin chào ${user.fullname}`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
