"use client"

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

// components
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[]
};

const Sidebar: React.FC<SidebarProps> = ({
  children,
  songs
}) => {
  // get pathname
  const pathname = usePathname();

  const player = usePlayer();

  // data that will send to sidebar item
  const routes = useMemo(() => [
    {
      icon: HiHome,
      label: 'Home',
      active: pathname !== '/search',
      href: '/',
    },
    {
      icon: BiSearch,
      label: 'Search',
      active: pathname !== '/',
      href: '/search',
    },
  ], [pathname])
  return (
    <div className={twMerge(`flex h-full`, player.activeId && "h-calc(100%-80px)")}>
      {/* Sidebar */}
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        {/* import data from Box Components */}
        <Box className="flex flex-col gap-y-4 px-5 py-4">
          {/* send data to sidebar item */}
          {routes.map((item) => (
            // import & export data at SidebarItem Components
            <SidebarItem
                key={item.label}
                {...item}
            />
          ))}
        </Box>
        <Box className="overflow-y-auto h-full">
          {/* import data from Library Components */}
          <Library songs={songs} />
        </Box>
      </div>
      
      {/* Main Content Page */}
      <main className="w-full py-2">
        {children}
      </main>
    </div>
  )
}

export default Sidebar