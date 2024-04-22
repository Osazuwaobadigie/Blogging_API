import mongoose from "mongoose"
import types from "mongoose"

const BlogSchema = mongoose.Schema(
  {
    title: { 
        type: String, 
        required: true,
        unique: true,
     },
    description: { 
        type: String, 
        required: true 
    },
    author: { 
        type: String, 
    },
    state: { 
        type: String, 
    },
    tags: { 
        type: String, 
    },
    body: { 
        type: String, 
        required: true,
    },
    read_count: { 
        type: Number, 
    },
    reading_time: { 
        type: Date, 
    },

    createdBy: { 
        type: types.ObjectId, 
        required: true
     },
    updatedBy: { 
        type: types.ObjectId
     },
  },
  { timestamps: true }
);

const Blog = mongoose.model("blog", BlogSchema);

export default Blog;