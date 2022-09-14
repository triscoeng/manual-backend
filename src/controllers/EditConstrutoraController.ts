import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class EditConstrutoraController {
  async handle(req: Request, res: Response) {
    const { id, ...data } = req.body;

    try {
      const query = await prismaClient.construtoras.update({
        data: {
          ...data,
        },
        where: {
          id: id,
        },
      });

      res.status(201).json(query);
    } catch (error) {
      res.status(400).send({
        status: false,
        data: error,
      });
    }
  }
}
