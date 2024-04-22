import User from "../models/users.model.js";
import blog from "../models/blogs.model.js";


export const getAll = async () => {
  return blog.find().populate("user");
};

export const create = async (userId) => {
  if (!isValidObjectId(userId)) {
    throw new Error("Invalid user id");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  
  return blog.create({ user: userId });
};

export const getOne = async (blogId) => {
  return blog.findOne({ _id: blogId });
};

export const update = async (blogId,) => {
   if (!isValidObjectId(userId)) {
    throw new Error("Invalid user id");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  
  return blog.update({ user: userId });
};

export const Delete = async (blogId) => {
  return blog.deleteOne({ _id: blogId });
};
