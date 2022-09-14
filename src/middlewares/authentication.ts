import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function ensureAuth(req: any, res: Response, next: NextFunction) {
  const token: any = req.headers.authorization;
  const sauce: any = process.env.saucePassword;
  if (
    req.url === "/login" ||
    req.url === "/login/verify" ||
    req._parsedUrl.pathname === "/download"
  ) {
    return next();
  }
  try {
    const decoded = jwt.verify(token, sauce);
    if (!decoded) throw new Error("Token Inválido");
    next();
  } catch (error) {
    return res.status(400).send(error);
  }
}
