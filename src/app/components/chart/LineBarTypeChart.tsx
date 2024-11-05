'use client';
import React, {useEffect, useState} from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter
} from "recharts";

interface ChartProps {
  data:any
}

export default function Chart({ data }: ChartProps) {
  const [isClient, setIsClient] = useState(false);
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
    <ComposedChart
      width={750}
      height={400}
      data={data}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="총합" stroke={getRandomColor()} />
      {keys.map((key:any, index:any) => {
        if(key !== "총합" && key !== "name"){
          // return ();
          return (<Bar key={index} dataKey={key} barSize={20} fill={getRandomColor()} />);
        }else{
          return null;
        }
      })}
    </ComposedChart>
  );
}
