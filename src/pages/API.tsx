
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Key, Webhook, Database, Globe, Shield } from 'lucide-react';

const API = () => {
  const apiFeatures = [
    {
      icon: <Code className="w-8 h-8 text-primary" />,
      title: "RESTful API",
      description: "Clean, intuitive REST endpoints for all core functionality including pitch creation, editing, and management."
    },
    {
      icon: <Key className="w-8 h-8 text-primary" />,
      title: "API Authentication",
      description: "Secure API access with token-based authentication and rate limiting to protect your integrations."
    },
    {
      icon: <Webhook className="w-8 h-8 text-primary" />,
      title: "Webhooks",
      description: "Real-time notifications for pitch updates, completions, and sharing events to keep your systems in sync."
    },
    {
      icon: <Database className="w-8 h-8 text-primary" />,
      title: "Data Export",
      description: "Export pitch data, analytics, and user insights in JSON, CSV, or XML formats for further analysis."
    },
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: "Multi-language Support",
      description: "API endpoints support multiple languages for international integrations and localized experiences."
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Enterprise Security",
      description: "Enterprise-grade security with HTTPS, OAuth 2.0, and compliance with SOC 2 and GDPR standards."
    }
  ];

  const endpoints = [
    {
      method: "POST",
      endpoint: "/api/v1/pitches",
      description: "Create a new pitch from audio or text input"
    },
    {
      method: "GET",
      endpoint: "/api/v1/pitches",
      description: "Retrieve all pitches for authenticated user"
    },
    {
      method: "GET",
      endpoint: "/api/v1/pitches/{id}",
      description: "Get specific pitch details and content"
    },
    {
      method: "PUT",
      endpoint: "/api/v1/pitches/{id}",
      description: "Update pitch content and metadata"
    },
    {
      method: "DELETE",
      endpoint: "/api/v1/pitches/{id}",
      description: "Delete a specific pitch"
    },
    {
      method: "POST",
      endpoint: "/api/v1/pitches/{id}/export",
      description: "Export pitch as PDF, PowerPoint, or other formats"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-24 pb-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-poppins">
              Developer
              <span className="block text-transparent bg-gradient-to-r from-primary to-green-400 bg-clip-text">
                API
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Integrate PitchCraft's powerful AI pitch generation into your applications 
              with our comprehensive API and developer tools.
            </p>
          </div>

          {/* API Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {apiFeatures.map((feature, index) => (
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

          {/* API Endpoints */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center font-poppins">API Endpoints</h2>
            <div className="space-y-4">
              {endpoints.map((endpoint, index) => (
                <Card key={index} className="bg-card/40 backdrop-blur-sm border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                        endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                        endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="text-sm font-mono bg-secondary/50 px-3 py-1 rounded">
                        {endpoint.endpoint}
                      </code>
                      <span className="text-muted-foreground text-sm flex-1">
                        {endpoint.description}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Getting Started */}
          <div className="bg-gradient-to-r from-primary/10 to-green-400/10 rounded-3xl p-8 border border-primary/20">
            <h2 className="text-2xl font-bold mb-4 font-poppins text-center">Get Started with PitchCraft API</h2>
            <p className="text-muted-foreground mb-6 text-center max-w-2xl mx-auto">
              Ready to integrate pitch generation into your application? Contact our team to get your API keys and access to comprehensive documentation.
            </p>
            <div className="text-center">
              <div className="bg-secondary/50 rounded-lg p-4 max-w-md mx-auto">
                <code className="text-sm">
                  curl -X POST https://api.pitchcraft.com/v1/pitches \<br/>
                  -H "Authorization: Bearer YOUR_API_KEY" \<br/>
                  -H "Content-Type: application/json" \<br/>
                  -d '{"audio_url": "https://example.com/audio.mp3"}'
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default API;
