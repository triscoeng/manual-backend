import { ErrorRequestHandler, Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class FindArquivoController {
  async getAll(req: Request, res: Response) {
    try {
      const list = await prismaClient.arquivos.findMany({
        include: {
          empreendimento: {
            include: {
              construtora: true
            }
          }
        }
      })
      res.status(200).json(list)
    } catch (error: any) {
      res.status(400).send(error)
    }

  }

  async getById(req: Request, res: Response) {
    const { id } = req.params
    try {
      const search = await prismaClient.arquivos.findUnique({
        where: {
          id: id
        },
        include: {
          empreendimento: {
            include: {
              construtora: true
            }
          }
        }
      })
      res.status(200).json(search)
    } catch (error) {
      res.status(400).send(error)
    }

  }
}