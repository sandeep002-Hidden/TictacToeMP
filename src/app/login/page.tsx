"use client";
import React,{useState} from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const [message,setMessage]=useState("")

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handelLogin=async(e:any)=>{
    e.preventDefault();
    await axios.post("/api/users/login",user).then((res)=>{
      console.log(res)
      if(res.data.success){
        router.push("/");
        setMessage(res.data.message)
      }
      else{
        setMessage(res.data.message)
      }
    })
  }
  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
          Login to play game with your friend or people around Globe
        </h2>
        <h2 className="text-neutral-800 dark:text-neutral-200 text-center">{message}</h2>
        <div className="my-8">
            <LabelInputContainer>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="mohapatrasandeep756@gmail.com"
                type="text"
                required
                onChange={(e)=>{setUser({...user,email:e.target.value})}}
              />
            </LabelInputContainer>
            
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              required
              onChange={(e)=>{setUser({...user,password:e.target.value})}}
              />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            onClick={handelLogin}
          >
            Login
            <BottomGradient />
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
