"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCode = void 0;
const codeModel_1 = require("../models/codeModel");
const saveCode = async (req, res) => {
    const { fullCode } = req.body;
    try {
        const newCode = await codeModel_1.Code.create({ fullCode: fullCode });
        return res.status(200).send(newCode);
    }
    catch (error) {
        return res.status(500).json({ message: "Error while savinf code" });
    }
};
exports.saveCode = saveCode;
