"use client"; // This directive makes the component client-side

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
  Popover, PopoverContent, PopoverTrigger
} from "@/components/ui/popover";

export function SearchBar({ onSelect }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [stocks, setStocks] = React.useState([]);

  React.useEffect(() => {
    // Fetch stocks from the API route
    const fetchStocks = async () => {
      try {
        console.log('Fetching stocks...');
        const response = await fetch('/api/stocks'); // Adjust to your Flask API URL
        if (!response.ok) {
          throw new Error('Failed to fetch stocks');
        }
        const data = await response.json();
        console.log('Stocks data:', data);
        setStocks(data);

        // Set the initial stock to the first item in the fetched data
        if (data.length > 0) {
          const initialStock = data[0];
          setValue(`${initialStock.value},${initialStock.label}`);
          onSelect(initialStock.value, initialStock.label);
        }
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };

    fetchStocks();
  }, [onSelect]);

  const handleSelect = (currentValue) => {
    const [ticker, name] = currentValue.split(',');
    setValue(currentValue);
    setSearch("");
    setOpen(false);
    onSelect(ticker, name);
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
            value={search}
            onInput={(e) => setSearch(e.target.value)}
          />
          {filteredStocks.length > 0 ? (
            <CommandList>
              <CommandGroup>
                {filteredStocks.map((stock) => (
                  <CommandItem
                    key={stock.value}
                    value={`${stock.value},${stock.label}`}
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
