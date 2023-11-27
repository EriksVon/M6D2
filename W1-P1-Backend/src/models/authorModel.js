import mongoose, { Schema } from "mongoose";

const AuthorSchema = new Schema({
  nome: {
    type: String,
  },
  cognome: {
    type: String,
  },
  email: {
    type: String,
  },
  data_di_nascita: {
    type: String,
  },
  avatar: {
    type: String,
  },
});

export const User = mongoose.model("authors", AuthorSchema);
