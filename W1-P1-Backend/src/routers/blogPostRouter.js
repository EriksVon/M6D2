import express from "express";
import { Post } from "../models/blogPostModel.js";
import { Comment } from "../models/commentModel.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const blogPostRouter = express.Router();

blogPostRouter
  // mi prende tutti i post (e mi fa la ricerca del titolo)
  .get("/", async (req, res, next) => {
    try {
      const { title } = req.query;
      const query = title ? { title: { $regex: title, $options: "i" } } : {};
      const posts = await Post.find(query).populate("author", "-__v");
      res.json(posts);
    } catch (error) {
      next(error);
    }
  })
  // mi prende un post specifico
  .get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await Post.findById(id).populate({
        path: "comments",
        populate: {
          path: "author",
          model: "authors",
          select: ["name", "surname", "avatar"],
        },
      });
      console.log(post);
      res.json(post);
    } catch (error) {
      next(error);
    }
  })
  // dovrebbe andare a prendere tutti i commenti di un blog specifico
  .get("/:id/comments", async (req, res, next) => {
    try {
      const comments = await Comment.find({ blogPost: req.params.id }).populate(
        "author"
      );
      res.json(comments);
    } catch (error) {
      next(error);
    }
  })
  // ritorna un commento specifico di un blog specifico
  .get("/:id/comments/:commentId", async (req, res, next) => {
    try {
      const comments = await Comment.find({
        blogPost: req.params.id,
        _id: req.params.commentId,
      });
      res.json(comments);
    } catch (error) {
      next(error);
    }
  })
  // mi crea un nuovo post
  .post("/", async (req, res, next) => {
    try {
      const newPost = new Post(req.body);
      await newPost.save();
      res.status(201).send(newPost);
    } catch (error) {
      next(error);
    }
  })
  // mi aggiunge un commento
  .post("/:id", async (req, res, next) => {
    try {
      let newComment = new Comment({
        ...req.body,
        blogPost: req.params.id,
      });
      await newComment.save();
      await Post.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            comments: newComment._id,
          },
        },
        { new: true }
      );
      res.status(201).send(newComment);
    } catch (error) {
      next(error);
    }
  })
  // modifica o aggiunge info al post
  .put("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const postUp = await Post.findByIdAndUpdate(id, req.body, { new: true });
      res.status(201).send(postUp);
    } catch (error) {
      next(error);
    }
  })
  // modifica o aggiunge info a un commento specifico
  .put("/:id/comment/:commentId", async (req, res, next) => {
    try {
      const commentUp = await Comment.findByIdAndUpdate(
        {
          blogPost: req.params.id,
          _id: req.params.commentId,
        },
        req.body,
        { new: true }
      );
      res.status(201).send(commentUp);
    } catch (error) {
      next(error);
    }
  })
  // elimina il post
  .delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await Post.findByIdAndDelete(id);
      res.status(!post ? 404 : 204).send();
    } catch (error) {
      next(error);
    }
  })
  .delete("/:id/comment/:commentId", async (req, res, next) => {
    try {
      const comment = await Comment.findByIdAndDelete({
        blogPost: req.params.id,
        _id: req.params.commentId,
      });
      res.status(!comment ? 404 : 204).send();
    } catch (error) {
      next(error);
    }
  });

export default blogPostRouter;
