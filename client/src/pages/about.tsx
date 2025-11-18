import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";

export default function About() {
  return (
    <MainLayout>
      <section className="py-32 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <h1 className="font-syne font-extrabold text-6xl md:text-8xl mb-12">
            WAITING TO<br />EXIST.
          </h1>
          
          <div className="space-y-12 text-xl md:text-2xl leading-relaxed text-white/80 font-light">
            <p>
              <span className="text-white font-bold">Xevnex</span> was born from a simple observation: The world is full of brilliant ideas that die in the backlog.
            </p>
            <p>
              We believe that technology should not be the barrier between a concept and its reality. In the age of Artificial Intelligence, the distance between "what if" and "here it is" has collapsed.
            </p>
            <p>
              Our mission is to be the catalyst. We are not just developers; we are architects of the future. We take abstract potential and forge it into concrete, automated, intelligent systems.
            </p>
          </div>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-t border-white/20 pt-6">
              <h4 className="font-mono text-sm text-white/50 mb-2">FOUNDED</h4>
              <p className="text-2xl font-syne">2024</p>
            </div>
            <div className="border-t border-white/20 pt-6">
              <h4 className="font-mono text-sm text-white/50 mb-2">HEADQUARTERS</h4>
              <p className="text-2xl font-syne">Digital Void</p>
            </div>
            <div className="border-t border-white/20 pt-6">
              <h4 className="font-mono text-sm text-white/50 mb-2">STATUS</h4>
              <p className="text-2xl font-syne text-green-400">Active</p>
            </div>
          </div>
        </motion.div>
      </section>
    </MainLayout>
  );
}
