'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface DocGeneratorProps {
  startup: any;
  onClose?: () => void;
}

type DocType = 'prd' | 'mvp' | 'cursor' | 'tasks' | 'build';

const docTypes: Array<{ type: DocType; label: string; description: string }> = [
  { type: 'cursor', label: '🤖 Cursor/Claude AI Prompt', description: 'Copy-paste into Cursor IDE for instant development' },
  { type: 'prd', label: '📋 Product Requirements Doc', description: 'Full PRD with features, architecture, timeline' },
  { type: 'mvp', label: '✅ MVP Implementation Checklist', description: 'Week-by-week implementation roadmap' },
  { type: 'tasks', label: '📝 Detailed Task List', description: 'Granular tasks with time estimates' },
  { type: 'build', label: '🏗️ Build Instructions', description: 'Complete setup and development guide' },
];

export function DocGenerator({ startup, onClose }: DocGeneratorProps) {
  const [loading, setLoading] = useState<DocType | null>(null);

  const handleDownload = async (type: DocType) => {
    setLoading(type);
    try {
      const response = await fetch('/api/generate-docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startup, type }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate document');
      }

      // Get the blob and trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = response.headers.get('content-disposition')?.split('filename=')[1] || `${startup.name}_${type}.md`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success(`${docTypes.find((d) => d.type === type)?.label} downloaded!`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to generate document');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">📚 Download Build Documentation</h2>
          {onClose && (
            <button onClick={onClose} className="text-2xl hover:opacity-60">
              ✕
            </button>
          )}
        </div>

        <div className="p-6 space-y-4">
          <div className="grid gap-3">
            {docTypes.map((doc) => (
              <button
                key={doc.type}
                onClick={() => handleDownload(doc.type)}
                disabled={loading !== null}
                className="p-4 border rounded-lg hover:shadow-lg hover:bg-secondary/30 transition text-left"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{doc.label}</p>
                    <p className="text-sm text-muted-foreground">{doc.description}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(doc.type);
                    }}
                    disabled={loading !== null}
                    className="btn btn-primary text-sm px-4 whitespace-nowrap"
                  >
                    {loading === doc.type ? 'Downloading...' : 'Download'}
                  </button>
                </div>
              </button>
            ))}
          </div>

          <div className="p-4 bg-primary/10 rounded-lg space-y-2 mt-6">
            <p className="font-semibold">🎯 Recommended Flow</p>
            <ol className="text-sm space-y-1 text-muted-foreground list-decimal list-inside">
              <li>
                <strong>Start with Cursor AI Prompt</strong> - Copy into Cursor IDE and let it generate code
              </li>
              <li>
                <strong>Reference the PRD</strong> - Keep features and requirements in mind
              </li>
              <li>
                <strong>Follow Task List</strong> - Stay on track with the 2-week timeline
              </li>
              <li>
                <strong>Use Build Instructions</strong> - For deployment and setup help
              </li>
            </ol>
          </div>

          <div className="p-4 bg-blue-100/10 rounded-lg space-y-2">
            <p className="font-semibold">💡 How It Works</p>
            <p className="text-sm text-muted-foreground">
              Each document is a standalone Markdown file optimized for your IDE. The Cursor/Claude prompt is ready to paste
              directly and will generate a complete working SaaS application.
            </p>
          </div>

          {onClose && (
            <button onClick={onClose} className="w-full btn btn-secondary mt-4">
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
