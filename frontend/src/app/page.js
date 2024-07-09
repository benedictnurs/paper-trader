import Image from "next/image";
import { ModeToggle } from "@/components/ModeToggle";
import { MarketData } from "@/components/chart/MarketData";
import { SearchBar } from "@/components/chart/SearchBar";
import { NavBar } from "@/components/navbar/NavBar";


export default function Home() {
  return (
    <main className="p-5">
      <NavBar/>
      <MarketData />
    </main>
  );
}
