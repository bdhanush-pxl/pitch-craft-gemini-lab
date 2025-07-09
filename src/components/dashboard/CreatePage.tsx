
import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Loader2, RotateCcw, Sparkles, Save, Trash2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

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
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [generatedPitch, setGeneratedPitch] = useState<GeneratedPitch | null>(null);
  const [error, setError] = useState('');
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const startRecording = async () => {
    try {
      setError('');
      setQuotaExceeded(false);
      console.log('Starting recording...');
      
      // Request microphone permission with better audio settings
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 44100,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      console.log('Microphone access granted');

      // Check supported MIME types and use the best available
      let mimeType = 'audio/webm;codecs=opus';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'audio/webm';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = 'audio/mp4';
          if (!MediaRecorder.isTypeSupported(mimeType)) {
            mimeType = 'audio/wav';
          }
        }
      }

      console.log('Using MIME type:', mimeType);

      // Set up MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: mimeType
      });
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        console.log('Audio data available:', event.data.size, 'bytes');
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        console.log('Recording stopped, processing audio...');
        console.log('Total chunks collected:', audioChunksRef.current.length);
        
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        console.log('Audio blob created - size:', audioBlob.size, 'bytes, type:', audioBlob.type);
        
        if (audioBlob.size === 0) {
          console.error('Audio blob is empty');
          setError('Recording failed - no audio data captured');
          setIsTranscribing(false);
          return;
        }
        
        await transcribeAudio(audioBlob);
        
        // Stop all tracks to free up the microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event);
        setError('Recording error occurred');
        setIsRecording(false);
      };

      // Start recording with smaller time slices for better data collection
      mediaRecorder.start(250);
      setIsRecording(true);
      console.log('Recording started successfully with MIME type:', mimeType);
    } catch (error) {
      console.error('Error starting recording:', error);
      setError(`Failed to start recording: ${error.message}`);
    }
  };

  const stopRecording = () => {
    console.log('Stopping recording...');
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsTranscribing(true);
    }
  };

  const transcribeWithWebSpeech = () => {
    return new Promise<string>((resolve, reject) => {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        reject(new Error('Speech recognition not supported in this browser'));
        return;
      }

      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        resolve(transcript);
      };

      recognition.onerror = (event: any) => {
        reject(new Error('Speech recognition error: ' + event.error));
      };

      recognition.start();
      recognitionRef.current = recognition;
    });
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    try {
      console.log('Starting transcription process...');
      console.log('Audio blob details:', {
        size: audioBlob.size,
        type: audioBlob.type
      });

      // Convert blob to array buffer
      const arrayBuffer = await audioBlob.arrayBuffer();
      console.log('ArrayBuffer size:', arrayBuffer.byteLength);
      
      if (arrayBuffer.byteLength === 0) {
        throw new Error('Audio data is empty');
      }

      // Convert to base64 with chunked processing to prevent memory issues
      const bytes = new Uint8Array(arrayBuffer);
      let base64Audio = '';
      const chunkSize = 8192;
      
      for (let i = 0; i < bytes.length; i += chunkSize) {
        const chunk = bytes.slice(i, i + chunkSize);
        const binaryString = Array.from(chunk).map(byte => String.fromCharCode(byte)).join('');
        base64Audio += btoa(binaryString);
      }
      
      console.log('Audio converted to base64, length:', base64Audio.length);

      if (base64Audio.length === 0) {
        throw new Error('Base64 conversion failed');
      }

      console.log('Calling transcribe-audio function...');
      const { data, error } = await supabase.functions.invoke('transcribe-audio', {
        body: { audio: base64Audio }
      });

      console.log('Transcription response:', { data, error });

      if (error) {
        console.error('Transcription error from function:', error);
        
        // Check if it's a quota exceeded error
        if (error.message && error.message.toLowerCase().includes('quota')) {
          setQuotaExceeded(true);
          throw new Error('OpenAI quota exceeded. Please add credits to your account or try the browser transcription option.');
        }
        
        throw new Error(error.message || 'Transcription failed');
      }

      if (!data || !data.text) {
        console.error('No transcription text received:', data);
        
        // Try fallback transcription if main service fails
        console.log('Attempting fallback transcription...');
        try {
          const fallbackText = await transcribeWithWebSpeech();
          setTranscript(fallbackText);
          setIsTranscribing(false);
          
          toast({
            title: "Recording Transcribed (Fallback)!",
            description: "Your audio has been transcribed using browser speech recognition."
          });
          return;
        } catch (fallbackError) {
          console.error('Fallback transcription failed:', fallbackError);
          throw new Error('Both primary and fallback transcription failed');
        }
      }

      console.log('Transcription successful:', data.text);
      setTranscript(data.text);
      setIsTranscribing(false);
      
      toast({
        title: "Recording Transcribed!",
        description: "Your audio has been successfully converted to text."
      });

    } catch (error) {
      console.error('Transcription error:', error);
      setError(`Failed to transcribe audio: ${error.message}`);
      setIsTranscribing(false);
      
      toast({
        title: "Transcription Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleRecordClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const rerecord = () => {
    console.log('Re-recording requested');
    setTranscript('');
    setGeneratedPitch(null);
    setError('');
    setQuotaExceeded(false);
  };

  const generatePitch = async () => {
    if (!transcript.trim()) {
      setError('No transcript available to generate pitch');
      return;
    }
    
    console.log('Generating pitch from transcript:', transcript.substring(0, 100) + '...');
    setIsGenerating(true);
    setError('');
    
    try {
      console.log('Calling generate-pitch function...');
      const { data, error } = await supabase.functions.invoke('generate-pitch', {
        body: { transcript }
      });

      console.log('Pitch generation response:', { data, error });

      if (error) {
        console.error('Pitch generation error:', error);
        throw new Error(error.message || 'Pitch generation failed');
      }

      if (!data) {
        throw new Error('No pitch data received from service');
      }

      console.log('Pitch generated successfully:', data);
      setGeneratedPitch(data);
      
      toast({
        title: "Pitch Generated!",
        description: "Your AI-powered pitch deck is ready for review."
      });

    } catch (error) {
      console.error('Error generating pitch:', error);
      setError(`Failed to generate pitch: ${error.message}`);
      
      toast({
        title: "Pitch Generation Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const savePitch = async () => {
    if (!generatedPitch || !user) return;

    setIsSaving(true);
    try {
      console.log('Saving pitch to database...');
      const { error } = await supabase
        .from('pitches')
        .insert({
          user_id: user.id,
          title: generatedPitch.oneLiner.substring(0, 50) + '...',
          one_liner: generatedPitch.oneLiner,
          structure: generatedPitch.structure,
          transcript: transcript,
          status: 'completed'
        });

      if (error) {
        console.error('Error saving pitch:', error);
        toast({
          title: "Error",
          description: "Failed to save pitch. Please try again.",
          variant: "destructive"
        });
        return;
      }

      console.log('Pitch saved successfully');
      toast({
        title: "Pitch Saved!",
        description: "Your pitch has been saved to the library."
      });

      // Reset the form
      setTranscript('');
      setGeneratedPitch(null);
    } catch (error) {
      console.error('Error saving pitch:', error);
      toast({
        title: "Error",
        description: "Failed to save pitch. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const deletePitch = () => {
    console.log('Deleting pitch');
    setGeneratedPitch(null);
    setTranscript('');
  };

  // Don't render if not authenticated
  if (!user) {
    return null;
  }

  // Show generated pitch view
  if (generatedPitch) {
    return (
      <div className="flex-1 p-8">
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
                {Object.entries(generatedPitch.structure).map(([key, value]) => (
                  <div key={key}>
                    <h3 className="font-semibold text-sm capitalize mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Action buttons */}
            <div className="flex gap-3 justify-center">
              <Button onClick={savePitch} className="h-9 px-6" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save to Library
                  </>
                )}
              </Button>
              <Button onClick={deletePitch} variant="outline" className="h-9 px-6" disabled={isSaving}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show transcript review view
  if (transcript && !isGenerating && !isTranscribing) {
    return (
      <div className="flex-1 p-8">
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
      </div>
    );
  }

  // Main recording view
  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="font-bold font-poppins mb-3 text-3xl">Create Your Pitch</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Record your founder story and let our AI transform it into a compelling pitch deck following Guy Kawasaki's methodology.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-8 animate-fade-in">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Quota Exceeded Alert */}
        {quotaExceeded && (
          <div className="mb-8 animate-fade-in">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-semibold">OpenAI Quota Exceeded</p>
                  <p className="text-sm">Your OpenAI account has reached its usage limit. You can:</p>
                  <ul className="text-sm list-disc list-inside ml-4 space-y-1">
                    <li>Add credits to your OpenAI account</li>
                    <li>Upgrade your OpenAI plan</li>
                    <li>Try the browser-based transcription (less accurate but free)</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Main Recording Area */}
        <div className="flex flex-col items-center justify-center min-h-[400px] animate-fade-in">
          {isGenerating ? (
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
              <p className="text-base font-medium mb-2">Generating your pitch...</p>
              <p className="text-sm text-muted-foreground">This may take a moment</p>
            </div>
          ) : isTranscribing ? (
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
              <p className="text-base font-medium mb-2">Transcribing your recording...</p>
              <p className="text-sm text-muted-foreground">Please wait while we process your audio</p>
            </div>
          ) : (
            <>
              <div className="relative mb-8">
                {/* Outer pulse ring */}
                {isRecording && (
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                )}
                
                {/* Record Button */}
                <Button
                  onClick={handleRecordClick}
                  size="lg"
                  className={`
                    relative w-24 h-24 rounded-full text-base font-semibold transition-all duration-300 hover:scale-105
                    ${isRecording ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gradient-to-br from-primary to-green-400 hover:from-primary/90 hover:to-green-400/90'}
                  `}
                >
                  {isRecording ? (
                    <div className="flex flex-col items-center gap-1">
                      <Square className="w-6 h-6" />
                      <span className="text-xs">Stop</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <Mic className="w-6 h-6" />
                      <span className="text-xs">Record</span>
                    </div>
                  )}
                </Button>
              </div>

              {/* Status Text */}
              <div className="text-center">
                {isRecording ? (
                  <div className="flex items-center gap-2 text-red-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="font-medium text-sm">Recording in progress...</span>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-base">
                    Click the record button to start sharing your founder story
                  </p>
                )}
              </div>

              {/* Recording Tips */}
              {!isRecording && (
                <div className="mt-12 p-6 bg-secondary/20 rounded-xl border border-border/50 max-w-2xl">
                  <h3 className="font-semibold mb-3 font-poppins text-base">💡 Recording Tips</h3>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li>• Speak clearly and at a normal pace</li>
                    <li>• Share your company's origin story and vision</li>
                    <li>• Mention your target market and unique value proposition</li>
                    <li>• Include key metrics and milestones if available</li>
                    {quotaExceeded && (
                      <li className="text-orange-600">• If transcription fails, browser fallback will be used</li>
                    )}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
