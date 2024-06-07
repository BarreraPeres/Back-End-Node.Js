// src/utils/calcular-data-padrao.ts
function calcularDataDevolucaoPadrao() {
  const dataAtual = /* @__PURE__ */ new Date();
  const dataDevolucao = new Date(dataAtual);
  dataDevolucao.setDate(dataAtual.getDate() + 7);
  return dataDevolucao.toISOString();
}

export {
  calcularDataDevolucaoPadrao
};
