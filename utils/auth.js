import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

const generateToken = (data) => {
  const token = sign({ ...data }, process.env.PRIVATE_KEY, {
    algorithm: "HS256",
    expiresIn: "24h",
  });

  return token;
};

const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};

const verifyToken = (token) => {
  try {
    const validationResult = verify(token, process.env.PRIVATE_KEY);
    return validationResult;
  } catch (err) {
    console.log("Verify token error: ", err);
    return false;
  }
};

export { hashPassword, generateToken, verifyPassword, verifyToken };
