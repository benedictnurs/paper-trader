"use client";
import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { Card } from "@/components/ui/card";
import { useTheme } from "next-themes"; // assuming useTheme hook from next-themes

export const Chart = () => {
  const { theme } = useTheme();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Correctly fetch and parse the data from the /api endpoint
    fetch('/api')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(jsonData => {
        // jsonData contains the data in the format
        const chartData = Object.entries(jsonData).map(([date, values]) => ({
          date: date,
          price: values.Close
        }));
        setData(chartData);
      })
      .catch(error => console.error('Failed to load data:', error));
  }, []);

  if (!data.length) return <p>Loading data...</p>;

  const textColor = theme === "dark" ? "#fff" : "#000";

  return (
    <Card className="w-full md:flex-1 relative">
      <div className="absolute flex space-x-5 top-2 right-5">
        <h1>1D</h1>
        <h1>1W</h1>
        <h1>1M</h1>
        <h1>1Y</h1>
        <h1>All</h1>
      </div>
      <div className="w-full h-full pt-10 border">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis
              dataKey="date"
              tickLine={false}
              tick={{ fill: "transparent" }}
              axisLine={false}
            />
            <YAxis
              tick={{
                fontWeight: "500",
                fill: textColor,
              }}
              tickLine={false}
              tickFormatter={(value) => (Math.round(value * 100) / 100).toFixed(2)}  // Rounding to the nearest hundredth
              domain={['dataMin', 'dataMax']}
              axisLine={false}
            />
            <Tooltip
              formatter={(value) => [parseFloat(value).toFixed(2), 'Price']}
              labelFormatter={(label) => `Date: ${label}`}
              contentStyle={{
                backgroundColor: theme === "dark" ? "#333" : "#fff",
                color: textColor,
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
