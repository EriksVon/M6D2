import express from "express";
import { Post } from "../models/blogPostModel.js";

const blogPostRouter = express.Router();

blogPostRouter.get("/", async (req, res, next) => {
  const posts = await Post.find({});
  res.json(posts);
});

blogPostRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      res.status(404).send();
    } else {
      res.status(201).send(post);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
});

blogPostRouter.post("/", async (req, res, next) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).send(newPost);
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
});

blogPostRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const postUp = await Post.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).send(postUp);
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
});

blogPostRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      res.status(404).send();
    } else {
      res.status(201).send(post);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
});

export default blogPostRouter;
