import { Schema } from "mongoose";
import mongoose from "mongoose";

const CommentsSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "authors",
  },
  blogPost: {
    type: Schema.Types.ObjectId,
    ref: "blogPosts",
  },
});

export const Comment = mongoose.model("comments", CommentsSchema);
