export function calcularDataDevolucaoPadrao(): string {
  const dataAtual = new Date();
  const dataDevolucao = new Date(dataAtual);
  dataDevolucao.setDate(dataAtual.getDate() + 7); // Adiciona 7 dias
  return dataDevolucao.toISOString(); // Formato ISO (YYYY-MM-DDTHH:mm:ss.sssZ)
}
