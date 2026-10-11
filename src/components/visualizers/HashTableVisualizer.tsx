import React, { useState } from 'react';
import { Plus, Search, Trash2, Zap, Sparkles } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

interface HashEntry {
  key: string;
  value: string;
}

export const HashTableVisualizer: React.FC = () => {
  const { incrementVisualizerInteractions } = useLearning();

  const BUCKET_COUNT = 7;
  const [buckets, setBuckets] = useState<HashEntry[][]>([
    [{ key: 'apple', value: '$1.50' }],
    [],
    [{ key: 'banana', value: '$0.80' }, { key: 'cherry', value: '$3.00' }],
    [],
    [{ key: 'date', value: '$4.20' }],
    [],
    [{ key: 'fig', value: '$2.50' }],
  ]);

  const [inputKey, setInputKey] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [highlightedBucket, setHighlightedBucket] = useState<number | null>(null);
  const [highlightedKey, setHighlightedKey] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>(
    'Hash Table ready. Enter a key and value to insert or search in O(1) time.'
  );

  // Hash function: ASCII sum % BUCKET_COUNT
  const computeHash = (key: string): { sum: number; index: number; formula: string } => {
    let sum = 0;
    for (let i = 0; i < key.length; i++) {
      sum += key.charCodeAt(i);
    }
    const index = sum % BUCKET_COUNT;
    const formula = `ASCII sum(${sum}) % ${BUCKET_COUNT} = Bucket ${index}`;
    return { sum, index, formula };
  };

  const handleInsert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKey.trim()) return;

    incrementVisualizerInteractions();
    const key = inputKey.trim().toLowerCase();
    const val = inputValue.trim() || 'active';
    const { index, formula } = computeHash(key);

    const newBuckets = [...buckets.map((b) => [...b])];
    const existingIndex = newBuckets[index].findIndex((e) => e.key === key);

    if (existingIndex >= 0) {
      newBuckets[index][existingIndex].value = val;
      setStatusMessage(`Updated key "${key}" in Bucket #${index} [${formula}].`);
    } else {
      newBuckets[index].push({ key, value: val });
      const isCollision = newBuckets[index].length > 1;
      setStatusMessage(
        `Inserted "${key}" into Bucket #${index} [${formula}]${
          isCollision ? ' (Separate Chaining Collision resolved!)' : ''
        }.`
      );
    }

    setBuckets(newBuckets);
    setHighlightedBucket(index);
    setHighlightedKey(key);
    setInputKey('');
    setInputValue('');
  };

  const handleSearch = () => {
    if (!searchKey.trim()) return;

    incrementVisualizerInteractions();
    const key = searchKey.trim().toLowerCase();
    const { index, formula } = computeHash(key);

    setHighlightedBucket(index);
    setHighlightedKey(key);

    const found = buckets[index].find((e) => e.key === key);
    if (found) {
      setStatusMessage(
        `🎉 FOUND in O(1) time! Key "${key}" -> Value "${found.value}" inside Bucket #${index} [${formula}].`
      );
    } else {
      setStatusMessage(
        `Inspected Bucket #${index} [${formula}]. Key "${key}" was NOT found.`
      );
    }
  };

  const handleDelete = (bucketIdx: number, keyToDelete: string) => {
    incrementVisualizerInteractions();
    const newBuckets = buckets.map((b, i) =>
      i === bucketIdx ? b.filter((e) => e.key !== keyToDelete) : b
    );
    setBuckets(newBuckets);
    setStatusMessage(`Deleted key "${keyToDelete}" from Bucket #${bucketIdx}.`);
    setHighlightedKey(null);
  };

  const totalEntries = buckets.reduce((acc, b) => acc + b.length, 0);
  const loadFactor = (totalEntries / BUCKET_COUNT).toFixed(2);
  const totalCollisions = buckets.reduce(
    (acc, b) => acc + (b.length > 1 ? b.length - 1 : 0),
    0
  );

  return (
    <div className="visualizer-sandbox">
      {/* Sandbox Toolbar */}
      <div className="sandbox-toolbar">
        <form onSubmit={handleInsert} style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Key (e.g. grape)"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              outline: 'none',
              width: '130px',
            }}
          />
          <input
            type="text"
            placeholder="Value (e.g. $2.10)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              outline: 'none',
              width: '130px',
            }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '8px 14px' }}>
            <Plus size={15} />
            <span>Insert Key</span>
          </button>
        </form>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search key..."
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              outline: 'none',
              width: '140px',
            }}
          />
          <button className="btn btn-secondary" style={{ padding: '8px 14px' }} onClick={handleSearch}>
            <Search size={15} />
            <span>Lookup O(1)</span>
          </button>
        </div>
      </div>

      {/* Stage Area */}
      <div className="sandbox-stage" style={{ alignItems: 'stretch' }}>
        {/* Metric Badges */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div className="stat-pill" style={{ color: 'var(--accent-cyan)' }}>
            <Zap size={14} />
            <span>Buckets: {BUCKET_COUNT}</span>
          </div>
          <div className="stat-pill" style={{ color: 'var(--accent-amber)' }}>
            <span>Total Keys: {totalEntries}</span>
          </div>
          <div className="stat-pill" style={{ color: 'var(--accent-rose)' }}>
            <span>Collisions: {totalCollisions}</span>
          </div>
          <div className="stat-pill" style={{ color: 'var(--accent-emerald)' }}>
            <span>Load Factor: {loadFactor}</span>
          </div>
        </div>

        {/* Buckets List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          {buckets.map((chain, bucketIdx) => {
            const isTargetBucket = highlightedBucket === bucketIdx;

            return (
              <div
                key={bucketIdx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: isTargetBucket ? 'rgba(99, 102, 241, 0.15)' : 'rgba(30, 41, 59, 0.4)',
                  border: `1px solid ${isTargetBucket ? 'var(--accent-indigo)' : 'var(--border-subtle)'}`,
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Bucket Index Header */}
                <div
                  style={{
                    width: '90px',
                    flexShrink: 0,
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    color: isTargetBucket ? 'var(--accent-indigo-light)' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>Bucket [{bucketIdx}]</span>
                </div>

                {/* Chained Linked Nodes */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', flex: 1 }}>
                  {chain.length === 0 ? (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      (empty slot)
                    </span>
                  ) : (
                    chain.map((entry, itemIdx) => {
                      const isEntryHighlighted = highlightedKey === entry.key;

                      return (
                        <React.Fragment key={entry.key}>
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '6px 12px',
                              borderRadius: 'var(--radius-sm)',
                              background: isEntryHighlighted
                                ? 'rgba(16, 185, 129, 0.25)'
                                : 'rgba(15, 23, 42, 0.8)',
                              border: `1px solid ${
                                isEntryHighlighted ? 'var(--accent-emerald)' : 'var(--border-subtle)'
                              }`,
                              boxShadow: isEntryHighlighted ? '0 0 15px rgba(16, 185, 129, 0.4)' : 'none',
                              fontSize: '0.85rem',
                            }}
                          >
                            <span style={{ fontWeight: 700, color: '#fff' }}>"{entry.key}"</span>
                            <span style={{ color: 'var(--text-muted)' }}>:</span>
                            <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                              {entry.value}
                            </span>
                            <button
                              onClick={() => handleDelete(bucketIdx, entry.key)}
                              style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
                              title="Delete key"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>

                          {itemIdx < chain.length - 1 && (
                            <span style={{ color: 'var(--accent-amber)', fontWeight: 800 }}>→</span>
                          )}
                        </React.Fragment>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
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
