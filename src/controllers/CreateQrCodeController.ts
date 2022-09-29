import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class CreateQrCodeController {
  async view(req: Request, res: Response) {

    const isParamTrue = Object.keys(req.params)
    const client = prismaClient.qRCode

    switch (isParamTrue.length) {
      case 0:
        const list = await client.findMany({
          include: {
            empreendimento: {
              include: {
                construtora: true,
                Arquivos: true
              }
            }
          }
        })
        res.status(200).json(list)
        break;

      default:
        const onlyone = await client.findMany({ where: { id: req.params.id } })
        res.status(200).json(...onlyone)
        break;
    }
  }


  async create(req: Request, res: Response) {
    console.log(req.body)
    const { url, idEmpreendimento } = req.body;
    await prismaClient.qRCode
      .create({
        data: {
          url: url,
          idEmpreendimento: idEmpreendimento,
        },
      })
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        return res.status(400).send(error);
      });
  }

  async delete(req: Request, res: Response) {
    const { id }: any = req.params
    // console.log(id)
    await prismaClient.qRCode.delete({ where: { id: id } })
      .then((result) => {
        res.status(200).send(true)
      }).catch(error => {
        res.status(400).send(error)
      })
  }

  async edit(req: Request, res: Response) {
    const { ...data } = req.body
    const { id }: any = req.params

    const query = await prismaClient.qRCode.update(({
      data: data,
      where: {
        id: id
      }
    })).then(result => {
      return res.status(202).json(result)
    }).catch(error => res.status(400).json(error.message))

  }
}
