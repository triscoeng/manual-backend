import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import { Client } from "basic-ftp";

export class DeleteArquivoController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const getFile: any = await prismaClient.arquivos.findFirst({
      where: { id: id },
    });
    const ftpconnect = async () => {
      const clientFTP = new Client();
      clientFTP.ftp.verbose = true;
      await clientFTP.access({
        host: "ftp.triscoengenharia.com.br",
        user: "triscoen",
        password: "tr1sc03ng",
        secureOptions: {
          rejectUnauthorized: false,
        },
      });
      await clientFTP.cd("/public_html/_manuais");
      return clientFTP;
    };

    try {
      await (await ftpconnect()).remove(getFile.nomeArquivo);
      await prismaClient.arquivos.delete({ where: { id: id } });
      res.status(200).send(true);
    } catch (error) {
      res.status(400).send(false);
    }
  }
}
