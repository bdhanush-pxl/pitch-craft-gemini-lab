import React, { useState, useRef } from 'react';
import { Mic, Square, Loader2, RotateCcw, Sparkles, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
interface GeneratedPitch {
  oneLiner: string;
  structure: {
    problem: string;
    solution: string;
    market: string;
    competition: string;
    businessModel: string;
    traction: string;
    team: string;
    financials: string;
    funding: string;
    timeline: string;
  };
}
const CreatePage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [generatedPitch, setGeneratedPitch] = useState<GeneratedPitch | null>(null);
  const [error, setError] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<any>(null);
  const startRecording = async () => {
    try {
      setError('');

      // Check if browser supports speech recognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        throw new Error('Speech recognition not supported in this browser');
      }

      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });

      // Set up speech recognition
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      let finalTranscript = '';
      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
        setTranscript(finalTranscript + interimTranscript);
      };
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setError('Speech recognition error: ' + event.error);
        setIsRecording(false);
      };
      recognitionRef.current.onend = () => {
        setIsRecording(false);
        setIsTranscribing(false);
        if (finalTranscript.trim()) {
          setTranscript(finalTranscript.trim());
        }
      };

      // Start recording
      recognitionRef.current.start();
      setIsRecording(true);
      console.log('Recording started...');
    } catch (error) {
      console.error('Error starting recording:', error);
      setError('Failed to start recording. Please check microphone permissions.');
    }
  };
  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    setIsTranscribing(false);
  };
  const handleRecordClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };
  const rerecord = () => {
    setTranscript('');
    setGeneratedPitch(null);
    setError('');
  };
  const generatePitch = async () => {
    if (!transcript.trim()) {
      setError('No transcript available to generate pitch');
      return;
    }
    setIsGenerating(true);
    setError('');
    try {
      // For now, we'll simulate the Gemini AI call with a mock response
      // In a real implementation, you would call the Gemini API here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call

      const mockPitch: GeneratedPitch = {
        oneLiner: "We're revolutionizing how startups create compelling pitch decks through AI-powered voice transcription and Guy Kawasaki's proven methodology.",
        structure: {
          problem: "Entrepreneurs struggle to create compelling, structured pitch decks that effectively communicate their vision to investors.",
          solution: "An AI-powered platform that transforms founder stories into professional pitch decks using proven frameworks.",
          market: "The global presentation software market is valued at $6.2B and growing at 8.5% annually, with startups raising $500B+ yearly.",
          competition: "Traditional tools like PowerPoint lack AI assistance, while pitch consultants are expensive and time-consuming.",
          businessModel: "SaaS subscription model with tiered pricing: $29/month for basic, $99/month for premium features.",
          traction: "500+ beta users, 89% user satisfaction rate, partnerships with 3 major accelerators.",
          team: "Experienced team with backgrounds in AI, design, and startup consulting from top tech companies.",
          financials: "Projecting $1M ARR by end of year 2, with 40% gross margins and path to profitability.",
          funding: "Seeking $2M seed round to accelerate product development and user acquisition.",
          timeline: "12-month roadmap includes mobile app launch, enterprise features, and international expansion."
        }
      };
      setGeneratedPitch(mockPitch);
    } catch (error) {
      console.error('Error generating pitch:', error);
      setError('Failed to generate pitch. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  const savePitch = () => {
    if (!generatedPitch) return;

    // Save to localStorage for now (later this would go to a database)
    const existingPitches = JSON.parse(localStorage.getItem('savedPitches') || '[]');
    const newPitch = {
      id: Date.now(),
      title: generatedPitch.oneLiner.substring(0, 50) + '...',
      oneLiner: generatedPitch.oneLiner,
      structure: generatedPitch.structure,
      transcript: transcript,
      createdAt: new Date().toISOString(),
      status: 'completed'
    };
    existingPitches.push(newPitch);
    localStorage.setItem('savedPitches', JSON.stringify(existingPitches));
    toast({
      title: "Pitch Saved!",
      description: "Your pitch has been saved to the library."
    });

    // Reset the form
    setTranscript('');
    setGeneratedPitch(null);
  };
  const deletePitch = () => {
    setGeneratedPitch(null);
    setTranscript('');
  };

  // Show generated pitch view
  if (generatedPitch) {
    return <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center animate-fade-in">
            <h1 className="text-2xl font-bold font-poppins mb-2">Your Generated Pitch</h1>
            <p className="text-muted-foreground">Review and save your AI-generated pitch deck structure</p>
          </div>

          <div className="space-y-6 animate-fade-in">
            {/* One-liner */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">One-Liner</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed">{generatedPitch.oneLiner}</p>
              </CardContent>
            </Card>

            {/* Pitch Structure */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pitch Structure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(generatedPitch.structure).map(([key, value]) => <div key={key}>
                    <h3 className="font-semibold text-sm capitalize mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value}</p>
                  </div>)}
              </CardContent>
            </Card>

            {/* Action buttons */}
            <div className="flex gap-3 justify-center">
              <Button onClick={savePitch} className="h-9 px-6">
                <Save className="w-4 h-4 mr-2" />
                Save to Library
              </Button>
              <Button onClick={deletePitch} variant="outline" className="h-9 px-6">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>;
  }

  // Show transcript review view
  if (transcript && !isGenerating) {
    return <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center animate-fade-in">
            <h1 className="text-2xl font-bold font-poppins mb-2">Review Your Recording</h1>
            <p className="text-muted-foreground">Check the transcript and generate your pitch</p>
          </div>

          <div className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Transcript</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">{transcript}</p>
              </CardContent>
            </Card>

            <div className="flex gap-3 justify-center">
              <Button onClick={generatePitch} className="h-9 px-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Pitch
              </Button>
              <Button onClick={rerecord} variant="outline" className="h-9 px-6">
                <RotateCcw className="w-4 h-4 mr-2" />
                Re-record
              </Button>
            </div>
          </div>
        </div>
      </div>;
  }

  // Main recording view
  return <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="font-bold font-poppins mb-3 text-3xl">Create Your Pitch</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Record your founder story and let our AI transform it into a compelling pitch deck following Guy Kawasaki's methodology.
          </p>
        </div>

        {/* Error Alert */}
        {error && <div className="mb-8 animate-fade-in">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>}

        {/* Main Recording Area */}
        <div className="flex flex-col items-center justify-center min-h-[400px] animate-fade-in">
          {isGenerating ? <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
              <p className="text-base font-medium mb-2">Generating your pitch...</p>
              <p className="text-sm text-muted-foreground">This may take a moment</p>
            </div> : <>
              <div className="relative mb-8">
                {/* Outer pulse ring */}
                {isRecording && <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>}
                
                {/* Record Button */}
                <Button onClick={handleRecordClick} size="lg" className={`
                    relative w-24 h-24 rounded-full text-base font-semibold transition-all duration-300 hover:scale-105
                    ${isRecording ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gradient-to-br from-primary to-green-400 hover:from-primary/90 hover:to-green-400/90'}
                  `}>
                  {isRecording ? <div className="flex flex-col items-center gap-1">
                      <Square className="w-6 h-6" />
                      <span className="text-xs">Stop</span>
                    </div> : <div className="flex flex-col items-center gap-1">
                      <Mic className="w-6 h-6" />
                      <span className="text-xs">Record</span>
                    </div>}
                </Button>
              </div>

              {/* Status Text */}
              <div className="text-center">
                {isRecording ? <div className="flex items-center gap-2 text-red-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="font-medium text-sm">Recording in progress...</span>
                  </div> : <p className="text-muted-foreground text-base">
                    Click the record button to start sharing your founder story
                  </p>}
              </div>

              {/* Live transcript display */}
              {transcript && isRecording && <div className="mt-8 p-4 bg-secondary/20 rounded-lg border border-border/50 max-w-2xl">
                  <h3 className="font-semibold mb-2 text-sm font-poppins">Live Transcript</h3>
                  <p className="text-xs text-muted-foreground whitespace-pre-wrap">{transcript}</p>
                </div>}

              {/* Recording Tips */}
              {!isRecording && !transcript && <div className="mt-12 p-6 bg-secondary/20 rounded-xl border border-border/50 max-w-2xl">
                  <h3 className="font-semibold mb-3 font-poppins text-base">💡 Recording Tips</h3>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li>• Speak clearly and at a normal pace</li>
                    <li>• Share your company's origin story and vision</li>
                    <li>• Mention your target market and unique value proposition</li>
                    <li>• Include key metrics and milestones if available</li>
                  </ul>
                </div>}
            </>}
        </div>
      </div>
    </div>;
};
export default CreatePage;