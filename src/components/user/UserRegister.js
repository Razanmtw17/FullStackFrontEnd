import React, {useState} from 'react'
import './UserStyle.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
export default function UserRegister() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    firstname: "",
    lastname: "",
    birthdate: "",
    email: "",
    password: "",
    phonenumber: 0,
  });
  //url: https://sda-3-online-backend-teamwork-1xdo.onrender.com/api/v1/users/register
  const [selectedDate, setSelectedDate] = useState(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  function onChangeHandlerUsername(event) {
    setUserInfo({ ...userInfo, username: event.target.value });
  }
  function onChangeHandlerPhoneNumber(event) {
    setUserInfo({ ...userInfo, phonenumber: event.target.value });
  }
  function onChangeHandlerFirstname(event) {
    setUserInfo({ ...userInfo, firstname: event.target.value });
  }
  function onChangeHandlerLastname(event) {
    setUserInfo({ ...userInfo, lastname: event.target.value });
  }
  function onChangeHandlerBirthdate(event) {
    setUserInfo({ ...userInfo, birthdate: event.target.value });
  }
  const onChangeHandlerEmail = (event) => {
    const newEmail = event.target.value;

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
      setUserInfo({ ...userInfo, email: newEmail });
    }

    // Update userInfo state only if email is valid
  };
  function onChangeHandlerPassword(event) {
    setUserInfo({ ...userInfo, password: event.target.value });
  }
  const navigate = useNavigate();
  function registNewUser() {
    const userUrl =
      "https://sda-3-online-backend-teamwork-1xdo.onrender.com/api/v1/Users/register";
    axios
      .post(userUrl, userInfo)
      .then((res) => {
        if (res.status === 200) {
          alert("User Seccessfully created an account");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err, "err from post");
        if (err.status === 400) {
          if (err.response.data.message) {
            alert(err.response.data.message);
            return;
          }
        }
      });
  }

  return (
    <div>
      <div className="signupdiv">
        <h3>Sign Up</h3>
        <p>
          Already have an account?{" "}
          <Link to="/login">
            <span className="signinlink">Sign in</span>
          </Link>
        </p>
        <div className="formdiv">
          <form className="registerform">
            <label for="UserName">User Name :</label>
            <input type="text" onChange={onChangeHandlerUsername} required />
            <label for="first name">First Name :</label>
            <input type="text" required onChange={onChangeHandlerFirstname} />
            <label for="last name">Last Name :</label>
            <input type="text" required onChange={onChangeHandlerLastname} />
            <label for="phone number">Phone Number :</label>
            <input type="text" required onChange={onChangeHandlerPhoneNumber} />
            <label for="birthdate">Birth Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(handleDateChange, onChangeHandlerBirthdate)}
              required
            />
            <label htmlFor="email">Email :</label>
            <input type="text" required onChange={onChangeHandlerEmail} />
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
            <label for="password">Password:</label>

            <div className="revelpass">
              <input
                type={type}
                placeholder="Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  onChangeHandlerPassword(event); // Pass the event object to the function
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
              value="CREATE"
              className="createbutton"
              onClick={registNewUser}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
