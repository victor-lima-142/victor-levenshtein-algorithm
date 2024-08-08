"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeString = exports.regularLevenshteinAlgorithm = exports.basicLevenshteinAlgorithm = exports.optimizedLevenshteinAlgorithm = void 0;
var optimized_1 = require("./optimized");
Object.defineProperty(exports, "optimizedLevenshteinAlgorithm", { enumerable: true, get: function () { return __importDefault(optimized_1).default; } });
var basic_1 = require("./basic");
Object.defineProperty(exports, "basicLevenshteinAlgorithm", { enumerable: true, get: function () { return __importDefault(basic_1).default; } });
var regular_1 = require("./regular");
Object.defineProperty(exports, "regularLevenshteinAlgorithm", { enumerable: true, get: function () { return __importDefault(regular_1).default; } });
var normalize_1 = require("./normalize");
Object.defineProperty(exports, "normalizeString", { enumerable: true, get: function () { return __importDefault(normalize_1).default; } });
