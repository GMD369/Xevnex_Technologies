import { MainLayout } from "@/components/layout/main-layout";
import { ContactForm } from "@/components/sections/contact-form";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="font-syne font-extrabold text-5xl md:text-7xl mb-8">
              LET'S BUILD<br />THE FUTURE.
            </h1>
            <p className="text-xl text-white/60 mb-12 max-w-lg">
              Have an idea that's waiting to exist? We are ready to listen. Remember, we prove our value before you commit.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-white/40 font-mono uppercase">Email</p>
                  <p className="text-lg">hello@xevnex.ai</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-white/40 font-mono uppercase">Phone</p>
                  <p className="text-lg">+1 (555) 000-0000</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-white/40 font-mono uppercase">Location</p>
                  <p className="text-lg">Global / Remote First</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
