const validadorTamanhoCPF = (documento: string) => documento.length === 11

const validadorTamanhoCNPJ = (documento: string) => documento.length === 14

export const validadorTamanhoCep = (valor: string) => valor.length === 8 || valor.length === 9;

export const validadorTamanhoEstado = (estado: string) => estado.length === 2

export const validarDocumento = (tipoDeEntidade: string, numeroDocumento: string) => {
  if (tipoDeEntidade === 'FISICA') {
    return validadorTamanhoCPF(numeroDocumento)
  } else {
    return validadorTamanhoCNPJ(numeroDocumento)
  }
}
