"use client";
import React, { useState, useEffect } from "react";
import LampDemo from "@/components/ui/lamp";
import Header from "../components/Header";
export default function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  return (
    <>
      <div>
        <LampDemo />
      </div>
    </>
  );
}
