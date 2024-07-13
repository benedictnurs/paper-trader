"use client";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ModeToggle } from "../ModeToggle";
import { SearchBar } from "./SearchBar";

export function NavBar({ onSelect }) {
  return (
    <Menubar>
      <MenubarMenu className="p-5 flex justify-end space-x-4"> {/* Apply padding and space between items */}
        <ModeToggle />
        <SearchBar onSelect={onSelect} />
      </MenubarMenu>
    </Menubar>
  );
}
