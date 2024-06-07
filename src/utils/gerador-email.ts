export function geradorEmail(nome: string, ra: number): string {
    const dominio = "@universidade.com.br";
    const nomeEmail = nome.toLowerCase().replace(/ /g, '.');
    const email = `${nomeEmail}.${ra}${dominio}`;
    return email;
}
