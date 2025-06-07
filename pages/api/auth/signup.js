import connecttoDB from "@/configs/db";
import userModel from "@/models/User";

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

    await userModel.create({
      firstname,
      lastname,
      username,
      email,
      password,
      role: "USER",
    });

    return res.status(201).json({ message: "User got created successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Unkown internal server error" });
  }
};
export default handler;
