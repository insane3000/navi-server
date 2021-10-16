import { Schema, model } from "mongoose";

const bookSchema = new Schema(
  {
    title: String,
    author: String,
    image: String,
    content: String,
    readed: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export default model("book", bookSchema);
