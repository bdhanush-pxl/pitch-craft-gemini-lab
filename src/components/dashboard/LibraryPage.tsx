
import React from 'react';
import { FileText, Calendar, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for demonstration
const mockPitches = [
  {
    id: 1,
    title: 'TechStart AI Platform',
    createdAt: '2024-01-15',
    status: 'completed',
  },
  {
    id: 2,
    title: 'EcoSmart Solutions',
    createdAt: '2024-01-10',
    status: 'completed',
  },
  {
    id: 3,
    title: 'HealthTrack App',
    createdAt: '2024-01-05',
    status: 'processing',
  },
];

const LibraryPage = () => {
  return (
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold font-poppins mb-2">Pitch Library</h1>
          <p className="text-muted-foreground">
            Access and manage all your generated pitch decks
          </p>
        </div>

        {/* Pitches Grid */}
        <div className="space-y-4 animate-fade-in">
          {mockPitches.length > 0 ? (
            mockPitches.map((pitch) => (
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
                      <h3 className="font-semibold font-poppins text-lg">{pitch.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Calendar className="w-4 h-4" />
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-3"
                      disabled={pitch.status !== 'completed'}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-3"
                      disabled={pitch.status !== 'completed'}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
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
              <h3 className="font-semibold font-poppins text-lg mb-2">No pitches yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first pitch to see it appear here
              </p>
              <Button asChild>
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
