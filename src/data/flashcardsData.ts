export interface Flashcard {
  id: string;
  chapterNumber: number;
  chapterTitle: string;
  question: string;
  answer: string;
  hint: string;
  category: 'Basics' | 'Big O' | 'Sorting' | 'Hash & Stacks' | 'Recursion & DP' | 'Trees & Heaps' | 'Graphs & Optimization';
}

export const FLASHCARDS_DATA: Flashcard[] = [
  {
    id: 'fc-1',
    chapterNumber: 1,
    chapterTitle: 'Why Data Structures Matter',
    question: 'Why does reading from an array take exactly 1 operational step regardless of array size?',
    answer: 'Because arrays occupy contiguous memory. The computer calculates the exact memory address with simple arithmetic: base_address + (index × element_size).',
    hint: 'Think of memory grid addresses.',
    category: 'Basics'
  },
  {
    id: 'fc-2',
    chapterNumber: 1,
    chapterTitle: 'Why Data Structures Matter',
    question: 'How many steps does it take to insert a new element at index 0 of an array with N elements?',
    answer: 'N + 1 steps: N shifts to move every existing element one index to the right, plus 1 step to insert the new value.',
    hint: 'Every existing item must move over.',
    category: 'Basics'
  },
  {
    id: 'fc-3',
    chapterNumber: 2,
    chapterTitle: 'Why Algorithms Matter',
    question: 'What is the maximum number of steps Binary Search takes for an ordered array of 1,000,000 items?',
    answer: 'At most 20 steps (since 2^20 = 1,048,576 > 1,000,000).',
    hint: 'Halving 1,000,000 repeatedly.',
    category: 'Basics'
  },
  {
    id: 'fc-4',
    chapterNumber: 3,
    chapterTitle: 'O Yes! Big O Notation',
    question: 'What does Big O notation measure and what scenario does it assume by default?',
    answer: 'Big O measures how the number of operational steps scales relative to input size N. By default, it assumes the Worst-Case Scenario.',
    hint: 'Pessimistic upper bound on step growth.',
    category: 'Big O'
  },
  {
    id: 'fc-5',
    chapterNumber: 4,
    chapterTitle: 'Speeding Up Your Code with Big O',
    question: 'What is the time complexity of Bubble Sort in the worst case?',
    answer: 'O(N²) Quadratic Time. For N elements, it performs approximately N²/2 comparisons and N²/2 swaps.',
    hint: 'Nested passes over the array.',
    category: 'Sorting'
  },
  {
    id: 'fc-6',
    chapterNumber: 5,
    chapterTitle: 'Optimizing Code With and Without Big O',
    question: 'Why is Selection Sort roughly twice as fast as Bubble Sort in practice even though both are O(N²)?',
    answer: 'Selection Sort performs at most N swaps (1 swap per pass), whereas Bubble Sort can perform up to N²/2 swaps.',
    hint: 'Count the memory write/swap operations.',
    category: 'Sorting'
  },
  {
    id: 'fc-7',
    chapterNumber: 6,
    chapterTitle: 'Optimizing for Optimistic Scenarios',
    question: 'What is the best-case time complexity of Insertion Sort on already-sorted data?',
    answer: 'O(N) Linear Time. The inner while loop terminates immediately after 1 comparison without shifting any elements.',
    hint: 'No elements need to shift.',
    category: 'Sorting'
  },
  {
    id: 'fc-8',
    chapterNumber: 8,
    chapterTitle: 'Blazing Fast Lookup with Hash Tables',
    question: 'What is the average time complexity of a key lookup in a Hash Table?',
    answer: 'O(1) Constant Time. The hash function converts the key directly into an array bucket index in 1 step.',
    hint: 'Instant direct indexing.',
    category: 'Hash & Stacks'
  },
  {
    id: 'fc-9',
    chapterNumber: 9,
    chapterTitle: 'Crafting Elegant Code with Stacks and Queues',
    question: 'What are the acronyms for Stack and Queue data access orders?',
    answer: 'Stack = LIFO (Last-In, First-Out). Queue = FIFO (First-In, First-Out).',
    hint: 'Pancake stack vs Grocery checkout line.',
    category: 'Hash & Stacks'
  },
  {
    id: 'fc-10',
    chapterNumber: 10,
    chapterTitle: 'Recursively Recurse with Recursion',
    question: 'What are the two mandatory components of every recursive function?',
    answer: '1. Base Case (condition to stop recursion) and 2. Recursive Case (calling itself with a strictly smaller subproblem).',
    hint: 'Stopping rule and recursive step.',
    category: 'Recursion & DP'
  },
  {
    id: 'fc-11',
    chapterNumber: 12,
    chapterTitle: 'Dynamic Programming',
    question: 'What is the core difference between Memoization and Bottom-Up Tabulation?',
    answer: 'Memoization is Top-Down recursion with a cache dictionary. Tabulation is Bottom-Up iteration using loops from base cases upwards.',
    hint: 'Top-down caching vs iterative loops.',
    category: 'Recursion & DP'
  },
  {
    id: 'fc-12',
    chapterNumber: 13,
    chapterTitle: 'Recursive Algorithms for Speed',
    question: 'What is the average time complexity of Quicksort and what operation makes it fast?',
    answer: 'O(N log N) average time. Partitioning around a pivot places the pivot into its final sorted position in O(N) time across log N levels.',
    hint: 'Pivot partitioning.',
    category: 'Sorting'
  },
  {
    id: 'fc-13',
    chapterNumber: 14,
    chapterTitle: 'Node-Based Data Structures (Linked Lists)',
    question: 'What is the time complexity of prepending (inserting at front) in a Singly Linked List vs an Array?',
    answer: 'Linked List: O(1) constant time (no shifting). Array: O(N) linear time (shifts all N elements).',
    hint: 'Pointer reassignment vs element shifting.',
    category: 'Trees & Heaps'
  },
  {
    id: 'fc-14',
    chapterNumber: 15,
    chapterTitle: 'Binary Search Trees',
    question: 'What is the In-Order Successor when deleting a BST node with 2 children?',
    answer: 'The smallest node in the deleted node\'s right subtree (go right once, then all the way left).',
    hint: 'Step right, walk left.',
    category: 'Trees & Heaps'
  },
  {
    id: 'fc-15',
    chapterNumber: 16,
    chapterTitle: 'Heaps',
    question: 'In an array-backed Heap, what is the formula to locate the left child of node at index i?',
    answer: 'Left Child index = 2i + 1 (Right Child is 2i + 2, Parent is (i - 1) // 2).',
    hint: '2 * i + 1.',
    category: 'Trees & Heaps'
  },
  {
    id: 'fc-16',
    chapterNumber: 17,
    chapterTitle: 'Trie (Prefix Trees)',
    question: 'What is the search time complexity of a Trie for a word of length K in a dictionary of N words?',
    answer: 'O(K) where K is the length of the searched word. It is completely independent of the total dictionary size N!',
    hint: 'Only depends on number of characters.',
    category: 'Trees & Heaps'
  },
  {
    id: 'fc-17',
    chapterNumber: 18,
    chapterTitle: 'Connecting Everything with Graphs',
    question: 'Why is Breadth-First Search (BFS) guaranteed to find the shortest path in an unweighted graph?',
    answer: 'Because BFS radiates outward in concentric layers (1 hop away, 2 hops away, etc.) using a FIFO Queue, reaching the target in minimum steps.',
    hint: 'Layer-by-layer queue traversal.',
    category: 'Graphs & Optimization'
  },
  {
    id: 'fc-18',
    chapterNumber: 19,
    chapterTitle: 'Space Complexity',
    question: 'What does Auxiliary Space Complexity measure?',
    answer: 'Auxiliary Space measures the additional/extra memory allocated by the algorithm, excluding the initial input data.',
    hint: 'Extra memory above input size.',
    category: 'Graphs & Optimization'
  },
  {
    id: 'fc-19',
    chapterNumber: 20,
    chapterTitle: 'Techniques for Code Optimization',
    question: 'What does BCR stand for and why is it important in algorithm design?',
    answer: 'BCR = Best Conceivable Runtime. It represents the theoretical lower bound speed limit for a problem, preventing over-optimization.',
    hint: 'Speed limit of physics for an algorithm.',
    category: 'Graphs & Optimization'
  }
];
