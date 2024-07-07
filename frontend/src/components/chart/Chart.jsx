"use client";
import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes"; // assuming useTheme hook from next-themes
const data = [
  {
    date: "2024-01-01",
    price: 242.5,
    volume: 2400000,
  },
  {
    date: "2024-01-02",
    price: 245.8,
    volume: 2200000,
  },
  {
    date: "2024-01-03",
    price: 240.3,
    volume: 2100000,
  },
  {
    date: "2024-01-04",
    price: 238.9,
    volume: 2300000,
  },
  {
    date: "2024-01-05",
    price: 243.7,
    volume: 2500000,
  },
  {
    date: "2024-01-06",
    price: 241.2,
    volume: 2400000,
  },
  {
    date: "2024-01-07",
    price: 247.9,
    volume: 2600000,
  },
];

export const Chart = () => {
  const { theme } = useTheme(); // get the current theme
  const minValue = Math.min(...data.map((item) => item.price));
  const maxValue = Math.max(...data.map((item) => item.price));
  const textColor = theme === "dark" ? "#fff" : "#000"; // Color based on theme

  return (
    <div className="w-full h-[40vh] sm:h-full p-5">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={300}
          height={100}
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
            formatter={(value, name, props) => [
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
  );
};
