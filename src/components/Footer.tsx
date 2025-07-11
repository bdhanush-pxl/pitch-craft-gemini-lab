
import React from 'react';
import { Mic } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary/20 border-t border-border/50">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-400 rounded-xl flex items-center justify-center shadow-lg border border-primary/20">
                  <Mic className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-md"></div>
              </div>
              <span className="text-xl font-bold font-poppins">PitchCraft</span>
            </Link>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
              Transform your founder story into perfect pitches with AI-powered optimization 
              and Guy Kawasaki's proven methodology.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4 text-base font-poppins">Product</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link to="/features" className="hover:text-foreground transition-colors duration-200 text-sm">Features</Link></li>
              <li><Link to="/how-it-works" className="hover:text-foreground transition-colors duration-200 text-sm">How It Works</Link></li>
              <li><Link to="/api" className="hover:text-foreground transition-colors duration-200 text-sm">API</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-base font-poppins">Company</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition-colors duration-200 text-sm">About</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors duration-200 text-sm">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground transition-colors duration-200 text-sm">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 mt-8 text-center text-muted-foreground">
          <p className="text-sm">© 2025 PitchCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
