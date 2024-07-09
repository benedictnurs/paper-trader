"use client";
import * as React from "react";
import { CaretDownIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const stocks = [
  { value: "AAPL", label: "Apple Inc." },
  { value: "MSFT", label: "Microsoft Corporation" },
  { value: "GOOGL", label: "Alphabet Inc." },
  { value: "AMZN", label: "Amazon.com Inc." },
  { value: "FB", label: "Meta Platforms, Inc." },
  { value: "TSLA", label: "Tesla Inc." },
];

export function SearchBar() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [search, setSearch] = React.useState("");

  const handleSelect = (currentValue) => {
    const ticker = currentValue.split(',')[0]; // Extract the ticker
    console.log(ticker); // Log the ticker to the console
    setValue(currentValue);
    setSearch(""); // Reset the search input
    setOpen(false);
  };

  const filteredStocks = stocks.filter(stock =>
    stock.label.toLowerCase().includes(search.toLowerCase()) ||
    stock.value.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? value.split(',')[1] : "Select a stock..."}
          <CaretDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search stocks..."
            className="h-9"
            value={search} // Control the input to reset it
            onInput={(e) => setSearch(e.target.value)}
          />
          {filteredStocks.length > 0 ? (
            <CommandList>
              <CommandGroup>
                {filteredStocks.map((stock) => (
                  <CommandItem
                    key={stock.value}
                    value={`${stock.value},${stock.label}`} // Store both ticker and name
                    onSelect={() => handleSelect(`${stock.value},${stock.label}`)}
                    aria-selected={value.split(',')[0] === stock.value ? "true" : "false"}
                  >
                    {stock.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value.split(',')[0] === stock.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          ) : (
            <CommandEmpty>No matching stocks found.</CommandEmpty>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
