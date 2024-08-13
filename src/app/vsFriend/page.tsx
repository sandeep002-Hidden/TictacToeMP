"use client";
import React, { useState, useEffect } from "react";
import LampDemo from "@/components/ui/lamp";
import Header from "../components/Header";
import Game from "../components/Game";

export default function vsFriend(){
    return(
        <>
        <Header/>
        <LampDemo/>
        <Game/>
        </>
    )
}