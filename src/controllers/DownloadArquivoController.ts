import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class DownloadArquivoController {
  async handle(req: Request, res: Response) {
    const { id, hash }: any = req.query;

    await prismaClient.arquivos
      .findFirst({
        where: {
          id: id,
          hash: hash,
        },
      })
      .then(async (r: any) => {
        await prismaClient.arquivos.update({
          data: { quantidadeDownload: r.quantidadeDownload + 1 },
          where: {
            id: r.id,
          },
        });
        res
          .status(200)
          .send(
            "http://www.triscoengenharia.com.br/_manuais/" + r?.nomeArquivo
          );
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  }
}
