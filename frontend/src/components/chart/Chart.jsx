"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "next-themes"; // assuming useTheme hook from next-themes

const data = [
  { date: "2024-01-01", price: 242.5, volume: 2400000 },
  { date: "2024-01-02", price: 245.8, volume: 2200000 },
  { date: "2024-01-03", price: 240.3, volume: 2100000 },
  { date: "2024-01-04", price: 238.9, volume: 2300000 },
  { date: "2024-01-05", price: 243.7, volume: 2500000 },
  { date: "2024-01-06", price: 241.2, volume: 2400000 },
  { date: "2024-01-07", price: 247.9, volume: 2600000 },
  { date: "2024-01-08", price: 249.1, volume: 2550000 },
  { date: "2024-01-09", price: 251.3, volume: 2450000 },
  { date: "2024-01-10", price: 252.8, volume: 2500000 },
  { date: "2024-01-11", price: 248.4, volume: 2350000 },
  { date: "2024-01-12", price: 246.5, volume: 2400000 },
  { date: "2024-01-13", price: 244.9, volume: 2300000 },
  { date: "2024-01-14", price: 247.2, volume: 2250000 },
  { date: "2024-01-15", price: 250.0, volume: 2450000 },
  { date: "2024-01-16", price: 251.5, volume: 2550000 },
  { date: "2024-01-17", price: 253.8, volume: 2600000 },
  { date: "2024-01-18", price: 255.2, volume: 2700000 },
  { date: "2024-01-19", price: 256.7, volume: 2750000 },
  { date: "2024-01-20", price: 248.3, volume: 2800000 },
  { date: "2024-01-21", price: 259.9, volume: 2850000 },
  { date: "2024-01-22", price: 260.7, volume: 2900000 },
  { date: "2024-01-23", price: 252.3, volume: 2950000 },
  { date: "2024-01-24", price: 243.8, volume: 3000000 },
  { date: "2024-01-25", price: 245.4, volume: 3050000 },
  { date: "2024-01-26", price: 256.8, volume: 3100000 },
  { date: "2024-01-27", price: 258.2, volume: 3150000 },
  { date: "2024-01-28", price: 239.7, volume: 3200000 },
  { date: "2024-01-29", price: 251.0, volume: 3250000 },
  { date: "2024-01-30", price: 272.4, volume: 3300000 },
];

export const Chart = () => {
  const { theme } = useTheme(); // get the current theme
  const minValue = Math.min(...data.map((item) => item.price));
  const maxValue = Math.max(...data.map((item) => item.price));
  const textColor = theme === "dark" ? "#fff" : "#000"; // Color based on theme

  return (
    <Card className="w-full md:flex-1 relative">
      <div className="absolute flex space-x-5 top-2 right-5">
        <h1>1D</h1>
        <h1>1W</h1>
        <h1>1M</h1>
        <h1>1Y</h1>
        <h1>All</h1>
      </div>
      <div className="w-full h-full pt- border">
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
              tick={{ fill: "transparent" }} // Hides the tick labels but keeps the information for tooltips
              axisLine={false}
            />
            <YAxis
              tick={{
                fontWeight: "500", // Equivalent to Tailwind's font-medium
                fill: textColor, // Color for the text on the Y axis based on theme
              }}
              tickLine={false}
              domain={[minValue, maxValue]} // Sets the domain of the axis to the exact range of your data
              axisLine={false}
            />
            <Tooltip
              formatter={(value, name) => [
                value,
                name === "price" ? "Price" : "Volume",
              ]}
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
              strokeWidth={2} // Thicker line
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
