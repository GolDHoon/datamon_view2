"use client"
import React, { useState } from 'react';
import Sidebar from "./components/Sidebar";


export default function home(){
  return(
    <div className='wrap'>
<Sidebar />
<div className='content'></div>
    </div>
  )
}