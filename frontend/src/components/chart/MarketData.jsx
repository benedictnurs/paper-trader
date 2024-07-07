import { Chart } from "./Chart";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const MarketData = () => {
  return (
    <div className="w-full h-screen mt-5">
      <div className="w-full h-2/3">
        <h1 className="text-4xl mb-5">Stock Name</h1>
        <div className="flex flex-col md:flex-row h-full space-y-5 md:space-y-0 md:space-x-5">
          <Card className="w-full ">
            <Chart />
          </Card>
          <div className="flex flex-col space-y-5">
            <Card>
              <div className="flex justify-around space-x-5 p-5 text-3xl">
                <h1>STCK</h1>
                <h1>$100</h1>
                <h1>+5%</h1>
              </div>
            </Card>
            <Card>
              <div className="flex justify-around space-x-5 p-5 text-2xl">
                <h1>Buy</h1>
                <h1>Sell</h1>
              </div>
            </Card>
            <Card className="flex flex-col justify-between p-5 h-full font-medium">
              <div className="flex justify-between">
                <h1>Country</h1>
                <h1>US</h1>
              </div>
              <div className="flex justify-between">
                <h1>Exchange</h1>
                <h1>NASDAQ</h1>
              </div>
              <div className="flex justify-between">
                <h1>IPO Date</h1>
                <h1>1-02-2005</h1>
              </div>
              <div className="flex justify-between">
                <h1>Market Cap</h1>
                <h1>1.5B</h1>
              </div>
              <div className="flex justify-between">
                <h1>Industry</h1>
                <h1>Technology</h1>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
