
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Mic, Square, Volume2, Settings, Eye, List, MessageSquare } from 'lucide-react';

const RehearsalPage = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default
  const [totalTime, setTotalTime] = useState(300);
  const [isRecording, setIsRecording] = useState(false);
  const [practiceMode, setPracticeMode] = useState('teleprompter');
  const [selectedPitch, setSelectedPitch] = useState('');
  const [scrollSpeed, setScrollSpeed] = useState(50);
  const [sessionStarted, setSessionStarted] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Timer logic
  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    setIsTimerRunning(!isTimerRunning);
    if (!sessionStarted) {
      setSessionStarted(true);
    }
  };

  const handleReset = () => {
    setIsTimerRunning(false);
    setTimeLeft(totalTime);
    setSessionStarted(false);
    setIsRecording(false);
  };

  const handleTimeChange = (minutes: string) => {
    const newTime = parseInt(minutes) * 60;
    setTotalTime(newTime);
    setTimeLeft(newTime);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  // Sample pitch content
  const samplePitchContent = `
    Hi, I'm Sarah, and I'm here to introduce you to EcoCart - the revolutionary solution that's transforming how we think about sustainable shopping.

    The Problem: Every year, consumers want to shop sustainably but struggle to find eco-friendly alternatives. 73% of global consumers say they would change their consumption habits to reduce environmental impact, yet only 19% actually do.

    Our Solution: EcoCart is an AI-powered browser extension that instantly shows you sustainable alternatives for any product you're shopping for online. With one click, you can see eco-friendly options, carbon footprint comparisons, and ethical brand ratings.

    Market Opportunity: The sustainable products market is worth $15.1 billion and growing at 8.9% annually. We're capturing this demand by making sustainable shopping effortless.

    Traction: In just 18 months, we've gained 250,000 active users, partnered with 1,200 sustainable brands, and helped reduce 50,000 tons of CO2 emissions.

    Business Model: We earn commission from partner brands when users make purchases through our platform. Our average revenue per user is $24 annually.

    Team: Our founding team combines 15 years of e-commerce experience with deep expertise in sustainability and AI technology.

    Financials: We've achieved $2.1M in annual recurring revenue with 40% month-over-month growth. We're seeking $5M to accelerate user acquisition and expand internationally.

    The Ask: Join us in making sustainable shopping the default choice for millions of consumers worldwide.
  `;

  const practiceQuestions = [
    "What's your biggest competitive advantage?",
    "How do you plan to scale this business?",
    "What's your customer acquisition cost?",
    "How big is your addressable market?",
    "What are the biggest risks to your business?",
    "How do you plan to use the funding?",
    "What's your revenue model?",
    "Who are your main competitors?"
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 font-poppins">Rehearsal Mode</h1>
        <p className="text-muted-foreground">Practice your pitch with our AI-powered coaching tools</p>
      </div>

      {/* Timer and Controls */}
      <Card className="bg-card/40 backdrop-blur-sm border-border shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="w-5 h-5" />
            Practice Timer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold font-mono mb-4 text-primary">
              {formatTime(timeLeft)}
            </div>
            <Progress value={progress} className="w-full h-2 mb-4" />
            <div className="flex items-center justify-center gap-4 mb-4">
              <Button
                onClick={handleStartPause}
                size="lg"
                className={isTimerRunning ? "bg-orange-500 hover:bg-orange-600" : ""}
              >
                {isTimerRunning ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                {isTimerRunning ? 'Pause' : 'Start'}
              </Button>
              <Button onClick={handleReset} variant="outline" size="lg">
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>
              <Button 
                onClick={toggleRecording}
                variant={isRecording ? "destructive" : "secondary"}
                size="lg"
              >
                {isRecording ? <Square className="w-5 h-5 mr-2" /> : <Mic className="w-5 h-5 mr-2" />}
                {isRecording ? 'Stop Recording' : 'Record'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Timer Duration</label>
              <Select value={(totalTime / 60).toString()} onValueChange={handleTimeChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 minute</SelectItem>
                  <SelectItem value="2">2 minutes</SelectItem>
                  <SelectItem value="3">3 minutes</SelectItem>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Practice Mode</label>
              <Select value={practiceMode} onValueChange={setPracticeMode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teleprompter">Teleprompter</SelectItem>
                  <SelectItem value="bullets">Bullet Points</SelectItem>
                  <SelectItem value="qa">Q&A Practice</SelectItem>
                  <SelectItem value="free">Free Practice</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Pitch Selection</label>
              <Select value={selectedPitch} onValueChange={setSelectedPitch}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a pitch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sample">Sample Pitch - EcoCart</SelectItem>
                  <SelectItem value="custom">Custom Content</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Practice Content */}
      <Card className="bg-card/40 backdrop-blur-sm border-border shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Practice Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={practiceMode} onValueChange={setPracticeMode}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="teleprompter" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Teleprompter
              </TabsTrigger>
              <TabsTrigger value="bullets" className="flex items-center gap-2">
                <List className="w-4 h-4" />
                Bullets
              </TabsTrigger>
              <TabsTrigger value="qa" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Q&A
              </TabsTrigger>
              <TabsTrigger value="free" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Free
              </TabsTrigger>
            </TabsList>

            <TabsContent value="teleprompter" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium">Scroll Speed:</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={scrollSpeed}
                    onChange={(e) => setScrollSpeed(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground">{scrollSpeed}%</span>
                </div>
                <div 
                  ref={scrollRef}
                  className="bg-secondary/20 rounded-lg p-6 h-64 overflow-y-auto border-2 border-dashed border-border"
                >
                  <div className="text-lg leading-relaxed whitespace-pre-line">
                    {selectedPitch === 'sample' ? samplePitchContent : 'Select a pitch or add custom content to practice with the teleprompter.'}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bullets" className="mt-6">
              <div className="bg-secondary/20 rounded-lg p-6 h-64 overflow-y-auto">
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></span>
                    <span>Problem: 73% want sustainable shopping, only 19% actually do it</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></span>
                    <span>Solution: AI-powered browser extension for sustainable alternatives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></span>
                    <span>Market: $15.1B sustainable products market, 8.9% growth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></span>
                    <span>Traction: 250K users, 1.2K partners, 50K tons CO2 saved</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></span>
                    <span>Business Model: Commission-based, $24 ARPU</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></span>
                    <span>Ask: $5M for user acquisition and international expansion</span>
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="qa" className="mt-6">
              <div className="space-y-4">
                <p className="text-muted-foreground mb-4">Practice answering common investor questions:</p>
                <div className="grid gap-3">
                  {practiceQuestions.map((question, index) => (
                    <Card key={index} className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer">
                      <p className="font-medium">{question}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="free" className="mt-6">
              <div className="bg-secondary/20 rounded-lg p-6 h-64 flex items-center justify-center border-2 border-dashed border-border">
                <div className="text-center">
                  <Volume2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Free Practice Mode</p>
                  <p className="text-muted-foreground">Use the timer and recording features to practice freely without any prompts.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Session Status */}
      {sessionStarted && (
        <Card className="bg-card/40 backdrop-blur-sm border-border shadow-lg">
          <CardHeader>
            <CardTitle>Session Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Badge variant={isTimerRunning ? "default" : "secondary"}>
                {isTimerRunning ? "In Progress" : "Paused"}
              </Badge>
              <Badge variant={isRecording ? "destructive" : "outline"}>
                {isRecording ? "Recording" : "Not Recording"}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Mode: {practiceMode.charAt(0).toUpperCase() + practiceMode.slice(1)}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RehearsalPage;
