import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../style/login.css";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notif, setNotif] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (event) => {
    console.log(event.target.value);
  }

  const handlePasswordChange = (event) => {
    console.log(event.target.value);
  }

  const handleRegister = (event) => {
    event.preventDefault();

    const payload = {
      email: email,
      password: password,
    }

    axios
      .post("https://reqres.in/api/register", payload)
      .then((res) => {
        setLoading(false);
        setNotif("Register Success");
        console.log(res.data);
      })
      .catch((err) => {
        setNotif(err.response.data.error);
      })
  }

  return (
    <div className="containerRegister">
      <div className="registerForm">
      <h1>Register</h1>
      <p>Its Completely Free</p>
      <p>{notif}</p>
      <form action={handleRegister}>
        <label htmlFor="firstname">
          First Name
          <input
            type="text"
            name="firstname"
            id="firstname" />
            Last Name
            <input
              type="text"
              name="lastname"
              id="lastname" />
        </label>
        <label htmlFor="username">Username
          <input
            type="text"
            name="username"
            id="username" />
        </label>
        <label htmlFor="email">Email
          <input 
          type="email" 
          name="email" 
          id="email" 
          onChange={handleEmailChange} />
        </label>
        <label htmlFor="password">Password
          <input
            type="password"
            name="password" 
            id="password"
            onChange={handlePasswordChange} />
        </label>
      </form>
      <button onClick={handleRegister} disabled={loading ? true : false}>{loading ? "Loading..." : "Register"}</button>
      </div>
    </div>
  )
}

export default Register;