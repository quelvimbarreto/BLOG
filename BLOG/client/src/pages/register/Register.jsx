import "./register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [res, setRes] = useState(null);

  const handleSubmit = async function (e) {
    e.preventDefault();

    try {
      const creationRes = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      setRes(creationRes.data);
      setTimeout(() => {
        window.location.replace("/login");
      }, 2000);
    } catch (err) {
      console.log(err.response.data.keyValue);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="email"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {res && (
          <span>
            Usuário <b>{res.username}</b>" criado com sucesso!
          </span>
        )}
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link to="/login">Login</Link>
      </button>
    </div>
  );
}
