

/**
 * Gera um número de RA aleatório.
 * O RA é um número de 9 dígitos onde os primeiros 2 dígitos são o ano atual e os 7 restantes são gerados aleatoriamente.
 * @returns {number} O número de RA gerado.
 */
export function geradorRa(): number {
    const anoAtual = parseInt(new Date().getFullYear().toString().slice(-2)); // Obtém os últimos 2 dígitos do ano atual
    const numeroAleatorio = Math.floor(Math.random() * 10000000); // Gera um número aleatório de 7 dígitos
    return anoAtual * 10000000 + numeroAleatorio;
}


