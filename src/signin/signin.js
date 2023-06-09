import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getData } from "google-token-decode";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { wait } from "@testing-library/user-event/dist/utils";

export default function Signin() {
  const [state, setState] = useState({
    invalidinpute:
      "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600",
    invalidelabel:
      "text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500",
  });
  const emailuser = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const toastId = React.useRef(null);

  async function send() {
  
   

    
    let req;
    let data;
    if (validateEmailUsername(emailuser.current.value)) {
      if (String(emailuser.current.value).includes("@")) {
        req = {
          email: emailuser.current.value,
          password: password.current.value,
        };
      }
      data = await axios.post(
        "https://simpleapi-p29y.onrender.com/student/signin",
        req,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (data.data.res) {
        navigate("/home", { state: req });
      } else {
        
     
        toast.error(data.data.mes, {
          position: toast.POSITION.TOP_RIGHT
        })
      }
    }
  }
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      getData(tokenResponse.access_token, (err, data) => {
        
        if (err) {
          return false;
        }
        async function send2() {
          let req = { email: data.email, password: "" };
          let res;
          res = await axios.post(
            "http://localhost/SERVICE/photoshop/src/signin/signin.php",
            req
          );
          if (!res.data.res && res.data.mes.includes("email dont exist!")) {
            navigate("../signup");
          } else {
            navigate("/home", { state: { googlelog: true } });
          }
        }
        send2();
      });
    },
  });
  function validateEmailUsername(email) {
    return (
      String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) ||
      String(email)
        .toLowerCase()
        .match(/^[a-z0-9_]+$/)
    );
  }
  function handle(e) {
    let value = e.target.value;
    if (validateEmailUsername(value) || value == "") {
      setState((dstate) => ({
        ...dstate,
        invalidinpute:
          "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600",
        invalidelabel:
          "text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500",
      }));
    } else {
      setState((dstate) => ({
        ...dstate,
        invalidelabel: "text-red-600 dark:text-red-600",
        invalidinpute:
          "border-red-500 text-red-600 dark:text-red focus:border-red-600",
      }));
    }
  }
  return (
    <div className="flex items-center justify-center">
      <div className="w-5/6 md:w-3/5">
        <div className="mb-5 dark:text-white">
          <p className="text-3xl font-semibold font-serif">
            Welcome to the page
          </p>
          <p className="text-zinc-500 mt-3 font-serif dark:text-slate-400">
            Welcome,please entre details.
          </p>
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <input
            type={"email"}
            ref={emailuser}
            onChange={handle}
            name="floating_email"
            id="floating_email"
            className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 ${state.invalidinpute} appearance-none focus:outline-none focus:ring-0 peer`}
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className={`${state.invalidelabel} peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
          >
            Username or Email
          </label>
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="password"
            ref={password}
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div className="mt-3">
          <a className="text-purple-900 font-serif" href="#">
            Forget password
          </a>
        </div>
        <button
          onClick={() => {
            send();
          }}
          className="w-full mt-6 mb-3 bg-purple-500 rounded-md h-10 text-white font-serif"
        >
          Sign in
        </button>
        <button
          onClick={() => login()}
          className="w-full border border-slate-300 py-1 rounded-md font-serif flex justify-center items-center dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
        >
          <img
            className="h-8 w-8 mr-5"
            src="https://cdn-icons-png.flaticon.com/512/2702/2702602.png"
          />
          Sign in with google
        </button>
        {/* <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        /> */}
        <div className="flex justify-center mt-5">
          <p className="font-serif dark:text-white">if dont have an account?</p>
          <Link
            to={"../signup"}
            className="pl-1 text-purple-900 font-serif dark:text-purple-500"
          >
            sing up
          </Link>
        </div>
      </div>
    </div>
  );
}
