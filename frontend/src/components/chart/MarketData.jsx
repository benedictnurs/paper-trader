"use client";
import { useState } from "react";
import { Chart } from "./Chart";

import {
  Card,
} from "@/components/ui/card";

export const MarketData = ({ ticker, name }) => {
  const [stockDetails, setStockDetails] = useState({
    price: '',
    change: ''
  });

  return (
    <div className="w-full min-h-screen mt-5 flex flex-col">
      <div className="flex-grow space-y-5">
        <h1 className="text-4xl">{name || 'Stock Name'}</h1>
        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">
          <Chart ticker={ticker} onDetailsChange={setStockDetails} />
          <div className="w-full md:w-1/3 flex flex-col space-y-5">
            <Card>
              <div className="flex justify-around space-x-5 p-5 text-3xl">
                <h1>{ticker || 'STCK'}</h1>
                <h1>{stockDetails.price ? `$${stockDetails.price}` : '$0'}</h1>
                <h1>{stockDetails.change ? `${stockDetails.change}%` : '0%'}</h1>
              </div>
            </Card>
            <Card>
              <div className="flex justify-around space-x-5 p-5 text-2xl">
                <h1>Buy</h1>
                <h1>Sell</h1>
              </div>
            </Card>
            <Card>
              <div className="flex justify-between p-5">
                <h1>Country</h1>
                <h1>US</h1>
              </div>
              <div className="flex justify-between p-5">
                <h1>Exchange</h1>
                <h1>NASDAQ</h1>
              </div>
              <div className="flex justify-between p-5">
                <h1>IPO Date</h1>
                <h1>1-02-2005</h1>
              </div>
              <div className="flex justify-between p-5">
                <h1>Market Cap</h1>
                <h1>1.5B</h1>
              </div>
              <div className="flex justify-between p-5">
                <h1>Profit</h1>
                <h1>500M</h1>
              </div>
              <div className="flex justify-between p-5">
                <h1>Industry</h1>
                <h1>Technology</h1>
              </div>
            </Card>
          </div>
        </div>
        <div className="p-5">
          <h1 className="text-4xl">Information</h1>
          <p className="text-lg mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            deserunt blanditiis inventore qui earum eum, dolor necessitatibus ut
            distinctio vitae nemo eos? Accusamus obcaecati sint a distinctio
            modi sapiente laudantium!
          </p>
        </div>
      </div>
    </div>
  );
};
