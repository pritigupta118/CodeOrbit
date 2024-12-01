import express from "express"
import { loadCode, saveCode } from "../controllers/compilerController"
import { verifyToken } from "../middlewares/varifyToken";

export const compilerRouter = express.Router()

compilerRouter.post("/save",verifyToken, saveCode);
compilerRouter.post("/load", loadCode);