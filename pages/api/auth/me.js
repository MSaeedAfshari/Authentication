import connecttoDB from "@/configs/db";
import userModel from "@/models/User";
import { verifyToken } from "@/utils/auth";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return false;
  }
  try {
    const { token } = context.req.cookies;

    if (!token) {
      return res.status(401).json({ message: "You are not login" });
    }

    const isValidToken = await verifyToken(token);

    if (!isValidToken) {
      return res.status(401).json({ message: "You are not login" });
    }

    connecttoDB();

    const user = await userModel.findOne(
      {
        email: isValidToken.email,
      },
      "firstname lastname role"
    );

    return res.status(200).json({ data: user });
  } catch (err) {
    return res.status(200).json({ message: "A server error occured" });
  }
};
export default handler;
