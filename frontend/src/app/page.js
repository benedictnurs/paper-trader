import Image from "next/image";
import { ModeToggle } from "@/components/ModeToggle";
import { MarketData } from "@/components/chart/MarketData";

export default function Home() {
  return (
    <main className="p-5">
      <ModeToggle />
      <MarketData />
    </main>
  );
}
