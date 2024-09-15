"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'


export default function changePassword() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [buttonDisable, setButtonDisable] = useState(true);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [seeOtp, setSeeOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const router = useRouter()

  const [password, setPassword] = useState({
    newPassword: "",
    newPasswordConfirm: "",
  });

  useEffect(() => {
    setLoading(false);
    setMessage("");
    setButtonDisable(false);
    setSuccess(false);
    setFailure(false);
    setSeeOtp(false);
    setOtp("");
  }, [verified]);

  useEffect(() => {
    if (userEmail.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [userEmail]);
  useEffect(() => {
    if (
      password.newPassword.length > 0 &&
      password.newPasswordConfirm.length > 0
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [password]);
  const VerifyEmail = async () => {
    setLoading(true);
    try {
      if (!buttonDisable) {
        await axios
          .post("/api/users/checkUser", { email: userEmail })
          .then((a) => {
            setMessage(a.data.message);
            if (a.data.success) {
              setFailure(false);
              setSuccess(true);
              setLoading(false);
              setSeeOtp(true);
            } else {
              setSuccess(false);
              setFailure(true);
              setLoading(false);
            }
          });
      } else {
        setMessage("Enter Your Email");
      }
    } catch (error: any) {
      console.log(error.message);
      setFailure(true);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    const reqObj = { email: userEmail, otp: otp };
    await axios.post("/api/users/checkOtp", reqObj).then((res) => {
      setMessage(res.data.message);
      if (res.data.success) {
        setFailure(false);
        setSuccess(true);
        setLoading(false);
        setVerified(true);
      } else {
        setSuccess(false);
        setFailure(true);
        setLoading(false);
      }
    });
  };

  const setNewPassword = async () => {
    setLoading(true);
    const passwordRegX: RegExp =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (password.newPassword.match(passwordRegX)) {
      if (password.newPassword === password.newPasswordConfirm) {
        try {
          await axios
            .post("/api/users/changePassword", {
              email: userEmail,
              password: password.newPassword,
            })
            .then((cPR) => {
              setLoading(false);
              if (cPR.data.success) {
                setFailure(false);
                setSuccess(true);
                setMessage("Password Changed Success fully");
                router.push("/profile")
              } else {
                setSuccess(false);
                setFailure(true);
                setMessage("Error occur while Changing password");
              }
            });
        } catch (error: any) {
          console.log(error.message);
          setLoading(false);
          setSuccess(false);
          setFailure(true);
          setMessage("Error Occur while Changing password");
        }
      } else {
        setMessage("Both Password are not equal");
      }
    } else {
      setMessage(
        "Password must Contain an UpperCase ,an LowerCase a digit and minimum length 8"
      );
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-center items-center min-h-screen flex-1 flex-col">
          {/* {loading && <Loading />} */}
          <h1 className="text-white">{message}</h1>
          {!verified && (
            <div
              className={`border-2 rounded-2xl p-4 flex justify-center items-center flex-col ${
                success ? "border-green-500 border-2" : ""
              } ${failure ? "border-red-500" : ""} ${
                buttonDisable ? `border-amber-400` : ``
              }`}
            >
              <input
                type="email"
                placeholder={"Enter Your Email" || userEmail}
                className="block h-6 p-4 m-4 border-2 text-white border-white  rounded-lg font-semibold text-sm"
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
              />
              {seeOtp && (
                <input
                  type="number"
                  placeholder={"Enter Otp" || otp}
                  className="block h-6 p-4 m-4 border-2 text-white border-white  rounded-lg font-semibold text-sm"
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                />
              )}
              <button
                className={`border-2 rounded-lg p-2 border-white `}
                onClick={seeOtp ? verifyOtp : VerifyEmail}
              >
                Submit
              </button>
            </div>
          )}
          {verified && (
            <div
              className={`border-2 rounded-2xl p-4 flex justify-center items-center flex-col ${
                success ? "border-green-500 border-2" : ""
              } ${failure ? "border-red-500" : ""} ${
                buttonDisable ? `border-amber-400` : ``
              }`}
            >
              <input
                type="text"
                className="block h-6 p-4 m-4 border-2 text-white border-white  rounded-lg font-semibold text-sm"
                placeholder="Enter a new Password"
                onChange={(e) => {
                  setPassword({ ...password, newPassword: e.target.value });
                }}
              />
              <input
                type="password"
                className="block h-6 p-4 m-4 border-2 text-white border-white  rounded-lg font-semibold text-sm"
                placeholder="Confirm New Password"
                onChange={(e) => {
                  setPassword({
                    ...password,
                    newPasswordConfirm: e.target.value,
                  });
                }}
              />
              <button
                className={`border-2 rounded-lg p-2 border-white `}
                onClick={setNewPassword}
              >
                Change Password
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}