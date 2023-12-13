import express from "express";
import authorRouter from "./authorRouter.js";
import blogPostRouter from "./blogPostRouter.js";
const apiRouter = express.Router();

apiRouter.use("/authors", authorRouter);
apiRouter.use("/blogPosts", blogPostRouter);

export default apiRouter;
