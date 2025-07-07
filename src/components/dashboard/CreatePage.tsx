
import React, { useState } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CreatePage = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleRecordClick = () => {
    setIsRecording(!isRecording);
    // Recording logic will be implemented later
    console.log(isRecording ? 'Stopping recording...' : 'Starting recording...');
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-3xl font-bold font-poppins mb-4">Create Your Pitch</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Record your founder story and let our AI transform it into a compelling pitch deck following Guy Kawasaki's methodology.
          </p>
        </div>

        {/* Main Recording Area */}
        <div className="flex flex-col items-center justify-center min-h-[500px] animate-fade-in">
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
                relative w-32 h-32 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105
                ${isRecording 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-gradient-to-br from-primary to-green-400 hover:from-primary/90 hover:to-green-400/90'
                }
              `}
            >
              {isRecording ? (
                <div className="flex flex-col items-center gap-2">
                  <Square className="w-8 h-8" />
                  <span className="text-sm">Stop</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Mic className="w-8 h-8" />
                  <span className="text-sm">Record</span>
                </div>
              )}
            </Button>
          </div>

          {/* Status Text */}
          <div className="text-center">
            {isRecording ? (
              <div className="flex items-center gap-2 text-red-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="font-medium">Recording in progress...</span>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Click the record button to start sharing your founder story
              </p>
            )}
          </div>

          {/* Recording Tips */}
          {!isRecording && (
            <div className="mt-12 p-6 bg-secondary/20 rounded-xl border border-border/50 max-w-2xl">
              <h3 className="font-semibold mb-3 font-poppins">💡 Recording Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Speak clearly and at a normal pace</li>
                <li>• Share your company's origin story and vision</li>
                <li>• Mention your target market and unique value proposition</li>
                <li>• Include key metrics and milestones if available</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
