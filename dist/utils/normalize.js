"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = normalizeString;
// Função para normalizar strings usando regex
function normalizeString(str) {
    return str.replace(/\s+/g, ' ').trim().toLowerCase().replace(/[^\w\s]/gi, '');
}
