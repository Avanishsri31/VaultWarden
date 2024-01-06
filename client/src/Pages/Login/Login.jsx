import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../../axios/instance";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../redux/actions";

function Login()
{
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const history = useHistory();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) =>
  {
    const { name, value } = e.target;

    setUserData((prevData) =>
    {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleLogin = async () =>
  {
    try
    {
      const res = await loginUser(userData);

      if (res.status === 400)
      {
        toast.error(res.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (res.status === 200)
      {
        dispatch(setAuth(true));
        history.push("/");
      }
    } catch (error)
    {
      console.log(error);
    }
  };

  useEffect(() =>
  {
    isAuthenticated && history.replace("/");
  }, [isAuthenticated, history]);

  return (
    <div className="login">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />

      <div className="login__wrapper">
        <div className="login_left">
          <div className="inputs">
            <label> Email </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              autoComplete={"off"}
              required
            />
          </div>

          <div className="inputs">
            <label> Password </label>
            <input
              type="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
              name="password"
              required
            />
          </div>

          <p>
            Did not have any account? <Link to="/signup">Signup</Link>
          </p>

          <button onClick={handleLogin}> Login </button>
        </div>

        <div className="login_right">
          

          <div className="login__content">
            <h1> Login </h1>
            <h4> Get your password secured with us for free. </h4>

            <p>
              Did not have any Account?
              <Link to="/signup"> Signup </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
