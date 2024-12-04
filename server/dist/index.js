"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const dbConnect_1 = require("./lib/dbConnect");
const compilerRoutes_1 = require("./routes/compilerRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
(0, dotenv_1.config)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ credentials: true, origin: "http://localhost:5173" }));
(0, dbConnect_1.dbConnect)();
app.use("/compiler", compilerRoutes_1.compilerRouter);
app.use("/user", userRoutes_1.userRouter);
app.listen(4000, () => {
    console.log("app is listening to port 4000");
});
