
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-400 rounded-xl flex items-center justify-center shadow-lg border border-primary/20">
                <Mic className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-md"></div>
            </div>
            <span className="text-xl font-bold font-poppins">PitchCraft</span>
          </div>

          {/* Navigation links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium">
              How It Works
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium">
              Pricing
            </a>
          </div>

          {/* CTA Button */}
          <Button 
            asChild
            className="h-9 px-5 text-sm font-semibold rounded-full hover:scale-105 transition-transform duration-200"
          >
            <a href="/auth">Get Started</a>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
