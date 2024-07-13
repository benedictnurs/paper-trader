"use client"
import { useState } from "react";
import { NavBar } from "@/components/navbar/NavBar";
import { MarketData } from "@/components/chart/MarketData";

export default function Home() {
  const [selectedTicker, setSelectedTicker] = useState("AAPL");
  const [selectedName, setSelectedName] = useState("Apple Inc.");

  const handleSelect = (ticker, name) => {
    setSelectedTicker(ticker);
    setSelectedName(name);
  };

  return (
    <main className="p-5">
      <NavBar onSelect={handleSelect} />
      <MarketData ticker={selectedTicker} name={selectedName} />
    </main>
  );
}

