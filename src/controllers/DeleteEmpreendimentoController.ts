import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import { Client } from "basic-ftp";

export class DeleteEmpreendimentoController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    let loop: any = [];

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

    const files = await prismaClient.arquivos.findMany({
      where: {
        idEmpreendimento: id,
      },
    });

    try {
      const promisses = files.map(async (file, idx) => {
        if (!loop.includes(file.nomeArquivo)) {
          await (await ftpconnect()).remove(file.nomeArquivo);
          loop.push(file.nomeArquivo);
          await prismaClient.arquivos.deleteMany({
            where: { idEmpreendimento: id },
          });
        }
      });

      await Promise.all(promisses).then(async () => {
        await prismaClient.empreendimentos.delete({ where: { id: id } });
        res.status(200).send(true);
      });
    } catch (error: any) {
      res.status(400).send(false);
    }
  }
}
