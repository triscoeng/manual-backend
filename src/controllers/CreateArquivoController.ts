import { Client } from "basic-ftp";
import { randomUUID } from "crypto";
import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

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

export class CreateArquivoController {
  async handle(files: any, empreendimento: any) {
    const ftp = ftpconnect();
    for (let file of files) {
      await (await ftp).uploadFrom(file.path, file.filename);
      await prismaClient.arquivos.create({
        data: {
          hash: randomUUID(),
          nomeArquivo: file.filename,
          idEmpreendimento: empreendimento.id,
        },
      });
    }
    (await ftp).close();
    return true;
  }
}


export class CreateSingleArquivoController {
  async handle(req: Request, res: Response) {
    const file: any = req.files;

    try {
      await prismaClient.arquivos.create({
        data: {
          nomeArquivo: file[0].filename,
          idEmpreendimento: req.body.idEmpreendimento,
          hash: randomUUID(),
        },
      });
      await (await ftpconnect()).uploadFrom(file[0].path, file[0].filename);
      res.status(201).send(true);
    } catch (error) {
      res.status(400).send({ status: false, data: error });
    }
  }
}
