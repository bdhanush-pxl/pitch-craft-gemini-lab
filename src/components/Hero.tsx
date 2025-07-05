
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mic, Zap, FileText } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient effects */}
      <div className="absolute inset-0 gradient-mesh"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 gradient-radial"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 gradient-radial"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-3 bg-secondary/50 backdrop-blur-sm border border-border rounded-full px-6 py-3 mb-12">
          <Zap className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            Powered by AI & Guy Kawasaki's Methodology
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight">
          Transform Your
          <span className="block text-transparent bg-gradient-to-r from-primary to-green-400 bg-clip-text">
            Founder Story
          </span>
          Into Perfect Pitches
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto mb-16 leading-relaxed font-inter">
          Record your ideas, get AI-optimized one-liners and structured pitch decks. 
          Stop rambling, start converting.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
          <Button size="lg" className="text-lg px-10 py-6 h-auto font-semibold">
            Start Recording
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-10 py-6 h-auto font-semibold">
            See How It Works
          </Button>
        </div>

        {/* Process visualization */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
              <Mic className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4 font-playfair">Record Your Idea</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Speak naturally about your startup vision and goals
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
              <Zap className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4 font-playfair">AI Optimization</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Gemini AI transforms your words into compelling narratives
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
              <FileText className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4 font-playfair">Perfect Pitch Deck</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Get structured slides following Guy Kawasaki's proven formula
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
