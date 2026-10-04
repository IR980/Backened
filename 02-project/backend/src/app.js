const express = require("express");
const Post = require("./models/post.model");
const multer = require("multer");
const dns = require("dns");
const uploadFile = require("./services/storage.service")
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() });

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts", error: error.message });
  }
});

app.post("/posts",upload.single("image"), async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);
    const result = await uploadFile(req.file.buffer);
    console.log("Image uploaded successfully:", result);
    const post = new Post({
      image: result.url,
      caption: req.body.caption,
    });
    await post.save();

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    res.status(400).json({ message: "Failed to create post", error: error.message });
  }
});

module.exports = app;
