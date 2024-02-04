import * as zod from 'zod';
import {
  validarConteudoDocumento,
  validarDocumento,
  validarTamanhoCep,
  validarTamanhoEstado,
  validarTelefone
} from './validacoes';


export const usuarioSchema = zod.object({
  tipoDeEntidade: zod.enum(['FISICA', 'JURIDICA']),
  numeroDocumento: zod.string().refine(validarConteudoDocumento, {
    message: "O documento só deve conter números, sendo 11 para CPF e 14 para CNPJ."
  }),
  nome: zod.string(),
  celular: zod.string().refine(validarTelefone, {
    message: "Telefones devem ser apenas números com no mínimo 8 caracteres"
  }),
  telefone: zod.optional(zod.string().refine(validarTelefone, {
    message: "Telefones devem ser apenas números com no mínimo 8 caracteres"
  })),
  email: zod.string().email({ message: "Email inválido" }),
  confirmacaoEmail: zod.string(),
  cep: zod.string().refine(validarTamanhoCep, {
    message: 'O CEP deve conter 8 caracteres numéricos',
  }),
  logradouro: zod.string(),
  complemento: zod.optional(zod.string()),
  cidade: zod.string(),
  bairro: zod.string(),
  estado: zod.string().refine(validarTamanhoEstado, {
    message: 'O estado deve ter exatamente 2 caracteres.',
  }),
  aceiteTermosDeUso: zod.boolean().refine(value => value === true, {
    message: 'Os Termos de Uso devem ser aceitos',
  })
}).refine((data) => data.email === data.confirmacaoEmail, {
  message: "O Email e a confirmação de email devem ser iguais",
}).refine(
  (data) => validarDocumento(data.tipoDeEntidade, data.numeroDocumento),
  (data) => ({ message: `Tamanho de documento pessoa ${data.tipoDeEntidade} incorreto` })
);
