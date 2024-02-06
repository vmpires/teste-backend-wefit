import prisma from "../client";

export interface Usuario {
  tipoDeEntidade: 'FISICA' | 'JURIDICA';
  numeroDocumento: string;
  nome: string;
  celular: string;
  telefone?: string;
  email: string;
  confirmacaoEmail: string;
  cep: string;
  logradouro: string;
  complemento?: string;
  cidade: string;
  bairro: string;
  estado: string;
  aceiteTermosDeUso: boolean;
}

export const criarUsuario = async (usuario: Usuario) => {
  return prisma.usuario.create({
    data: usuario,
  });
};
