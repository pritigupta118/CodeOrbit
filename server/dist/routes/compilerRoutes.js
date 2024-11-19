"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compilerRouter = void 0;
const express_1 = __importDefault(require("express"));
const compilerController_1 = require("../controllers/compilerController");
exports.compilerRouter = express_1.default.Router();
exports.compilerRouter.post("/save", compilerController_1.saveCode);
