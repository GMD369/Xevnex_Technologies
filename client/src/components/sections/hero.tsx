import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import heroBg from "@assets/generated_images/Abstract_black_and_white_liquid_metal_AI_waves_c18003c0.png";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-10" />
        <img 
          src={heroBg} 
          alt="Abstract AI Waves" 
          className="w-full h-full object-cover opacity-60 scale-110 animate-slow-pan"
        />
      </div>

      <div className="container mx-auto px-6 relative z-20 pt-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-white/60 font-mono text-sm tracking-[0.2em] mb-6 uppercase">
              The Future is Now
            </h2>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-syne font-extrabold text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter text-white mb-8"
          >
            IDEAS INTO<br />
            <span className="text-white/30">EXISTENCE.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="font-light text-xl md:text-2xl text-white/70 max-w-2xl leading-relaxed mb-12"
          >
            We automate the impossible. Xevnex provides AI-based solutions that transform conceptual business models into high-growth realities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-wrap gap-6"
          >
            <Link href="/contact">
              <a className="group flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold tracking-wide hover:bg-gray-200 transition-all">
                START EVOLUTION
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Link>
            <Link href="/services">
              <a className="flex items-center gap-4 px-8 py-4 rounded-full font-medium text-white border border-white/20 hover:bg-white/10 transition-all backdrop-blur-sm">
                DISCOVER SOLUTIONS
              </a>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
