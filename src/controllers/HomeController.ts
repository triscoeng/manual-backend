import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export default class HomeData {
  async handle(req: Request, res: Response) {

    const construtoras = await prismaClient.construtoras.count()
    const empreendimentos = await prismaClient.empreendimentos.count()
    const arquivos = await prismaClient.arquivos.count()
    const qrcode = await prismaClient.qRCode.count()

    const resp = {
      construtoras, empreendimentos, arquivos, qrcode
    }

    res.status(200).json(resp)
  }
}