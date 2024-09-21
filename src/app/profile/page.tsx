"use client";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import Loading from "@/app/components/Loading";

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
            {loading && <Loading />}
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
