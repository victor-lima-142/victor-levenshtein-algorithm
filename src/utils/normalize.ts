// Função para normalizar strings usando regex
export default function normalizeString(str: string): string {
    return str.replace(/\s+/g, ' ').trim().toLowerCase().replace(/[^\w\s]/gi, '');
}