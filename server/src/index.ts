import express from "express";
import cors from "cors"
import {config} from "dotenv"
import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compilerRoutes";

const app = express()
config()

app.use(express.json())
app.use(cors())

dbConnect()

app.use("/compiler", compilerRouter)

app.listen(4000, () => {
  console.log("app is listening to port 4000");
  
})



