import { Response, Request, NextFunction } from "express";
import sharp from "sharp";
import config from "../config";
// import S3 from "aws-sdk/clients/s3";
import { randomBytes } from "crypto";
import path from "path";
import fs from "fs";

export const updateLocal = async (req: any, res: Response, next: NextFunction) => {
  function removeNonAplhaNumeric(str: string) {
    return str.replace(/[\W_]/g, "");
  }

  // !Data and name
  //   let prename = req.body.title.split(".").join("").split(",").join("").trim();
  //   let name = prename.split(".")[0].split(" ").join("-").split(":").join("").toLowerCase();
  let name = removeNonAplhaNumeric(req.body.title);
  console.log(name);
  let random = randomBytes(6).toString("hex");
  // let nameXL = `${name}-xl-${random}.webp`;
  let nameL = `${name}-l-${random}.webp`;
  let nameM = `${name}-m-${random}.webp`;
  let nameS = `${name}-s-${random}.webp`;
  const pathDelete = path.join(__dirname, "../../public/posters/");
  // !Accion si existe file
  if (req.file) {
    // !Delete previous image
    try {
      fs.unlinkSync(`${pathDelete}${req.body.imageL}`);
      console.log("File L deleted!");
    } catch (err) {
      console.error(err);
    }
    try {
      fs.unlinkSync(`${pathDelete}${req.body.imageM}`);
      console.log("File M deleted!");
    } catch (err) {
      console.error(err);
    }
    try {
      fs.unlinkSync(`${pathDelete}${req.body.imageS}`);
      console.log("File S deleted!");
    } catch (err) {
      console.error(err);
    }
    // !Resize whit sharp
    sharp(req.file.buffer)
      .resize(384)
      .webp()
      .toFile(`${pathDelete}${nameL}`, (err, info) => {
        info ? console.log('"Image L uploaded!"') : console.log(err);
      });
    sharp(req.file.buffer)
      .resize(240)
      .webp()
      .toFile(`${pathDelete}${nameM}`, (err, info) => {
        info ? console.log('"Image M uploaded!"') : console.log(err);
      });
    sharp(req.file.buffer)
      .resize(100)
      .webp()
      .toFile(`${pathDelete}${nameS}`, (err, info) => {
        info ? console.log('"Image S uploaded!"') : console.log(err);
      });

    // !Set new name in body request
    req.body.imageXL = "";
    req.body.imageL = nameL;
    req.body.imageM = nameM;
    req.body.imageS = nameS;
    next();
  } else {
    next();
  }
};
