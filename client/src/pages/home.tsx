import { MainLayout } from "@/components/layout/main-layout";
import { Hero } from "@/components/sections/hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Guarantee } from "@/components/sections/guarantee";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <Guarantee />
      <ServicesGrid />
      
      <section className="py-32 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel p-12 md:p-24 rounded-3xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="font-syne font-bold text-4xl md:text-6xl mb-8">Ready to Exist?</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
              Your idea is waiting. The technology is ready. The only missing piece is the decision to start.
            </p>
            <Link href="/contact">
              <a className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-200 transition-colors">
                Start Now <ArrowRight />
              </a>
            </Link>
          </div>
          
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />
        </motion.div>
      </section>
    </MainLayout>
  );
}
