import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Usuario {
  tipoDeEntidade: 'FISICA' | 'JURIDICA';
  numeroDocumento: string;
  nome: string;
  celular: number;
  telefone?: number;
  email: string;
  confirmacaoEmail: string;
  cep: string;
  logradouro: string;
  complemento?: string;
  cidade: string;
  bairro: string;
  estado: string;
  aceiteTermosDeUso: boolean;
  criadoEm?: Date | string;
  atualizadoEm?: Date | string;
}

export const criarUsuario = async (usuario: Usuario) => {
  return prisma.usuario.create({
    data: usuario,
  });
};
