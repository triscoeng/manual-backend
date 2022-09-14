import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class FindConstrutoraByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const query = await prismaClient.construtoras.findFirst({
      where: {
        id: id,
      },
      include: {
        Empreendimentos: true,
      },
    });
    return res.json(query);
  }
}

export class FindAllConstrutoraController {
  async handle(req: Request, res: Response) {
    const data = await prismaClient.construtoras.findMany({
      include: {
        Empreendimentos: true,
      },
    });
    return res.json(data);
  }

  async handleOnlyName(req: Request, res: Response) {
    const data = await prismaClient.construtoras.findMany({
      select: { nome: true, id: true },
    });
    res.status(200).json(data);
  }
}
