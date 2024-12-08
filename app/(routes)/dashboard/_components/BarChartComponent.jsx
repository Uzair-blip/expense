"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({ budgets }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Ensure the component is mounted before rendering
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Avoid rendering on the server

  return (
    <div className="border rounded-lg p-5">
      <h2 className="font-bold text-2xl mb-10">Activity</h2>
      <ResponsiveContainer width={"70%"} height={300}>

      <RechartsBarChart data={budgets}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalSpent" stackId="a" fill="#4845d2" name="Total Spent" />
        <Bar dataKey="Amount" stackId="a" fill="Grey" name="Amount" />
      </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
