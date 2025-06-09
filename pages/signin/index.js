import { useRouter } from "next/router";
import React, { useState } from "react";

function Index() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const route = useRouter();

  const signIn = async (event) => {
    event.preventDefault();

    const user = { identifier, password };

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (res.status === 200) {
      setIdentifier("");
      setPassword("");
      alert("Logged in successfully");
      route.replace("/dashboard");
    } else if (res.status === 404) {
      alert("User not found");
    } else if (res.status === 422) {
      alert("Username or password is incorrect");
    } else {
      alert("An error occured please try again later");
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
          onClick={signIn}
        />
      </form>
    </div>
  );
}

export default Index;
