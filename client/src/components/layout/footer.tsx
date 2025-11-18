import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-syne text-3xl font-bold mb-6">XEVNEX</h2>
            <p className="text-white/50 max-w-md font-light leading-relaxed">
              We bridge the gap between abstract ideas and concrete reality using advanced artificial intelligence. 
              Your vision, our engine.
            </p>
          </div>
          
          <div>
            <h3 className="font-syne font-semibold text-lg mb-6">Explore</h3>
            <ul className="space-y-4">
              <li><Link href="/services"><a className="text-white/50 hover:text-white transition-colors">Services</a></Link></li>
              <li><Link href="/about"><a className="text-white/50 hover:text-white transition-colors">About Us</a></Link></li>
              <li><Link href="/contact"><a className="text-white/50 hover:text-white transition-colors">Contact</a></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-syne font-semibold text-lg mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/50 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/50 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">© {new Date().getFullYear()} Xevnex. All rights reserved.</p>
          <p className="text-white/30 text-sm">Designed for the Future.</p>
        </div>
      </div>
    </footer>
  );
}
