export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  requirement: string;
  unlockedCondition: (state: {
    completedChapters: number[];
    quizScores: Record<string, number>;
    flashcardsMastered: number;
    visualizerInteractions: number;
    codeRuns: number;
  }) => boolean;
}

export const BADGES_DATA: Badge[] = [
  {
    id: 'badge-first-step',
    title: 'First Step to Mastery',
    description: 'Read and complete your very first chapter.',
    icon: '🚀',
    category: 'Progress',
    requirement: 'Complete 1 chapter',
    unlockedCondition: (s) => s.completedChapters.length >= 1
  },
  {
    id: 'badge-binary-ninja',
    title: 'Binary Search Ninja',
    description: 'Mastered logarithmic search and divide-and-conquer.',
    icon: '🎯',
    category: 'Algorithms',
    requirement: 'Complete Chapter 2',
    unlockedCondition: (s) => s.completedChapters.includes(2)
  },
  {
    id: 'badge-big-o-scholar',
    title: 'Big-O Scholar',
    description: 'Understood asymptotic growth and worst-case bounds.',
    icon: '📈',
    category: 'Big O',
    requirement: 'Complete Chapter 3',
    unlockedCondition: (s) => s.completedChapters.includes(3)
  },
  {
    id: 'badge-sorting-maestro',
    title: 'Sorting Maestro',
    description: 'Mastered Bubble, Selection, and Insertion Sorts.',
    icon: '⚡',
    category: 'Sorting',
    requirement: 'Complete Chapters 4, 5, and 6',
    unlockedCondition: (s) => [4, 5, 6].every(c => s.completedChapters.includes(c))
  },
  {
    id: 'badge-hash-lord',
    title: 'O(1) Hash Lord',
    description: 'Harnessing the power of Hash Tables to eliminate nested loops.',
    icon: '🔑',
    category: 'Data Structures',
    requirement: 'Complete Chapter 8',
    unlockedCondition: (s) => s.completedChapters.includes(8)
  },
  {
    id: 'badge-stack-queue-pro',
    title: 'LIFO & FIFO Specialist',
    description: 'Crafted elegant code with Stacks and Queues.',
    icon: '🥞',
    category: 'Data Structures',
    requirement: 'Complete Chapter 9',
    unlockedCondition: (s) => s.completedChapters.includes(9)
  },
  {
    id: 'badge-recursion-unlocked',
    title: 'Recursion Unlocked',
    description: 'Conquered the Call Stack and Base Cases without fear.',
    icon: '🌀',
    category: 'Recursion',
    requirement: 'Complete Chapters 10 and 11',
    unlockedCondition: (s) => [10, 11].every(c => s.completedChapters.includes(c))
  },
  {
    id: 'badge-dp-wizard',
    title: 'Dynamic Programming Wizard',
    description: 'Turned exponential O(2^N) recursion into linear O(N) gold.',
    icon: '🧙‍♂️',
    category: 'Dynamic Programming',
    requirement: 'Complete Chapter 12',
    unlockedCondition: (s) => s.completedChapters.includes(12)
  },
  {
    id: 'badge-quicksort-master',
    title: 'Quicksort Master',
    description: 'Partitioned like a pro and achieved O(N log N) speed.',
    icon: '⚔️',
    category: 'Sorting',
    requirement: 'Complete Chapter 13',
    unlockedCondition: (s) => s.completedChapters.includes(13)
  },
  {
    id: 'badge-tree-architect',
    title: 'Binary Tree Architect',
    description: 'Constructed, traversed, and balanced Binary Search Trees.',
    icon: '🌲',
    category: 'Trees',
    requirement: 'Complete Chapter 15',
    unlockedCondition: (s) => s.completedChapters.includes(15)
  },
  {
    id: 'badge-heap-trie-virtuoso',
    title: 'Heaps & Tries Virtuoso',
    description: 'Mastered Priority Queues and Prefix Autocomplete Trees.',
    icon: '🏔️',
    category: 'Advanced Structures',
    requirement: 'Complete Chapters 16 & 17',
    unlockedCondition: (s) => [16, 17].every(c => s.completedChapters.includes(c))
  },
  {
    id: 'badge-graph-navigator',
    title: 'Graph Navigator',
    description: 'Conquered BFS Shortest Paths and DFS Deep Traversals.',
    icon: '🗺️',
    category: 'Graphs',
    requirement: 'Complete Chapter 18',
    unlockedCondition: (s) => s.completedChapters.includes(18)
  },
  {
    id: 'badge-grandmaster',
    title: 'Common-Sense DSA Grandmaster',
    description: 'Completed all 20 chapters of the curriculum!',
    icon: '👑',
    category: 'Mastery',
    requirement: 'Complete all 20 chapters',
    unlockedCondition: (s) => s.completedChapters.length >= 20
  }
];
