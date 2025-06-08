import connecttoDB from "@/configs/db";
import userModel from "@/models/User";
import { generateToken, hashPassword } from "@/utils/auth";
import { serialize } from "cookie";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return false;
  }
  try {
    connecttoDB();

    const { firstname, lastname, username, email, password } = req.body;

    if (
      !firstname.trim() ||
      !lastname.trim() ||
      !username.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      return res.status(422).json({ message: "Data is not valid" });
    }

    const isUserExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserExist) {
      return res
        .status(422)
        .json({ message: "This user or email already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const token = generateToken({ email });

    const users = userModel.find({});

    await userModel.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
      role: users.length > 0 ? "USER" : "ADMIN",
    });

    return res
      .setHeader(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24,
        })
      )
      .status(201)
      .json({ message: "User got created successfully", token });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Unkown internal server error", error: err });
  }
};
export default handler;
