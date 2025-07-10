
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, FileText, Edit, Trash2, BarChart3, Users, Download, Clock, Target, Globe } from 'lucide-react';

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
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      title: "Pitch Analytics",
      description: "Track performance metrics, engagement rates, and optimize your pitches based on real data."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Team Collaboration",
      description: "Share pitches with team members, collect feedback, and collaborate in real-time."
    },
    {
      icon: <Download className="w-8 h-8 text-primary" />,
      title: "Export Options",
      description: "Download your pitches as PDF, PowerPoint, or share directly via email and social platforms."
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Rehearsal Mode",
      description: "Practice your pitch with built-in timer, get AI feedback, and perfect your delivery."
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Industry-Specific Templates",
      description: "Choose from templates tailored for fintech, healthcare, SaaS, and other industries."
    },
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: "Multi-language Support",
      description: "Create and optimize pitches in multiple languages to reach global investors."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-24 pb-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-poppins">
              Powerful Features for
              <span className="block text-transparent bg-gradient-to-r from-primary to-green-400 bg-clip-text">
                Perfect Pitches
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Everything you need to transform your ideas into investor-ready presentations, 
              backed by AI and proven methodologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card/40 backdrop-blur-sm border-border hover:bg-card/60 transition-all duration-300 shadow-lg rounded-2xl group hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex flex-col items-start gap-4">
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

      <Footer />
    </div>
  );
};

export default Features;
