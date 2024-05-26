import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";


export default function BarCharts({dataKey,data=[]}) {
  return (
    <div>
    <LineChart width={600} height={300} data={data} >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={dataKey} stroke="#82ca9d" />

      <Line
      type="monotone"
      dataKey="date"
      stroke="#8884d8"
      activeDot={{ r: 8 }}
    />
    </LineChart>
    </div>
  );
}
