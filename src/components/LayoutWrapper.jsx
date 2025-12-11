"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const hideSidebar = pathname === "/";

  return (
    <div
      style={{
        display: hideSidebar ? "block" : "flex",
        gap:0
      }}
    >
      {!hideSidebar && <Sidebar />}
      <main style={{padding:"16px",width:"100%"}}>{children}</main>
    </div>
  );
}
