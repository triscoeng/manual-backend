import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class DownloadArquivoController {
  async handle(req: Request, res: Response) {
    const { id }: any = req.query;
    console.log(id)

    await prismaClient.qRCode
      .findFirst({
        where: {
          id: id
        }
      })
      .then(async ({ id, url, view_count }: any) => {
        await prismaClient.qRCode.update({
          data: {
            view_count: view_count + 1
          },
          where: {
            id: id
          }
        })
          .then((r) => {
            return res.status(200).send(url)
          })
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  }
}
