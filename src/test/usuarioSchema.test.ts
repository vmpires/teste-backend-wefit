import { PrismaClient } from '@prisma/client';
import { describe, expect, test } from '@jest/globals';
import { usuarioSchema } from '../utils/usuarioSchema';

enum tiposDeEntidade {
  FISICA = "FISICA",
  JURIDICA = "JURIDICA"
}

describe('usuarioSchema', () => {
  it('deve retornar o objeto após passar no Zod parser', async () => {
    const mockData = {
      "tipoDeEntidade": tiposDeEntidade.FISICA,
      "numeroDocumento": "40712507809",
      "nome": "Victor Pires",
      "celular": "11989145646",
      "telefone": "11989145646",
      "email": "teste36557@gmail.com",
      "confirmacaoEmail": "teste36557@gmail.com",
      "cep": "09121130",
      "logradouro": "Rua General Câmara",
      "complemento": "Apto 3",
      "cidade": "Santo André",
      "bairro": "Vila Humaitá",
      "estado": "SP",
      "aceiteTermosDeUso": true,
    }

    const result = await usuarioSchema.parse(mockData)

    expect(result).toEqual(mockData);
  });


  it('deve gerar erro de documento pessoa física com número de caracteres incorreto', async () => {
    const mockData = {
      "tipoDeEntidade": tiposDeEntidade.FISICA,
      "numeroDocumento": "407125078091444",
      "nome": "Victor Pires",
      "celular": "11989145646",
      "telefone": "11989145646",
      "email": "teste36557@gmail.com",
      "confirmacaoEmail": "teste36557@gmail.com",
      "cep": "09121130",
      "logradouro": "Rua General Câmara",
      "complemento": "Apto 3",
      "cidade": "Santo André",
      "bairro": "Vila Humaitá",
      "estado": "SP",
      "aceiteTermosDeUso": true,
    }

      try {
        await usuarioSchema.parse(mockData);
      } catch (error: any) {
        expect(error.message).toMatch("Tamanho de documento pessoa FISICA incorreto");
      }
  });


  it('deve gerar erro de documento pessoa jurídica com número de caracteres incorreto', async () => {
    const mockData = {
      "tipoDeEntidade": tiposDeEntidade.JURIDICA,
      "numeroDocumento": "4071250",
      "nome": "Victor Pires",
      "celular": "11989145646",
      "telefone": "11989145646",
      "email": "teste36557@gmail.com",
      "confirmacaoEmail": "teste36557@gmail.com",
      "cep": "09121130",
      "logradouro": "Rua General Câmara",
      "complemento": "Apto 3",
      "cidade": "Santo André",
      "bairro": "Vila Humaitá",
      "estado": "SP",
      "aceiteTermosDeUso": true,
    }

      try {
        await usuarioSchema.parse(mockData);
      } catch (error: any) {
        expect(error.message).toMatch("Tamanho de documento pessoa JURIDICA incorreto");
      }
  });


  it('deve gerar erro de telefone com número incorreto', async () => {
    const mockData = {
      "tipoDeEntidade": tiposDeEntidade.FISICA,
      "numeroDocumento": "40712507809",
      "nome": "Victor Pires",
      "celular": "123",
      "telefone": "123",
      "email": "teste36557@gmail.com",
      "confirmacaoEmail": "teste36557@gmail.com",
      "cep": "09121130",
      "logradouro": "Rua General Câmara",
      "complemento": "Apto 3",
      "cidade": "Santo André",
      "bairro": "Vila Humaitá",
      "estado": "SP",
      "aceiteTermosDeUso": true,
    }

      try {
        await usuarioSchema.parse(mockData);
      } catch (error: any) {
        expect(error.message).toMatch("Telefones devem ser apenas números com no mínimo 8 caracteres");
      }
  });


  it('deve gerar erro de emails diferentes', async () => {
    const mockData = {
      "tipoDeEntidade": tiposDeEntidade.FISICA,
      "numeroDocumento": "40712507809",
      "nome": "Victor Pires",
      "celular": "11989145646",
      "telefone": "1144279790",
      "email": "teste123@gmail.com",
      "confirmacaoEmail": "teste456@gmail.com",
      "cep": "09121130",
      "logradouro": "Rua General Câmara",
      "complemento": "Apto 3",
      "cidade": "Santo André",
      "bairro": "Vila Humaitá",
      "estado": "SP",
      "aceiteTermosDeUso": true,
    }

      try {
        await usuarioSchema.parse(mockData);
      } catch (error: any) {
        expect(error.message).toMatch("O Email e a confirmação de email devem ser iguais");
      }
  });


  it('deve gerar erro de CEP com número de caracteres incorreto', async () => {
    const mockData = {
      "tipoDeEntidade": tiposDeEntidade.FISICA,
      "numeroDocumento": "40712507809",
      "nome": "Victor Pires",
      "celular": "11989145646",
      "telefone": "1144279790",
      "email": "teste123@gmail.com",
      "confirmacaoEmail": "teste123@gmail.com",
      "cep": "09121",
      "logradouro": "Rua General Câmara",
      "complemento": "Apto 3",
      "cidade": "Santo André",
      "bairro": "Vila Humaitá",
      "estado": "SP",
      "aceiteTermosDeUso": true,
    }

      try {
        await usuarioSchema.parse(mockData);
      } catch (error: any) {
        expect(error.message).toMatch("O CEP deve conter 8 caracteres numéricos");
      }
  });


  it('deve gerar erro de estado com número de caracteres incorreto', async () => {
    const mockData = {
      "tipoDeEntidade": tiposDeEntidade.FISICA,
      "numeroDocumento": "40712507809",
      "nome": "Victor Pires",
      "celular": "11989145646",
      "telefone": "1144279790",
      "email": "teste123@gmail.com",
      "confirmacaoEmail": "teste123@gmail.com",
      "cep": "09121130",
      "logradouro": "Rua General Câmara",
      "complemento": "Apto 3",
      "cidade": "Santo André",
      "bairro": "Vila Humaitá",
      "estado": "SPA",
      "aceiteTermosDeUso": true,
    }

      try {
        await usuarioSchema.parse(mockData);
      } catch (error: any) {
        expect(error.message).toMatch("O estado deve ter exatamente 2 caracteres.");
      }
  });


  it('deve gerar erro de termos não aceitos', async () => {
    const mockData = {
      "tipoDeEntidade": tiposDeEntidade.FISICA,
      "numeroDocumento": "40712507809",
      "nome": "Victor Pires",
      "celular": "11989145646",
      "telefone": "1144279790",
      "email": "teste123@gmail.com",
      "confirmacaoEmail": "teste123@gmail.com",
      "cep": "09121130",
      "logradouro": "Rua General Câmara",
      "complemento": "Apto 3",
      "cidade": "Santo André",
      "bairro": "Vila Humaitá",
      "estado": "SP",
      "aceiteTermosDeUso": false,
    }

      try {
        await usuarioSchema.parse(mockData);
      } catch (error: any) {
        expect(error.message).toMatch("Os Termos de Uso devem ser aceitos");
      }
  });

});
