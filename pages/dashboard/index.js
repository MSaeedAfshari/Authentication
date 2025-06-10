import connecttoDB from "@/configs/db";
import userModel from "@/models/User";
import { verifyToken } from "@/utils/auth";
import React from "react";

function Dashboard({ user }) {
  return (
    <>
      <h1>
        {user.firstname} - {user.lastname} - Welcome To Dashboard
      </h1>
    </>
  );
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
    "firstname lastname"
  );

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

export default Dashboard;
