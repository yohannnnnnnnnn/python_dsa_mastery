export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Chapter {
  id: number;
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  category: 'Basics' | 'Big O' | 'Sorting' | 'Hash & Stacks' | 'Recursion & DP' | 'Trees & Heaps' | 'Graphs & Optimization';
  readTimeMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  visualizerType?: 'binarySearch' | 'sorting' | 'hashTable' | 'stackQueue' | 'recursion' | 'linkedList' | 'bst' | 'heap' | 'trie' | 'graph' | 'bigO' | 'spaceTime';
  summary: string;
  analogy: string;
  keyConcepts: {
    heading: string;
    body: string;
    points?: string[];
  }[];
  pythonCode: {
    title: string;
    code: string;
    explanation: string;
  };
  goldenRules: string[];
  commonPitfalls: string[];
  feynmanPrompt: {
    question: string;
    rubricPoints: string[];
    sampleExplanation: string;
  };
  quiz: QuizQuestion[];
}

export const CHAPTERS_DATA: Chapter[] = [
  {
    id: 1,
    slug: 'why-data-structures-matter',
    number: 1,
    title: 'Why Data Structures Matter',
    subtitle: 'Arrays, Sets, and the Anatomy of Memory Operations',
    category: 'Basics',
    readTimeMinutes: 12,
    difficulty: 'Beginner',
    visualizerType: 'binarySearch',
    summary: 'A data structure is simply a way of organizing data in computer memory. Selecting the right data structure directly impacts how many operational steps your software takes to read, search, insert, and delete elements.',
    analogy: 'Think of computer memory like a massive grid of numbered post office boxes. Reading from an array is like having an exact box number (instant, 1 step). Searching through an unsorted array is like checking every box one by one until you find what you need.',
    keyConcepts: [
      {
        heading: 'The 4 Primary Operations',
        body: 'Every data structure is evaluated on how efficiently it performs four fundamental operations:',
        points: [
          'Reading: Accessing a value at a known index or address. In arrays, this is 1 step because memory addresses are calculated instantly.',
          'Searching: Finding whether a specific value exists in the data structure, and finding its location.',
          'Insertion: Adding a new piece of data into the structure.',
          'Deletion: Removing a piece of data from the structure and adjusting remaining elements.'
        ]
      },
      {
        heading: 'Arrays vs Sets (Array-Based Sets)',
        body: 'A regular array allows duplicates. Inserting at the end takes 1 step. An Array-Based Set forbids duplicates. Because it must first search through the entire set to verify the item is not already present, inserting into a set of N elements takes N + 1 steps in the worst case!'
      },
      {
        heading: 'Shifting Costs in Arrays',
        body: 'When you insert or delete an item at the beginning (index 0) of an array with N items, the computer must shift all N existing items one space over. Thus, beginning insertions/deletions take N + 1 steps!'
      }
    ],
    pythonCode: {
      title: 'Python Array vs Set Operations',
      code: `# Standard List (Array): Allows duplicates
groceries = ["apples", "bananas", "cucumbers"]

# 1. Reading by index -> 1 step
item = groceries[0]

# 2. Searching -> up to N steps
is_present = "bananas" in groceries

# 3. Insertion at end -> 1 step
groceries.append("dates")

# 4. Insertion at index 0 -> N shifts + 1 insert = N + 1 steps
groceries.insert(0, "avocados")

# 5. Set: Enforces uniqueness automatically
unique_ids = set([101, 102, 103])
# Adding duplicate has no effect
unique_ids.add(102) # Remains {101, 102, 103}`,
      explanation: 'In Python, lists are dynamic arrays. Reading by index is instant O(1), but inserting at index 0 requires shifting every existing element in memory.'
    },
    goldenRules: [
      'Data structures are not just about organizing data—they govern how fast your application runs.',
      'Always count the exact number of operational steps to compare algorithms objectively.',
      'Adding to an Array is 1 step; adding to an Array-Based Set is N + 1 steps because of the mandatory pre-search.'
    ],
    commonPitfalls: [
      'Assuming all data insertions take the same amount of time regardless of position.',
      'Forgetting that inserting at the beginning of an array requires shifting all subsequent elements.'
    ],
    feynmanPrompt: {
      question: 'Explain why inserting a number at the front of a line of 100 people takes more work than adding someone to the end.',
      rubricPoints: [
        'Mention having to ask all 100 people to take a step back.',
        'Contrast with adding someone to the empty spot at the back.',
        'Relate this to computer memory shifting.'
      ],
      sampleExplanation: 'If you join the back of a movie line, you just stand there—1 simple step. But if you cut in at the very front, all 100 people already waiting must physically step back one spot to make room for you. In a computer array, every single element must be moved one memory slot over!'
    },
    quiz: [
      {
        id: 'q1-1',
        question: 'How many operational steps does it take to read a value from an array of 500 items if you know its index?',
        options: ['500 steps', '250 steps', '1 step', 'O(log N) steps'],
        correctIndex: 2,
        explanation: 'Reading from an array by index is always 1 step because the computer multiplies the index by the element size to calculate the exact memory address directly.'
      },
      {
        id: 'q1-2',
        question: 'Why does inserting into an array-based Set of N items take N + 1 steps at worst?',
        options: [
          'Because sets are stored backwards in memory',
          'Because it must search all N items to ensure no duplicate exists before inserting',
          'Because sets require double memory allocation',
          'Because set items must be sorted alphabetically'
        ],
        correctIndex: 1,
        explanation: 'A set cannot contain duplicates. To enforce this, it must search all N elements to confirm the item is not already there, then perform 1 insertion step.'
      },
      {
        id: 'q1-3',
        question: 'What is the most expensive place to delete an item in a standard array?',
        options: ['At the end', 'In the exact middle', 'At index 0 (the beginning)', 'All positions take equal time'],
        correctIndex: 2,
        explanation: 'Deleting index 0 leaves an empty slot at the front, requiring all remaining N-1 elements to be shifted left to close the gap.'
      }
    ]
  },
  {
    id: 2,
    slug: 'why-algorithms-matter',
    number: 2,
    title: 'Why Algorithms Matter',
    subtitle: 'Ordered Arrays, Linear Search vs. Binary Search',
    category: 'Basics',
    readTimeMinutes: 14,
    difficulty: 'Beginner',
    visualizerType: 'binarySearch',
    summary: 'An algorithm is simply a step-by-step set of instructions to accomplish a specific task. By leveraging an Ordered Array, we can replace slow Linear Search with blazing fast Binary Search.',
    analogy: 'If you want to find a word in a printed physical dictionary of 100,000 words, you don\'t start at page 1 and read every word (Linear Search). You open the middle, see if your word comes before or after, and eliminate half the book in a single step (Binary Search)!',
    keyConcepts: [
      {
        heading: 'Ordered Arrays',
        body: 'An ordered array is an array where elements are kept in sorted order. While insertion is slower (because we must find the correct spot and shift elements), searching becomes exponentially faster.'
      },
      {
        heading: 'Linear Search: The Naive Approach',
        body: 'Checks each element one by one from left to right. For an array of N elements, searching for an item that is at the end (or not present) takes N steps.'
      },
      {
        heading: 'Binary Search: Divide and Conquer',
        body: 'Repeatedly inspects the middle value of the current search boundary. If the target is smaller, eliminate the upper half; if larger, eliminate the lower half. With each step, the search space is cut in half!',
        points: [
          '100 items -> ~7 steps max',
          '10,000 items -> ~14 steps max',
          '1,000,000 items -> ~20 steps max',
          '1,000,000,000 items -> ~30 steps max!'
        ]
      }
    ],
    pythonCode: {
      title: 'Python Binary Search Implementation',
      code: `def binary_search(ordered_list, search_value):
    lower_bound = 0
    upper_bound = len(ordered_list) - 1

    while lower_bound <= upper_bound:
        midpoint = (upper_bound + lower_bound) // 2
        value_at_mid = ordered_list[midpoint]

        if search_value == value_at_mid:
            return midpoint  # Found target index!
        elif search_value < value_at_mid:
            upper_bound = midpoint - 1  # Target is in left half
        else:
            lower_bound = midpoint + 1  # Target is in right half

    return None  # Value does not exist

# Example:
numbers = [3, 17, 22, 41, 55, 68, 79, 90, 103]
index = binary_search(numbers, 79)
print(f"Found at index: {index}")  # Output: 6`,
      explanation: 'Binary search uses two pointers: lower_bound and upper_bound. In each iteration, it recalculates midpoint and halves the remaining elements.'
    },
    goldenRules: [
      'Binary Search ONLY works on sorted collections (Ordered Arrays).',
      'Each step of Binary Search halves the remaining possibilities.',
      'When the number of elements doubles, Binary Search only adds exactly ONE extra step!'
    ],
    commonPitfalls: [
      'Trying to use binary search on an unsorted array without sorting it first.',
      'Integer overflow bugs in language implementations (mitigated in Python by dynamic arbitrary precision, but (low + high) // 2 should be understood).'
    ],
    feynmanPrompt: {
      question: 'How would you explain the number guessing game (1 to 100) using Binary Search to a friend?',
      rubricPoints: [
        'Explain starting at 50.',
        'Explain narrowing down based on "too high" or "too low".',
        'State the maximum number of guesses needed (7 guesses for 100 numbers).'
      ],
      sampleExplanation: 'If you guess 50 and I say "higher", you instantly throw away numbers 1 through 50! Next you guess 75 (halfway between 50 and 100). By always guessing the exact middle, you can pinpoint any number from 1 to 100 in at most 7 guesses.'
    },
    quiz: [
      {
        id: 'q2-1',
        question: 'How many maximum steps will Binary Search take to find an item in a sorted array of 1,000,000 items?',
        options: ['1,000,000 steps', '500,000 steps', 'About 20 steps', '100 steps'],
        correctIndex: 2,
        explanation: 'Because 2^20 is 1,048,576, halving 1,000,000 elements repeatedly takes at most 20 steps (log2(1,000,000) ≈ 19.93).'
      },
      {
        id: 'q2-2',
        question: 'What happens to the number of steps in Binary Search when the array size doubles from 500 to 1,000 elements?',
        options: ['The steps double', 'The steps increase by 50%', 'The steps increase by exactly 1 step', 'The steps remain the same'],
        correctIndex: 2,
        explanation: 'Because the very first step divides the array in half (from 1,000 back down to 500), doubling the size adds exactly one single step.'
      }
    ]
  },
  {
    id: 3,
    slug: 'o-yes-big-o-notation',
    number: 3,
    title: 'O Yes! Big O Notation',
    subtitle: 'The Universal Language of Algorithmic Complexity',
    category: 'Big O',
    readTimeMinutes: 15,
    difficulty: 'Beginner',
    visualizerType: 'bigO',
    summary: 'Big O notation is a standardized mathematical framework that measures the efficiency of an algorithm by tracking how the number of operational steps grows relative to the number of data elements (N).',
    analogy: 'Imagine ordering a pizza. Whether 1 person or 4 people are eating, the delivery driver takes 30 minutes (O(1) constant time). But if you have to personally bake an individual mini-pizza for every guest at a 50-person party, the time scales linearly with guests (O(N) linear time).',
    keyConcepts: [
      {
        heading: 'The Soul of Big O',
        body: 'Big O does not measure time in seconds (since computers have different CPU speeds). Instead, it answers: "As the amount of data (N) increases, how does the number of steps scale?"'
      },
      {
        heading: 'Big O Focuses on the Worst-Case Scenario',
        body: 'By convention, unless specified otherwise, Big O expresses the worst-case scenario (pessimistic viewpoint). For linear search, finding the item at index 0 in 1 step is best-case, but Big O categorizes it as O(N) because in the worst case it must inspect all N elements.'
      },
      {
        heading: 'Core Big O Curves',
        body: 'The primary complexity classes you encounter every day:',
        points: [
          'O(1) Constant Time: The number of steps stays constant no matter how large N is (e.g. array lookup by index).',
          'O(log N) Logarithmic Time: The algorithm eliminates half the remaining elements each step (e.g. binary search).',
          'O(N) Linear Time: The steps grow in direct 1:1 proportion to N (e.g. linear search).'
        ]
      }
    ],
    pythonCode: {
      title: 'Python Big O Examples in Action',
      code: `# O(1) Constant Time: Always 1 step regardless of array size
def print_first_element(elements):
    if len(elements) > 0:
        print(elements[0])

# O(N) Linear Time: Loops through all N elements
def find_max(numbers):
    current_max = numbers[0]
    for num in numbers:
        if num > current_max:
            current_max = num
    return current_max

# O(log N) Logarithmic Time: Halves problem space
def count_halvings(n):
    steps = 0
    while n > 1:
        n = n // 2
        steps += 1
    return steps`,
      explanation: 'Notice how O(1) never loops, O(N) visits each item once in a loop, and O(log N) repeatedly divides the problem size by 2.'
    },
    goldenRules: [
      'Big O is about growth rates, not exact wall-clock milliseconds.',
      'Big O assumes the worst-case scenario unless explicitly stated.',
      'O(1) is faster than O(log N), which is drastically faster than O(N).'
    ],
    commonPitfalls: [
      'Thinking O(1) always means 1 single operation. An algorithm that takes exactly 5 operations for any input size is still O(1) constant time!',
      'Confusing O(N) with seconds of execution.'
    ],
    feynmanPrompt: {
      question: 'Explain what O(log N) means to someone who has never studied logarithms.',
      rubricPoints: [
        'Explain the concept of cutting the problem in half.',
        'Contrast it with checking items one by one (O(N)).',
        'Show how 1,000 items only takes about 10 steps.'
      ],
      sampleExplanation: 'Log N simply means: How many times can you cut a number in half until you reach 1? If you have 8 items: 8 -> 4 -> 2 -> 1 (that is 3 cuts). For 1,000 items, you can only cut it in half 10 times. So O(log N) is an algorithm that takes 10 steps for 1,000 items!'
    },
    quiz: [
      {
        id: 'q3-1',
        question: 'An algorithm takes 100 operational steps for an array of 5 items, and 100 operational steps for an array of 1,000,000 items. What is its Big O?',
        options: ['O(100)', 'O(N)', 'O(1)', 'O(log N)'],
        correctIndex: 2,
        explanation: 'Because the number of steps does not change as N grows, it is classified as O(1) Constant Time.'
      },
      {
        id: 'q3-2',
        question: 'Why does Big O notation primarily focus on the worst-case scenario?',
        options: [
          'Because computers are always pessimistic',
          'Because preparing for the worst case guarantees the algorithm will never perform worse than that upper bound',
          'Because best cases are impossible to calculate',
          'Because mathematical formulas require negative numbers'
        ],
        correctIndex: 1,
        explanation: 'Focusing on the worst-case provides a reliable performance guarantee: your software will never take longer than this upper bound.'
      }
    ]
  },
  {
    id: 4,
    slug: 'speeding-up-your-code-with-big-o',
    number: 4,
    title: 'Speeding Up Your Code with Big O',
    subtitle: 'Bubble Sort and the Dreaded Quadratic Time O(N²)',
    category: 'Sorting',
    readTimeMinutes: 14,
    difficulty: 'Beginner',
    visualizerType: 'sorting',
    summary: 'Bubble Sort is a classic sorting algorithm that repeatedly compares adjacent pairs and swaps them if they are in the wrong order. It introduces us to Quadratic Time O(N²).',
    analogy: 'Imagine bubbles of air rising to the surface in champagne. In Bubble Sort, larger numbers gradually "bubble up" to the end of the array with each pass through the data.',
    keyConcepts: [
      {
        heading: 'How Bubble Sort Works',
        body: '1. Compare adjacent values at index 0 and 1. If left > right, swap them.\n2. Move to indices 1 and 2, compare and swap if needed.\n3. Repeat until reaching the end of the unsorted section (the largest item is now at the far right).\n4. Repeat passes until a full pass completes with ZERO swaps (meaning it is fully sorted).'
      },
      {
        heading: 'Quadratic Time: O(N²)',
        body: 'For an array of N items, in the worst-case (reverse sorted), we do roughly N passes with N comparisons per pass. Total steps ≈ N² / 2 comparisons + N² / 2 swaps = N² steps. In Big O, an algorithm with nested loops comparing each item to every other item is O(N²).'
      }
    ],
    pythonCode: {
      title: 'Python Bubble Sort Implementation',
      code: `def bubble_sort(arr):
    unsorted_until_index = len(arr) - 1
    is_sorted = False

    while not is_sorted:
        is_sorted = True
        for i in range(unsorted_until_index):
            if arr[i] > arr[i + 1]:
                # Swap adjacent elements
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                is_sorted = False
        unsorted_until_index -= 1
    return arr

# Test:
sample = [65, 55, 45, 35, 25, 15, 10]
print(bubble_sort(sample)) # [10, 15, 25, 35, 45, 55, 65]`,
      explanation: 'The `is_sorted` flag provides an optimization: if no swaps occur during a pass, the loop breaks early!'
    },
    goldenRules: [
      'Bubble Sort compares adjacent pairs and swaps them.',
      'Nested loops comparing elements to other elements usually indicate O(N²) Quadratic complexity.',
      'O(N²) gets slow very quickly: 1,000 items take ~1,000,000 steps!'
    ],
    commonPitfalls: [
      'Running unnecessary comparisons on elements at the end of the array that have already bubbled into their final sorted positions.',
      'Omitting the `is_sorted` boolean check, forcing the algorithm to run all passes even when already sorted.'
    ],
    feynmanPrompt: {
      question: 'Explain how Bubble Sort sorts a hand of 5 playing cards.',
      rubricPoints: [
        'Compare first two cards and swap if left is bigger.',
        'Move along the hand comparing adjacent pairs.',
        'Explain that the biggest card ends up at the very right after the first pass.'
      ],
      sampleExplanation: 'Look at your first two cards: if the left card is bigger than the right card, swap them. Move one card over and compare the next pair. By the time you reach the end of your hand, the biggest card has bubbled all the way to the right! Repeat this for the remaining unsorted cards.'
    },
    quiz: [
      {
        id: 'q4-1',
        question: 'In the worst case, if an array size increases from 10 items to 100 items (10x increase), how many times more steps will Bubble Sort O(N²) take?',
        options: ['10 times more', '20 times more', '100 times more', '1,000 times more'],
        correctIndex: 2,
        explanation: 'Because complexity is O(N²), multiplying N by 10 increases the steps by 10² = 100 times!'
      }
    ]
  },
  {
    id: 5,
    slug: 'optimizing-code-with-and-without-big-o',
    number: 5,
    title: 'Optimizing Code With and Without Big O',
    subtitle: 'Selection Sort and Why Constants Matter in the Real World',
    category: 'Sorting',
    readTimeMinutes: 14,
    difficulty: 'Beginner',
    visualizerType: 'sorting',
    summary: 'Selection Sort and Bubble Sort are both O(N²) in Big O notation, but Selection Sort is actually roughly twice as fast in the real world because it performs far fewer swaps.',
    analogy: 'Imagine organizing a bookshelf. Bubble Sort swaps adjacent books constantly as it scans. Selection Sort scans the whole shelf with its eyes, picks the single smallest book, and places it into position with just 1 swap per pass.',
    keyConcepts: [
      {
        heading: 'How Selection Sort Works',
        body: '1. Scan from left to right to find the index of the lowest value.\n2. Swap that lowest value into the first unsorted position.\n3. Advance the starting index and repeat for the remaining elements.'
      },
      {
        heading: 'Why Selection Sort is Twice as Fast as Bubble Sort',
        body: 'Both algorithms do roughly N²/2 comparisons. However, Bubble Sort can perform up to N²/2 swaps in the worst case, while Selection Sort performs at most N swaps (1 swap per pass)! Swapping takes time in memory, so Selection Sort takes about half the total operations.'
      },
      {
        heading: 'Big O Drops Constants',
        body: 'Why are both called O(N²)? Because Big O ignores constant multipliers (e.g. N²/2 becomes O(N²)). Big O cares about the general shape of growth curves, but in real engineering, constants do matter!'
      }
    ],
    pythonCode: {
      title: 'Python Selection Sort Implementation',
      code: `def selection_sort(arr):
    for i in range(len(arr) - 1):
        lowest_index = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[lowest_index]:
                lowest_index = j
        
        # Swap lowest into the current position if different
        if lowest_index != i:
            arr[i], arr[lowest_index] = arr[lowest_index], arr[i]
            
    return arr

# Test:
sample = [4, 2, 7, 1, 3]
print(selection_sort(sample)) # [1, 2, 3, 4, 7]`,
      explanation: 'Selection sort finds the minimum element in each pass and performs only one swap per outer iteration.'
    },
    goldenRules: [
      'Selection Sort finds the minimum value in the unsorted portion and places it at the front.',
      'Selection Sort has maximum N swaps vs Bubble Sort\'s possible N²/2 swaps.',
      'Big O drops constant factors, but when comparing two algorithms in the same complexity class, constants make a real difference.'
    ],
    commonPitfalls: [
      'Thinking two O(N²) algorithms will always run at the exact same speed in production.',
      'Forgetting that swapping memory values has CPU overhead.'
    ],
    feynmanPrompt: {
      question: 'Why is Selection Sort faster than Bubble Sort even though both are O(N²)?',
      rubricPoints: [
        'Both do the same number of comparisons (looking at items).',
        'Selection sort only moves/swaps an item once per round.',
        'Bubble sort might swap items dozens of times every round.'
      ],
      sampleExplanation: 'Imagine lining up 10 kids by height. Bubble sort makes kids swap places constantly every time two adjacent kids are out of order. Selection sort simply walks down the line, spots the shortest kid, and moves that kid to the front with just one physical move. Looking takes the same time, but moving kids is much less work!'
    },
    quiz: [
      {
        id: 'q5-1',
        question: 'What is the maximum number of swaps Selection Sort will perform on an array of 50 items?',
        options: ['2,500 swaps', '1,225 swaps', '49 swaps', '1 swap'],
        correctIndex: 2,
        explanation: 'Selection sort does at most one swap per pass through the array. For 50 items, that is at most 49 swaps.'
      }
    ]
  },
  {
    id: 6,
    slug: 'optimizing-for-optimistic-scenarios',
    number: 6,
    title: 'Optimizing for Optimistic Scenarios',
    subtitle: 'Insertion Sort and Best/Worst/Average Case Analysis',
    category: 'Sorting',
    readTimeMinutes: 14,
    difficulty: 'Beginner',
    visualizerType: 'sorting',
    summary: 'Insertion Sort shifts elements to insert values into their proper relative positions. Its performance varies drastically: O(N²) in the worst case, but O(N) linear time in the best case!',
    analogy: 'Think of how you sort playing cards in your hand as they are dealt. You pick up a new card, look at the cards already in your hand from right to left, slide them over, and insert the card into its exact sorted spot.',
    keyConcepts: [
      {
        heading: 'How Insertion Sort Operates',
        body: '1. Start with index 1 (considering index 0 as a sorted subarray of length 1).\n2. Remove the value at index 1 into a `temp_value` variable, leaving a gap.\n3. Shift all larger values in the sorted subarray to the right.\n4. Drop the `temp_value` into the newly created gap.\n5. Repeat for all subsequent elements.'
      },
      {
        heading: 'Best, Average, and Worst Cases',
        body: '• Worst Case (reverse sorted): O(N²) with N²/2 comparisons and N²/2 shifts.\n• Average Case (random data): O(N²/2) ≈ O(N²).\n• Best Case (already sorted array): O(N) linear time! The inner loop exits immediately on each pass after 1 comparison without any shifting.'
      }
    ],
    pythonCode: {
      title: 'Python Insertion Sort Implementation',
      code: `def insertion_sort(arr):
    for index in range(1, len(arr)):
        temp_value = arr[index]
        position = index - 1
        
        # Shift elements that are greater than temp_value to the right
        while position >= 0 and arr[position] > temp_value:
            arr[position + 1] = arr[position]
            position -= 1
            
        # Place temp_value in its correct sorted position
        arr[position + 1] = temp_value
        
    return arr

# Test:
data = [8, 4, 2, 9, 5, 1]
print(insertion_sort(data)) # [1, 2, 4, 5, 8, 9]`,
      explanation: 'Insertion sort pulls out `temp_value`, shifts larger items right, and drops `temp_value` into place.'
    },
    goldenRules: [
      'Insertion Sort is O(N) on already sorted or nearly-sorted data.',
      'Insertion Sort is ideal for live streaming data where new items are inserted into an existing sorted list.',
      'Consider the scenario: if data is mostly sorted, Insertion Sort crushes Bubble Sort and Selection Sort.'
    ],
    commonPitfalls: [
      'Assuming all sorting algorithms have identical best and worst cases.',
      'Off-by-one errors when placing `temp_value` back at `position + 1`.'
    ],
    feynmanPrompt: {
      question: 'Why is Insertion Sort so fast on a list that is already sorted?',
      rubricPoints: [
        'Explain that each item only gets checked against the neighbor to its left.',
        'Since the neighbor is already smaller, no items need to be shifted.',
        'Conclude that it only takes N-1 comparisons total (O(N)).'
      ],
      sampleExplanation: 'If you are dealt cards that are already in order (2, 3, 4, 5), each new card you pick up is already bigger than the previous card! You check it once, see it belongs at the right end, and don\'t move a single other card. So for N cards, you only make N checks—blazingly fast O(N)!'
    },
    quiz: [
      {
        id: 'q6-1',
        question: 'What is the time complexity of Insertion Sort on an array that is ALREADY sorted?',
        options: ['O(N²)', 'O(N log N)', 'O(N)', 'O(1)'],
        correctIndex: 2,
        explanation: 'On already sorted data, the inner loop never shifts and exits after 1 comparison per element, making it O(N) linear time.'
      }
    ]
  },
  {
    id: 7,
    slug: 'big-o-in-everyday-code',
    number: 7,
    title: 'Big O in Everyday Code',
    subtitle: 'Practical Code Analysis, Multiple Variables, and O(N · M)',
    category: 'Big O',
    readTimeMinutes: 13,
    difficulty: 'Intermediate',
    visualizerType: 'bigO',
    summary: 'Learn how to read real-world production code and accurately calculate its Big O runtime, including nested vs consecutive loops and multi-variable algorithms (O(N + M) and O(N · M)).',
    analogy: 'If you have to shake hands with 10 people in Room A and 20 people in Room B, you do 10 + 20 = 30 handshakes (O(N + M)). But if every person in Room A must pair up and dance with every person in Room B, you have 10 × 20 = 200 pairings (O(N · M)).',
    keyConcepts: [
      {
        heading: 'Consecutive vs Nested Loops',
        body: '• Consecutive Loops: Two separate loops over array of size N take N + N = 2N steps -> O(N).\n• Nested Loops: An inner loop of size N inside an outer loop of size N takes N × N steps -> O(N²).'
      },
      {
        heading: 'Multiple Inputs: O(N + M) vs O(N · M)',
        body: 'When an algorithm processes two different inputs of sizes N and M, you cannot collapse them into N. Two independent loops over both lists is O(N + M). Nested loops over both lists is O(N · M).'
      }
    ],
    pythonCode: {
      title: 'Multi-Variable Big O Analysis in Python',
      code: `# O(N + M): Consecutive independent loops
def combine_and_print(list_a, list_b):
    for item in list_a: # N steps
        print(item)
    for item in list_b: # M steps
        print(item)

# O(N * M): Nested loops with two different inputs
def find_all_pairs(list_a, list_b):
    pairs = []
    for item_a in list_a:       # N iterations
        for item_b in list_b:   # M iterations each
            pairs.append((item_a, item_b))
    return pairs`,
      explanation: 'Always distinguish between one input of size N and two distinct inputs of sizes N and M.'
    },
    goldenRules: [
      'Two separate loops = Addition (O(N + M) or O(N + N) -> O(N)).',
      'Nested loops = Multiplication (O(N · M) or O(N²)).',
      'Always identify if loop sizes depend on different inputs.'
    ],
    commonPitfalls: [
      'Blindly writing O(N²) for nested loops when the inner loop runs a constant number of times (e.g. 5 times). A loop of 5 inside a loop of N is O(5N) = O(N)!'
    ],
    feynmanPrompt: {
      question: 'Why is a loop that runs 1,000 times inside a loop that runs N times still considered O(N)?',
      rubricPoints: [
        'Explain that 1,000 is a fixed constant number that never changes with N.',
        '1,000 × N = 1,000N.',
        'Big O drops constant factors, so 1,000N is O(N).'
      ],
      sampleExplanation: 'Because 1,000 is fixed! If you have 10 data items, you do 10,000 steps. If you have 20 items, you do 20,000 steps. Notice how doubling the data exactly doubles the steps? That is the definition of linear growth O(N)!'
    },
    quiz: [
      {
        id: 'q7-1',
        question: 'What is the Big O of a function with two separate loops: one looping over an array of size N, followed by another loop over an array of size M?',
        options: ['O(N²)', 'O(N · M)', 'O(N + M)', 'O(1)'],
        correctIndex: 2,
        explanation: 'Because the loops run consecutively one after the other, the total steps are N + M, which is O(N + M).'
      }
    ]
  },
  {
    id: 8,
    slug: 'blazing-fast-lookup-with-hash-tables',
    number: 8,
    title: 'Blazing Fast Lookup with Hash Tables',
    subtitle: 'Hash Functions, Collisions, Separate Chaining, and O(1) Lookups',
    category: 'Hash & Stacks',
    readTimeMinutes: 16,
    difficulty: 'Intermediate',
    visualizerType: 'hashTable',
    summary: 'Hash Tables (dictionaries/hash maps) combine arrays with mathematical hash functions to provide lightning-fast O(1) average-time reads, insertions, and lookups.',
    analogy: 'Think of a coat check at a theater. Instead of searching through 500 coats on a rack (O(N)), the attendant gives you a numbered claim ticket (#42). When you return, they go straight to hook #42 in 1 step (O(1))!',
    keyConcepts: [
      {
        heading: 'How a Hash Table Works',
        body: '1. Take a Key (string, integer).\n2. Pass key through a Hash Function that converts it into a fixed integer index.\n3. Store or retrieve the Value at that calculated array index.'
      },
      {
        heading: 'Handling Collisions',
        body: 'When two different keys hash to the exact same index, a Collision occurs. Common solutions:\n• Separate Chaining: Store a linked list or array of key-value pairs inside each bucket.\n• Linear Probing (Open Addressing): If the slot is occupied, step forward to the next available slot.'
      },
      {
        heading: 'Transforming O(N²) into O(N) using Hash Maps',
        body: 'Finding whether two arrays share a common element naively takes nested loops (O(N · M)). By inserting the first array into a Hash Set in O(N) time and checking the second array in O(M) time, we achieve O(N + M) linear time!'
      }
    ],
    pythonCode: {
      title: 'Optimizing Array Intersection with Hash Map in Python',
      code: `# Naive O(N * M) with nested loops:
def has_duplicate_naive(array_a, array_b):
    for a in array_a:
        for b in array_b:
            if a == b:
                return True
    return False

# Blazing Fast O(N + M) using Hash Set (Dictionary lookup):
def has_duplicate_fast(array_a, array_b):
    seen = set()  # Hash Table
    
    # O(N) to populate hash set
    for item in array_a:
        seen.add(item)
        
    # O(M) lookup: each "in" check is O(1)!
    for item in array_b:
        if item in seen:
            return True  # Found match in 1 step
            
    return False`,
      explanation: 'Hash set lookups take O(1) time on average, collapsing nested loops into two consecutive linear passes.'
    },
    goldenRules: [
      'Hash table lookups, insertions, and deletions take O(1) average time.',
      'A good hash function distributes keys uniformly to minimize collisions.',
      'Use Hash Maps/Sets to eliminate nested loops and turn O(N²) problems into O(N).'
    ],
    commonPitfalls: [
      'Ignoring worst-case O(N) degradation when a terrible hash function maps all keys into a single collision bucket.',
      'Using mutable objects as dictionary keys in Python.'
    ],
    feynmanPrompt: {
      question: 'Explain what a Hash Function is to someone who has never coded.',
      rubricPoints: [
        'Describe it as a magic translator or recipe.',
        'Explain that it converts a word (like "apple") into a specific shelf number.',
        'Explain why it gives the same shelf number every time for the same word.'
      ],
      sampleExplanation: 'A hash function is like a secret code recipe. If you give it the word "apple", it does a quick math trick (like adding the letters A=1, P=16...) and always outputs shelf #42. Every time you ask for "apple", the recipe instantly points you straight to shelf #42!'
    },
    quiz: [
      {
        id: 'q8-1',
        question: 'What is the average time complexity to look up a key in a Hash Table?',
        options: ['O(N)', 'O(log N)', 'O(1)', 'O(N²)'],
        correctIndex: 2,
        explanation: 'Because the hash function calculates the exact index directly, average lookup is O(1) Constant Time.'
      },
      {
        id: 'q8-2',
        question: 'What happens during a hash collision with Separate Chaining?',
        options: [
          'The older item is overwritten and lost',
          'The table doubles in size immediately',
          'The bucket at that index holds a list/chain containing both items',
          'An error exception is thrown'
        ],
        correctIndex: 2,
        explanation: 'Separate chaining stores multiple key-value entries at the same bucket index using a sub-list or chain.'
      }
    ]
  },
  {
    id: 9,
    slug: 'crafting-elegant-code-with-stacks-and-queues',
    number: 9,
    title: 'Crafting Elegant Code with Stacks and Queues',
    subtitle: 'LIFO vs. FIFO and the Classic Bracket Linter',
    category: 'Hash & Stacks',
    readTimeMinutes: 14,
    difficulty: 'Intermediate',
    visualizerType: 'stackQueue',
    summary: 'Stacks (Last-In, First-Out / LIFO) and Queues (First-In, First-Out / FIFO) are constrained data structures that restrict where data can be added and removed, creating elegant, bug-free workflows.',
    analogy: 'A Stack is like a spring-loaded stack of cafeteria trays (you can only push a new tray onto the top, and pop the top tray off). A Queue is like people standing in line at a movie theater ticket counter (first person in line is served first).',
    keyConcepts: [
      {
        heading: 'Stack Operations (LIFO)',
        body: '• Push: Insert item at the top of the stack (O(1)).\n• Pop: Remove and return the top item (O(1)).\n• Peek: Inspect top item without removing it (O(1)).\nUsed for: Undo/Redo history, syntax parenthesis checking, call stacks.'
      },
      {
        heading: 'Queue Operations (FIFO)',
        body: '• Enqueue: Insert item at the back of the line (O(1)).\n• Dequeue: Remove item from the front of the line (O(1)).\n• Front/Peek: View first item in line.\nUsed for: Background job processing, printer queues, Breadth-First Search (BFS).'
      },
      {
        heading: 'The Bracket Linter Algorithm',
        body: 'To verify matching parentheses `({[]})`: Push opening brackets `( { [` onto a stack. When an opening bracket matches a closing bracket, pop it off. If a closing bracket mismatches or the stack is not empty at the end, syntax is invalid!'
      }
    ],
    pythonCode: {
      title: 'Python Bracket Matcher Linter using Stack',
      code: `def is_valid_brackets(syntax_string):
    stack = []
    bracket_pairs = {')': '(', '}': '{', ']': '['}
    
    for char in syntax_string:
        if char in "({[":
            stack.append(char)  # Push opening bracket
        elif char in ")}]":
            if not stack:
                return False  # Closing bracket with no opening pair
            top = stack.pop()
            if top != bracket_pairs[char]:
                return False  # Mismatched bracket type
                
    # Valid if stack is completely empty
    return len(stack) == 0

# Test:
print(is_valid_brackets("({[]})"))  # True
print(is_valid_brackets("({[}])"))  # False (mismatched)` ,
      explanation: 'Using Python lists as stacks with .append() for push and .pop() for pop guarantees O(1) operations.'
    },
    goldenRules: [
      'Stack = LIFO (Last-In, First-Out).',
      'Queue = FIFO (First-In, First-Out).',
      'Constrained data structures prevent bugs by disallowing arbitrary index access.'
    ],
    commonPitfalls: [
      'Using a regular Python list as a Queue with `list.pop(0)`. In Python, popping index 0 is O(N) because all remaining items shift! Use `collections.deque` for O(1) queue operations.'
    ],
    feynmanPrompt: {
      question: 'Explain the difference between a Stack and a Queue using everyday physical objects.',
      rubricPoints: [
        'Stack: stack of pancakes or plates (eat/take from the top).',
        'Queue: waiting in line at the grocery checkout.',
        'Explain LIFO vs FIFO.'
      ],
      sampleExplanation: 'A stack is like a stack of warm pancakes: the last pancake placed on top is the first one you eat (LIFO). A queue is like a line at the grocery store: the first customer to join the line is the first customer who gets checked out (FIFO)!'
    },
    quiz: [
      {
        id: 'q9-1',
        question: 'Which data structure is ideal for implementing an "Undo" feature in a text editor?',
        options: ['Queue', 'Stack', 'Binary Search Tree', 'Hash Set'],
        correctIndex: 1,
        explanation: 'Undo requires reverting the most recent action first, which matches the Last-In First-Out (LIFO) behavior of a Stack.'
      }
    ]
  },
  {
    id: 10,
    slug: 'recursively-recurse-with-recursion',
    number: 10,
    title: 'Recursively Recurse with Recursion',
    subtitle: 'Base Cases, Recursive Cases, and the Call Stack',
    category: 'Recursion & DP',
    readTimeMinutes: 15,
    difficulty: 'Intermediate',
    visualizerType: 'recursion',
    summary: 'Recursion is when a function calls itself. Every recursive function requires a Base Case to stop, and leverages the computer\'s internal Call Stack to manage execution.',
    analogy: 'Think of Russian Matryoshka nesting dolls. To find the prize in the center, you open a doll (recursive step) to reveal a smaller doll. When you finally reach the tiniest doll that cannot be opened (base case), you stop opening and start putting them back together!',
    keyConcepts: [
      {
        heading: 'The Two Mandatory Components',
        body: '1. Base Case: The condition under which the function DOES NOT call itself, halting recursion.\n2. Recursive Case: The logic where the function calls itself with a smaller subproblem.'
      },
      {
        heading: 'The Call Stack in Action',
        body: 'When a function calls another function (or itself), the computer pushes a Stack Frame (containing local variables and return address) onto the Call Stack. When the base case returns, stack frames are popped one by one in LIFO order.'
      },
      {
        heading: 'Stack Overflow',
        body: 'If you omit the base case (or never reach it), the computer will push frames endlessly until memory runs out, throwing a `RecursionError` / Stack Overflow!'
      }
    ],
    pythonCode: {
      title: 'Countdown and Factorial with Call Stack Tracing',
      code: `def factorial(n):
    # 1. Base Case: stop at 1
    if n <= 1:
        return 1
    
    # 2. Recursive Case: n * factorial(n - 1)
    # Stack pushes factorial(4) -> factorial(3) -> factorial(2) -> factorial(1)
    return n * factorial(n - 1)

# Recursive Directory File Finder
import os

def find_files_recursive(directory):
    for entry in os.scandir(directory):
        if entry.is_file():
            print(f"File found: {entry.path}")
        elif entry.is_dir():
            # Recurse down into child subfolder
            find_files_recursive(entry.path)`,
      explanation: 'Notice how traversing nested subfolders is naturally recursive: every subfolder is just another folder!'
    },
    goldenRules: [
      'Always write and verify your Base Case first before writing recursive logic.',
      'Ensure each recursive call moves arguments closer to the Base Case.',
      'Recursion uses memory on the Call Stack proportional to recursion depth.'
    ],
    commonPitfalls: [
      'Infinite recursion (missing or incorrect base case).',
      'Forgetting that deep recursion can exceed Python\'s default recursion limit (1000).'
    ],
    feynmanPrompt: {
      question: 'Explain what happens to the Call Stack when calculating factorial(3).',
      rubricPoints: [
        'Explain pushing factorial(3), then factorial(2), then factorial(1).',
        'Explain hitting the base case at 1.',
        'Explain unwinding/popping the stack: 1 -> 2*1=2 -> 3*2=6.'
      ],
      sampleExplanation: 'When factorial(3) runs, it pauses and asks: "What is factorial(2)?" That gets stacked on top. factorial(2) pauses and asks: "What is factorial(1)?" That gets stacked. factorial(1) hits the base case and says "1!". Now the stack unwinds: factorial(2) calculates 2×1=2, pops off, and factorial(3) calculates 3×2=6!'
    },
    quiz: [
      {
        id: 'q10-1',
        question: 'What happens if a recursive function does not have a base case?',
        options: [
          'It executes in O(1) time',
          'It crashes with a Stack Overflow / RecursionError',
          'It returns None automatically',
          'The compiler converts it to a while loop'
        ],
        correctIndex: 1,
        explanation: 'Without a base case, recursive calls continue indefinitely until the call stack runs out of allocated memory.'
      }
    ]
  },
  {
    id: 11,
    slug: 'learning-to-write-in-recursive',
    number: 11,
    title: 'Learning to Write in Recursive',
    subtitle: 'Top-Down Thinking, Subproblems, and the Staircase Problem',
    category: 'Recursion & DP',
    readTimeMinutes: 15,
    difficulty: 'Intermediate',
    visualizerType: 'recursion',
    summary: 'Mastering the recursive mindset requires Top-Down thinking: pretend the recursive call already works on smaller subproblems, then write the combining step.',
    analogy: 'To clean a giant house with 10 rooms, you don\'t stress about all 10 rooms at once. You clean Room #1, and delegate the remaining 9 rooms to your assistant (who does the exact same thing)!',
    keyConcepts: [
      {
        heading: 'Top-Down Mental Model',
        body: '1. Identify the subproblem (e.g. reversing a string of length N is just reversing the tail of length N-1 + adding the first character to the end).\n2. Assume the recursive function already works for N-1.\n3. Combine the subproblem result with your current element.'
      },
      {
        heading: 'The Classic Staircase Problem',
        body: 'You are climbing a staircase with N steps. You can climb 1, 2, or 3 steps at a time. How many distinct ways can you reach the top?\n• To reach step N, your final jump came from step N-1, step N-2, or step N-3!\n• Total ways(N) = ways(N-1) + ways(N-2) + ways(N-3).'
      }
    ],
    pythonCode: {
      title: 'The Staircase Problem in Python',
      code: `def count_staircase_paths(n):
    # Base Cases:
    if n < 0:
        return 0
    if n == 0:
        return 1  # 1 valid way (standing at base)
        
    # Recursive Case: sum of jumping from 1, 2, or 3 steps below
    return (count_staircase_paths(n - 1) + 
            count_staircase_paths(n - 2) + 
            count_staircase_paths(n - 3))

# For 4 steps:
print(count_staircase_paths(4))  # 7 unique path combinations!`,
      explanation: 'Top-down thinking turns complex multi-step branching problems into simple combinations of subproblems.'
    },
    goldenRules: [
      'Top-down thinking: assume the function already works for N-1.',
      'Subproblems must be strictly smaller instances of the original problem.',
      'Identify all possible final steps to form the recurrence relation.'
    ],
    commonPitfalls: [
      'Trying to mentally trace 50 levels of recursive branches at once. Focus only on the base case and one single transition step!'
    ],
    feynmanPrompt: {
      question: 'Explain why the number of ways to climb N stairs equals ways(N-1) + ways(N-2) + ways(N-3).',
      rubricPoints: [
        'Think about the very last leap you took onto step N.',
        'That leap was either a 1-step, 2-step, or 3-step jump.',
        'Therefore, you were previously standing on step N-1, N-2, or N-3.'
      ],
      sampleExplanation: 'When you land on the top step, where were you just 1 second ago? You had to jump from 1 step below, 2 steps below, or 3 steps below! So all the paths that get you to the top are simply the sum of all paths to those three landing spots.'
    },
    quiz: [
      {
        id: 'q11-1',
        question: 'For a staircase with 3 steps (1, 2, or 3 jumps allowed), how many unique paths exist to reach the top?',
        options: ['3', '4', '7', '6'],
        correctIndex: 1,
        explanation: 'For n=3: (1+1+1), (1+2), (2+1), (3) = exactly 4 distinct paths.'
      }
    ]
  },
  {
    id: 12,
    slug: 'dynamic-programming',
    number: 12,
    title: 'Dynamic Programming & Memoization',
    subtitle: 'Overlapping Subproblems, Memoization, and Bottom-Up Tabulation',
    category: 'Recursion & DP',
    readTimeMinutes: 16,
    difficulty: 'Intermediate',
    visualizerType: 'recursion',
    summary: 'Dynamic Programming eliminates redundant computations in recursive algorithms by storing and reusing intermediate results using Memoization or Bottom-Up Tabulation, collapsing O(2^N) exponential time to O(N) linear time.',
    analogy: 'If I write "1 + 1 + 1 + 1 + 1" on a board and ask you what it equals, you count and say "5". If I add another "+ 1" to the end, you don\'t re-count from scratch—you remember the previous 5 and say "6"! That memory is Memoization.',
    keyConcepts: [
      {
        heading: 'Overlapping Subproblems',
        body: 'In naive recursive Fibonacci `fib(N) = fib(N-1) + fib(N-2)`, `fib(5)` calculates `fib(3)` multiple times independently. For `fib(40)`, millions of identical calculations occur, creating disastrous O(2^N) exponential time!'
      },
      {
        heading: 'Memoization (Top-Down)',
        body: 'Maintain a hash table cache. Before computing any recursive branch, check if the argument is already in the cache. If so, return it in O(1) time!'
      },
      {
        heading: 'Tabulation (Bottom-Up)',
        body: 'Avoid recursion entirely by starting from base cases and building up an array or variables iteratively from 0 to N.'
      }
    ],
    pythonCode: {
      title: 'Fibonacci: Naive vs Memoized vs Bottom-Up in Python',
      code: `# 1. Naive Exponential O(2^N) - DO NOT RUN FOR N > 35!
def fib_naive(n):
    if n <= 1:
        return n
    return fib_naive(n - 1) + fib_naive(n - 2)

# 2. Top-Down Memoization O(N) Time, O(N) Space
def fib_memo(n, memo=None):
    if memo is None:
        memo = {}
    if n <= 1:
        return n
    if n not in memo:
        memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]

# 3. Bottom-Up Tabulation O(N) Time, O(1) Space
def fib_bottom_up(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

print(fib_memo(50))      # 12586269025 (Calculated in milliseconds!)
print(fib_bottom_up(50)) # 12586269025 (Instant!)`,
      explanation: 'Memoization and Tabulation both achieve O(N) time, but Bottom-Up reduces space complexity to O(1).'
    },
    goldenRules: [
      'Look for Overlapping Subproblems: identical recursive calls with identical arguments.',
      'Memoization: store results in a dictionary cache on the way down.',
      'Bottom-Up: build from base cases upwards using simple loops.'
    ],
    commonPitfalls: [
      'Using a mutable default argument `memo={}` in Python function definitions without reinitializing it.'
    ],
    feynmanPrompt: {
      question: 'Why does calculating Fibonacci(40) take seconds naively, but Fibonacci(40) with memoization takes less than a millisecond?',
      rubricPoints: [
        'Explain that naive calculation repeats the same tree of calculations millions of times.',
        'Explain that memoization remembers each number after calculating it once.',
        'Contrast 2^40 (~1 trillion operations) with 40 operations.'
      ],
      sampleExplanation: 'Without a cache, calculating Fib(40) recalculates Fib(5) thousands of times from scratch, totaling over a trillion steps! With a memoization notepad, every Fibonacci number from 1 to 40 is calculated once, written down, and read back in 1 step. 40 steps vs 1,000,000,000,000 steps!'
    },
    quiz: [
      {
        id: 'q12-1',
        question: 'What is the time complexity of calculating Fibonacci using Memoization or Bottom-Up Tabulation?',
        options: ['O(2^N)', 'O(N²)', 'O(N)', 'O(log N)'],
        correctIndex: 2,
        explanation: 'Each value from 1 to N is computed exactly once, resulting in O(N) linear time.'
      }
    ]
  },
  {
    id: 13,
    slug: 'recursive-algorithms-for-speed',
    number: 13,
    title: 'Recursive Algorithms for Speed',
    subtitle: 'Quicksort, Partitioning, Quickselect, and O(N log N)',
    category: 'Sorting',
    readTimeMinutes: 16,
    difficulty: 'Intermediate',
    visualizerType: 'sorting',
    summary: 'Quicksort is an exceptionally fast, practical sorting algorithm that leverages Partitioning around a Pivot to achieve O(N log N) average runtime.',
    analogy: 'Imagine organizing a messy pile of test scores. You pick a random score (say 75) as your Pivot. You toss all scores below 75 into the left pile, and all scores above 75 into the right pile. 75 is now in its exact final sorted spot! You then repeat this process on both smaller piles.',
    keyConcepts: [
      {
        heading: 'Partitioning Around a Pivot',
        body: '1. Pick a pivot element (often the rightmost item).\n2. Set left and right pointers.\n3. Move left pointer rightward until finding an item > pivot.\n4. Move right pointer leftward until finding an item < pivot.\n5. Swap them! Repeat until pointers cross.\n6. Swap pivot into the pointer meeting spot. The pivot is now permanently in sorted position!'
      },
      {
        heading: 'Quicksort Complexity',
        body: '• Best/Average Case: O(N log N). Each partition pass takes O(N) steps across log N levels of recursive division.\n• Worst Case: O(N²) when the pivot is always the extreme minimum or maximum (e.g. reverse-sorted array without random pivot).'
      },
      {
        heading: 'Quickselect',
        body: 'To find the k-th smallest element, Quickselect partitions the array, but only recurses into the single partition containing index k! Average time: O(N).'
      }
    ],
    pythonCode: {
      title: 'Python Quicksort Implementation',
      code: `def quicksort(arr, left=0, right=None):
    if right is None:
        right = len(arr) - 1
        
    if right - left <= 0:
        return
        
    # Partition and get pivot index
    pivot_index = partition(arr, left, right)
    
    # Recursively sort left and right partitions
    quicksort(arr, left, pivot_index - 1)
    quicksort(arr, pivot_index + 1, right)
    return arr

def partition(arr, left, right):
    pivot = arr[right]
    i = left
    for j in range(left, right):
        if arr[j] < pivot:
            arr[i], arr[j] = arr[j], arr[i]
            i += 1
    # Place pivot in final position
    arr[i], arr[right] = arr[right], arr[i]
    return i

# Test:
nums = [0, 5, 2, 1, 6, 3]
print(quicksort(nums))  # [0, 1, 2, 3, 5, 6]`,
      explanation: 'Quicksort partitions the array in-place, then recursively sorts the left and right subarrays around the pivot.'
    },
    goldenRules: [
      'Partitioning places the pivot into its exact final sorted position.',
      'Quicksort average time is O(N log N), vastly superior to Bubble/Selection/Insertion sort.',
      'Quickselect finds the k-th smallest item in O(N) average time.'
    ],
    commonPitfalls: [
      'Worst case O(N²) occurs on already sorted arrays if the pivot is always chosen as the first or last element. Using randomized pivot selection fixes this.'
    ],
    feynmanPrompt: {
      question: 'Why is Quicksort\'s average time O(N log N)?',
      rubricPoints: [
        'Explain that each level of partitioning processes all N items (O(N)).',
        'Explain that halving the array creates log N levels of depth.',
        'Multiply N × log N.'
      ],
      sampleExplanation: 'When you partition the array, you look at every item once (N operations). If your pivot divides the array roughly in half, you can only split it log N times before you reach single elements. Doing N operations across log N levels gives O(N log N) total operations!'
    },
    quiz: [
      {
        id: 'q13-1',
        question: 'What is the average time complexity of Quicksort?',
        options: ['O(N²)', 'O(N log N)', 'O(N)', 'O(log N)'],
        correctIndex: 1,
        explanation: 'Quicksort divides the array in half log N times, doing N work at each level, achieving O(N log N) average runtime.'
      }
    ]
  },
  {
    id: 14,
    slug: 'node-based-data-structures-linked-lists',
    number: 14,
    title: 'Node-Based Data Structures (Linked Lists)',
    subtitle: 'Singly Linked Lists, Doubly Linked Lists, and Memory Pointers',
    category: 'Trees & Heaps',
    readTimeMinutes: 16,
    difficulty: 'Intermediate',
    visualizerType: 'linkedList',
    summary: 'Linked Lists store elements in non-contiguous memory chunks called Nodes connected by Pointers, allowing O(1) insertions and deletions at the head without memory shifting.',
    analogy: 'An Array is like a row of houses on a street (#101, #102, #103). A Linked List is like a treasure hunt: you open clue #1, which gives you the secret address for clue #2, which points to clue #3 anywhere in the city!',
    keyConcepts: [
      {
        heading: 'Anatomy of a Node',
        body: 'Each Node contains two pieces of data:\n1. Value (the data payload).\n2. Next Pointer (reference to the next node in memory, or None for the tail).'
      },
      {
        heading: 'Arrays vs Linked Lists Comparison',
        body: '• Reading/Lookup: Arrays are O(1) by index. Linked lists are O(N) because you must traverse from the Head pointer step-by-step.\n• Insertion at Head (Index 0): Arrays are O(N) (shifting all elements). Linked lists are O(1) (simply point new node\'s next to current head)!'
      },
      {
        heading: 'Doubly Linked Lists',
        body: 'Each node has both `next` and `previous` pointers, plus a `tail` reference. This enables O(1) insertions and deletions at both the beginning and the end of the list, making it ideal for Queue implementations!'
      }
    ],
    pythonCode: {
      title: 'Python Singly Linked List Implementation',
      code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self, head=None):
        self.head = head
        
    # O(1) Insertion at the very beginning!
    def insert_at_front(self, value):
        new_node = Node(value)
        new_node.next = self.head
        self.head = new_node
        
    # O(N) Read by index
    def read_at_index(self, index):
        current = self.head
        current_index = 0
        while current_index < index and current:
            current = current.next
            current_index += 1
        return current.data if current else None

# Test:
ll = LinkedList()
ll.insert_at_front("Node C")
ll.insert_at_front("Node B")
ll.insert_at_front("Node A")
print(ll.read_at_index(0)) # "Node A"` ,
      explanation: 'Linked lists do not require contiguous memory blocks, enabling instantaneous O(1) prepending.'
    },
    goldenRules: [
      'Linked List nodes hold data + a pointer to the next node.',
      'Insertion/deletion at the head is O(1) without any element shifting.',
      'Reading by index in a linked list is O(N) because you must traverse from the head node.'
    ],
    commonPitfalls: [
      'Losing references to nodes during insertion/deletion, causing entire sublists to be orphaned in memory.',
      'Attempting index lookups on a linked list thinking they are O(1) like arrays.'
    ],
    feynmanPrompt: {
      question: 'Why is adding an item to the front of a Linked List so much faster than adding to the front of an Array?',
      rubricPoints: [
        'Array: all elements must physically shift one memory box over.',
        'Linked List: create a new node, point its arrow to the old head, and declare it the new head.',
        'Explain why no shifting equals O(1).'
      ],
      sampleExplanation: 'In an array, if you put someone at the front of the line, every single person behind them has to move back one spot. In a linked list, people are holding hands. To insert someone at the front, the newcomer simply grabs the first person\'s hand—nobody else in the entire line has to move!'
    },
    quiz: [
      {
        id: 'q14-1',
        question: 'What is the time complexity of reading the 500th element of a Singly Linked List?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N²)'],
        correctIndex: 2,
        explanation: 'You must start at the head and follow 500 `next` pointers one by one, which is O(N) linear time.'
      }
    ]
  },
  {
    id: 15,
    slug: 'speeding-up-all-the-things-with-binary-search-trees',
    number: 15,
    title: 'Speeding Up All the Things with Binary Search Trees',
    subtitle: 'Binary Search Trees (BST), Traversals, and Deletion Cases',
    category: 'Trees & Heaps',
    readTimeMinutes: 18,
    difficulty: 'Intermediate',
    visualizerType: 'bst',
    summary: 'A Binary Search Tree (BST) combines the O(log N) search speed of an ordered array with the O(log N) dynamic insertion/deletion speed of a node-based linked structure.',
    analogy: 'Imagine a family tree of numbers. The grandparent is the Root. Every number smaller than the grandparent goes down to the left wing of the house; every number greater goes down to the right wing of the house.',
    keyConcepts: [
      {
        heading: 'The BST Invariant Property',
        body: 'For every node in a Binary Search Tree:\n• All values in its Left Subtree must be STRICTLY LESS than the node\'s value.\n• All values in its Right Subtree must be STRICTLY GREATER than the node\'s value.'
      },
      {
        heading: 'Search, Insert, and Delete in O(log N)',
        body: 'At each node comparison during search or insertion, you eliminate half the remaining tree! In a balanced BST, Search, Insert, and Delete all operate in O(log N) average time.'
      },
      {
        heading: 'BST Deletion: The 3 Cases',
        body: '1. Node has 0 children (Leaf): Simply delete it.\n2. Node has 1 child: Delete node and attach its child directly to its parent.\n3. Node has 2 children: Replace node with its In-Order Successor (the smallest value in its right subtree).'
      },
      {
        heading: 'Tree Traversals',
        body: '• In-Order (Left, Root, Right): Prints tree values in perfectly sorted ascending order!\n• Pre-Order (Root, Left, Right): Useful for cloning/serializing the tree.\n• Post-Order (Left, Right, Root): Useful for calculating folder sizes or deleting trees.'
      }
    ],
    pythonCode: {
      title: 'Python Binary Search Tree Implementation',
      code: `class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, val):
        if not self.root:
            self.root = TreeNode(val)
        else:
            self._insert_recursive(self.root, val)

    def _insert_recursive(self, node, val):
        if val < node.val:
            if node.left is None:
                node.left = TreeNode(val)
            else:
                self._insert_recursive(node.left, val)
        elif val > node.val:
            if node.right is None:
                node.right = TreeNode(val)
            else:
                self._insert_recursive(node.right, val)

    # In-Order Traversal yields sorted values!
    def in_order_traversal(self, node, result=None):
        if result is None: result = []
        if node:
            self.in_order_traversal(node.left, result)
            result.append(node.val)
            self.in_order_traversal(node.right, result)
        return result

# Test:
tree = BST()
for num in [50, 25, 75, 10, 33, 56, 89]:
    tree.insert(num)
print(tree.in_order_traversal(tree.root))  # [10, 25, 33, 50, 56, 75, 89]`,
      explanation: 'In-order traversal of a BST always yields values in ascending sorted order.'
    },
    goldenRules: [
      'BST Rule: Left subtree < Current Node < Right subtree.',
      'Balanced BST operations take O(log N) time.',
      'In-Order traversal on a BST produces sorted output in O(N) time.',
      'When deleting a node with 2 children, replace it with its In-Order Successor.'
    ],
    commonPitfalls: [
      'Unbalanced/Degenerate Trees: Inserting already sorted data (1, 2, 3, 4, 5) creates a straight line of nodes that degrades BST performance to O(N) linear time like a linked list.'
    ],
    feynmanPrompt: {
      question: 'How do you delete a BST node that has two children?',
      rubricPoints: [
        'Explain why you cannot just delete the node (it leaves two disconnected branches).',
        'Explain finding the In-Order Successor (step right, then go all the way left).',
        'Explain replacing the deleted node with this successor.'
      ],
      sampleExplanation: 'If you remove a boss who manages two departments, you must promote the next closest person in rank. In a BST, you take one step to the right department, then walk all the way left to find the smallest number in that wing. You promote that number into the vacant spot!'
    },
    quiz: [
      {
        id: 'q15-1',
        question: 'Which tree traversal order visits nodes in ascending sorted order for a Binary Search Tree?',
        options: ['Pre-Order', 'In-Order', 'Post-Order', 'Level-Order'],
        correctIndex: 1,
        explanation: 'In-Order traversal visits (Left Subtree -> Root -> Right Subtree), which always outputs values in ascending sorted order.'
      }
    ]
  },
  {
    id: 16,
    slug: 'keeping-your-priorities-straight-with-heaps',
    number: 16,
    title: 'Keeping Your Priorities Straight with Heaps',
    subtitle: 'Binary Heaps, Priority Queues, Trickle Up / Down, and Array Representation',
    category: 'Trees & Heaps',
    readTimeMinutes: 17,
    difficulty: 'Advanced',
    visualizerType: 'heap',
    summary: 'A Heap is a specialized complete binary tree that maintains the Heap Property, serving as the ultimate high-performance data structure for Priority Queues with O(log N) insertions and deletions.',
    analogy: 'Think of an emergency room triage desk. Patients don\'t get seen strictly in the order they arrived (FIFO). A patient with a life-threatening injury is prioritized to the front of the line immediately (Priority Queue).',
    keyConcepts: [
      {
        heading: 'The Heap Condition & Completeness',
        body: '• Max-Heap: Every parent node must be GREATER THAN or equal to both its children (Root is the absolute maximum).\n• Min-Heap: Every parent node must be LESS THAN or equal to its children (Root is the absolute minimum).\n• Complete Tree: Every level is completely filled, with the bottom level filled from left to right with no gaps.'
      },
      {
        heading: 'Heap Operations: Trickle Up & Trickle Down',
        body: '• Insertion: Place new node in the next open spot at the bottom right. Trickle Up (bubble up): swap with parent while new node > parent. Max steps = tree height = O(log N)!\n• Deletion (Extract Max): Remove Root. Move the bottom-rightmost leaf to the Root spot. Trickle Down: repeatedly swap with the larger child until heap property is restored. Max steps = O(log N)!'
      },
      {
        heading: 'Storing Heaps in Simple Arrays (No Pointers Needed!)',
        body: 'Because heaps are complete trees, they are stored directly inside flat arrays with mathematical index formulas:\n• Left Child of index i = 2i + 1\n• Right Child of index i = 2i + 2\n• Parent of index i = (i - 1) // 2'
      }
    ],
    pythonCode: {
      title: 'Python Max-Heap Implementation',
      code: `class MaxHeap:
    def __init__(self):
        self.data = []

    def root_node(self):
        return self.data[0] if self.data else None

    # O(log N) Insertion
    def insert(self, value):
        self.data.append(value)
        new_node_index = len(self.data) - 1
        
        # Trickle Up
        while new_node_index > 0:
            parent_index = (new_node_index - 1) // 2
            if self.data[new_node_index] > self.data[parent_index]:
                self.data[new_node_index], self.data[parent_index] = (
                    self.data[parent_index], self.data[new_node_index]
                )
                new_node_index = parent_index
            else:
                break

    # O(log N) Extract Maximum
    def extract_max(self):
        if not self.data: return None
        if len(self.data) == 1: return self.data.pop()
        
        max_val = self.data[0]
        # Move last leaf to root
        self.data[0] = self.data.pop()
        self._trickle_down(0)
        return max_val

    def _trickle_down(self, index):
        while True:
            left_child = 2 * index + 1
            right_child = 2 * index + 2
            largest = index
            
            if left_child < len(self.data) and self.data[left_child] > self.data[largest]:
                largest = left_child
            if right_child < len(self.data) and self.data[right_child] > self.data[largest]:
                largest = right_child
                
            if largest != index:
                self.data[index], self.data[largest] = self.data[largest], self.data[index]
                index = largest
            else:
                break

# Test:
heap = MaxHeap()
for val in [55, 22, 34, 10, 2, 99, 68]:
    heap.insert(val)
print("Max extracted:", heap.extract_max())  # 99`,
      explanation: 'Heaps store trees in standard arrays using index arithmetic, avoiding memory pointer overhead.'
    },
    goldenRules: [
      'Max-Heap Root is always the maximum value in O(1) peek time.',
      'Heap Insertion and Extract-Max take O(log N) time.',
      'Heaps are Complete Binary Trees, represented in flat arrays using (2i+1, 2i+2).'
    ],
    commonPitfalls: [
      'Confusing Heaps with BSTs: In a Max-Heap, left child does NOT need to be smaller than right child! Only parent > children matters.'
    ],
    feynmanPrompt: {
      question: 'How do you represent a tree inside a flat array without any pointers in a Heap?',
      rubricPoints: [
        'State that the root is at index 0.',
        'Explain the formula for children: left is 2i + 1, right is 2i + 2.',
        'Explain the formula for parent: (i - 1) // 2.'
      ],
      sampleExplanation: 'Because the tree has no gaps, you list nodes level by level from left to right! Root is at index 0. Its children are at index 1 and 2. Their children are at 3, 4, 5, 6. With simple math (2×index + 1), you can hop to any child instantly without storing a single pointer!'
    },
    quiz: [
      {
        id: 'q16-1',
        question: 'In a 0-indexed array representation of a Heap, what is the array index of the Left Child of node at index 3?',
        options: ['6', '7', '8', '5'],
        correctIndex: 1,
        explanation: 'Using the formula (2i + 1): 2 × 3 + 1 = 7.'
      }
    ]
  },
  {
    id: 17,
    slug: 'it-doesnt-hurt-to-trie',
    number: 17,
    title: 'It Doesn\'t Hurt to Trie',
    subtitle: 'Trie (Prefix Trees), Autocomplete Engines, and Spell Checkers',
    category: 'Trees & Heaps',
    readTimeMinutes: 16,
    difficulty: 'Advanced',
    visualizerType: 'trie',
    summary: 'A Trie (pronounced "try" or "tree") is a prefix tree data structure optimized for character search, dictionary lookups, and auto-complete features with O(K) lookup speed where K is word length.',
    analogy: 'Think of an old-fashioned telephone operator directory. When you dial "C-A-T", each letter walks you down a specific hallway branch (C -> A -> T). All words starting with "CAT" (cat, cater, caterpillar) share the exact same starting hallway!',
    keyConcepts: [
      {
        heading: 'Structure of a Trie Node',
        body: 'Each Trie Node contains a hash map/dictionary of children mapping characters to child nodes, plus a boolean `is_end_of_word` flag (or `*` character) indicating if a complete word terminates at this node.'
      },
      {
        heading: 'O(K) Speed: Independent of Dataset Size (N)!',
        body: 'Searching or inserting a word of length K (e.g. "cat" has K=3) takes exactly K steps, regardless of whether your dictionary has 10 words or 10,000,000 words! That is O(K) Constant Time relative to dictionary size!'
      },
      {
        heading: 'Building Autocomplete',
        body: '1. Traverse down the Trie for the user\'s typed prefix (e.g. "ca").\n2. If prefix not found, return empty.\n3. If found, run a depth-first collection on the subtree to gather all descendant words!'
      }
    ],
    pythonCode: {
      title: 'Python Trie and Autocomplete Engine Implementation',
      code: `class TrieNode:
    def __init__(self):
        self.children = {}  # char -> TrieNode
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    # O(K) Word Insertion where K is word length
    def insert(self, word):
        current = self.root
        for char in word:
            if char not in current.children:
                current.children[char] = TrieNode()
            current = current.children[char]
        current.is_end_of_word = True

    # O(K) Autocomplete prefix search
    def autocomplete(self, prefix):
        current = self.root
        for char in prefix:
            if char not in current.children:
                return []  # Prefix not found
            current = current.children[char]
            
        # Collect all words starting from prefix node
        words = []
        self._collect_words(current, prefix, words)
        return words

    def _collect_words(self, node, current_word, results):
        if node.is_end_of_word:
            results.append(current_word)
        for char, child_node in node.children.items():
            self._collect_words(child_node, current_word + char, results)

# Test Autocomplete:
trie = Trie()
for w in ["cat", "cater", "catnip", "camera", "dog", "doom"]:
    trie.insert(w)
print(trie.autocomplete("cat"))  # ['cat', 'cater', 'catnip']`,
      explanation: 'Trie search speed depends solely on the length of the query word (K), not on the number of words stored (N).'
    },
    goldenRules: [
      'Tries share common prefixes among words, saving storage.',
      'Search/Insert runtime is O(K) where K is the length of the string.',
      'Tries power Google search auto-complete, spell-checkers, and IP routing tables.'
    ],
    commonPitfalls: [
      'Forgetting the `is_end_of_word` boolean flag, making it impossible to distinguish between the word "bat" and a prefix for "battery".'
    ],
    feynmanPrompt: {
      question: 'Why is searching in a Trie considered O(K) and not O(N)?',
      rubricPoints: [
        'N is the total number of words in the dictionary (e.g. 1,000,000).',
        'K is the number of letters in the searched word (e.g. "dog" has K=3).',
        'You only make 3 hops (d -> o -> g) regardless of having 10 or 1,000,000 words.'
      ],
      sampleExplanation: 'If you search for the word "dog" in a dictionary of 10,000,000 words, you take 1 hop to letter D, 1 hop to letter O, and 1 hop to letter G. That is 3 hops total! The 9,999,997 other words in the dictionary never even get looked at!'
    },
    quiz: [
      {
        id: 'q17-1',
        question: 'What is the search time complexity in a Trie for a word of length K in a dictionary containing N words?',
        options: ['O(N)', 'O(log N)', 'O(K)', 'O(N · K)'],
        correctIndex: 2,
        explanation: 'Searching only takes steps equal to the number of characters in the word K, regardless of how large N is.'
      }
    ]
  },
  {
    id: 18,
    slug: 'connecting-everything-with-graphs',
    number: 18,
    title: 'Connecting Everything with Graphs',
    subtitle: 'Vertices, Edges, Breadth-First Search (BFS), and Depth-First Search (DFS)',
    category: 'Graphs & Optimization',
    readTimeMinutes: 18,
    difficulty: 'Advanced',
    visualizerType: 'graph',
    summary: 'Graphs represent networks of interconnected data via Vertices (nodes) and Edges (connections). Master Breadth-First Search (BFS) for shortest paths and Depth-First Search (DFS) for deep exploration.',
    analogy: 'Think of social networks like LinkedIn. You are a Vertex, and your friendships are Edges. Your 1st-degree connections are neighbors. Finding the shortest chain of introductions to someone is Breadth-First Search (BFS)!',
    keyConcepts: [
      {
        heading: 'Graph Terminology',
        body: '• Vertex (Node): An entity (person, city, web page).\n• Edge: The relationship connecting two vertices.\n• Directed vs Undirected: One-way street (Twitter followers) vs two-way street (Facebook friends).\n• Weighted Graph: Edges have numbers/weights (distance between cities in Google Maps).'
      },
      {
        heading: 'Breadth-First Search (BFS): Uses a Queue (FIFO)',
        body: 'Explores neighbors layer by layer (1st-degree, then 2nd-degree, then 3rd-degree). Guaranteed to find the SHORTEST PATH in unweighted graphs!'
      },
      {
        heading: 'Depth-First Search (DFS): Uses a Stack / Recursion (LIFO)',
        body: 'Plunges deep down one path as far as possible before backtracking. Excellent for mazes, cycle detection, and topological sorting.'
      },
      {
        heading: 'The `visited` Set',
        body: 'Because graphs can contain CYCLES (loops), every graph traversal MUST track visited vertices in a set to avoid infinite loops!'
      }
    ],
    pythonCode: {
      title: 'Python BFS and DFS Graph Traversals',
      code: `from collections import deque

class Vertex:
    def __init__(self, value):
        self.value = value
        self.adjacent_vertices = []

    def add_adjacent_vertex(self, vertex):
        self.adjacent_vertices.append(vertex)

# Breadth-First Search (BFS) using Queue: Shortest Path!
def bfs(starting_vertex, search_value):
    queue = deque([starting_vertex])
    visited = {starting_vertex.value}
    
    while queue:
        current = queue.popleft()
        if current.value == search_value:
            return current  # Found target!
            
        for neighbor in current.adjacent_vertices:
            if neighbor.value not in visited:
                visited.add(neighbor.value)
                queue.append(neighbor)
    return None

# Depth-First Search (DFS) using Recursion
def dfs(vertex, search_value, visited=None):
    if visited is None:
        visited = set()
    if vertex.value == search_value:
        return vertex
        
    visited.add(vertex.value)
    for neighbor in vertex.adjacent_vertices:
        if neighbor.value not in visited:
            result = dfs(neighbor, search_value, visited)
            if result:
                return result
    return None`,
      explanation: 'BFS uses a FIFO queue for layer-by-layer traversal; DFS uses recursion/stack to dive deep.'
    },
    goldenRules: [
      'Always maintain a `visited` set to avoid infinite cycle loops.',
      'BFS uses a Queue and finds the shortest path in unweighted graphs.',
      'DFS uses a Stack/Recursion and dives deep along one path before backtracking.'
    ],
    commonPitfalls: [
      'Omitting visited tracking in cyclic graphs, causing endless recursion or infinite queue loops.'
    ],
    feynmanPrompt: {
      question: 'Explain why BFS is better than DFS for finding the shortest route on a subway map.',
      rubricPoints: [
        'BFS checks all stations 1 stop away, then all stations 2 stops away, etc.',
        'The moment BFS reaches your destination, it is guaranteed to be the minimum number of stops.',
        'DFS might ride a train all the way to the end of the line on a wild goose chase before checking a station 1 stop away.'
      ],
      sampleExplanation: 'BFS radiates outward in ripples like a pebble dropped in water: it checks all stations 1 stop away, then 2 stops away. When it reaches your stop, you know for a fact it took the fewest stops possible. DFS might ride a train 20 stops in the wrong direction before ever checking the stop right next to you!'
    },
    quiz: [
      {
        id: 'q18-1',
        question: 'Which graph traversal algorithm guarantees finding the shortest path on an unweighted graph?',
        options: ['Depth-First Search (DFS)', 'Breadth-First Search (BFS)', 'In-Order Traversal', 'Quicksort'],
        correctIndex: 1,
        explanation: 'BFS radiates outward layer-by-layer, guaranteeing that the first time it reaches a vertex is via the shortest path.'
      }
    ]
  },
  {
    id: 19,
    slug: 'dealing-with-space-constraints-space-complexity',
    number: 19,
    title: 'Dealing with Space Constraints (Space Complexity)',
    subtitle: 'Auxiliary Memory, In-Place Algorithms, and Time vs. Space Trade-offs',
    category: 'Graphs & Optimization',
    readTimeMinutes: 14,
    difficulty: 'Intermediate',
    visualizerType: 'spaceTime',
    summary: 'Space Complexity measures how much additional (auxiliary) memory an algorithm consumes as input size N grows. Great engineering is the art of balancing time speed vs space memory.',
    analogy: 'Imagine organizing a messy closet. One method is dumping all clothes onto your bed to sort them (takes extra space/memory). Another method is rearranging clothes inside the closet without using the bed (in-place, O(1) space).',
    keyConcepts: [
      {
        heading: 'Auxiliary Space',
        body: 'Space complexity in Big O measures the EXTRA space created by the algorithm, not the original input data itself.'
      },
      {
        heading: 'In-Place vs Out-of-Place',
        body: '• In-Place Algorithm: Modifies the data structure directly in memory without allocating extra copies (O(1) Auxiliary Space).\n• Out-of-Place Algorithm: Creates new arrays or hash tables (O(N) Space).'
      },
      {
        heading: 'The Time-Space Trade-off',
        body: 'Often, you can make an algorithm dramatically faster (e.g. from O(N²) to O(N)) by trading memory (allocating an O(N) Hash Table to store lookups).'
      }
    ],
    pythonCode: {
      title: 'In-Place Reverse O(1) Space vs New Copy O(N) Space in Python',
      code: `# Out-of-Place: O(N) Time and O(N) Auxiliary Space
def reverse_copy(arr):
    new_arr = []
    for i in range(len(arr) - 1, -1, -1):
        new_arr.append(arr[i])
    return new_arr

# In-Place: O(N) Time and O(1) Auxiliary Space!
def reverse_in_place(arr):
    left = 0
    right = len(arr) - 1
    while left < right:
        # Swap pointers directly
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr`,
      explanation: 'In-place algorithms use two pointers to swap elements directly, consuming O(1) extra memory.'
    },
    goldenRules: [
      'Big O Space measures auxiliary (additional) memory allocated by the algorithm.',
      'In-Place algorithms operate in O(1) extra space.',
      'Be aware of the recursive call stack space (depth of recursion consumes memory!).'
    ],
    commonPitfalls: [
      'Assuming recursion uses O(1) space. A recursive function with depth N consumes O(N) stack frame memory!'
    ],
    feynmanPrompt: {
      question: 'Explain the difference between In-Place and Out-of-Place array reversal.',
      rubricPoints: [
        'Out-of-place buys a brand new empty box and copies items one by one.',
        'In-place swaps items inside the existing box.',
        'State the memory space difference (O(N) vs O(1)).'
      ],
      sampleExplanation: 'Reversing out-of-place is like buying a second bookshelf to copy your books into reverse order—it takes up twice as much room in your house (O(N) space). Reversing in-place is swapping book #1 with the last book directly on your existing shelf without buying extra furniture (O(1) space)!'
    },
    quiz: [
      {
        id: 'q19-1',
        question: 'What is the auxiliary space complexity of an in-place array reversal using two pointers?',
        options: ['O(N)', 'O(N²)', 'O(1)', 'O(log N)'],
        correctIndex: 2,
        explanation: 'Because it only allocates two integer pointer variables regardless of array size, it operates in O(1) Constant Space.'
      }
    ]
  },
  {
    id: 20,
    slug: 'techniques-for-code-optimization',
    number: 20,
    title: 'Techniques for Code Optimization',
    subtitle: 'The 4-Step Optimization Framework, BCR, and Two-Pointer Patterns',
    category: 'Graphs & Optimization',
    readTimeMinutes: 18,
    difficulty: 'Advanced',
    visualizerType: 'bigO',
    summary: 'Jay Wengrow\'s systematic 4-step framework for code optimization: determine current Big O, establish Best Conceivable Runtime (BCR), utilize Hash Tables/Fast lookups, and look for patterns.',
    analogy: 'Imagine a detective solving a case. Step 1: inspect the crime scene (Current Big O). Step 2: identify physical limits—you cannot solve it faster than reading the clues (BCR). Step 3: create a lookup cheat sheet (Hash Tables). Step 4: spot the underlying pattern.',
    keyConcepts: [
      {
        heading: 'The 4-Step Optimization Framework',
        body: '1. Determine Current Big O: Count the exact growth rate of your naive brute-force solution.\n2. Determine Best Conceivable Runtime (BCR): What is the absolute theoretical fastest time possible? (e.g. if you must inspect all elements once, BCR is O(N)).\n3. Use Hash Tables / Fast Lookups: Replace inner loops with O(1) dictionary lookups.\n4. Recognize Patterns & Two Pointers: If data is sorted, use two pointers moving toward each other to solve in O(N) without nested loops.'
      },
      {
        heading: 'Two Sum: From O(N²) to O(N)',
        body: 'Brute force checks every pair with nested loops (O(N²)). By storing numbers in a hash map as we iterate, we check if `target - num` exists in O(1) time, yielding O(N) linear time!'
      }
    ],
    pythonCode: {
      title: 'Two Sum: Optimization from O(N²) to O(N) in Python',
      code: `# Naive Brute Force: O(N²) Time, O(1) Space
def two_sum_naive(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return None

# Optimized with Hash Table: O(N) Time, O(N) Space!
def two_sum_optimized(nums, target):
    seen = {}  # value -> index
    for index, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], index]  # Match in O(1) lookup!
        seen[num] = index
    return None

# Test:
print(two_sum_optimized([2, 7, 11, 15], 9))  # [0, 1] (2 + 7 = 9)`,
      explanation: 'The 4-step framework turns a slow O(N²) brute-force solution into a blazing fast O(N) single-pass lookup.'
    },
    goldenRules: [
      'Step 1: Calculate your current Big O.',
      'Step 2: Find the Best Conceivable Runtime (BCR).',
      'Step 3: Hash maps eliminate inner loops by turning searches into O(1).',
      'Step 4: Two-pointer techniques and pattern recognition unlock optimal runtimes.'
    ],
    commonPitfalls: [
      'Premature optimization without measuring baseline Big O.',
      'Trying to optimize beyond the BCR (e.g. trying to find max element in unsorted array faster than O(N)).'
    ],
    feynmanPrompt: {
      question: 'Explain what Best Conceivable Runtime (BCR) means and why it helps you code.',
      rubricPoints: [
        'BCR is the absolute theoretical fastest an algorithm could ever run.',
        'If you must inspect all N items, you can never beat O(N).',
        'It prevents you from wasting time looking for an impossible O(log N) algorithm and tells you when your O(N) solution is optimal.'
      ],
      sampleExplanation: 'BCR is like the speed limit of physics. If a teacher asks you to find the tallest student in a classroom of 30 kids, you physically HAVE to look at all 30 kids at least once—so the BCR is O(N). Knowing this tells you when to stop optimizing: once your code hits O(N), you know you cannot do any better!'
    },
    quiz: [
      {
        id: 'q20-1',
        question: 'If an algorithm must inspect every single element of an array of size N at least once, what is its Best Conceivable Runtime (BCR)?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N²)'],
        correctIndex: 2,
        explanation: 'Because every item must be visited at least once, the algorithm can never run faster than O(N) Linear Time.'
      }
    ]
  }
];
