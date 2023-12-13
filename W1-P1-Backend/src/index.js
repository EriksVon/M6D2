import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import list from "express-list-endpoints";
import { genericError } from "./middlewares/genericError.js";
import apiRouter from "./routers/apiRouter.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);
app.use(genericError);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(
        "app listening at port: ",
        port + " \n🌝 The server has these endpoints: \n"
      );
      console.table(list(app));
    });
  })
  .catch((error) => {
    console.log(error);
  });

/*   import authorRouter from "./routers/authorRouter.js";
  import blogPostRouter from "./routers/blogPostRouter.js";
  app.use("/authors", authorRouter);
  app.use("/blogPosts", blogPostRouter); */
