import { motion } from "framer-motion";
import { Cpu, Brain, Zap, Globe, ShieldCheck, Code2 } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "Neural Integration",
    description: "Custom neural networks designed to learn your business patterns and predict future trends with uncanny accuracy."
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    description: "Eliminate redundancy. We build intelligent agents that handle complex workflows 24/7 without fatigue."
  },
  {
    icon: Cpu,
    title: "Cognitive Processing",
    description: "Turn unstructured data into actionable insights. Natural Language Processing that understands context, not just keywords."
  },
  {
    icon: Globe,
    title: "Global Scalability",
    description: "Architecture built to grow. Our AI solutions scale instantly to meet global demand without infrastructure bottlenecks."
  },
  {
    icon: ShieldCheck,
    title: "Predictive Security",
    description: "AI-driven threat detection that stops vulnerabilities before they manifest. Security that evolves faster than threats."
  },
  {
    icon: Code2,
    title: "Generative Development",
    description: "Accelerate product creation. We use generative AI to prototype, test, and deploy new inventions in record time."
  }
];

export function ServicesGrid() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-syne font-bold text-5xl md:text-6xl mb-6">System Modules</h2>
          <p className="text-xl text-white/50 max-w-2xl">
            Our suite of AI technologies designed to accelerate your business evolution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl group"
            >
              <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="font-syne font-bold text-2xl mb-4">{service.title}</h3>
              <p className="text-white/50 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
