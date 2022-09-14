import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import { CreateArquivoController } from "../controllers/CreateArquivoController";

export class EditEmpreendimentoController {
  async handle(req: Request, res: Response) {
    const { id, ...data } = req.body;
    const files: any = req.files;

    if (data.cep) {
      data.cep = Number(data.cep);
    }

    try {
      if (Object.keys(data).length <= 0 && files.length <= 0) {
        throw new Error("Ao menos um arquivo ou campo deve ser preenchido.");
      }
      await prismaClient.empreendimentos
        .update({
          data: {
            ...data,
          },
          where: {
            id: id,
          },
        })
        .then(async () => {
          if (files?.length > 0) {
            await new CreateArquivoController().handle(files, {
              id: id,
            });
          }
        })
        .then(async () => {
          res.status(200).json(true);
        });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
}
