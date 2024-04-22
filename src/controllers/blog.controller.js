import * as blogService from "../services/blog.service.js";

export const getAll = async (req, res) => {
  const blog = await blogService.getAll();
  res.json(blog);
};

export const create = async (req, res) => {
  const { userId } = req.body;
  try {
    const blog = await blogService.create(userId);
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getOne = async (req, res) => {
  const { blogId } = req.params;
  const blog = await blogService.getOne(blogId);
  res.json(blog);
};

export const update = async (req, res) => {
  const { blogId } = req.body;
  try {
    const data = await blogService.update(blogId);
    res.json({ message: "Update Successful", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const Delete = async (req, res) => {
  const { blogId } = req.body;
  try {
    const data = await blogService.Delete(blogId);
    res.json({ message: "Delete Successful", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};  