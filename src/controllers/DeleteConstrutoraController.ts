import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class DeleteConstrutoraController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const query = await prismaClient.construtoras.delete({
        where: {
          id: id,
        },
      });
      return res.status(200).send(true);
    } catch (error) {
      return res.status(400).send(false);
    }
  }
}
