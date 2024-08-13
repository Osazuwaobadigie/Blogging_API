import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/users.route.js";
import blogRoute from "./routes/blogs.route.js";
import redis from "redis"

dotenv.config();

const app = express();
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8000
const client = redis.createClient()

console.log('Connected to Redis:', client.connected);

app.use(express.json());


app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/blogs", blogRoute);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Blog API" });   
});

app.all("*", (req, res) => {
    res.status(404);
    res.json({
        message: "Not found"
    });
});



mongoose.connect(MONGO_URL).then(() => {
    console.log("Connected to DB");
   
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    });
});



