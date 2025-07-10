
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, Zap, FileText, Edit, Share, BarChart3 } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: <Mic className="w-8 h-8 text-primary" />,
      title: "Record Your Idea",
      description: "Simply speak about your startup, product, or business idea. No need to structure—just talk naturally about what you're building and why it matters."
    },
    {
      step: "02",
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "AI Processing",
      description: "Our advanced AI analyzes your recording, extracts key insights, and identifies the most compelling aspects of your idea using proven frameworks."
    },
    {
      step: "03",
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "Structured Pitch Creation",
      description: "Get a complete pitch deck following Guy Kawasaki's 10/20/30 rule with perfect one-liners, compelling narratives, and investor-ready slides."
    },
    {
      step: "04",
      icon: <Edit className="w-8 h-8 text-primary" />,
      title: "Refine & Customize",
      description: "Edit any section, adjust the tone, add your branding, and fine-tune the message until it perfectly represents your vision."
    },
    {
      step: "05",
      icon: <Share className="w-8 h-8 text-primary" />,
      title: "Share & Present",
      description: "Export your pitch as PDF or PowerPoint, share with your team for feedback, or present directly to investors."
    },
    {
      step: "06",
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      title: "Track & Optimize",
      description: "Monitor how your pitch performs, gather feedback, and continuously improve based on real engagement data."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-24 pb-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-poppins">
              How
              <span className="text-transparent bg-gradient-to-r from-primary to-green-400 bg-clip-text"> PitchCraft </span>
              Works
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From rough idea to investor-ready pitch in minutes. Our proven process 
              transforms your thoughts into compelling presentations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="bg-card/40 backdrop-blur-sm border-border hover:bg-card/60 transition-all duration-300 shadow-lg rounded-2xl group hover:scale-105 relative">
                <CardContent className="p-6">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
                    {step.step}
                  </div>
                  <div className="flex flex-col items-start gap-4 mt-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md border border-primary/20 group-hover:bg-primary/20 transition-colors duration-300">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 font-poppins">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-primary/10 to-green-400/10 rounded-3xl p-8 border border-primary/20">
              <h2 className="text-2xl font-bold mb-4 font-poppins">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of entrepreneurs who have transformed their ideas into compelling pitches with PitchCraft.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
