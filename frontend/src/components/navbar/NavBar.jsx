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
import { SearchBar } from "../chart/SearchBar";

export function NavBar() {
  return (
    <Menubar>
      <MenubarMenu className="p-5 flex justify-end space-x-4"> {/* Apply padding and space between items */}
        <ModeToggle />
        <SearchBar />
      </MenubarMenu>
    </Menubar>
  );
}
