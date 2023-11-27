import mongoose, { Schema } from "mongoose";

const BlogSchema = new Schema({
  category: {
    type: String,
  },
  title: {
    type: String,
  },
  cover: {
    type: String,
  },
  readTime: {
    value: { type: Number },
    unit: { type: String },
  },
  author: {
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  content: {
    type: String,
  },
  createdAt: {
    type: String,
  },
});

export const Post = mongoose.model("blogPosts", BlogSchema);
