import mongoose from "mongoose";

interface IUserSchema {
  username: string;
  email: string;
  password: string;
  picture: string;
  savedCodes: Array<mongoose.Types.ObjectId>
}

const userSchema = new mongoose.Schema<IUserSchema>({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  picture: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
  },
  savedCodes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Code" }],
},
  { timestamps: true }
)

export const User = mongoose.model("User", userSchema)