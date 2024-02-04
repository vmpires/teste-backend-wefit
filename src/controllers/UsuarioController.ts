import { Request, Response } from 'express';
import { Usuario, criarUsuario } from '../models/UsuarioModel';
import { usuarioSchema } from 'src/utils/usuarioSchema';

export const registrar = async (req: Request, res: Response) => {
  try {
    const usuario: Usuario = usuarioSchema.parse(req.body);
    const resultado = await criarUsuario(usuario);
    console.log(`Usuário: ${usuario.nome} / Email: ${usuario.email} cadastrado com sucesso!`)
    res.status(201).json(resultado);
  } catch (errors: any) {
    if (errors.meta) {
      console.log("Erro ao tentar criar usuário: email já registrado")
      res.status(422).json({ Erro: "Email já registrado" });
    } else if (errors.issues) {
      console.log(`Erro ao tentar criar usuário: ${errors.issues.map((error: any) => error.message)}`)
      res.status(422).json({ Erros: errors.issues.map((error: any) => error.message) });
    } else {
      res.status(500).json({ Erro: errors });
    }
  }
};
