"use client"

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

// components
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
  children
}) => {
  // get pathname
  const pathname = usePathname();

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
    <div className="flex h-full">
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
          <Library />
        </Box>
      </div>
      
      {/* Main Content Page */}
      <main>
        {children}
      </main>
    </div>
  )
}

export default Sidebar