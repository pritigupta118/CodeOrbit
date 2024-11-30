import { Request, Response } from "express";
import { Code } from "../models/codeModel";
import { fullCodeTypes } from "../types/compilerTypes";


export const saveCode = async (req: Request, res: Response) : Promise<any> => {
  const fullCode: fullCodeTypes = req.body
  
  if (!fullCode.html && !fullCode.css && !fullCode.javascript) {
    return res.status(400).send({ message: "Code can't be blank!" })
  }
  try {
    const newCode = await Code.create({fullCode : fullCode})
    return res.status(201).send({url:newCode._id, message: "saved!"})
  } catch (error) {
    return res.status(500).send({ message: "Error while saving code" })
  }
}

export const loadCode = async (req: Request, res: Response): Promise<any> => {
try {
  const {urlId} = req.body
const existingCode = await Code.findById(urlId)
return res.status(200).send({fullCode: existingCode?.fullCode})
} catch (error) {
  return res.status(500).json({ message: "Error while loading code" })
}
}