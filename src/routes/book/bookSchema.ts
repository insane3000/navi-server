import { Schema, model } from "mongoose";

const bookSchema = new Schema(
  {
    title: String,
    titleEsp: String,
    rating: Number,
    year: String,
    genre: String,
    time: String,
    actors: String,
    synopsis: String,
    link: String,
    image: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export default model("book", bookSchema);
