import { Request, Response, NextFunction } from "express";

export const headerConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  res.header("X-Total-Count", "20");
  
  next();
};
