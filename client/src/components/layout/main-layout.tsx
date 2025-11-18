import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden selection:bg-white selection:text-black">
      <div className="grain-overlay" />
      <Navbar />
      <main className="flex-grow pt-24 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
