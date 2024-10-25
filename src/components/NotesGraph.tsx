import React, { useState } from 'react';
import { FileText, Link as LinkIcon, Plus, Hash, Search, X } from 'lucide-react';

interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
  connections: number[];
  lastModified: Date;
}

const NotesGraph = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'Investment Strategy 2024',
      content: `# Investment Strategy 2024

## Market Analysis
- Global markets showing resilience
- Tech sector leading innovation
- Emerging markets present opportunities

## Key Focus Areas
1. AI & Machine Learning
2. Clean Energy
3. Biotechnology
4. Digital Infrastructure

## Risk Management
- Diversification across sectors
- Regular portfolio rebalancing
- Hedging strategies implementation

## Action Items
- [ ] Research quantum computing companies
- [ ] Analyze clean energy ETFs
- [ ] Review crypto allocation
- [ ] Update risk models`,
      tags: ['strategy', 'planning', 'analysis'],
      connections: [2, 3],
      lastModified: new Date('2024-03-15')
    },
    {
      id: 2,
      title: 'AI Trading Systems',
      content: `# AI Trading Systems

## System Architecture
- Neural network backbone
- Real-time data processing
- Multi-agent decision making

## Key Components
1. Market Data Analysis
2. Pattern Recognition
3. Risk Assessment
4. Execution Engine

## Performance Metrics
- Win rate: 68%
- Sharpe ratio: 1.92
- Maximum drawdown: 12%

## Improvements
- [ ] Implement quantum algorithms
- [ ] Enhance NLP capabilities
- [ ] Optimize execution speed`,
      tags: ['AI', 'trading', 'technology'],
      connections: [1],
      lastModified: new Date('2024-03-14')
    },
    {
      id: 3,
      title: 'Risk Management Framework',
      content: `# Risk Management Framework

## Core Principles
1. Systematic Assessment
2. Dynamic Hedging
3. Continuous Monitoring

## Risk Categories
- Market Risk
- Credit Risk
- Operational Risk
- Systemic Risk

## Mitigation Strategies
- Portfolio Diversification
- Options Strategies
- Stop-Loss Implementation

## Monitoring Tools
- [ ] VaR Analysis
- [ ] Stress Testing
- [ ] Correlation Matrix
- [ ] Volatility Tracking`,
      tags: ['risk', 'management', 'analysis'],
      connections: [1],
      lastModified: new Date('2024-03-13')
    }
  ]);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: [] as string[]
  });

  const handleCreateNote = () => {
    const note: Note = {
      id: Math.max(...notes.map(n => n.id)) + 1,
      title: newNote.title,
      content: newNote.content,
      tags: newNote.tags,
      connections: [],
      lastModified: new Date()
    };
    setNotes([...notes, note]);
    setNewNote({ title: '', content: '', tags: [] });
    setEditMode(false);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="h-[calc(100vh-2rem)] grid grid-cols-2 gap-6">
      <div className="bg-white/5 rounded-xl border border-white/10 p-6 overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-light">Knowledge Base</h2>
          <button 
            onClick={() => setEditMode(true)}
            className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search notes or tags..."
          />
        </div>

        <div className="overflow-auto flex-1 pr-2 space-y-4">
          {filteredNotes.map(note => (
            <div
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer ${
                selectedNote?.id === note.id ? 'border border-blue-500/50' : ''
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <h3 className="font-light">{note.title}</h3>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                {note.content.split('\n')[0].replace('#', '').trim()}
              </p>
              <div className="flex flex-wrap gap-2">
                {note.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-blue-500/20 rounded-full flex items-center gap-1">
                    <Hash className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Last modified: {new Date(note.lastModified).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/5 rounded-xl border border-white/10 p-6 overflow-hidden flex flex-col">
        {editMode ? (
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light">New Note</h2>
              <button
                onClick={() => setEditMode(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <input
              type="text"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Note title..."
            />
            <textarea
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              className="flex-1 bg-black/50 border border-white/10 rounded-lg p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              placeholder="# Your note content in Markdown..."
            />
            <input
              type="text"
              value={newNote.tags.join(', ')}
              onChange={(e) => setNewNote({ ...newNote, tags: e.target.value.split(',').map(t => t.trim()) })}
              className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tags (comma-separated)..."
            />
            <button
              onClick={handleCreateNote}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Create Note
            </button>
          </div>
        ) : selectedNote ? (
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-blue-400" />
                <h2 className="text-2xl font-light">{selectedNote.title}</h2>
              </div>
              <div className="flex gap-2">
                {selectedNote.connections.map(id => {
                  const connectedNote = notes.find(n => n.id === id);
                  return connectedNote ? (
                    <button
                      key={id}
                      onClick={() => setSelectedNote(connectedNote)}
                      className="text-xs px-2 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    >
                      {connectedNote.title}
                    </button>
                  ) : null;
                })}
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                {selectedNote.content}
              </pre>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            <p>Select a note to view its content</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesGraph;