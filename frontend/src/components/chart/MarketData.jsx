"use client";
import { useState, useEffect } from "react";
import { Chart } from "./Chart";
import { Card } from "@/components/ui/card";

const fetchWithTimeout = (url, options, timeout = 60000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    ),
  ]);
};

const formatNumber = (num) => {
  if (num === 'N/A') return 'N/A';
  if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
  return num.toString();
};

export const MarketData = ({ ticker, name }) => {
  const [stockDetails, setStockDetails] = useState({
    price: 'N/A',
    change: 'N/A',
    country: 'N/A',
    exchange: 'N/A',
    address: 'N/A',
    marketCap: 'N/A',
    netIncome: 'N/A',
    industry: 'N/A',
    sector: 'N/A',
    summary: 'No summary available',
    revenue: 'N/A',
    peRatio: 'N/A',
    dividendYield: 'N/A',
    risk: 'N/A',
    debtToEquity: 'N/A',
    earningsGrowth: 'N/A',
    returnOnAssets: 'N/A',
    returnOnEquity: 'N/A',
  });

  useEffect(() => {
    if (!ticker) return;

    const fetchStockInfo = async () => {
      try {
        const response = await fetchWithTimeout('/api/info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ticker }),
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const stock = await response.json();
        console.log('Received stock info:', stock);

        setStockDetails({
          price: stock.price !== 'N/A' ? `$${stock.price.toFixed(2)}` : 'N/A',
          change: stock.change !== 'N/A' ? `${stock.change.toFixed(2)}%` : 'N/A',
          country: stock.country || 'N/A',
          exchange: stock.exchange || 'N/A',
          address: stock.address || 'N/A',
          marketCap: formatNumber(stock.marketCap),
          netIncome: formatNumber(stock.netIncome),
          industry: stock.industry || 'N/A',
          sector: stock.sector || 'N/A',
          summary: stock.summary || 'No summary available',
          revenue: formatNumber(stock.revenue),
          peRatio: stock.peRatio !== 'N/A' ? stock.peRatio.toFixed(2) : 'N/A',
          dividendYield: stock.dividendYield !== 'N/A' ? `${(stock.dividendYield * 100).toFixed(2)}%` : 'N/A',
          risk: stock.risk !== 'N/A' ? stock.risk.toString() : 'N/A',
          debtToEquity: stock.debtToEquity !== 'N/A' ? stock.debtToEquity.toFixed(2) : 'N/A',
          earningsGrowth: stock.earningsGrowth !== 'N/A' ? `${(stock.earningsGrowth * 100).toFixed(2)}%` : 'N/A',
          returnOnAssets: stock.returnOnAssets !== 'N/A' ? `${(stock.returnOnAssets * 100).toFixed(2)}%` : 'N/A',
          returnOnEquity: stock.returnOnEquity !== 'N/A' ? `${(stock.returnOnEquity * 100).toFixed(2)}%` : 'N/A',
        });
      } catch (error) {
        console.error('Failed to fetch stock info:', error);
        setStockDetails({
          price: 'N/A',
          change: 'N/A',
          country: 'N/A',
          exchange: 'N/A',
          address: 'N/A',
          marketCap: 'N/A',
          netIncome: 'N/A',
          industry: 'N/A',
          sector: 'N/A',
          summary: 'No summary available',
          revenue: 'N/A',
          peRatio: 'N/A',
          dividendYield: 'N/A',
          risk: 'N/A',
          debtToEquity: 'N/A',
          earningsGrowth: 'N/A',
          returnOnAssets: 'N/A',
          returnOnEquity: 'N/A',
        });
      }
    };

    fetchStockInfo();
  }, [ticker]);

  return (
    <div className="w-full min-h-screen mt-5 flex flex-col">
      <div className="flex-grow space-y-5">
        <h1 className="text-4xl">{name || 'Stock Name'}</h1>
        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">
          <Chart ticker={ticker} onDetailsChange={(details) => setStockDetails(prevDetails => ({ ...prevDetails, ...details }))} />
          <div className="w-full md:w-1/3 flex flex-col space-y-5">
            <Card>
              <div className="flex justify-around space-x-5 px-5 py-3 text-3xl">
                <h1>{ticker || 'STCK'}</h1>
                <h1>{stockDetails.price}</h1>
                <h1>{stockDetails.change}%</h1>
              </div>
            </Card>
            <Card>
              <div className="flex justify-between space-x-5 p-5 text-3xl">
              <h1>Risk</h1>
                <h1>{stockDetails.risk}</h1>
              </div>
            </Card>
            <Card>
              <div className="flex justify-between px-5 py-3">
                <h1>Country</h1>
                <h1>{stockDetails.country}</h1>
              </div>
              <div className="flex justify-between px-5 py-3">
                <h1>Exchange</h1>
                <h1>{stockDetails.exchange}</h1>
              </div>
              <div className="flex justify-between px-5 py-3">
                <h1>Industry</h1>
                <h1>{stockDetails.industry}</h1>
              </div>
              <div className="flex justify-between px-5 py-3">
                <h1>Sector</h1>
                <h1>{stockDetails.sector}</h1>
              </div>
              <div className="flex justify-between px-5 py-3">
                <h1>Market Cap</h1>
                <h1>{stockDetails.marketCap}</h1>
              </div>
              <div className="flex justify-between px-5 py-3">
                <h1>Revenue</h1>
                <h1>{stockDetails.revenue}</h1>
              </div>
              <div className="flex justify-between px-5 py-3">
                <h1>P/E Ratio</h1>
                <h1>{stockDetails.peRatio}</h1>
              </div>
              <div className="flex justify-between px-5 py-3">
                <h1>Dividend Yield</h1>
                <h1>{stockDetails.dividendYield}</h1>
              </div>
              <div className="flex justify-between px-5 py-3">
                <h1>Debt to Equity</h1>
                <h1>{stockDetails.debtToEquity}</h1>
              </div>
            </Card>
          </div>
        </div>
        <div className="px-5 py-3">
          <h1 className="text-4xl">Information</h1>
          <p className="text-lg mt-5">
            {stockDetails.summary}
          </p>
        </div>
      </div>
    </div>
  );
};
