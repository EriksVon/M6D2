import mongoose, { Schema } from "mongoose";

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: true,
    text: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  birth: {
    type: String,
  },
  avatar: {
    type: String,
  },
});

export const User = mongoose.model("authors", AuthorSchema);
