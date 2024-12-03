import { Request, Response } from "express";
import { Code } from "../models/codeModel";
import { fullCodeTypes } from "../types/compilerTypes";
import { AuthRequest } from "../middlewares/varifyToken";
import { User } from "../models/userModel";


export const saveCode = async (req: AuthRequest, res: Response): Promise<any> => {
  const { fullCode, title }: { fullCode: fullCodeTypes, title: string } = req.body

  const user = await User.findById(req._id)
  if (!user) {
    return res.status(404).send({ message: "User not found!" })
  }


  if (!fullCode.html && !fullCode.css && !fullCode.javascript) {
    return res.status(400).send({ message: "Code can't be blank!" })
  }

  try {
    const newCode = await Code.create({
      fullCode: fullCode,
      title: title,
      ownerName: user?.username,
      ownerInfo: user?._id
    })
    user.savedCodes.push(newCode._id)
    await user.save()

    return res.status(201).send({ url: newCode._id, message: "saved!" })
  } catch (error) {
    return res.status(500).send({ message: "Error while saving code" })
  }
}

export const loadCode = async (req: Request, res: Response): Promise<any> => {
  try {
    const { urlId } = req.body
    const existingCode = await Code.findById(urlId)
    return res.status(200).send({ fullCode: existingCode?.fullCode })
  } catch (error) {
    return res.status(500).json({ message: "Error while loading code" })
  }
}

export const getMyCodes = async (req: AuthRequest, res: Response): Promise<any> => {
  const userId = req._id
  try {
    const user = await User.findById(userId).populate({
      path: "savedCodes",
      options: { sort: { createdAt: -1 } },
    })
    if (!user) {
      return res.status(404).send({ message: "User not found!" })
    }
    return res.status(200).send(user.savedCodes)
  } catch (error) {
    return res.status(500).send({ message: "Error while loading codes!" })
  }
}

export const deleteCode = async (req: AuthRequest, res: Response): Promise<any> => {
  const userId = req._id
  const { id } = req.params
  try {
    const owner = await User.findById(userId)
    if (!owner) {
      return res.status(404).send({ message: "User not found!" })
    }
    const existingCode = await Code.findById(id)
    if (!existingCode) {
      return res.status(404).send({ message: "Code not found" });
    }
    if (existingCode.ownerName !== owner.username) {
      return res
        .status(400)
        .send({ message: "You don't have permission to delete this code!" });
    }

    const deletedCode = await Code.findByIdAndDelete(id)
    if (deletedCode) {
      return res.status(200).send({ message: "Code Deleted successfully!" });
    } else {
      return res.status(404).send({ message: "Code not found" });
    }

  } catch (error) {
    return res.status(500).send({ message: "Error while deleting codes!" })
  }
}