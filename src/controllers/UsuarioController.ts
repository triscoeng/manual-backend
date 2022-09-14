import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";

export class CreateUsuarioController {
  async handle(req: Request, res: Response) {
    const data = req.body;

    bcrypt.genSalt(10, (err, salt) => {
      if (err) res.status(401).end();
      bcrypt.hash(data.senha, salt, async (err, hash) => {
        if (err) return res.status(401).end();

        await prismaClient.usuarios.create({
          data: {
            usuario: data.usuario,
            nomeUsuario: data.nomeUsuario,
            email: data.email,
            senhaUsuario: hash,
          },
        });
        res.status(201).send(true);
      });
    });
  }
}

export class LoginUsuarioController {
  async handle(req: Request, res: Response) {
    const loginData = req.body;

    if (!loginData.senha || !loginData.usuario || loginData.senha === null) {
      return res.status(400).send(false);
    }

    const { senhaUsuario, ...user }: any =
      await prismaClient.usuarios.findUnique({
        where: { usuario: loginData.usuario },
      });

    bcrypt.compare(loginData.senha, senhaUsuario, async (err, next) => {
      if (!next) return res.status(401).send({ logged: false, data: null });

      const sauce: any = process.env.saucePassword;
      const token = jwt.sign({ logged: true, data: user }, sauce, {
        expiresIn: 30000,
      });
      const resposta = jwt.decode(token);
      res.status(200).json({ token: token, data: resposta });
    });
  }
}

export class VerifyUsuarioController {
  async handle(req: Request, res: Response) {
    const token: any = req.headers.authorization;
    const sauce: any = process.env.saucePassword;

    jwt.verify(token, sauce, (err: any, result: any) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        const data = jwt.decode(token);
        return res.status(200).json({ data: data, token: token });
      }
    });
  }
}

export class UpdateUsuarioController {
  async handle(req: Request, res: Response) {}
}

export class DeleteUsuarioController {
  async handle(req: Request, res: Response) {}
}
