import connecttoDB from "@/configs/db";
import userModel from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Next-Credentials",
      async authorize(credentials, req) {
        connecttoDB();
        const { identifier, password } = credentials;

        if (!identifier.trim() || !password.trim()) {
          throw new Error("Data is not valid");
        }

        const user = await userModel.findOne({
          $or: [{ username: identifier }, { email: identifier }],
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isValidPassword = await verifyPassword(password, user.password);

        if (!isValidPassword) {
          throw new Error("Username or password is wrong");
        }

        return { email: user.email };
      },
    }),
  ],
});
