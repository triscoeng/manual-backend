import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class FindAllEmpreendimentoController {
  async handle(req: Request, res: Response) {
    try {
      const query = await prismaClient.empreendimentos.findMany({
        include: {
          Arquivos: true,
          construtora: true,
        },
      });
      res.status(200).json(query);
    } catch (error) {
      res.status(400).send({ status: false, data: error });
    }
  }
}

export class FindEmpreendimentoById {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const query = await prismaClient.empreendimentos.findUnique({
        where: {
          id: id,
        },
        include: {
          Arquivos: true,
          construtora: true,
        },
      });
      res.status(200).json(query);
    } catch (error) {
      res.status(400).send({ status: false, data: error });
    }
  }
}
