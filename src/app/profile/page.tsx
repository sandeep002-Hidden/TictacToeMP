"use client";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/app/components/Header";


export default function Profile() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  useEffect(() => {
    try {
      const userDetails = async () => {
        setLoading(true);
        await axios.get("/api/users/me").then((user) => {
          setUser({
            username: user.data.data.userName,
            email: user.data.data.email,
          });
        });
      };
      userDetails();
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const router = useRouter();
  const onLogout = async () => {
    try {
      setLoading(true);
      await axios.get("/api/users/logout");
      setLoading(false);
      router.push("/login");
    } catch (error: any) {
      console.log("Error in logout", error.message);
    }
  };
  return (
    <>
      <div>
        <Header />
        <div className="absolute z-0 min-h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[1] bg-dot-black/[1] flex items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-gray-950 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
          <div className="h-full w-full bg-transparent flex justify-center items-center"></div>
        </div>
        <div className="absolute z-10 min-h-screen flex justify-start items-start">
          <div>
            {loading && (
              <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading...
              </div>
            )}
            <h1>UserName :- {user.username}</h1>
            <h1>Email :- {user.email}</h1>
            <button
              onClick={onLogout}
              className="border-2 border-white p-2 rounded-xl"
            >
              Logout
            </button>
            <br />
            <button>
              <Link href="/forgotPassword">Change Password</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
