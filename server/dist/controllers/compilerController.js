"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCode = exports.getMyCodes = exports.loadCode = exports.saveCode = void 0;
const codeModel_1 = require("../models/codeModel");
const userModel_1 = require("../models/userModel");
const saveCode = async (req, res) => {
    const { fullCode, title } = req.body;
    const user = await userModel_1.User.findById(req._id);
    if (!user) {
        return res.status(404).send({ message: "User not found!" });
    }
    if (!fullCode.html && !fullCode.css && !fullCode.javascript) {
        return res.status(400).send({ message: "Code can't be blank!" });
    }
    try {
        const newCode = await codeModel_1.Code.create({
            fullCode: fullCode,
            title: title,
            ownerName: user?.username,
            ownerInfo: user?._id
        });
        user.savedCodes.push(newCode._id);
        await user.save();
        return res.status(201).send({ url: newCode._id, message: "saved!" });
    }
    catch (error) {
        return res.status(500).send({ message: "Error while saving code" });
    }
};
exports.saveCode = saveCode;
const loadCode = async (req, res) => {
    try {
        const { urlId } = req.body;
        const existingCode = await codeModel_1.Code.findById(urlId);
        return res.status(200).send({ fullCode: existingCode?.fullCode });
    }
    catch (error) {
        return res.status(500).json({ message: "Error while loading code" });
    }
};
exports.loadCode = loadCode;
const getMyCodes = async (req, res) => {
    const userId = req._id;
    try {
        const user = await userModel_1.User.findById(userId).populate({
            path: "savedCodes",
            options: { sort: { createdAt: -1 } },
        });
        if (!user) {
            return res.status(404).send({ message: "User not found!" });
        }
        return res.status(200).send(user.savedCodes);
    }
    catch (error) {
        return res.status(500).send({ message: "Error while loading codes!" });
    }
};
exports.getMyCodes = getMyCodes;
const deleteCode = async (req, res) => {
    const userId = req._id;
    const { id } = req.params;
    try {
        const owner = await userModel_1.User.findById(userId);
        if (!owner) {
            return res.status(404).send({ message: "User not found!" });
        }
        const existingCode = await codeModel_1.Code.findById(id);
        if (!existingCode) {
            return res.status(404).send({ message: "Code not found" });
        }
        if (existingCode.ownerName !== owner.username) {
            return res
                .status(400)
                .send({ message: "You don't have permission to delete this code!" });
        }
        const deletedCode = await codeModel_1.Code.findByIdAndDelete(id);
        if (deletedCode) {
            return res.status(200).send({ message: "Code Deleted successfully!" });
        }
        else {
            return res.status(404).send({ message: "Code not found" });
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Error while deleting codes!" });
    }
};
exports.deleteCode = deleteCode;
