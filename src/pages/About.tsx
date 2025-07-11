
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Users, Lightbulb, Award, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Mission-Driven",
      description: "We believe every entrepreneur deserves to tell their story compellingly and confidently."
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
      title: "Innovation First",
      description: "We leverage cutting-edge AI to solve real problems that entrepreneurs face every day."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Community Focused",
      description: "We're building a community where entrepreneurs can learn, share, and grow together."
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Excellence",
      description: "We're committed to delivering the highest quality tools and experiences for our users."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-24 pb-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-poppins">
              About
              <span className="text-transparent bg-gradient-to-r from-primary to-green-400 bg-clip-text"> PitchCraft</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're on a mission to democratize pitch perfection. Every entrepreneur has a story worth telling—
              we just make sure it's told in the most compelling way possible.
            </p>
          </div>

          {/* Our Story */}
          <div className="mb-16">
            <Card className="bg-card/40 backdrop-blur-sm border-border shadow-lg rounded-2xl">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center font-poppins">Our Story</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="mb-4">
                    PitchCraft was born from a simple frustration: brilliant entrepreneurs with world-changing ideas 
                    were struggling to communicate their vision effectively. As former VCs and startup founders ourselves, 
                    we witnessed countless promising ventures fail not because of their ideas, but because of how they presented them.
                  </p>
                  <p className="mb-4">
                    We realized that the gap between having a great idea and presenting it compellingly was costing the world 
                    innovative solutions. So we set out to build the bridge—combining Guy Kawasaki's proven pitch methodology 
                    with cutting-edge AI to help entrepreneurs transform their raw ideas into investor-ready presentations.
                  </p>
                  <p>
                    Today, PitchCraft has helped thousands of entrepreneurs tell their stories better, raise funding faster, 
                    and bring their ideas to life. But we're just getting started.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center font-poppins">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="bg-card/40 backdrop-blur-sm border-border hover:bg-card/60 transition-all duration-300 shadow-lg rounded-2xl group hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md border border-primary/20 group-hover:bg-primary/20 transition-colors duration-300">
                        {value.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-3 font-poppins">{value.title}</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="bg-card/40 backdrop-blur-sm border-border shadow-lg rounded-2xl">
              <CardContent className="p-8">
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4 font-poppins">Join Our Mission</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  We're always looking for passionate individuals who want to help entrepreneurs 
                  tell their stories better. Whether you're interested in joining our team, 
                  partnering with us, or just want to chat about the future of entrepreneurship, 
                  we'd love to hear from you.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
