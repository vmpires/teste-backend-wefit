import { Request, Response } from 'express';
import * as z from 'zod';
import { Usuario, criarUsuario } from '../models/UsuarioModel';
import { validadorTamanhoCep, validadorTamanhoEstado, validarDocumento } from 'src/utils/validacoes';

const usuarioSchema = z.object({
  tipoDeEntidade: z.enum(['FISICA', 'JURIDICA']),
  numeroDocumento: z.string(),
  nome: z.string(),
  celular: z.number(),
  telefone: z.optional(z.number()),
  email: z.string().email({ message: "Email inválido" }),
  confirmacaoEmail: z.string(),
  cep: z.string().refine(validadorTamanhoCep, {
    message: 'O CEP deve conter 8 ou 9 caracteres',
  }),
  logradouro: z.string(),
  complemento: z.optional(z.string()),
  cidade: z.string(),
  bairro: z.string(),
  estado: z.string().refine(validadorTamanhoEstado, {
    message: 'O estado deve ter exatamente 2 caracteres.',
  }),
  aceiteTermosDeUso: z.boolean().refine(value => value === true, {
    message: 'Os Termos de Uso devem ser aceitos',
  }),
  criadoEm: z.optional(z.date()),
  atualizadoEm: z.optional(z.date())
}).refine((data) => data.email === data.confirmacaoEmail, {
  message: "O Email e a confirmação de email devem ser iguais",
}).refine(
  (data) => validarDocumento(data.tipoDeEntidade, data.numeroDocumento),
  (data) => ({ message: `Tamanho de documento pessoa ${data.tipoDeEntidade} incorreto`  })
  );

export const registrar = async (req: Request, res: Response) => {
  try {
    const usuario: Usuario = usuarioSchema.parse(req.body);
    const resultado = await criarUsuario(usuario);
    res.status(201).json(resultado);
  } catch (errors: any) {
    if (errors.meta) {
      res.status(422).json({ Erro: "Email já registrado" });
    } else {
      res.status(422).json({ Erros: errors.issues.map((error: any) => error.message) });
    }
  }
};
