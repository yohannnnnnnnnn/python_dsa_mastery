import React from 'react';
import {
  Search,
  ArrowUpDown,
  Hash,
  Layers,
  Repeat,
  Share2,
  GitBranch,
  Mountain,
  FileText,
  Network,
  HardDrive,
  Sparkles,
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { BinarySearchVisualizer } from './visualizers/BinarySearchVisualizer';
import { SortingVisualizer } from './visualizers/SortingVisualizer';
import { HashTableVisualizer } from './visualizers/HashTableVisualizer';
import { StackQueueVisualizer } from './visualizers/StackQueueVisualizer';
import { RecursionCallStackVisualizer } from './visualizers/RecursionCallStackVisualizer';
import { LinkedListVisualizer } from './visualizers/LinkedListVisualizer';
import { BSTVisualizer } from './visualizers/BSTVisualizer';
import { HeapVisualizer } from './visualizers/HeapVisualizer';
import { TrieVisualizer } from './visualizers/TrieVisualizer';
import { GraphVisualizer } from './visualizers/GraphVisualizer';
import { SpaceTimeVisualizer } from './visualizers/SpaceTimeVisualizer';

export const VisualizerLab: React.FC = () => {
  const { activeVisualizerType, setActiveVisualizerType } = useLearning();

  const visualizers = [
    {
      id: 'binarySearch',
      title: 'Binary Search Race',
      category: 'Ch 1-2',
      icon: Search,
      description: 'Ordered array search race: Linear vs Binary search with pointer bounds',
    },
    {
      id: 'sorting',
      title: 'Sorting Arena',
      category: 'Ch 4, 5, 6, 13',
      icon: ArrowUpDown,
      description: 'Bubble Sort, Selection Sort, Insertion Sort, and Quicksort partitioning',
    },
    {
      id: 'hashTable',
      title: 'Hash Tables & Collisions',
      category: 'Ch 8',
      icon: Hash,
      description: 'ASCII hash functions, separate chaining, and O(1) instant key lookup',
    },
    {
      id: 'stackQueue',
      title: 'Stacks, Queues & Linters',
      category: 'Ch 9',
      icon: Layers,
      description: 'LIFO & FIFO mechanics plus interactive bracket syntax linter parser',
    },
    {
      id: 'recursion',
      title: 'Recursion Call Stack',
      category: 'Ch 10, 11, 12',
      icon: Repeat,
      description: 'Internal Call Stack frame push/pop animation + DP memoization cache',
    },
    {
      id: 'linkedList',
      title: 'Linked Lists & Pointers',
      category: 'Ch 14',
      icon: Share2,
      description: 'Dual-compartment memory nodes, O(1) head insertion, and list reversal',
    },
    {
      id: 'bst',
      title: 'Binary Search Trees',
      category: 'Ch 15',
      icon: GitBranch,
      description: 'Interactive SVG BST builder, search glowing path, and in-order sort',
    },
    {
      id: 'heap',
      title: 'Heaps & Priority Queues',
      category: 'Ch 16',
      icon: Mountain,
      description: 'Max/Min-Heap complete binary tree + flat array index mapping [2i+1]',
    },
    {
      id: 'trie',
      title: 'Trie (Prefix Autocomplete)',
      category: 'Ch 17',
      icon: FileText,
      description: 'Prefix tree for predictive autocomplete and spell checking in O(K) time',
    },
    {
      id: 'graph',
      title: 'Graph Traversals (BFS/DFS)',
      category: 'Ch 18',
      icon: Network,
      description: 'Network graph pathfinder: BFS (Queue) vs DFS (Stack/Recursion)',
    },
    {
      id: 'spaceTime',
      title: 'Space-Time Trade-off Lab',
      category: 'Ch 19-20',
      icon: HardDrive,
      description: 'Memory bytes vs CPU operations trade-off comparator',
    },
  ];

  return (
    <div className="visualizer-lab-view" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-indigo-light)', marginBottom: '6px' }}>
          <Sparkles size={20} />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Interactive Algorithm Sandbox
          </span>
        </div>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Visualizer Lab</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
          Explore, interact, and step through every data structure and algorithm in Jay Wengrow's book with real-time operational metrics.
        </p>
      </div>

      {/* Visualizer Selector Pills */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '16px',
          marginBottom: '24px',
          scrollbarWidth: 'thin',
        }}
      >
        {visualizers.map((v) => {
          const Icon = v.icon;
          const isActive = activeVisualizerType === v.id;

          return (
            <button
              key={v.id}
              onClick={() => setActiveVisualizerType(v.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: 'var(--radius-lg)',
                background: isActive ? 'var(--accent-indigo)' : 'rgba(30, 41, 59, 0.6)',
                border: `1px solid ${isActive ? 'var(--accent-indigo-light)' : 'var(--border-subtle)'}`,
                color: isActive ? '#fff' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.85rem',
                whiteSpace: 'nowrap',
                transition: 'var(--transition-fast)',
                boxShadow: isActive ? 'var(--glow-indigo)' : 'none',
              }}
            >
              <Icon size={16} />
              <span>{v.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Visualizer Component Rendering */}
      <div>
        {activeVisualizerType === 'binarySearch' && <BinarySearchVisualizer />}
        {activeVisualizerType === 'sorting' && <SortingVisualizer />}
        {activeVisualizerType === 'hashTable' && <HashTableVisualizer />}
        {activeVisualizerType === 'stackQueue' && <StackQueueVisualizer />}
        {activeVisualizerType === 'recursion' && <RecursionCallStackVisualizer />}
        {activeVisualizerType === 'linkedList' && <LinkedListVisualizer />}
        {activeVisualizerType === 'bst' && <BSTVisualizer />}
        {activeVisualizerType === 'heap' && <HeapVisualizer />}
        {activeVisualizerType === 'trie' && <TrieVisualizer />}
        {activeVisualizerType === 'graph' && <GraphVisualizer />}
        {activeVisualizerType === 'spaceTime' && <SpaceTimeVisualizer />}
      </div>
    </div>
  );
};
