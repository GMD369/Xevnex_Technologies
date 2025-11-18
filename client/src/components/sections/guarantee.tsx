import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function Guarantee() {
  return (
    <section className="py-32 bg-white text-black relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-syne font-extrabold text-6xl md:text-7xl tracking-tighter mb-8 leading-[0.9]">
              PROOF<br />BEFORE<br />PAYMENT.
            </h2>
            <div className="h-2 w-32 bg-black mb-8" />
            <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-lg">
              We are so confident in our ability to transform your business that we operate on a results-first basis.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex gap-6 items-start">
              <CheckCircle2 className="w-8 h-8 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-2xl mb-2">Concept Verification</h3>
                <p className="text-black/70 text-lg">We demonstrate the viability of the AI solution for your specific use case before full deployment.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <CheckCircle2 className="w-8 h-8 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-2xl mb-2">Value Demonstration</h3>
                <p className="text-black/70 text-lg">You see the efficiency gains and growth potential in action, not just in a pitch deck.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <CheckCircle2 className="w-8 h-8 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-2xl mb-2">Risk Elimination</h3>
                <p className="text-black/70 text-lg">We absorb the technical risk. You invest only when the path to growth is clear and proven.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
