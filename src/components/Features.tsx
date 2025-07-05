
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, FileText, Edit, Trash2 } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Mic className="w-8 h-8 text-primary" />,
      title: "Voice-to-Pitch Transformation",
      description: "Record your startup idea naturally and watch AI turn it into a compelling pitch with perfect one-liners."
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "Guy Kawasaki Structure",
      description: "Every pitch follows the proven 10/20/30 rule and slide structure that investors expect to see."
    },
    {
      icon: <Edit className="w-8 h-8 text-primary" />,
      title: "Pitch Library & Editing",
      description: "Save, organize, and refine all your pitches. Edit any section to perfect your message over time."
    },
    {
      icon: <Trash2 className="w-8 h-8 text-primary" />,
      title: "Full Control",
      description: "Delete outdated versions, iterate on your ideas, and maintain a clean library of your best pitches."
    }
  ];

  return (
    <section className="py-20 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-poppins animate-fade-in">
            Everything You Need to
            <span className="block text-transparent bg-gradient-to-r from-primary to-green-400 bg-clip-text">
              Nail Your Pitch
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in">
            From rough ideas to investor-ready presentations, we handle the entire transformation process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/40 backdrop-blur-sm border-border hover:bg-card/60 transition-all duration-300 shadow-lg rounded-2xl group hover:scale-105 animate-fade-in">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md border border-primary/20 group-hover:bg-primary/20 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 font-poppins">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
