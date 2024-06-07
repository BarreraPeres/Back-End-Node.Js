// src/utils/gerador-email.ts
function geradorEmail(nome, ra) {
  const dominio = "@universidade.com.br";
  const nomeEmail = nome.toLowerCase().replace(/ /g, ".");
  const email = `${nomeEmail}.${ra}${dominio}`;
  return email;
}

export {
  geradorEmail
};
