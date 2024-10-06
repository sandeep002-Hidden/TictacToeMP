import { ToggleTheme } from "@/app/components/toogleTheme";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Header() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const isLoggedInUser = async () => {
      await axios.get("/api/users/me").then((res: any) => {
        if(res.data.success){
          setLoggedIn(true)
        }
      });
    };
    isLoggedInUser();
  }, []);
  return (
    <>
      <header className="h-24 flex items-center justify-center bg-white dark:bg-black font-serif ">
        <div className="h-4/6 w-11/12  flex justify-center items-center flex-row border-b border-dashed border-black dark:border-white">
          <div className="w-1/4 flex justify-center items-center">
            <Link className="text-3xl  font-bold " href={"/"}>
              Tic-Tac-Toe
            </Link>
          </div>
          <div className="h-full w-1/2 flex flex-1 justify-around items-center">
            <div>
              <Link
                href={isLoggedIn ? "/profile" : "/login"}
                className="text-lg font-semibold"
              >
                {isLoggedIn ? "Profile" : "Login"}
              </Link>
            </div>
            <div>
              <Link href="/profile" className="text-lg font-semibold">
                History
              </Link>
            </div>
            <div>
              <ToggleTheme />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
