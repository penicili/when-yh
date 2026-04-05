import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";

export default function Layout() {
  const [title, setTitle] = useState("WhenYH");

  return (
    <div className="flex min-h-screen flex-col bg-primary/5 text-slate-800">
      <Navbar />
      <main className="flex-1 bg-primary-dark flex flex-col gap-8 items-center justify-center py-8">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <Outlet context={{ setTitle }} />
      </main>
      <footer className="border-t border-primary/10 py-4 text-center text-sm text-accent-warm bg-primary-dark">
        <span>WhenYh. Brought to you by</span>
        <a href="https://github.com/penicili/when-yh" target="_blank">
          {" "}
          penicili
        </a>
      </footer>
    </div>
  );
}
