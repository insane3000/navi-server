import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).json("Access denied");
  jwt.verify(token, "insane3000", (err) => {
    if (err) return res.sendStatus(403);
    req.body._id = req.headers["id"];
    next();
  });
};
