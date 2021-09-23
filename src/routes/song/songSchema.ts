import { Schema, model } from "mongoose";

const songSchema = new Schema(
  {
    bandName: String,
    songName: String,
    releaseYear: String,
    titleEnglish: String,
    titleSpanish: String,
    englishLyrics: String,
    spanishLyrics: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export default model("songs", songSchema);
