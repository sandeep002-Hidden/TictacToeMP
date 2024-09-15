import { ToggleTheme } from "@/app/components/toogleTheme";
import Link from "next/link";
export default function Header() {
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
              <Link href="/profile" className="text-lg font-semibold">
                Profile
              </Link>
            </div>
            <div>
              <Link href="" className="text-lg font-semibold">
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
