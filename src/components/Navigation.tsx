
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-400 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold font-playfair">PitchCraft</span>
          </div>

          {/* Navigation links */}
          <div className="hidden md:flex items-center gap-12">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium">
              How It Works
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium">
              Pricing
            </a>
          </div>

          {/* CTA Button */}
          <Button className="h-12 px-6 font-semibold">Get Started</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
