import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class CreateConstrutoraController {
  async handle(req: Request, res: Response) {
    const { nome, nomeContato, email, telefone } = req.body;

    const construtora = await prismaClient.construtoras.create({
      data: {
        nome,
        nomeContato,
        email,
        telefone,
      },
    });

    return res.status(201).json(construtora);
  }
}
