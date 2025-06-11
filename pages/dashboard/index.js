import connecttoDB from "@/configs/db";
import userModel from "@/models/User";
import { verifyToken } from "@/utils/auth";
import { getSession } from "next-auth/react";
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

export async function getServerSideProps({ req }) {
  const session = await getSession({req});

  console.log(session)

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
      },
    };
  }
  connecttoDB();

  const user = await userModel.findOne(
    {
      email: session.user.email,
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
