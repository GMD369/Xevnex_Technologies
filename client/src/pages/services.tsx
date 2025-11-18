import { MainLayout } from "@/components/layout/main-layout";
import { ServicesGrid } from "@/components/sections/services-grid";
import { motion } from "framer-motion";
import networkBg from "@assets/generated_images/Dark_futuristic_network_grid_architecture_221cc43b.png";

export default function Services() {
  return (
    <MainLayout>
      <div className="relative py-32 border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img src={networkBg} alt="Network" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-syne font-extrabold text-6xl md:text-8xl mb-6"
          >
            INTELLIGENCE<br />AS A SERVICE.
          </motion.h1>
          <p className="text-xl text-white/60 max-w-2xl">
            We don't just build software; we build autonomous systems that think, learn, and evolve with your business.
          </p>
        </div>
      </div>

      <ServicesGrid />

      <section className="py-20 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="glass-panel p-10 rounded-2xl">
            <h3 className="font-syne text-2xl font-bold mb-4">01. Analysis</h3>
            <p className="text-white/60">We dissect your business model to identify high-impact automation opportunities.</p>
          </div>
          <div className="glass-panel p-10 rounded-2xl">
            <h3 className="font-syne text-2xl font-bold mb-4">02. Prototype</h3>
            <p className="text-white/60">Rapid development of a working proof-of-concept to validate the solution.</p>
          </div>
          <div className="glass-panel p-10 rounded-2xl">
            <h3 className="font-syne text-2xl font-bold mb-4">03. Integration</h3>
            <p className="text-white/60">Seamless deployment of AI agents into your existing infrastructure.</p>
          </div>
          <div className="glass-panel p-10 rounded-2xl">
            <h3 className="font-syne text-2xl font-bold mb-4">04. Evolution</h3>
            <p className="text-white/60">Continuous learning models that improve efficiency over time.</p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
