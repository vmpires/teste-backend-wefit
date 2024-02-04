const validarTamanhoCPF = (documento: string) => documento.length === 11

const validarTamanhoCNPJ = (documento: string) => documento.length === 14

export const validarConteudoDocumento = (documento: string) => /^[0-9]{11,}$/.test(documento)

export const validarTamanhoCep = (cep: string) => /^[0-9]{8}$/.test(cep)

export const validarTelefone = (telefone: string) => /^[0-9]{8,}$/.test(telefone)

export const validarTamanhoEstado = (estado: string) => estado.length === 2

export const validarDocumento = (tipoDeEntidade: string, numeroDocumento: string) => {
  if (tipoDeEntidade === 'FISICA') {
    return validarTamanhoCPF(numeroDocumento)
  } else {
    return validarTamanhoCNPJ(numeroDocumento)
  }
}
