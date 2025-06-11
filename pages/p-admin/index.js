import React from "react";
import connecttoDB from "@/configs/db";
import userModel from "@/models/User";

function PAdmin({ user }) {
  return <h1>Welcome To Admin Panel ❤️, Mr.{user.lastname}</h1>;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req });

  console.log(session);

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
