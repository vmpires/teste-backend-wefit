import { PrismaClient } from '@prisma/client';
import { describe, expect, test } from '@jest/globals';
import { criarUsuario } from '../models/UsuarioModel';
import { prismaMock } from '../singleton';


describe('UsuarioModel', () => {

  it('should create a record', async () => {

    enum tiposDeEntidade {
      FISICA = "FISICA",
      JURIDICA = "JURIDICA"
    }

    const mockData = {
      "id": 1,
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
      "atualizadoEm": new Date(),
      "criadoEm": new Date()
    }

    prismaMock.usuario.create.mockResolvedValueOnce(mockData);

    const result = await criarUsuario(mockData);

    expect(result).toEqual(mockData);
    expect(prismaMock.usuario.create).toHaveBeenCalledWith({ data: mockData });
  });

});
