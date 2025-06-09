import React from "react";
import connecttoDB from "@/configs/db";
import userModel from "@/models/User";
import { verifyToken } from "@/utils/auth";

function PAdmin({ user }) {
  return <h1>Welcome To Admin Panel ❤️, Mr.{user.lastname}</h1>;
}

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: "/signin",
      },
    };
  }

  const isValidToken = await verifyToken(token);

  if (!isValidToken) {
    return {
      redirect: {
        destination: "/signin",
      },
    };
  }
  connecttoDB();

  const user = await userModel.findOne(
    {
      email: isValidToken.email,
    },
    "firstname lastname role"
  );

  if (user.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

export default PAdmin;
