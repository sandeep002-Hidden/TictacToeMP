"use client";
import React, { useState, useEffect } from "react";
import LampDemo from "@/components/ui/lamp";
import Header from "../components/Header";

export default function vsComputer() {
  return (
    <>
      <Header />
      <LampDemo />
      <div className="relative z-10  min-h-screen  w-full flex justify-center items-center">
        <div className="h-fit w-11/12 bg-cyan-300 flex justify-center items-center">
        Hello
        </div>
      </div>
    </>
  );
}
