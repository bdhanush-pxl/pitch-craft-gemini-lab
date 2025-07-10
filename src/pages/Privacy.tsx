
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Lock, Eye, Database, Globe, AlertCircle } from 'lucide-react';

const Privacy = () => {
  const privacyPrinciples = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Data Protection",
      description: "We use industry-standard encryption and security measures to protect your personal information and pitch data."
    },
    {
      icon: <Lock className="w-8 h-8 text-primary" />,
      title: "Access Control",
      description: "Only you and authorized team members can access your pitches. We never share your content without permission."
    },
    {
      icon: <Eye className="w-8 h-8 text-primary" />,
      title: "Transparency",
      description: "We're clear about what data we collect, how we use it, and who has access to it."
    },
    {
      icon: <Database className="w-8 h-8 text-primary" />,
      title: "Data Minimization",
      description: "We only collect data that's necessary to provide our services and improve your experience."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-24 pb-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-poppins">
              Privacy
              <span className="text-transparent bg-gradient-to-r from-primary to-green-400 bg-clip-text"> Policy</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your privacy is fundamental to our mission. We're committed to protecting your data 
              and being transparent about how we collect, use, and safeguard your information.
            </p>
            <div className="mt-4 text-sm text-muted-foreground">
              Last updated: January 10, 2025
            </div>
          </div>

          {/* Privacy Principles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {privacyPrinciples.map((principle, index) => (
              <Card key={index} className="bg-card/40 backdrop-blur-sm border-border hover:bg-card/60 transition-all duration-300 shadow-lg rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md border border-primary/20">
                      {principle.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 font-poppins">{principle.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Privacy Policy Content */}
          <div className="space-y-8">
            <Card className="bg-card/40 backdrop-blur-sm border-border shadow-lg rounded-2xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 font-poppins">Information We Collect</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Account Information</h3>
                    <p className="text-sm">When you create an account, we collect your name, email address, and password. This information is necessary to provide you with access to our services.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Pitch Content</h3>
                    <p className="text-sm">We process your audio recordings and generated pitch content to provide our AI-powered services. This content is encrypted and stored securely.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Usage Data</h3>
                    <p className="text-sm">We collect information about how you use our service, including features accessed, time spent, and performance metrics to improve our platform.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/40 backdrop-blur-sm border-border shadow-lg rounded-2xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 font-poppins">How We Use Your Information</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Service Delivery</h3>
                    <p className="text-sm">We use your information to provide, maintain, and improve our pitch generation services, including AI processing of your content.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Communication</h3>
                    <p className="text-sm">We may contact you about your account, service updates, or respond to your inquiries. You can opt out of non-essential communications.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Analytics & Improvement</h3>
                    <p className="text-sm">We analyze usage patterns to improve our services, but this is done with aggregated, anonymized data that cannot identify individual users.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/40 backdrop-blur-sm border-border shadow-lg rounded-2xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 font-poppins">Data Security</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="text-sm">We implement industry-standard security measures to protect your information:</p>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>End-to-end encryption for all data transmission</li>
                    <li>Encrypted storage for all user content and personal information</li>
                    <li>Regular security audits and penetration testing</li>
                    <li>Access controls and authentication protocols</li>
                    <li>SOC 2 Type II compliance</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/40 backdrop-blur-sm border-border shadow-lg rounded-2xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 font-poppins">Your Rights</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="text-sm">You have the following rights regarding your personal information:</p>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong>Access:</strong> Request a copy of the personal information we have about you</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal information and pitch content</li>
                    <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                    <li><strong>Objection:</strong> Object to processing of your personal information for certain purposes</li>
                  </ul>
                  <p className="text-sm mt-4">To exercise these rights, contact us at privacy@pitchcraft.com.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/40 backdrop-blur-sm border-border shadow-lg rounded-2xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 font-poppins">Contact Information</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="text-sm">If you have questions about this Privacy Policy or our data practices, please contact us:</p>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <p className="text-sm"><strong>Email:</strong> privacy@pitchcraft.com</p>
                    <p className="text-sm"><strong>Address:</strong> 123 Market Street, Suite 400, San Francisco, CA 94105</p>
                    <p className="text-sm"><strong>Phone:</strong> +1 (555) 123-4567</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Notice */}
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-3xl p-6 border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Important Notice</h3>
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    We may update this Privacy Policy from time to time. We'll notify you of any significant changes 
                    via email or through our service. Your continued use of PitchCraft after changes become effective 
                    constitutes acceptance of the updated policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;
