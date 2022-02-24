import { Response, RequestHandler } from "express";
import dotenv from "dotenv";
import User, { UserIT } from "./authSchema";
import jwt from "jsonwebtoken";

dotenv.config();
// !Datos del perfil
export const profile: RequestHandler = async (req, res) => {
  console.log(req.params);

  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(400).json("No user found");
  }
  res.json(user);
};
// !Actualizar perfil
export const updateProfile: RequestHandler = async (req, res) => {
  const user = await User.findById(req.body._id);
  if (!user) {
    return res.status(400).json("usuario no encontrado o datos incorrectos");
  }
  const correctPassword: boolean = await user.validatePassword(req.body.oldPassword);
  if (!correctPassword) {
    return res.status(400).json("invalid password");
  }
  const newPassword: UserIT = new User({
    password: req.body.newPassword,
  });

  newPassword.password = await newPassword.encryptPassword(newPassword.password);

  const userUpdated = await User.findByIdAndUpdate(
    req.body._id,
    { password: newPassword.password },
    {
      new: true,
    }
  );
  console.log(newPassword);
  if (!userUpdated) return res.status(204).json();
  return res.json(userUpdated);
  // return res.json("lalalalalalala");
};
// !para registar usuario
export const signup: RequestHandler = async (req, res) => {
  const newUser: UserIT = new User({
    user: req.body.user,
    password: req.body.password,
  });

  newUser.password = await newUser.encryptPassword(newUser.password);
  const savedUser = await newUser.save();

  // !token
  const token: string = jwt.sign({ _id: savedUser._id }, `${process.env.TOKEN_SECRET}`);
  console.log(token);
  res.header("token", token).json(savedUser);
};

// !Para hacer login
export const login: RequestHandler = async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ user: req.body.user });

  if (!user) {
    return res.status(400).json("usuario no encontrado o datos incorrectos");
  }
  const correctPassword: boolean = await user.validatePassword(req.body.password);

  if (!correctPassword) {
    return res.status(400).json("invalid password");
  }

  const token: string = jwt.sign({ _id: user._id }, "insane3000", {
    expiresIn: 60 * 60 * 24 * 30,
    //     expiresIn: 60 * 60,
  });

  res.json({ token, _id: user._id });
};
