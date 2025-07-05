
import React from 'react';
import { Mic } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-green-400 rounded-2xl flex items-center justify-center shadow-lg border border-primary/20">
                  <Mic className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-md"></div>
              </div>
              <span className="text-2xl font-bold font-poppins">PitchCraft</span>
            </div>
            <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
              Transform your founder story into perfect pitches with AI-powered optimization 
              and Guy Kawasaki's proven methodology.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-6 text-lg font-poppins">Product</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors duration-200 text-base">Features</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors duration-200 text-base">How It Works</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors duration-200 text-base">Pricing</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors duration-200 text-base">API</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-6 text-lg font-poppins">Company</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors duration-200 text-base">About</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors duration-200 text-base">Blog</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors duration-200 text-base">Contact</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors duration-200 text-base">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-12 mt-12 text-center text-muted-foreground">
          <p className="text-base">© 2025 PitchCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
