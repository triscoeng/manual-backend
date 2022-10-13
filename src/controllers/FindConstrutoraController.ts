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
    const { construtora }: any = req.query
    const data = await prismaClient.construtoras.findMany({
      include: {
        Empreendimentos: {
          select: {
            id: true,
            nomeEmpreendimento: true,
            Arquivos: true,
            QRCode: true,
          }
        }
      },
      where: {
        id: construtora
      }
    });

    return res.status(200).json(data);
  }

  async handleOnlyName(req: Request, res: Response) {
    const data = await prismaClient.construtoras.findMany({
      select: {
        nome: true,
        id: true,
        Empreendimentos: {
          select: {
            id: true,
            nomeEmpreendimento: true,
            Arquivos: true,
            QRCode: true
          }
        }
      },
    });
    const mask = data.map((single: any) => ({
      label: single.nome,
      value: single.id,
      empreendimentos: single.Empreendimentos.map((emp: any) => (
        { label: emp.nomeEmpreendimento, value: emp.id, arquivos: emp.Arquivos, qrcodes: emp.QRCode }
      ))
    }))
    res.status(200).json(mask);
  }
}
