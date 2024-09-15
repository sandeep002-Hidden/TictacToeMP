"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function verifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const verifyUserEmail = async () => {
    try {
      await axios
        .post("/api/users/verifyemail", { token })
        .then((verifyEmailRes: any) => {
          console.log(verifyEmailRes);
          if (verifyEmailRes.statusText === "OK") {
            setVerified(true);
          } else {
            setError(true);
          }
        });
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  useEffect(() => {
    setMessage("Error Occur while verifying email");
  }, [error]);
  useEffect(() => {
    setMessage("User Verified success fully");
  }, [verified]);

  return (
    <>
      <div className="flex justify-center bg-black text-white items-center min-h-screen min-w-screen flex-col">
        <div
          className={`h-fit w-fit border-2 rounded-xl  ${
            verified ? "border-2 border-green-500 rounded-xl" : ""
          } ${error ? "border-2 border-red-500 rounded-xl" : ""} p-4`}
        >
          <h1>Verify token</h1>
          <h1>{message}</h1>
          <h2>{token ? `${token}` : "No token"}</h2>
          {verified && (
            <>
              <button className="text-white">
                <Link href={"/"}>Click here to login</Link>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
