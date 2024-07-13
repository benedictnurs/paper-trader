"use client";
import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { Card } from "@/components/ui/card";
import { useTheme } from "next-themes"; // assuming useTheme hook from next-themes

export const Chart = ({ ticker, onDetailsChange }) => {
  const { theme } = useTheme();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!ticker) return;

    const fetchData = async () => {
      try {
        const response = await fetch('/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ticker }),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const jsonData = await response.json();

        const chartData = Object.entries(jsonData).map(([date, values]) => ({
          date: date,
          price: values.Close
        }));
        setData(chartData);

        const latestPrice = chartData.length ? chartData[chartData.length - 1].price : 0;
        const previousPrice = chartData.length > 1 ? chartData[chartData.length - 2].price : latestPrice;
        const change = previousPrice ? ((latestPrice - previousPrice) / previousPrice) * 100 : 0;

        onDetailsChange({
          price: latestPrice.toFixed(2),
          change: change.toFixed(2)
        });
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    fetchData();
  }, [ticker]);

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
              tickFormatter={(value) => value.toFixed(2)}
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
