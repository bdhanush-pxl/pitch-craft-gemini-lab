
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, FileText, Edit, Trash2 } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Mic className="w-10 h-10 text-primary" />,
      title: "Voice-to-Pitch Transformation",
      description: "Record your startup idea naturally and watch AI turn it into a compelling pitch with perfect one-liners."
    },
    {
      icon: <FileText className="w-10 h-10 text-primary" />,
      title: "Guy Kawasaki Structure",
      description: "Every pitch follows the proven 10/20/30 rule and slide structure that investors expect to see."
    },
    {
      icon: <Edit className="w-10 h-10 text-primary" />,
      title: "Pitch Library & Editing",
      description: "Save, organize, and refine all your pitches. Edit any section to perfect your message over time."
    },
    {
      icon: <Trash2 className="w-10 h-10 text-primary" />,
      title: "Full Control",
      description: "Delete outdated versions, iterate on your ideas, and maintain a clean library of your best pitches."
    }
  ];

  return (
    <section className="py-32 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl font-bold mb-8 font-playfair">
            Everything You Need to
            <span className="block text-transparent bg-gradient-to-r from-primary to-green-400 bg-clip-text">
              Nail Your Pitch
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From rough ideas to investor-ready presentations, we handle the entire transformation process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border hover:bg-card/80 transition-all duration-300 shadow-lg">
              <CardContent className="p-10">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-md">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 font-playfair">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
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
