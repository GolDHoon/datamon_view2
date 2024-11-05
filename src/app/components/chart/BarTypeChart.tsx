"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Rectangle,
} from "recharts";

interface ChartProps {
  data:any
}

export default function Chart({ data }: ChartProps) {
  let isClient : boolean, setIsClient : (value : (((prevState : boolean) => boolean) | boolean)) => void;
  [isClient, setIsClient] = useState (false);
  const keys = Array.from(new Set(data.flatMap(Object.keys).filter((key:any) => key !== 'name')));

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    setIsClient(true); // Set to true after the component mounts
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <BarChart
      width={1250}
      height={250}
      data={data}
      margin={{
        "top": 36,
        "right": 36,
        "left": 36,
        "bottom": 36,
      }}
    >
      <CartesianGrid strokeDasharray="1 3" />
      {data && (
        <>
          <XAxis
              dataKey="name"
              interval={0}
              angle={-45}
              textAnchor="end"
          />
          <Tooltip />
        </>
      )}
      {keys?.map((key:any, index:any) => (
          <Bar
              key={index}
              dataKey={key}
              fill={getRandomColor()}
              //stroke="white"
              // activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
      ))}
        {/*<Bar*/}
        {/*  dataKey="source"*/}
        {/*  fill="#B3CDAD"*/}
        {/*  //stroke="white"*/}
        {/*  // activeBar={<Rectangle fill="pink" stroke="blue" />}*/}
        {/*/>*/}
      {/*<Bar*/}
      {/*  dataKey="medium"*/}
      {/*  fill="#FF5F5E"*/}
      {/*  //stroke="purple"*/}
      {/*  // activeBar={<Rectangle fill="gold" stroke="purple" />}*/}
      {/*/>*/}
    </BarChart>
  );
}
