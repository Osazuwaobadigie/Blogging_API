import User from "../models/users.model.js";
import { ErrorWithStatus } from "../exceptions/error-with-status.exception.js";

export const getAllUsers = async () => {
  try {
    return User.find();
  } catch (error) {
    throw new ErrorWithStatus(error.message, 500);
  }
};