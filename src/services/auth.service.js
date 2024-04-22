import Jwt from "jsonwebtoken";
import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import { ErrorWithStatus } from "../exceptions/error-with-status.exception.js";

export const login = async (email, password) => {
  // Check if email exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new ErrorWithStatus("User not found", 404);  
  }
  // Check if password is not correct
  if (!bcrypt.compareSync(password, user.password)) {
    throw new ErrorWithStatus("Username or Password is incorrect", 401);
  }
  // Generate access token
  const JWT_SECRET = process.env.JWT_SECRET || "secret";
  const token = Jwt.sign(
    {
      email: user.email,
      sub: user._id,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};

export const register = async (first_name, last_name, email, password) => {
  // Check if email exists
  const user = await User.findOne({ email });
  if (user) {
    throw new ErrorWithStatus("User already exists", 400);
  }
  // Create new user
  password = await bcrypt.hash(password, 10);
  const newUser = new User({
    first_name,
    last_name,
    email,
    password, 
  });
  await newUser.save();

  delete newUser.password;
  return newUser;
};
