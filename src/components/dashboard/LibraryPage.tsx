
import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Download, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface SavedPitch {
  id: number;
  title: string;
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
  transcript: string;
  createdAt: string;
  status: string;
}

const LibraryPage = () => {
  const [savedPitches, setSavedPitches] = useState<SavedPitch[]>([]);
  const [selectedPitch, setSelectedPitch] = useState<SavedPitch | null>(null);

  useEffect(() => {
    loadSavedPitches();
  }, []);

  const loadSavedPitches = () => {
    const pitches = JSON.parse(localStorage.getItem('savedPitches') || '[]');
    setSavedPitches(pitches);
  };

  const deletePitch = (pitchId: number) => {
    const updatedPitches = savedPitches.filter(pitch => pitch.id !== pitchId);
    localStorage.setItem('savedPitches', JSON.stringify(updatedPitches));
    setSavedPitches(updatedPitches);
    
    toast({
      title: "Pitch Deleted",
      description: "The pitch has been removed from your library.",
    });
  };

  const downloadPitch = (pitch: SavedPitch) => {
    const pitchContent = `
PITCH DECK - ${pitch.title}

ONE-LINER:
${pitch.oneLiner}

PITCH STRUCTURE:
${Object.entries(pitch.structure).map(([key, value]) => `
${key.toUpperCase().replace(/([A-Z])/g, ' $1').trim()}:
${value}
`).join('\n')}

ORIGINAL TRANSCRIPT:
${pitch.transcript}

Generated on: ${new Date(pitch.createdAt).toLocaleDateString()}
    `.trim();

    const blob = new Blob([pitchContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pitch-${pitch.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Download Started",
      description: "Your pitch deck has been downloaded as a text file.",
    });
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold font-poppins mb-2">Pitch Library</h1>
          <p className="text-muted-foreground text-sm">
            Access and manage all your generated pitch decks
          </p>
        </div>

        {/* Pitches Grid */}
        <div className="space-y-4 animate-fade-in">
          {savedPitches.length > 0 ? (
            savedPitches.map((pitch) => (
              <div
                key={pitch.id}
                className="p-6 bg-card border border-border/50 rounded-xl hover:border-primary/20 transition-all duration-200 hover-lift"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div>
                      <h3 className="font-semibold font-poppins text-base">{pitch.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Calendar className="w-3 h-3" />
                        <span>Created on {new Date(pitch.createdAt).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          pitch.status === 'completed' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}>
                          {pitch.status === 'completed' ? 'Ready' : 'Processing'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-3 text-xs"
                          onClick={() => setSelectedPitch(pitch)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-lg">{selectedPitch?.title}</DialogTitle>
                        </DialogHeader>
                        {selectedPitch && (
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-semibold text-sm mb-2">One-Liner</h3>
                              <p className="text-sm text-muted-foreground">{selectedPitch.oneLiner}</p>
                            </div>
                            
                            <div>
                              <h3 className="font-semibold text-sm mb-2">Pitch Structure</h3>
                              <div className="space-y-3">
                                {Object.entries(selectedPitch.structure).map(([key, value]) => (
                                  <div key={key}>
                                    <h4 className="font-medium text-xs capitalize mb-1">
                                      {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </h4>
                                    <p className="text-xs text-muted-foreground">{value}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 text-xs"
                      onClick={() => downloadPitch(pitch)}
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => deletePitch(pitch.id)}
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold font-poppins text-base mb-2">No pitches yet</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Create your first pitch to see it appear here
              </p>
              <Button asChild size="sm">
                <a href="/dashboard/create">Create Your First Pitch</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
