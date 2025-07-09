
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mic, Zap, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard/create');
    } else {
      navigate('/auth');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient effects */}
      <div className="absolute inset-0 gradient-mesh"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 gradient-radial opacity-60"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 gradient-radial opacity-60"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-secondary/50 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-8 animate-fade-in my-[35px]">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-muted-foreground">
            Powered by AI & Guy Kawasaki's Methodology
          </span>
        </div>

        {/* Main headline with typing animation */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight animate-fade-in">
          Transform Your
          <span className="block text-transparent bg-gradient-to-r from-primary to-green-400 bg-clip-text animate-pulse">
            Founder Story
          </span>
          Into Perfect Pitches
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-poppins text-gray-200 animate-fade-in">
          Record your ideas, get AI-optimized one-liners and structured pitch decks. 
          Stop rambling, start converting.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in">
          <Button 
            size="lg" 
            className="text-base px-8 py-3 h-auto font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
            onClick={handleGetStarted}
          >
            Start Recording
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg" className="text-base px-8 py-3 h-auto font-semibold rounded-full hover:scale-105 transition-all duration-300">
            See How It Works
          </Button>
        </div>

        {/* Process visualization */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center group animate-fade-in">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 shadow-lg border border-primary/20 group-hover:scale-110 transition-transform duration-300">
              <Mic className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-3 font-poppins">Record Your Idea</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Speak naturally about your startup vision and goals
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center group animate-fade-in">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 shadow-lg border border-primary/20 group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-3 font-poppins">AI Optimization</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Gemini AI transforms your words into compelling narratives
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center group animate-fade-in">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 shadow-lg border border-primary/20 group-hover:scale-110 transition-transform duration-300">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-3 font-poppins">Perfect Pitch Deck</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Get structured slides following Guy Kawasaki's proven formula
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
