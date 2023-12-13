import express from "express";
import { User } from "../models/authorModel.js";
import { Post } from "../models/blogPostModel.js";

const authorRouter = express.Router();

authorRouter
  // mi recupera tutti gli utenti
  .get("/", async (req, res, next) => {
    const users = await User.find({});
    res.json(users);
  })
  // mi recupera un utente specifico
  .get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  })
  // prende tutti i blog post di uno specifico autore
  .get("/:id/blogPosts", async (req, res, next) => {
    try {
      const blogPosts = await Post.find({ author: req.params.id });
      res.json(blogPosts);
    } catch (error) {
      next(error);
    }
  })
  // crea un nuovo autore
  .post("/", async (req, res, next) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).send(newUser);
    } catch (error) {
      next(error);
    }
  })
  // modifica le info di un utente
  .put("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const userUp = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.status(201).send(userUp);
    } catch (error) {
      next(error);
    }
  })
  // elimina un utente
  .delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);
      res.status(!deletedUser ? 404 : 200).send();
    } catch (error) {
      next(error);
    }
  });

export default authorRouter;
