import { useRouter } from "next/router";
import React, { useState } from "react";

function Index() {
  const route = useRouter();

  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submitForm = async (event) => {
    event.preventDefault();
    const user = { firstname, lastname, username, email, password };
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (res.status === 201) {
      setFirstName("");
      setLastName("");
      setUserName("");
      setEmail("");
      setPassword("");

      alert("Registered successfully!");
      route.replace("/dashboard");
    } else if (res.status === 422) {
      alert("This user or email already exists");
    }
  };

  return (
    <div className="box">
      <h1 align="center">SignUp Form</h1>
      <form role="form" method="post">
        <div className="inputBox">
          <input
            type="text"
            autoComplete="off"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label>Firstname</label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            autoComplete="off"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <label>Lastname</label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            autoComplete="off"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <label>Username</label>
        </div>
        <div className="inputBox">
          <input
            type="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email</label>
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
          value="Sign Up"
          onClick={submitForm}
        />
      </form>
    </div>
  );
}

export default Index;
