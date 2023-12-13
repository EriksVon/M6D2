import mongoose, { Schema } from "mongoose";

const BlogSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
  },
  readTime: {
    value: { type: Number },
    unit: { type: String },
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "authors",
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
});

export const Post = mongoose.model("blogPosts", BlogSchema);
