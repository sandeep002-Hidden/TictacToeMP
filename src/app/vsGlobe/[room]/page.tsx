"use client"
import React, { useEffect, useState } from 'react'

export default function WaittingPage({params}:any) {
  const [room,setRoom]=useState("")
  useEffect(()=>{
    console.log(params.room)
    if(!params.room){
      return
    }
    setRoom(params.room)
  },[])
  return (
    <div>
      <h1 className='text-3xl'>{room}</h1>
    </div>
  )
}
