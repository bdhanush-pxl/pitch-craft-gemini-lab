import React from 'react';
import { Sparkles } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-secondary/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-400 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-2xl font-bold font-playfair">PitchCraft</span>
            </div>
            <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
              Transform your founder story into perfect pitches with AI-powered optimization 
              and Guy Kawasaki's proven methodology.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-6 text-lg font-playfair">Product</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors duration-200 text-base">Features</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors duration-200 text-base">How It Works</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors duration-200 text-base">Pricing</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors duration-200 text-base">API</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-6 text-lg font-playfair">Company</h3>
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
    </footer>;
};
export default Footer;