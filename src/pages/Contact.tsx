
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MessageSquare, Phone, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Email Support",
      description: "Get help with technical issues, billing questions, or general inquiries.",
      contact: "support@pitchcraft.com",
      availability: "24/7 response within 4 hours"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      title: "Live Chat",
      description: "Chat with our support team for immediate assistance.",
      contact: "Available in-app",
      availability: "Mon-Fri, 9AM-6PM PST"
    },
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: "Phone Support",
      description: "Speak directly with our team for urgent matters.",
      contact: "+1 (555) 123-4567",
      availability: "Mon-Fri, 9AM-5PM PST"
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Enterprise Sales",
      description: "Discuss custom solutions and enterprise partnerships.",
      contact: "sales@pitchcraft.com",
      availability: "Custom scheduling available"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-24 pb-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-poppins">
              Get in
              <span className="text-transparent bg-gradient-to-r from-primary to-green-400 bg-clip-text"> Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Have questions about PitchCraft? Need help with your pitch? 
              Our team is here to support you every step of the way.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="bg-card/40 backdrop-blur-sm border-border hover:bg-card/60 transition-all duration-300 shadow-lg rounded-2xl group hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md border border-primary/20 group-hover:bg-primary/20 transition-colors duration-300">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 font-poppins">{method.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                        {method.description}
                      </p>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{method.contact}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {method.availability}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Contact Form */}
          <div className="mb-16">
            <Card className="bg-card/40 backdrop-blur-sm border-border shadow-lg rounded-2xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-center font-poppins">Send us a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors">
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Billing Question</option>
                      <option>Enterprise Sales</option>
                      <option>Partnership Opportunity</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea 
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <Button size="lg" className="px-8 py-3 h-auto font-semibold rounded-full">
                      Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
