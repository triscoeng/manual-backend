import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import { CreateArquivoController } from "./CreateArquivoController";
import { FindEmpreendimentoById } from "./FindEmpreendimentoController";

export class CreateEmpreendimentoController {
  async handle(req: Request, res: Response) {
    const enviaArquivoController = new CreateArquivoController();
    const data = req.body;
    const files = req.files;

    const createEmp = new Promise<any>(function (resolve, reject) {
      const query = prismaClient.empreendimentos.create({
        data: {
          nomeEmpreendimento: data.nomeEmpreendimento,
          cep: Number(data.cep),
          idConstrutora: data.idConstrutora,
        },
        include: {
          construtora: true,
        },
      });
      resolve(query);
    });

    createEmp
      .then(function (emp) {
        return new Promise<void>(function (res, rej) {
          enviaArquivoController.handle(files, emp);
          res(emp);
        });
      })
      .then((emp: any) => {
        const retrieve = prismaClient.empreendimentos.findFirst({
          where: { id: emp.id },
          include: {
            Arquivos: true,
            construtora: true,
          },
        });
        res.status(201).json(retrieve);
      });

    // try {
    //   const query = await prismaClient.empreendimentos
    //     .create({
    //       data: {
    //         nomeEmpreendimento: data.nomeEmpreendimento,
    //         cep: Number(data.cep),
    //         idConstrutora: data.idConstrutora,
    //       },
    //       include: {
    //         construtora: true,
    //       },
    //     })
    //     .then((r) => {
    //       enviaArquivoController.handle(files, query);
    //     })
    //     .then((r) => {
    //       prismaClient.empreendimentos
    //         .findFirst({
    //           where: { nomeEmpreendimento: data.nomeEmpreendimento },
    //           include: {
    //             Arquivos: true,
    //             construtora: true,
    //           },
    //         })
    //         .then((r3) => res.status(201).json(r3));
    //     });
    // } catch (error) {
    //   res.status(400).send({ status: false, data: error });
    // }
  }
}
