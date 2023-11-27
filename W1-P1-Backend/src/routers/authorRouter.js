import express from "express";
import { User } from "../models/authorModel.js";

const authorRouter = express.Router();

authorRouter.get("/", async (req, res, next) => {
  const users = await User.find({});
  res.json(users);
});

authorRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
});

authorRouter.post("/", async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
});
authorRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const userUp = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).send(userUp);
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
});

authorRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).send();
    } else {
      res.status(201).send(user);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
});

export default authorRouter;
