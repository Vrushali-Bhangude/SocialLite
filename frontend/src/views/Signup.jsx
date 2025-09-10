import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

import axios from "axios";
const serverURL = import.meta.env.VITE_SERVER_URL;
const Signup = () => {
  const [inputClicked, setInputClicked] = useState({
    name: false,
    email: false,
    password: false,
    userName: false,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);


      const res = await axios.post(
        `${serverURL}/api/auth/signup`,
        {
          name,
          email,
          password,
          userName,
        },
        { withCredentials: true }
      );

      console.log(res.data);
      setLoading(false);
      toast.success("Signup successful! Please log in.");
      setTimeout(() => {
        navigate("/signin");
      }, 1500);
    } catch (error) {
      setLoading(false);
      console.error("Signup error:", error);
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong");
      } else if (error.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error("Error: " + error.message);
      }
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center">
      <div className="w-[90%] lg:max-w-[60%]  h-[500px] bg-white rounded-2xl flex  justify-center items-center overflow-hidden border-2 border-[#1a1f23]">
        <div className="w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[20px] gap-[20px">
          <div className="flex gap-[10px] items-centre text-[20px] font-semibold mt-[30px] flex-col">
            <span>
              Sign up to{" "}
              <span className="text-2xl text-blue-700">SocialLight</span>
            </span>

            <div
              className="relative flex items-center justify-start w-[100%] h-[50px] rounded-xl mt-[30px] border-1 border-black"
              onClick={() => {
                setInputClicked({ ...inputClicked, name: true });
              }}
            >
              <label
                htmlFor="name"
                className={`text-gray-500 absolute left-[20px] p-[5px] bg-white text-[12px] ${inputClicked.name ? "top-[-17px]" : ""
                  } `}
              >
                Enter Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0  text-[14px]"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
            </div>

            <div
              className="relative flex items-center justify-start w-[100%] h-[50px] rounded-xl  border-1 border-black"
              onClick={() => {
                setInputClicked({ ...inputClicked, userName: true });
              }}
            >
              <label
                htmlFor="userName"
                className={`text-gray-500 absolute left-[20px] p-[5px] bg-white text-[12px] ${inputClicked.userName ? "top-[-17px]" : ""
                  } `}
              >
                Enter userName
              </label>
              <input
                type="text"
                id="userName"
                className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0  text-[14px]"
                required
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                value={userName}
              />
            </div>
            <div
              className="relative flex items-center justify-start w-[100%] h-[50px] rounded-xl  border-1 border-black"
              onClick={() => {
                setInputClicked({ ...inputClicked, email: true });
              }}
            >
              <label
                htmlFor="email"
                className={`text-gray-500 absolute left-[20px] p-[5px] bg-white text-[12px] ${inputClicked.email ? "top-[-17px]" : ""
                  } `}
              >
                Enter Email
              </label>
              <input
                type="email"
                id="email"
                className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0  text-[14px]"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>

            <div
              className="relative flex items-center justify-start w-[100%] h-[50px] rounded-xl  border-1 border-black"
              onClick={() => {
                setInputClicked({ ...inputClicked, password: true });
              }}
            >
              <label
                htmlFor="password"
                className={`text-gray-500 absolute left-[20px] p-[5px] bg-white text-[12px] ${inputClicked.password ? "top-[-17px]" : ""
                  } `}
              >
                Enter Password
              </label>
              <input
                type="password"
                id="password"
                className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0    "
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </div>
            <button
              className="w-[70%] px-[10px] py-[10px] bg-black text-white font-semibold h-[45px] cursor-pointer rounded-xl mt-[20px]  hover:bg-gray-800 text-[14px] ml-[40px]"
              onClick={handleSignup} disabled={loading}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Sign Up"}
            </button>

            <p className="cursor-pointer text-gray-800 text-[12px] ml-[50px]" onClick={() => {
              navigate("/signin")
            }}>
              Already have an account ?{" "}
              <span className=" border-b-2 border-b-black pb-[3px] text-black">
                Sign In
              </span>
            </p>
          </div>
        </div>

        <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black">
          <h1 className="text-2xl">SocialLight</h1>

          <p className="text-gray-500 text-[13px] ml-[10px]">
            Connect with friends & the world around you on SocialLight.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
