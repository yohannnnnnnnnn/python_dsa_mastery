import React, { useState } from 'react';
import { Plus, Search, Sparkles } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

class TrieVisualNode {
  char: string;
  isEnd: boolean;
  children: Record<string, TrieVisualNode>;
  constructor(char: string = '') {
    this.char = char;
    this.isEnd = false;
    this.children = {};
  }
}

export const TrieVisualizer: React.FC = () => {
  const { incrementVisualizerInteractions } = useLearning();

  const [words, setWords] = useState<string[]>([
    'cat',
    'cater',
    'catnip',
    'camera',
    'dog',
    'door',
    'doom',
  ]);

  const [newWordInput, setNewWordInput] = useState('');
  const [prefixInput, setPrefixInput] = useState('cat');
  const [statusMessage, setStatusMessage] = useState<string>(
    'Trie Prefix Tree ready. Search and insertion speed is O(K) where K is word length!'
  );

  // Build root from words
  const buildTrie = (wordList: string[]): TrieVisualNode => {
    const root = new TrieVisualNode('ROOT');
    wordList.forEach((w) => {
      let curr = root;
      for (const ch of w.toLowerCase()) {
        if (!curr.children[ch]) {
          curr.children[ch] = new TrieVisualNode(ch);
        }
        curr = curr.children[ch];
      }
      curr.isEnd = true;
    });
    return root;
  };

  const trieRoot = buildTrie(words);

  // Autocomplete prediction finder
  const getAutocompletePredictions = (prefix: string): string[] => {
    if (!prefix.trim()) return [];
    let curr = trieRoot;
    for (const ch of prefix.toLowerCase()) {
      if (!curr.children[ch]) return [];
      curr = curr.children[ch];
    }

    const matches: string[] = [];
    const collect = (node: TrieVisualNode, currentStr: string) => {
      if (node.isEnd) matches.push(currentStr);
      for (const [ch, child] of Object.entries(node.children)) {
        collect(child, currentStr + ch);
      }
    };
    collect(curr, prefix.toLowerCase());
    return matches;
  };

  const predictions = getAutocompletePredictions(prefixInput);

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWordInput.trim()) return;
    incrementVisualizerInteractions();
    const word = newWordInput.trim().toLowerCase();
    if (!words.includes(word)) {
      setWords([...words, word]);
      setStatusMessage(`Added "${word}" to Trie in O(${word.length}) steps!`);
    }
    setNewWordInput('');
  };

  // Render tree branches recursively
  const renderTrieNode = (node: TrieVisualNode, path: string = ''): React.ReactNode => {
    const isRoot = node.char === 'ROOT';
    const isPrefixMatch = prefixInput && path.startsWith(prefixInput.toLowerCase());

    return (
      <div
        key={path || 'root'}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '0 8px',
        }}
      >
        <div
          style={{
            padding: isRoot ? '6px 14px' : '8px 12px',
            borderRadius: isRoot ? 'var(--radius-full)' : 'var(--radius-md)',
            background: isPrefixMatch
              ? 'var(--grad-primary)'
              : isRoot
              ? 'rgba(30, 41, 59, 0.8)'
              : '#1e293b',
            border: `2px solid ${
              node.isEnd
                ? 'var(--accent-emerald)'
                : isPrefixMatch
                ? 'var(--accent-indigo)'
                : 'var(--border-subtle)'
            }`,
            color: '#fff',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: isRoot ? '0.8rem' : '1.1rem',
            boxShadow: isPrefixMatch ? 'var(--glow-indigo)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span>{node.char}</span>
          {node.isEnd && (
            <span style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', fontWeight: 900 }}>
              *
            </span>
          )}
        </div>

        {/* Children Row */}
        {Object.keys(node.children).length > 0 && (
          <div
            style={{
              display: 'flex',
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              position: 'relative',
            }}
          >
            {Object.entries(node.children).map(([ch, child]) =>
              renderTrieNode(child, path + ch)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="visualizer-sandbox">
      {/* Sandbox Toolbar */}
      <div className="sandbox-toolbar">
        <form onSubmit={handleAddWord} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Add word (e.g. castle)..."
            value={newWordInput}
            onChange={(e) => setNewWordInput(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              width: '160px',
            }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '6px 12px' }}>
            <Plus size={14} /> Add Word
          </button>
        </form>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Type Prefix:</span>
          <input
            type="text"
            placeholder="Prefix (e.g. ca)"
            value={prefixInput}
            onChange={(e) => {
              setPrefixInput(e.target.value);
              incrementVisualizerInteractions();
            }}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              fontFamily: 'var(--font-mono)',
              width: '120px',
            }}
          />
        </div>
      </div>

      {/* Stage Area */}
      <div className="sandbox-stage" style={{ minHeight: '420px', alignItems: 'center' }}>
        {/* Autocomplete Predictions Bar */}
        <div
          style={{
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 18px',
            borderRadius: 'var(--radius-lg)',
            background: 'rgba(30, 41, 59, 0.7)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <Search size={16} color="var(--accent-cyan)" />
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Autocomplete Suggestions for "<strong>{prefixInput}</strong>":
          </span>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {predictions.length > 0 ? (
              predictions.map((word) => (
                <span
                  key={word}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(6, 182, 212, 0.2)',
                    border: '1px solid rgba(6, 182, 212, 0.4)',
                    color: 'var(--accent-cyan)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                  }}
                >
                  {word}
                </span>
              ))
            ) : (
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                No words match this prefix
              </span>
            )}
          </div>
        </div>

        {/* Visual Trie Hierarchy */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            overflowX: 'auto',
            width: '100%',
            padding: '20px 0',
          }}
        >
          {renderTrieNode(trieRoot)}
        </div>

        <div style={{ marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Green border with <strong style={{ color: 'var(--accent-emerald)' }}>*</strong> denotes a completed word endpoint.
        </div>
      </div>

      {/* Step Logger */}
      <div className="sandbox-step-logger">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} color="var(--accent-indigo-light)" />
          <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{statusMessage}</span>
        </div>
      </div>
    </div>
  );
};
