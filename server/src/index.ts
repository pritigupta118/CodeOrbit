import express from "express";
import cors from "cors"
import {config} from "dotenv"
import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compilerRoutes";
import { userRouter } from "./routes/userRoutes";
import cookieParser from "cookie-parser"

const app = express()
config()

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true,  origin: ["http://localhost:5173", process.env.CLIENT_URL!],}))

dbConnect()

app.use("/compiler", compilerRouter)
app.use("/user", userRouter)

app.listen(4000, () => {
  console.log("app is listening to port 4000");
  
})



