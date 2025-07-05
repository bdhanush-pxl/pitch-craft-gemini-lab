
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mic, Zap, FileText } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 gradient-mesh"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 gradient-radial"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 gradient-radial"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-secondary/50 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-8">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            Powered by AI & Guy Kawasaki's Methodology
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          Transform Your
          <span className="block text-transparent bg-gradient-to-r from-primary to-green-400 bg-clip-text">
            Founder Story
          </span>
          Into Perfect Pitches
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          Record your ideas, get AI-optimized one-liners and structured pitch decks. 
          Stop rambling, start converting.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button size="lg" className="text-lg px-8 py-4 h-auto">
            Start Recording
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto">
            See How It Works
          </Button>
        </div>

        {/* Process visualization */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
              <Mic className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Record Your Idea</h3>
            <p className="text-muted-foreground">
              Speak naturally about your startup vision and goals
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Optimization</h3>
            <p className="text-muted-foreground">
              Gemini AI transforms your words into compelling narratives
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Perfect Pitch Deck</h3>
            <p className="text-muted-foreground">
              Get structured slides following Guy Kawasaki's proven formula
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
