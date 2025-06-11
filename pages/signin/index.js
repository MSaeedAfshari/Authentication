import { useRouter } from "next/router";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

function Index() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const signin = async (event) => {
    event.preventDefault();
    const res = await signIn("credentials", {
      identifier,
      password,
      redirect: false,
    });

    if (res.status === 200) {
      router.replace('/dashboard')
    }
  };

  return (
    <div className="box">
      <h1 align="center">Login Form</h1>
      <form role="form" method="post">
        <div className="inputBox">
          <input
            type="text"
            autoComplete="off"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <label>Username | Email</label>
        </div>
        <div className="inputBox">
          <input
            type="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>

        <input
          type="submit"
          className="register-btn"
          value="Sign In"
          onClick={signin}
        />
      </form>
    </div>
  );
}

export default Index;
