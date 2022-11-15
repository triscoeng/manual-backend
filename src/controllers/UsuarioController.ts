import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";

const xablauPassword = (string: string) => {
  const salt = bcrypt.genSaltSync(10)
  const password = bcrypt.hashSync(string, salt)
  return password
}

export class CreateUsuarioController {
  async handle(req: Request, res: Response) {
    const data = req.body;

    bcrypt.genSalt(10, (err, salt) => {
      if (err) res.status(401).send(err);
      bcrypt.hash(data.senha, salt, async (err, hash) => {
        console.log(err)
        if (err) return res.status(400).json(err);

        await prismaClient.usuarios.create({
          data: {
            usuario: data.usuario.toLowerCase(),
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
    const { usuario, senha }: any = req.body;

    if (!senha || !usuario) {
      return res.status(400).json({ logged: false, data: "Usuário ou Senha em Branco" });
    }

    const userDb = await prismaClient.usuarios.findUnique({
      where: {
        usuario: usuario.toLowerCase()
      }
    })

    if (!userDb) {
      res.status(400).json({ logged: false, data: "Usuário não encontrado" })
    } else {
      bcrypt.compare(senha, userDb.senhaUsuario, async (err, status) => {
        console.log(status)
        if (!status) return res.status(401).send({ logged: false, data: "Senha Incorreta" });

        const sauce: any = process.env.saucePassword;
        const token = jwt.sign({ logged: true, data: userDb }, sauce, {
          expiresIn: 30000,
        });
        const resposta = jwt.decode(token);
        res.status(200).json({ token: token, data: resposta });
      });

    }

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
  async handle(req: Request, res: Response) {
    const { senha, usuario, ...data } = req.body
    const id = req.params.id

    if (senha) {
      data.senhaUsuario = xablauPassword(senha)
    }


    const update = await prismaClient.usuarios.update({
      where: {
        id: id
      },
      data: {
        ...data
      }
    })

    res.status(200).send(update)
  }
}

export class DeleteUsuarioController {
  async handle(req: Request, res: Response) {
    const { id } = req.params

    const deleted = await prismaClient.usuarios.delete({
      where: {
        id: id
      }
    })

    if (!deleted) res.status(400).json(false)
    res.status(200).json(true)
  }
}
