import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class FindArquivoController {
  async getAll(req: Request, res: Response) {
    console.log(req.query)
    const { construtora, empreendimento }: any = req.query
    try {
      await prismaClient.arquivos.findMany({
        include: {
          empreendimento: {
            select: {
              id: true,
              nomeEmpreendimento: true,
              construtora: {
                select: {
                  id: true,
                  nome: true
                }
              }
            }
          }
        },
        where: {
          empreendimento: {
            id: empreendimento,
            construtora: {
              id: construtora
            }
          }
        }
      }).then(async (response: any) => {
        const temp = response.map((one: any) => ({
          id: one.id,
          nomeArquivo: one.nomeArquivo,
          hash: one.hash,
          quantidadeDownload: one.quantidadeDownload,
          empreendimento: {
            label: one.empreendimento.nomeEmpreendimento,
            value: one.empreendimento.id
          },
          construtora: {
            label: one.empreendimento.construtora.nome,
            value: one.empreendimento.construtora.id
          }
        }))
        res.status(200).json(temp)
      })
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