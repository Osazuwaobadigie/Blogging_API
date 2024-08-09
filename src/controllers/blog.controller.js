import * as blogService from "../services/blog.service.js";


// Get all blogs
export const getAll = async (req, res) => {
  const blog = await blogService.getAll( {state: "published"} );
  res.status(200).json({ status: true, blog_count: blog.length, blog });
};

// Creat a new blog
export const create = async (req, res) => {
  const { userId } = req.body;
  try {
    const blog = await blogService.create({ title: userId.title, description: userId.description, body: userId.body, author: author, tags: userId.tags, timestamp: true});
    res.status(200).json({ status: true, blog});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get author's blogs
export const getUserBlog = async (req, res) => {
  try {
      const user = req.userId;
      const { state } = req.query;

      if (state) {
        const blog = await blogService.find({ state, author: user });
        return res.status(200).json({ status: true, blog})
      }

      const blog = await blogService.find({ author: user});
      return res.status(200).json({ status: true, articles });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  
}

// Get blog by ID
export const getOne = async (req, res) => {
  try {
      const { blogId } = req.params;
      const blog = await blogService.getOne({_id: blogId, state: "published" });

      if (!blog) {
        return res.status(404).json({ status: false, message: "There is no published article with the provided ID." });
      }
      blog.read_count = blog.read_count + 1;
      blog.save().then(() => res.status(200).json({ status: true, blog }));
  }catch (error) {
    res.status(400).json({ message: error.message });
  }
  
};

// UPDATE a blog state by ID
export const update = async (req, res) => {
  
  try {
    const { blogId } = req.params;
    const user = req.user.email;
    const body = req.body;
    const blog = await blogService.update(blogId);

    if (!blog) {
            return res.status(404).json({ status: false, message: `Can not find blog with ID: ${blogId}` });
        }

    if (user !== blog.author) {
            return res.status(401).json({ status: false, message: "You are not authorized to edit this blog." });
        }

        blog.state = body.state;
        blog
            .save()
            .then(() => res.status(200).json({ status: true, article }))
            .catch((err) => next({ status: 500, errDesc: err, message: err._message }));
  } catch (err) {
        next({ status: 500, errDesc: err, message: "An error occurred, please try again later." });
    }
};

//DELETE a blog by ID
export const Delete = async (req, res) => {
  try {
        const { blogId } = req.params;
        const user = req.user.email;
        const blog = await blogService.findById(blogId);

        if (!blog) {
            return res.status(404).json({ status: false, message: `Can not find blog with ID: ${blogId}` });
        }

        if (user !== blog.author) {
            return res.status(401).json({ status: false, message: "You are not authorized to edit this blog." });
        }

        blogService.findByIdAndDelete(blogId, (err, doc) => {
            if (err) {
                return res.status(404).json({ status: false, message: err._message });
            }
            res.status(200).json({ status: true, blog_deleted: doc });
        });
    } catch (err) {
        next({ status: 500, errDesc: err, message: "An error occurred, please try again." });
    }
};  