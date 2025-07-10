
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Navigation = () => {
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-400 rounded-xl flex items-center justify-center shadow-lg border border-primary/20">
                <Mic className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-md"></div>
            </div>
            <span className="text-xl font-bold font-poppins">PitchCraft</span>
          </Link>

          {/* Navigation links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium">
              Features
            </Link>
            <Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium">
              How It Works
            </Link>
            <Link to="/api" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium">
              API
            </Link>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={handleGetStarted}
            className="h-9 px-5 text-sm font-semibold rounded-full hover:scale-105 transition-transform duration-200"
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
