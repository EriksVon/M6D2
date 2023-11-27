import express from "express";
import authorRouter from "./routers/authorRouter.js";
import blogPostRouter from "./routers/blogPostRouter.js";
import mongoose from "mongoose";
import cors from "cors";

const server = express();
const port = 3001;

server.use(cors());
server.use(express.json());
server.use("/authors", authorRouter);
server.use("/blogPosts", blogPostRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(port, () => {
      console.log("Server listening at port: ", port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
