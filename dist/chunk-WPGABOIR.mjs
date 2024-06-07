// src/utils/gerador-ra.ts
function geradorRa() {
  const anoAtual = parseInt((/* @__PURE__ */ new Date()).getFullYear().toString().slice(-2));
  const numeroAleatorio = Math.floor(Math.random() * 1e7);
  return anoAtual * 1e7 + numeroAleatorio;
}

export {
  geradorRa
};
