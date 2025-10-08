import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Forgot = () => {
  const [step, setStep] = useState(1);

  const [inputClicked, setInputClicked] = useState({
    email: false,
    otp: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [timeLeft, setTimeLeft] = useState(300);
  const [canResend, setCanResend] = useState(false);
  const navigatory = useNavigate();

  const handleStep1 = async () => {
    setLoading(true);
    try {
      const result = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/sentOtp`, { email }, { withCredentials: true });
      console.log(result.data)
      setStep(2);
      toast.success("OTP sent to your email");
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);

      } else {
        toast.error("Something went wrong. Please try again!");
      }
      setLoading(false);
    }
  }

  const handleStep2 = async () => {
    setLoading(true);
    try {
      const result = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/verifyOtp`, { email, otp }, { withCredentials: true });
      console.log(result.data)
      setStep(3);
      toast.success("OTP Verified Successfully");
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again!");
      }
      setLoading(false);
    }
  }

  const handleStep3 = async () => {
    setLoading(true);
    try {
      if (newPassword !== confirmNewPassword) {
        toast.error("Password and Confirm Password do not match");
        setLoading(false);
        return;
      }
      const result = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/resetPassword`, { email, otp, newPassword }, { withCredentials: true });
      console.log(result.data)
      setLoading(false);
      toast.success("Password Reset Successfully");
      navigatory("/signin");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again!");
      }
      setLoading(false);
    }
  }
  useEffect(() => {
    if (step !== 2 || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true); // OTP expired
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [step, timeLeft]);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center">
      {step == 1 && (
        <div className="w-[90%] max-w-[500px] h-[400px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23] border-2">
          <h2 className="text-[30px] font-semibold">Forgot Password</h2>
          <div
            className="relative flex items-center justify-center w-[70%] h-[50px] rounded-xl  border-1 border-black m-[20px] "
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

          <button
            className="w-[60%] px-[10px] py-[10px] bg-black text-white font-semibold h-[45px] cursor-pointer rounded-xl mt-[20px]  hover:bg-gray-800 text-[14px] ml-[10px]"
            disabled={loading} onClick={handleStep1}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Send OTP"}
          </button>
        </div>
      )}

      {step == 2 && (
        <div className="w-[90%] max-w-[500px] h-[400px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23] border-2">
          <h2 className="text-[30px] font-semibold">Forgot Password</h2>
          <div
            className="relative flex items-center justify-center w-[70%] h-[50px] rounded-xl  border-1 border-black m-[20px] "
            onClick={() => {
              setInputClicked({ ...inputClicked, otp: true });
            }}
          >
            <label
              htmlFor="otp"
              className={`text-gray-500 absolute left-[20px] p-[5px] bg-white text-[12px] ${inputClicked.otp ? "top-[-17px]" : ""
                } `}
            >
              Enter OTP
            </label>
            <input
              type="number"
              id="otp"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0  text-[14px]"
              required
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
            />
          </div>
          <p className="text-red-500 font-semibold mb-2">
            {timeLeft > 0
              ? `OTP expires in: ${Math.floor(timeLeft / 60)
                .toString()
                .padStart(2, "0")}:${(timeLeft % 60).toString().padStart(2, "0")}`
              : "OTP expired!"}
          </p>

          {canResend && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-2 hover:bg-blue-600"
              onClick={async () => {
                try {
                  setLoading(true);
                  await handleStep1(); // resend OTP
                  setTimeLeft(300); // reset timer
                  setCanResend(false);
                  toast.success("OTP resent successfully!");
                  setLoading(false);
                } catch (err) {
                  console.log(err);
                  setLoading(false);
                }
              }}
            >
              Resend OTP
            </button>
          )}


          <button
            className="w-[60%] px-[10px] py-[10px] bg-black text-white font-semibold h-[45px] cursor-pointer rounded-xl mt-[20px]  hover:bg-gray-800 text-[14px] ml-[10px]"
            disabled={loading} onClick={handleStep2}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Submit OTP"}
          </button>
        </div>
      )}

      {step == 3 && (
        <div className="w-[90%] max-w-[500px] h-[400px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23] border-2">
          <h2 className="text-[30px] font-semibold">Reset Password</h2>
          <div
            className="relative flex items-center justify-center w-[70%] h-[50px] rounded-xl  border-1 border-black m-[20px] "
            onClick={() => {
              setInputClicked({ ...inputClicked, newPassword: true });
            }}
          >
            <label
              htmlFor="newPassword"
              className={`text-gray-500 absolute left-[20px] p-[5px] bg-white text-[12px] ${inputClicked.newPassword ? "top-[-17px]" : ""
                } `}
            >
              Enter New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0  text-[14px]"
              required
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
          </div>

          <div
            className="relative flex items-center justify-center w-[70%] h-[50px] rounded-xl  border-1 border-black m-[10px] "
            onClick={() => {
              setInputClicked({ ...inputClicked, confirmNewPassword: true });
            }}
          >
            <label
              htmlFor="confirmNewPassword"
              className={`text-gray-500 absolute left-[20px] p-[5px] bg-white text-[12px] ${inputClicked.confirmNewPassword ? "top-[-17px]" : ""
                } `}
            >
              Enter New Confirm Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0  text-[14px]"
              required
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              value={confirmNewPassword}
            />
          </div>

          <button
            className="w-[60%] px-[10px] py-[10px] bg-black text-white font-semibold h-[45px] cursor-pointer rounded-xl mt-[20px]  hover:bg-gray-800 text-[14px] ml-[10px]"
            disabled={loading} onClick={handleStep3}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Reset Password"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Forgot;
