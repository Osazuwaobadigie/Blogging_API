import mongoose from "mongoose"

const BlogSchema = mongoose.Schema(
  {
    title: { 
        type: String, 
        required: true,
        unique: true,
        trim: true,
     },
    description: { 
        type: String, 
        required: true,
        unique: true,
        trim: true, 
    },
    author: { 
        type: String,
        required: true,
        trim: true, 
    },
    state: { 
        type: String, 
        default: "draft",
        enum: ["draft", "published"],
    },
    tags: { 
        type: Array,
        default: [],
    },
    body: { 
        type: String, 
        required: true,
        unique: true,
        trim: true,
    },
    read_count: { 
        type: Number, 
        default: 0,
    },
    reading_time: { 
        type: Date, 
        default: 0,
    },

    //createdBy: 
    //updatedBy:  
},
  { timestamps: true }
);

// Calculate reading_time and set the value before saving to DB.
BlogSchema.pre("save", async function () {
    const blog = this;
    const wordCount = await blog.body.split("").length;
    const reading_time = Math.ceil(wordCount / 200);

    blog.reading_time = reading_time
})

const Blog = mongoose.model("blog", BlogSchema);

export default Blog;