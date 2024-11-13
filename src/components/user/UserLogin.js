import React, {useState}from 'react'
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserLogin({ getUserData }) {
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const navigate = useNavigate();
  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  const [userLoginInfo, setUserLoginInfo] = useState({
    email: "",
    password: "",
  });
  function onChangeHandlerEmailLogin(event) {
    setUserLoginInfo({ ...userLoginInfo, email: event.target.value });
  }
  function onChangeHandlerPasswordLogin(event) {
    setUserLoginInfo({ ...userLoginInfo, password: event.target.value });
  }
  function LogInUser() {
    const userUrllogin =
      "https://sda-3-online-backend-teamwork-1xdo.onrender.com/api/v1/Users/signIn";
    axios
      .post(userUrllogin, userLoginInfo)
      .then((res) => {
        alert("user loged in seccessfuly");
        if (res.status === 200) {
          const token = res.data;
          if (token) {
            localStorage.setItem("token", token);
          } else {
            console.error("Token not found in response data");
          }
        }
      })
      .then(() => getUserData())
      .then(() => navigate("/profile"))
      .catch((err) => {
        console.log(err);
        if (err.response.status === 500) {
          alert("Account not registered");
        }
        if (err.response.status === 401) {
          alert(err.response.data.message);
        }
      });
  }
  return (
    <div>
      <div className="signupdiv">
        <h3>Sign In</h3>

        <form className="registerform">
          <input
            type="text"
            placeholder="Email"
            required
            onChange={onChangeHandlerEmailLogin}
          />
          <div className="revelpass">
            <input
              type={type}
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                onChangeHandlerPasswordLogin(event); // Pass the event object to the function
              }}
              autoComplete="current-password"
            />
            <span
              className="flex justify-around items-center"
              onClick={handleToggle}
            >
              <Icon className="absolute mr-10" icon={icon} size={25} />
            </span>
          </div>
          <input
            type="button"
            onClick={LogInUser}
            value="Sign In"
            className="createbutton"
          />
        </form>
        <hr className="signinhr" />
        <div className="forgotandsing">
          <Link>
            <p>Forgot Your Password?</p>
          </Link>
          <Link to="/register">
            <p>Sign Up</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
