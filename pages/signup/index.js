import React, { useState } from "react";

function Index() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <div className="box">
      <h1 align="center">SignUp Form</h1>
      <form role="form" method="post">
        <div className="inputBox">
          <input
            type="text"
            autoComplete="off"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label>Firstname</label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            autoComplete="off"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <label>Lastname</label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            autoComplete="off"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <label>Username</label>
        </div>
        <div className="inputBox">
          <input
            type="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email</label>
        </div>
        <div className="inputBox">
          <input
            type="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>

        <input type="submit" className="register-btn" value="Sign Up" />
      </form>
    </div>
  );
}

export default Index;
