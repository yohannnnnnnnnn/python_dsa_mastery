export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type CurriculumTier = 'python-basics' | 'python-oop' | 'dsa-foundations' | 'sorting-algorithms' | 'data-structures' | 'recursion-dp' | 'trees-heaps' | 'graphs-optimization';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CurriculumItem {
  id: string;
  order: number;
  tier: CurriculumTier;
  tierName: string;
  title: string;
  subtitle: string;
  source: 'Python Crash Course (Eric Matthes)' | 'Corey Schafer OOP' | 'Jay Wengrow Common-Sense DSA';
  difficulty: Difficulty;
  estimatedMinutes: number;
  visualizerType?: 'binarySearch' | 'sorting' | 'hashTable' | 'stackQueue' | 'recursion' | 'linkedList' | 'bst' | 'heap' | 'trie' | 'graph' | 'spaceTime' | 'bigO';
  summary: string;
  intuitionAnalogy: string;
  keyConcepts: {
    heading: string;
    body: string;
    points?: string[];
  }[];
  pythonCode: {
    title: string;
    code: string;
    explanation: string;
    starterCode?: string;
    expectedOutput?: string;
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

export const CURRICULUM_DATA: CurriculumItem[] = [
  // ==========================================
  // TIER 1: PYTHON CRASH COURSE FOUNDATIONS (Eric Matthes)
  // ==========================================
  {
    id: 'pcc-1',
    order: 1,
    tier: 'python-basics',
    tierName: '1. Python Foundations (Crash Course)',
    title: 'Variables, Strings & Numbers',
    subtitle: 'Dynamic Typing, F-Strings, String Methods & Memory Management',
    source: 'Python Crash Course (Eric Matthes)',
    difficulty: 'Easy',
    estimatedMinutes: 10,
    summary: 'Variables in Python are labels referencing objects in memory. Master strings, title/lower/upper methods, f-strings, whitespace stripping, and integer/float operations.',
    intuitionAnalogy: 'Think of a variable in Python not as a rigid storage box, but as a sticky-note label tied to an object in memory. Moving the label to a new number or text is instant!',
    keyConcepts: [
      {
        heading: 'Variables & Memory Assignment',
        body: 'Variables hold values. In Python, variables are dynamically typed—you do not declare a data type explicitly.'
      },
      {
        heading: 'String Manipulation & F-Strings',
        body: 'Python provides rich built-in string methods: `.title()`, `.upper()`, `.lower()`, `.strip()`, `.rstrip()`, and modern formatted f-strings `f"{first} {last}"`.'
      },
      {
        heading: 'Type Coercion & Integer/Float Precision',
        body: 'Division `/` always yields a float (e.g. `4 / 2 = 2.0`), while floor division `//` discards remainders. Python integers have arbitrary precision (no 32-bit overflow!).'
      }
    ],
    pythonCode: {
      title: 'Python Variables & String Methods',
      code: `# Variable assignment & f-strings
first_name = "ada"
last_name = "lovelace"
full_name = f"{first_name.title()} {last_name.title()}"

# String cleaning
raw_input = "   python_mastery   "
clean_tag = raw_input.strip()

# Numerical operations
age = 23
message = f"Happy {age}rd Birthday to {full_name}!"
print(message)
print(f"Clean tag: [{clean_tag}]")`,
      explanation: 'F-strings allow concise, readable string interpolation with embedded Python expressions.'
    },
    goldenRules: [
      'Use descriptive lowercase variable names separated by underscores (PEP 8 snake_case).',
      'Use f-strings for string interpolation instead of old "+" concatenation.',
      'Remember `.strip()` removes leading and trailing whitespace.'
    ],
    commonPitfalls: [
      'Concatenating strings and numbers with `+` without converting with `str()` or using f-strings (raises TypeError).',
      'Variable name typos raising `NameError`.'
    ],
    feynmanPrompt: {
      question: 'Explain what a variable is in Python without using computer science terminology.',
      rubricPoints: [
        'Use an everyday metaphor like a sticky note or luggage tag.',
        'Explain that the variable is the tag, and the value is the item tagged.',
        'Explain what happens when you reassign the variable.'
      ],
      sampleExplanation: 'A variable is like sticking a name tag on a suitcase. The suitcase is the actual data (like the number 42 or text "Hello"), and the name tag is how you easily point to and find that suitcase later!'
    },
    quiz: [
      {
        id: 'q-pcc1-1',
        question: 'What is the value of `type(7 / 2)` in modern Python 3?',
        options: ['int', 'float', 'decimal', 'number'],
        correctIndex: 1,
        explanation: 'In Python 3, the single slash division `/` always returns a `float` (3.5).'
      },
      {
        id: 'q-pcc1-2',
        question: 'Which method returns a copy of a string with all whitespace removed from both ends?',
        options: ['.trim()', '.rstrip()', '.strip()', '.clean()'],
        correctIndex: 2,
        explanation: 'In Python, `.strip()` removes whitespace from both left and right ends.'
      }
    ]
  },
  {
    id: 'pcc-2',
    order: 2,
    tier: 'python-basics',
    tierName: '1. Python Foundations (Crash Course)',
    title: 'Lists, Slicing & List Comprehensions',
    subtitle: 'Dynamic Arrays, Zero-Indexing, Slices, and Comprehension Syntax',
    source: 'Python Crash Course (Eric Matthes)',
    difficulty: 'Easy',
    estimatedMinutes: 12,
    visualizerType: 'spaceTime',
    summary: 'Lists are ordered, mutable sequences. Master index retrieval (including negative indexing), `append()`, `insert()`, `pop()`, `del`, slicing `[start:stop:step]`, and list comprehensions.',
    intuitionAnalogy: 'A list is like a numbered train of cargo cars. You can hitch a new car to the caboose in 1 step (`.append()`), or inspect any car by its exact number (`train[3]`).',
    keyConcepts: [
      {
        heading: 'Index Positioning & Negative Indexing',
        body: 'Python lists are 0-indexed. `list[0]` is the first item, and `list[-1]` always accesses the last item without needing to know length!'
      },
      {
        heading: 'Slicing Lists [start:stop:step]',
        body: 'Extract subarrays cleanly with slice notation `list[1:4]`. To make a true independent shallow copy, use `list[:]` or `list.copy()`.'
      },
      {
        heading: 'List Comprehensions',
        body: 'Generate transformed lists in a single concise line: `[x**2 for x in range(10) if x % 2 == 0]`.'
      }
    ],
    pythonCode: {
      title: 'Python Slicing & List Comprehensions',
      code: `# Slicing and negative indexing
bicycles = ['trek', 'cannondale', 'redline', 'specialized', 'giant']
first_three = bicycles[:3]    # ['trek', 'cannondale', 'redline']
last_two = bicycles[-2:]       # ['specialized', 'giant']

# Shallow copy using slice
bicycles_copy = bicycles[:]
bicycles_copy.append('bianchi')

# List Comprehensions
squares = [num**2 for num in range(1, 6)] # [1, 4, 9, 16, 25]
even_squares = [n**2 for n in range(1, 11) if n % 2 == 0]

print("Original:", bicycles)
print("Even Squares:", even_squares)`,
      explanation: 'Slicing `[:]` creates an independent copy so modifications do not alter the original list.'
    },
    goldenRules: [
      'Use `list[-1]` to read the last item safely.',
      'Always copy lists with `list[:]` or `.copy()` when you need an independent duplicate.',
      'Use list comprehensions to replace verbose for-loops that build lists.'
    ],
    commonPitfalls: [
      'Writing `copy = original` thinking it copies the list. Both variables point to the exact same list in memory!',
      'Off-by-one errors when setting slice end index (the stop index is non-inclusive).'
    ],
    feynmanPrompt: {
      question: 'Why does writing `list_b = list_a` NOT make an independent copy of a list?',
      rubricPoints: [
        'Explain that variables are references/pointers to memory.',
        'Both names point to the same list object in memory.',
        'Show that modifying list_b also changes list_a.'
      ],
      sampleExplanation: 'If two people have keys to the exact same locker, changing what is inside the locker affects what both people see! `list_b = list_a` gives two names to the same locker. To get a separate locker with duplicate contents, you must explicitly copy it using `list_a[:]`.'
    },
    quiz: [
      {
        id: 'q-pcc2-1',
        question: 'What is the output of `[10, 20, 30, 40, 50][1:4]`?',
        options: ['[10, 20, 30]', '[20, 30, 40]', '[20, 30, 40, 50]', '[10, 20, 30, 40]'],
        correctIndex: 1,
        explanation: 'Slicing `[1:4]` starts at index 1 (20) and stops before index 4 (50), yielding `[20, 30, 40]`.'
      }
    ]
  },
  {
    id: 'pcc-3',
    order: 3,
    tier: 'python-basics',
    tierName: '1. Python Foundations (Crash Course)',
    title: 'Dictionaries & Hash Mappings',
    subtitle: 'Key-Value Pairs, `.get()`, Dictionary Comprehensions, and Nesting',
    source: 'Python Crash Course (Eric Matthes)',
    difficulty: 'Easy',
    estimatedMinutes: 12,
    visualizerType: 'hashTable',
    summary: 'Dictionaries store key-value associations with O(1) average lookup. Master accessing keys, `.get()` default fallbacks, looping with `.items()`, and nested structures.',
    intuitionAnalogy: 'A dictionary is like a real-world dictionary: you don\'t search page-by-page from A to Z; you jump directly to the target word (key) to read its definition (value).',
    keyConcepts: [
      {
        heading: 'Key-Value Architecture',
        body: 'Keys must be immutable (strings, numbers, tuples). Values can be any object (lists, other dictionaries, instances).'
      },
      {
        heading: 'Safe Retrieval with .get()',
        body: '`dict.get(key, default)` returns the default value if the key is missing, preventing fatal `KeyError` crashes.'
      },
      {
        heading: 'Iterating over Dictionaries',
        body: '• `for k, v in my_dict.items():` (both keys and values)\n• `for k in my_dict.keys():` (keys only)\n• `for v in my_dict.values():` (values only)'
      }
    ],
    pythonCode: {
      title: 'Python Dictionary Patterns & Nesting',
      code: `# User database dictionary
user_profile = {
    'username': 'efermi',
    'first': 'enrico',
    'last': 'fermi',
    'roles': ['admin', 'researcher'],
    'stats': {'logins': 42, 'reputation': 1500}
}

# Safe lookup with fallback
theme = user_profile.get('theme', 'dark-mode')

# Dictionary comprehension
word_lengths = {word: len(word) for word in ['python', 'crash', 'course']}

# Iteration
for key, value in user_profile.items():
    print(f"{key} -> {value}")`,
      explanation: 'Using `.get()` prevents KeyError exceptions when accessing optional attributes.'
    },
    goldenRules: [
      'Always use `dict.get(key, default)` when accessing keys that might not exist.',
      'Keys must be immutable types (strings, ints, tuples).',
      'Use dictionary comprehensions for clean key-value transformations.'
    ],
    commonPitfalls: [
      'Accessing `dict[key]` directly without checking existence, triggering `KeyError`.',
      'Using a mutable list as a dictionary key.'
    ],
    feynmanPrompt: {
      question: 'Explain why `dict.get("score", 0)` is safer than `dict["score"]`.',
      rubricPoints: [
        'Explain KeyError when a key is missing.',
        '.get() gracefully returns a fallback default instead of crashing.',
        'Give a practical user experience reason.'
      ],
      sampleExplanation: 'If you ask for someone\'s nickname using `dict["nickname"]` and they don\'t have one, the entire program crashes with an error! Using `.get("nickname", "No nickname")` safely says "No nickname" without breaking the app.'
    },
    quiz: [
      {
        id: 'q-pcc3-1',
        question: 'What does `my_dict.get("score", 100)` return if `"score"` is NOT in `my_dict`?',
        options: ['Raises KeyError', 'None', '100', 'False'],
        correctIndex: 2,
        explanation: '`.get(key, default)` returns the provided default value (100) when the key is absent.'
      }
    ]
  },
  {
    id: 'pcc-4',
    order: 4,
    tier: 'python-basics',
    tierName: '1. Python Foundations (Crash Course)',
    title: 'Functions, *args & **kwargs',
    subtitle: 'Positional, Keyword, Variadic Arguments, and Return Values',
    source: 'Python Crash Course (Eric Matthes)',
    difficulty: 'Medium',
    estimatedMinutes: 14,
    summary: 'Functions encapsulate reusable logic. Master default parameters, arbitrary positional arguments (`*args` tuple packing), arbitrary keyword arguments (`**kwargs` dictionary packing), and clean return values.',
    intuitionAnalogy: 'Think of a function like a kitchen blender with settings. Positional arguments are ingredients added in order; `*args` lets you dump any number of extra berries; `**kwargs` lets you pass labeled custom settings (`sweetness="high", ice=True`).',
    keyConcepts: [
      {
        heading: 'Parameters vs Arguments',
        body: 'Parameters are variables defined in the function signature. Arguments are concrete values passed into the function call.'
      },
      {
        heading: '*args: Arbitrary Positional Arguments',
        body: 'Packs any number of extra positional arguments into a single Tuple.'
      },
      {
        heading: '**kwargs: Arbitrary Keyword Arguments',
        body: 'Packs any number of key-value keyword arguments into a single Dictionary.'
      }
    ],
    pythonCode: {
      title: 'Python Variadic Functions (*args, **kwargs)',
      code: `def build_profile(first, last, **user_info):
    """Build a dictionary containing everything known about a user."""
    profile = {'first_name': first, 'last_name': last}
    for key, value in user_info.items():
        profile[key] = value
    return profile

# Function taking arbitrary numbers
def calculate_total(*prices, discount=0.0):
    subtotal = sum(prices)
    return subtotal * (1 - discount)

user = build_profile('albert', 'einstein', location='princeton', field='physics')
total = calculate_total(19.99, 35.50, 4.99, discount=0.10)
print(user)
print("Total: $" + str(round(total, 2)))`,
      explanation: '`**user_info` packs keyword arguments into a dictionary, providing ultimate API flexibility.'
    },
    goldenRules: [
      'Order of parameters: Standard positional -> `*args` -> Default values -> `**kwargs`.',
      'Never use mutable default arguments (like `def func(lst=[]):`); use `def func(lst=None):` instead.',
      'Write clear docstrings (`"""..."""`) explaining arguments and return types.'
    ],
    commonPitfalls: [
      'Mutable default argument trap (`def add_item(item, list=[])`), causing state to persist across calls.',
      'Putting positional arguments after keyword arguments in function calls.'
    ],
    feynmanPrompt: {
      question: 'Explain what `*args` and `**kwargs` do in Python using a real-world shopping list example.',
      rubricPoints: [
        '*args packs extra items into a list/tuple without labels.',
        '**kwargs packs labeled details (key=value) into a dictionary.',
        'Explain why this makes functions flexible.'
      ],
      sampleExplanation: '`*args` is like telling your grocery shopper: "Grab these extra items: apples, milk, bread" (a simple list). `**kwargs` is telling them: "Also grab these with specific instructions: brand=\'OatMilk\', size=\'Large\'" (a labeled dictionary)!'
    },
    quiz: [
      {
        id: 'q-pcc4-1',
        question: 'In what format does `*args` deliver its collected arguments inside the function body?',
        options: ['List', 'Tuple', 'Dictionary', 'Set'],
        correctIndex: 1,
        explanation: '`*args` packs arbitrary positional arguments into an immutable Tuple.'
      }
    ]
  },
  {
    id: 'pcc-5',
    order: 5,
    tier: 'python-basics',
    tierName: '1. Python Foundations (Crash Course)',
    title: 'Files, Exceptions & Defensive Coding',
    subtitle: 'Context Managers (`with open`), File I/O, and `try-except-else-finally`',
    source: 'Python Crash Course (Eric Matthes)',
    difficulty: 'Medium',
    estimatedMinutes: 14,
    summary: 'Master robust file handling and error recovery. Understand the `with` context manager (preventing memory/file leaks) and the full `try-except-else-finally` lifecycle.',
    intuitionAnalogy: 'Using `with open()` is like an automatic door sensor: it guarantees the door closes behind you the moment you leave the room, even if you trip or drop something on your way out!',
    keyConcepts: [
      {
        heading: 'Context Manager: `with open(...)`',
        body: 'Automatically calls `.close()` on the file object even if an unhandled exception occurs inside the block.'
      },
      {
        heading: 'The Full Try-Except Lifecycle',
        body: '• `try`: Run risky code.\n• `except ErrorType`: Catch and handle specific error.\n• `else`: Runs ONLY if NO exceptions occurred.\n• `finally`: ALWAYS runs (cleanup routines).'
      },
      {
        heading: 'Catching Specific Exceptions',
        body: 'Always catch specific exceptions (`FileNotFoundError`, `ValueError`, `ZeroDivisionError`) instead of bare `except:` to avoid swallowing system interrupts.'
      }
    ],
    pythonCode: {
      title: 'Python File Handling & Try-Except Lifecycle',
      code: `def analyze_file_data(filename):
    try:
        with open(filename, 'r', encoding='utf-8') as file_obj:
            content = file_obj.read()
    except FileNotFoundError:
        print(f"Notice: The file '{filename}' does not exist.")
        return 0
    except PermissionError:
        print(f"Error: Access denied to '{filename}'.")
        return 0
    else:
        # Runs only if reading succeeded!
        word_count = len(content.split())
        print(f"File '{filename}' processed successfully: {word_count} words.")
        return word_count
    finally:
        # Always executes
        print("Analysis cycle complete.")

# Test
analyze_file_data("sample_metrics.txt")`,
      explanation: 'The `else` block separates error handling from happy-path business logic.'
    },
    goldenRules: [
      'Always use `with open(...)` for file operations.',
      'Never use bare `except:` clauses; catch specific exception classes.',
      'Use the `else` block for code that should execute only if the `try` block succeeded.'
    ],
    commonPitfalls: [
      'Forgetting to specify `encoding="utf-8"` when reading text files across different operating systems.',
      'Writing to a file in `"w"` mode by accident, which instantly truncates and erases existing file contents!'
    ],
    feynmanPrompt: {
      question: 'What is the purpose of the `else` block in a `try-except-else` statement?',
      rubricPoints: [
        'Explain that try is for risky code.',
        'Explain that else runs only if try succeeded without any errors.',
        'Contrast it with code inside try (keeps try block minimal).'
      ],
      sampleExplanation: 'Think of `try` as a stunt: "Let me try to jump over this puddle." If you fall, `except` catches you with a towel. `else` is your celebration dance: it happens ONLY if you made the jump cleanly without falling!'
    },
    quiz: [
      {
        id: 'q-pcc5-1',
        question: 'When does the `else` block in a `try-except-else` construct execute?',
        options: [
          'Whenever an exception is caught',
          'Always, before the finally block',
          'Only when the try block executes with NO exceptions',
          'Only if the exception was not handled'
        ],
        correctIndex: 2,
        explanation: 'The `else` block executes exclusively when the `try` block completes successfully without raising any exceptions.'
      }
    ]
  },

  // ==========================================
  // TIER 2: COREY SCHAFER OOP MASTERCLASS
  // ==========================================
  {
    id: 'oop-1',
    order: 6,
    tier: 'python-oop',
    tierName: '2. Object-Oriented Programming (Corey Schafer)',
    title: 'Classes, Instances & Class Variables',
    subtitle: 'Instance Attributes, `self`, Class Variables vs `self.__dict__` Namespace',
    source: 'Corey Schafer OOP',
    difficulty: 'Medium',
    estimatedMinutes: 15,
    summary: 'Understand the difference between Instance Variables (unique to each instance) and Class Variables (shared among all instances). Master how Python searches `self.__dict__` before falling back to `Class.__dict__`.',
    intuitionAnalogy: 'A Class is the architectural blueprint for a house. An Instance is the actual physical house built from that blueprint. A Class Variable is like the neighborhood HOA rule (shared by all houses); an Instance Variable is the paint color inside your living room.',
    keyConcepts: [
      {
        heading: 'The Role of `self`',
        body: '`self` is the explicit reference to the current instance calling the method. When you write `emp_1.fullname()`, Python automatically translates it into `Employee.fullname(emp_1)` behind the scenes!'
      },
      {
        heading: 'Class Variables vs Instance Variables',
        body: 'Class variables are defined at the class level and shared across all instances (e.g. `raise_amount = 1.04` or `num_of_employees`).'
      },
      {
        heading: 'Namespace Resolution Order',
        body: 'When accessing `instance.attribute`, Python first checks `instance.__dict__`. If not found, it checks `Class.__dict__`, then parent classes.'
      }
    ],
    pythonCode: {
      title: 'Class Variables & Instance Namespaces (Corey Schafer)',
      code: `class Employee:
    # Class Variables
    num_of_emps = 0
    raise_amount = 1.04  # 4% standard raise

    def __init__(self, first, last, pay):
        self.first = first
        self.last = last
        self.pay = pay
        self.email = f"{first.lower()}.{last.lower()}@company.com"
        Employee.num_of_emps += 1

    def fullname(self):
        return f"{self.first} {self.last}"

    def apply_raise(self):
        # Uses self.raise_amount so individual instances can override it!
        self.pay = int(self.pay * self.raise_amount)

# Instances
emp_1 = Employee('Corey', 'Schafer', 50000)
emp_2 = Employee('Jane', 'Doe', 60000)

# Overriding raise_amount for emp_1 only!
emp_1.raise_amount = 1.06
emp_1.apply_raise()  # Receives 6% raise
emp_2.apply_raise()  # Receives standard 4% raise

print(f"{emp_1.fullname()} Pay: $" + str(emp_1.pay))
print(f"{emp_2.fullname()} Pay: $" + str(emp_2.pay))
print(f"Total Employees: {Employee.num_of_emps}")`,
      explanation: 'Using `self.raise_amount` inside `apply_raise()` allows individual instances to override the class default.'
    },
    goldenRules: [
      '`self` must always be the first parameter in instance methods.',
      'Use `self.class_var` when you want instances to be able to override it; use `ClassName.class_var` when it is a global constant/counter.',
      'Every instance has its own `__dict__` namespace.'
    ],
    commonPitfalls: [
      'Modifying `Employee.raise_amount` vs `emp_1.raise_amount` without understanding the namespace mutation difference.',
      'Forgetting `self` as the first argument in method definitions.'
    ],
    feynmanPrompt: {
      question: 'What is `self` in Python and why do we have to pass it to every method?',
      rubricPoints: [
        'Explain that `self` refers to the specific instance object calling the method.',
        'Explain that without `self`, the method would not know whose name or salary to read.',
        'Explain that Python passes it automatically behind the scenes.'
      ],
      sampleExplanation: 'When you tell a dog "Sit!", you are talking to THAT specific dog in front of you. In Python, `self` is the dog identifying itself: "I am dog #1, so when you call sit, apply it to ME!"'
    },
    quiz: [
      {
        id: 'q-oop1-1',
        question: 'When you invoke `emp.fullname()`, what does Python convert this call to behind the scenes?',
        options: ['Employee(emp).fullname()', 'Employee.fullname(emp)', 'fullname(self=emp)', 'emp.__call__("fullname")'],
        correctIndex: 1,
        explanation: 'Python automatically converts instance method calls `instance.method()` to `Class.method(instance)`.'
      }
    ]
  },
  {
    id: 'oop-2',
    order: 7,
    tier: 'python-oop',
    tierName: '2. Object-Oriented Programming (Corey Schafer)',
    title: 'Classmethods & Staticmethods',
    subtitle: '`@classmethod` for Alternative Constructors and `@staticmethod` for Utilities',
    source: 'Corey Schafer OOP',
    difficulty: 'Medium',
    estimatedMinutes: 14,
    summary: 'Master method decorators in Python OOP. Use `@classmethod` with `cls` for alternative constructors (parsing strings/JSON) and `@staticmethod` for self-contained utility functions that do not access `self` or `cls`.',
    intuitionAnalogy: 'An instance method needs the specific house (`self`). A class method has the blueprint master key (`cls`). A static method is like a calculator sitting on the desk—it does useful math without needing any house or blueprint data.',
    keyConcepts: [
      {
        heading: 'Regular Methods vs Classmethods vs Staticmethods',
        body: '• Regular instance method: Automatically passes `self` (the instance).\n• `@classmethod`: Automatically passes `cls` (the class object).\n• `@staticmethod`: Passes no automatic arguments (behaves like a regular function attached to a class namespace).'
      },
      {
        heading: 'Alternative Constructors with @classmethod',
        body: 'Commonly named `from_string()`, `from_dict()`, `from_json()`. Parses data and instantiates `cls(...)`.'
      }
    ],
    pythonCode: {
      title: 'Classmethods as Alternative Constructors (Corey Schafer)',
      code: `class Employee:
    raise_amount = 1.04

    def __init__(self, first, last, pay):
        self.first = first
        self.last = last
        self.pay = pay

    @classmethod
    def set_raise_amt(cls, amount):
        """Modifies the class variable for the entire class."""
        cls.raise_amount = amount

    @classmethod
    def from_string(cls, emp_str):
        """Alternative constructor: parses 'John-Doe-70000'."""
        first, last, pay = emp_str.split('-')
        return cls(first, last, int(pay))

    @staticmethod
    def is_workday(day):
        """Static utility method: Monday=0, Sunday=6."""
        return day.weekday() not in (5, 6)

# Using alternative constructor
emp_str_1 = 'John-Doe-70000'
new_emp = Employee.from_string(emp_str_1)
print(f"Created: {new_emp.first} {new_emp.last}, Pay: $" + str(new_emp.pay))`,
      explanation: 'Alternative constructors cleanly encapsulate string parsing logic away from client code.'
    },
    goldenRules: [
      'Use `@classmethod` whenever you need to access or modify the class itself (`cls`), or create alternative constructors.',
      'Use `@staticmethod` when a function has a logical connection to the class, but doesn\'t touch `self` or `cls`.',
      'Name alternative constructors starting with `from_` (e.g. `from_csv`, `from_dict`).'
    ],
    commonPitfalls: [
      'Using a regular instance method for utility logic that never references `self`.',
      'Hardcoding class names inside class methods instead of using `cls(...)` (breaks inheritance!).'
    ],
    feynmanPrompt: {
      question: 'Why do we use `@classmethod` to write alternative constructors instead of putting all parsing logic in `__init__`?',
      rubricPoints: [
        'Keep __init__ clean and focused on direct initialization.',
        'Support different input formats (strings, JSON, dicts) cleanly.',
        'Use `cls(...)` so subclasses inherit the constructor.'
      ],
      sampleExplanation: 'If you want to assemble furniture, the main instruction manual (`__init__`) expects raw parts. But if someone sends you parts packaged in a weird mystery box (`from_string`), the alternative constructor opens that box, pulls out the parts, and passes them to `__init__`!'
    },
    quiz: [
      {
        id: 'q-oop2-1',
        question: 'What is the standard first argument automatically passed to a `@classmethod` in Python?',
        options: ['self', 'cls', 'class', 'instance'],
        correctIndex: 1,
        explanation: 'Python automatically passes the class itself as the first parameter, conventionally named `cls`.'
      }
    ]
  },
  {
    id: 'oop-3',
    order: 8,
    tier: 'python-oop',
    tierName: '2. Object-Oriented Programming (Corey Schafer)',
    title: 'Inheritance & Subclasses',
    subtitle: 'Superclasses, Subclasses, `super().__init__()`, and Polymorphism',
    source: 'Corey Schafer OOP',
    difficulty: 'Medium',
    estimatedMinutes: 15,
    summary: 'Inheritance allows child classes to inherit attributes and methods from parent classes while adding or overriding specialized functionality using `super()`. Master method resolution order and `isinstance()`.',
    intuitionAnalogy: 'Think of biological inheritance: a Developer is a specialized Employee. They inherit everything an Employee has (first name, last name, salary), but have unique specialized traits like programming languages!',
    keyConcepts: [
      {
        heading: 'The `super()` Function',
        body: '`super().__init__(...)` delegates attribute initialization to the parent class, avoiding duplicate boilerplate code.'
      },
      {
        heading: 'Extending vs Overriding Methods',
        body: 'Subclasses can define new methods or override existing parent methods to provide custom specialized behavior.'
      },
      {
        heading: 'Type Introspection: `isinstance()` & `issubclass()`',
        body: '`isinstance(dev, Employee)` returns `True`. `issubclass(Developer, Employee)` returns `True`.'
      }
    ],
    pythonCode: {
      title: 'Inheritance & Developer/Manager Hierarchy (Corey Schafer)',
      code: `class Employee:
    def __init__(self, first, last, pay):
        self.first = first
        self.last = last
        self.pay = pay

    def fullname(self):
        return f"{self.first} {self.last}"

class Developer(Employee):
    def __init__(self, first, last, pay, prog_lang):
        super().__init__(first, last, pay)
        self.prog_lang = prog_lang

class Manager(Employee):
    def __init__(self, first, last, pay, employees=None):
        super().__init__(first, last, pay)
        self.employees = [] if employees is None else employees

    def add_emp(self, emp):
        if emp not in self.employees:
            self.employees.append(emp)

    def print_team(self):
        print(f"Manager {self.fullname()}'s Team:")
        for emp in self.employees:
            print(f"--> {emp.fullname()}")

dev_1 = Developer('Guido', 'van Rossum', 90000, 'Python')
mgr_1 = Manager('Sarah', 'Connor', 120000, [dev_1])
mgr_1.print_team()`,
      explanation: '`super().__init__()` passes initialization to Employee, keeping Developer and Manager DRY and modular.'
    },
    goldenRules: [
      'Always call `super().__init__(...)` to initialize parent state.',
      'Never pass mutable default arguments like `employees=[]`; use `employees=None` and initialize inside `__init__`.',
      'Inheritance should model a strict "IS-A" relationship (a Developer is an Employee).'
    ],
    commonPitfalls: [
      'Rewriting parent attribute initialization manually in the child class instead of calling `super()`.',
      'Creating deep, brittle inheritance hierarchies instead of composition.'
    ],
    feynmanPrompt: {
      question: 'Why is `super().__init__()` better than manually rewriting `self.first = first; self.last = last` in a subclass?',
      rubricPoints: [
        'DRY principle (Don\'t Repeat Yourself).',
        'If parent class logic changes, child class inherits updates automatically.',
        'Prevents bugs and keeps child classes lightweight.'
      ],
      sampleExplanation: 'If your parent built a working car engine, you don\'t rebuild the pistons from scratch when making a race car—you take the parent engine (`super()`) and just bolt on your custom turbocharger!'
    },
    quiz: [
      {
        id: 'q-oop3-1',
        question: 'If `Developer` inherits from `Employee`, what does `isinstance(dev, Employee)` return?',
        options: ['False', 'True', 'TypeError', 'None'],
        correctIndex: 1,
        explanation: 'Because Developer is a subclass of Employee, every instance of Developer is also an instance of Employee (`True`).'
      }
    ]
  },
  {
    id: 'oop-4',
    order: 9,
    tier: 'python-oop',
    tierName: '2. Object-Oriented Programming (Corey Schafer)',
    title: 'Special (Magic / Dunder) Methods',
    subtitle: '`__repr__`, `__str__`, `__add__`, `__len__`, and Operator Overloading',
    source: 'Corey Schafer OOP',
    difficulty: 'Hard',
    estimatedMinutes: 16,
    summary: 'Special dunder (double underscore) methods allow custom classes to hook into Python built-in operations (operator overloading, printing, string representations, arithmetic, and sizing).',
    intuitionAnalogy: 'Dunder methods are Python\'s secret universal handshake. When you call `len(my_object)`, Python secretly calls `my_object.__len__()`. When you print an object, Python calls `my_object.__str__()`!',
    keyConcepts: [
      {
        heading: '`__repr__` vs `__str__`',
        body: '• `__repr__`: Unambiguous string representation for developers/debugging (should ideally look like executable Python code: `Employee("John", "Doe", 50000)`).\n• `__str__`: Readable string representation intended for end-user display.'
      },
      {
        heading: 'Operator Overloading: `__add__`, `__len__`, `__getitem__`',
        body: 'Defining `__add__(self, other)` customizes what happens when two instances are combined with `+` (e.g. adding two salaries or vectors).'
      }
    ],
    pythonCode: {
      title: 'Dunder Methods & Operator Overloading (Corey Schafer)',
      code: `class Employee:
    def __init__(self, first, last, pay):
        self.first = first
        self.last = last
        self.pay = pay

    def __repr__(self):
        """Unambiguous developer representation."""
        return f"Employee('{self.first}', '{self.last}', {self.pay})"

    def __str__(self):
        """User-friendly representation."""
        return f"{self.first} {self.last} - {self.pay}"

    def __add__(self, other):
        """Combine combined salaries of two employees with '+'."""
        if isinstance(other, Employee):
            return self.pay + other.pay
        return NotImplemented

    def __len__(self):
        """Returns length of employee full name."""
        return len(f"{self.first} {self.last}")

emp_1 = Employee('Corey', 'Schafer', 50000)
emp_2 = Employee('Jane', 'Doe', 60000)

print(repr(emp_1))     # Employee('Corey', 'Schafer', 50000)
print(str(emp_1))      # Corey Schafer - 50000
print(emp_1 + emp_2)   # 110000 (Combined pay via __add__!)
print(len(emp_1))      # 13 (Characters in 'Corey Schafer')`,
      explanation: 'Dunder methods let your custom objects behave just like native Python data types.'
    },
    goldenRules: [
      'Always implement `__repr__` first as a fallback for `__str__`.',
      '`__repr__` should be unambiguous and helpful for debugging.',
      'Return `NotImplemented` from arithmetic dunders if the operand type is unsupported.'
    ],
    commonPitfalls: [
      'Confusing `__repr__` with `__str__`. If `__str__` is omitted, Python falls back to `__repr__`. If `__repr__` is omitted, printing falls back to `<Employee object at 0x...>`.'
    ],
    feynmanPrompt: {
      question: 'What is the difference between `__repr__` and `__str__` in Python?',
      rubricPoints: [
        '__repr__ is for developers and debugging (detailed and unambiguous).',
        '__str__ is for end-users (clean and readable).',
        'If __str__ is missing, Python falls back to __repr__.'
      ],
      sampleExplanation: '`__repr__` is the blueprint code a mechanic wants to see when inspecting an engine. `__str__` is the clean dashboard display the driver sees while driving!'
    },
    quiz: [
      {
        id: 'q-oop4-1',
        question: 'Which special dunder method is called when `len(my_instance)` is executed?',
        options: ['__size__', '__count__', '__len__', '__length__'],
        correctIndex: 2,
        explanation: 'Python maps the built-in `len()` function directly to the object\'s `__len__()` dunder method.'
      }
    ]
  },
  {
    id: 'oop-5',
    order: 10,
    tier: 'python-oop',
    tierName: '2. Object-Oriented Programming (Corey Schafer)',
    title: 'Property Decorators: Getters, Setters & Deleters',
    subtitle: '`@property`, `@attr.setter`, `@attr.deleter`, and Encapsulation',
    source: 'Corey Schafer OOP',
    difficulty: 'Hard',
    estimatedMinutes: 15,
    summary: 'Property decorators allow you to define methods that can be accessed like regular attributes, providing elegant getters, validation setters, and cleanup deleters without breaking backward compatibility.',
    intuitionAnalogy: 'Imagine a smart thermometer: you read `thermometer.temperature` as if it were a simple number (getter), but behind the scenes a sensor calculates it live! If you write `thermometer.temperature = 72` (setter), it checks that the value is within a safe range before applying.',
    keyConcepts: [
      {
        heading: '`@property` Getter',
        body: 'Defines a method that can be accessed as an attribute without parentheses: `emp.email` instead of `emp.email()`.'
      },
      {
        heading: '`@attribute.setter`',
        body: 'Enables attribute assignment `emp.fullname = "John Smith"` while parsing and updating underlying `first` and `last` variables with validation!'
      },
      {
        heading: '`@attribute.deleter`',
        body: 'Handles cleanup logic when `del emp.fullname` is called.'
      }
    ],
    pythonCode: {
      title: 'Getters, Setters & Deleters with @property (Corey Schafer)',
      code: `class Employee:
    def __init__(self, first, last):
        self.first = first
        self.last = last

    @property
    def email(self):
        """Getter: dynamically calculated whenever accessed!"""
        return f"{self.first.lower()}.{self.last.lower()}@email.com"

    @property
    def fullname(self):
        return f"{self.first} {self.last}"

    @fullname.setter
    def fullname(self, name):
        """Setter: updates first and last names from a full string!"""
        first, last = name.split(' ')
        self.first = first
        self.last = last

    @fullname.deleter
    def fullname(self):
        print("Delete Name Executed!")
        self.first = None
        self.last = None

emp = Employee('John', 'Smith')
emp.fullname = 'Corey Schafer' # Calls setter!

print(emp.first)    # 'Corey'
print(emp.email)    # 'corey.schafer@email.com' (Auto updated!)
del emp.fullname   # Calls deleter!`,
      explanation: 'Property decorators eliminate getter/setter boilerplate while keeping clean attribute access.'
    },
    goldenRules: [
      'Use `@property` to define getters so attributes can be computed dynamically.',
      'Define `@name.setter` on the same method name to allow attribute assignment.',
      'Properties preserve backward-compatible API interfaces.'
    ],
    commonPitfalls: [
      'Naming the internal storage attribute identical to the property name without an underscore, causing an infinite recursion loop!'
    ],
    feynmanPrompt: {
      question: 'Why is `@property` in Python better than writing `get_email()` and `set_email()` methods like in Java?',
      rubricPoints: [
        'Pythonic syntax: users access `emp.email` naturally without parentheses.',
        'You can start with a simple attribute and add getters/setters later without breaking existing code.',
        'Enables validation behind the scenes.'
      ],
      sampleExplanation: 'In other languages, you have to write `emp.getEmail()`, which is clunky. In Python, you write `emp.email` just like a normal variable, but `@property` secretly lets you run custom calculation and safety checks behind the scenes!'
    },
    quiz: [
      {
        id: 'q-oop5-1',
        question: 'What decorator must be declared before writing `@fullname.setter`?',
        options: ['@classmethod', '@property', '@staticmethod', '@setter'],
        correctIndex: 1,
        explanation: 'You must first define the getter method decorated with `@property` before defining the corresponding `@attribute.setter`.'
      }
    ]
  },

  // ==========================================
  // TIER 3: COMMON-SENSE DSA FOUNDATIONS (Jay Wengrow)
  // ==========================================
  {
    id: 'dsa-1',
    order: 11,
    tier: 'dsa-foundations',
    tierName: '3. DSA Foundations & Big-O (Jay Wengrow)',
    title: 'Why Data Structures Matter',
    subtitle: 'Arrays vs Sets, Memory Grids, and the 4 Core Operations',
    source: 'Jay Wengrow Common-Sense DSA',
    difficulty: 'Easy',
    estimatedMinutes: 12,
    visualizerType: 'binarySearch',
    summary: 'A data structure organizes data in computer memory. Selecting the right structure directly governs operational steps for Read, Search, Insert, and Delete.',
    intuitionAnalogy: 'Computer memory is like a massive grid of numbered post office boxes. Reading by index is opening box #42 directly (1 step). Inserting at index 0 requires pushing every box one slot over (N shifts).',
    keyConcepts: [
      {
        heading: 'The 4 Primary Operations',
        body: '• Read: Access at index (1 step for arrays).\n• Search: Find value in unsorted array (up to N steps).\n• Insert: Prepend takes N+1 steps; Append takes 1 step.\n• Delete: Deleting index 0 takes N-1 shifts.'
      },
      {
        heading: 'Array vs Array-Based Set',
        body: 'An Array allows duplicates (insert at end is 1 step). A Set forbids duplicates: inserting takes N + 1 steps because it must search all N elements first!'
      }
    ],
    pythonCode: {
      title: 'Python Array vs Set Operations',
      code: `groceries = ["apples", "bananas", "cucumbers"]

# 1. Reading by index -> 1 step
item = groceries[0]

# 2. Searching -> up to N steps
is_present = "bananas" in groceries

# 3. Insertion at end -> 1 step
groceries.append("dates")

# 4. Insertion at index 0 -> N shifts + 1 insert = N + 1 steps
groceries.insert(0, "avocados")

# 5. Set: Enforces uniqueness automatically
unique_ids = {101, 102, 103}
unique_ids.add(102) # Remains {101, 102, 103}`,
      explanation: 'Array reading is O(1), but prepending requires shifting all existing elements in memory.'
    },
    goldenRules: [
      'Data structures govern operational step counts and algorithm runtime.',
      'Adding to an Array is 1 step; adding to a Set requires an N-step pre-search.',
      'Beginning insertions in arrays require shifting all N subsequent elements.'
    ],
    commonPitfalls: [
      'Assuming all array insertions take equal time regardless of index.'
    ],
    feynmanPrompt: {
      question: 'Why does inserting at the beginning of an array take longer than appending at the end?',
      rubricPoints: [
        'Explain having to shift all elements one spot over.',
        'Contrast with appending to the empty slot at the end.'
      ],
      sampleExplanation: 'Joining the back of a line takes 1 step. But cutting to the very front forces every single person in line to step back one spot to make room!'
    },
    quiz: [
      {
        id: 'q-dsa1-1',
        question: 'How many operational steps does reading from an array of 500 items take if the index is known?',
        options: ['500 steps', '250 steps', '1 step', 'O(log N) steps'],
        correctIndex: 2,
        explanation: 'Array index reading is always 1 step because memory addresses are calculated directly.'
      }
    ]
  },
  {
    id: 'dsa-2',
    order: 12,
    tier: 'dsa-foundations',
    tierName: '3. DSA Foundations & Big-O (Jay Wengrow)',
    title: 'Why Algorithms Matter (Binary Search)',
    subtitle: 'Ordered Arrays, Divide and Conquer, and O(log N) Search Speed',
    source: 'Jay Wengrow Common-Sense DSA',
    difficulty: 'Easy',
    estimatedMinutes: 14,
    visualizerType: 'binarySearch',
    summary: 'An algorithm is a step-by-step procedure. In an Ordered Array, Binary Search cuts the search space in half with every step, locating elements in O(log N) time.',
    intuitionAnalogy: 'When looking up a word in a 100,000-word physical dictionary, you open the middle, see if your word comes before or after, and eliminate 50,000 words in a single step!',
    keyConcepts: [
      {
        heading: 'Linear Search vs Binary Search',
        body: '• Linear Search: Checks every element from left to right (N steps worst-case).\n• Binary Search: Inspects midpoint, eliminates half the remaining elements each step.'
      },
      {
        heading: 'Logarithmic Step Growth',
        body: '• 100 items -> ~7 steps max\n• 10,000 items -> ~14 steps max\n• 1,000,000 items -> ~20 steps max\n• 1,000,000,000 items -> ~30 steps max!'
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

numbers = [3, 17, 22, 41, 55, 68, 79, 90, 103]
print("Index:", binary_search(numbers, 79)) # 6`,
      explanation: 'Binary search maintains two boundary pointers, halving the search space each pass.'
    },
    goldenRules: [
      'Binary Search ONLY works on sorted arrays.',
      'Doubling the array size adds only ONE extra step to Binary Search.'
    ],
    commonPitfalls: [
      'Attempting binary search on unsorted collections.'
    ],
    feynmanPrompt: {
      question: 'Explain how the 1-to-100 number guessing game demonstrates Binary Search.',
      rubricPoints: [
        'Start at 50, narrow down based on too high / too low.',
        'State maximum guesses needed (7 guesses).'
      ],
      sampleExplanation: 'If you guess 50 and I say "higher", you throw away 1 to 50! Next you guess 75. Halving repeatedly pinpoints any number from 1 to 100 in at most 7 guesses.'
    },
    quiz: [
      {
        id: 'q-dsa2-1',
        question: 'How many maximum steps will Binary Search take for an array of 1,000,000 items?',
        options: ['1,000,000', '500,000', 'About 20 steps', '100 steps'],
        correctIndex: 2,
        explanation: 'Because 2^20 = 1,048,576 > 1,000,000, binary search takes at most 20 steps.'
      }
    ]
  },
  {
    id: 'dsa-3',
    order: 13,
    tier: 'dsa-foundations',
    tierName: '3. DSA Foundations & Big-O (Jay Wengrow)',
    title: 'O Yes! Big-O Notation',
    subtitle: 'Worst-Case Upper Bounds, Constant O(1), Linear O(N), Logarithmic O(log N)',
    source: 'Jay Wengrow Common-Sense DSA',
    difficulty: 'Easy',
    estimatedMinutes: 15,
    visualizerType: 'bigO',
    summary: 'Big O notation measures how the number of operational steps scales relative to input size N, focusing on the worst-case scenario.',
    intuitionAnalogy: 'Ordering 1 pizza for 1 person takes 30 mins; ordering 1 pizza for 4 people still takes 30 mins (O(1)). Hand-making custom pizzas for N guests scales with guests (O(N)).',
    keyConcepts: [
      {
        heading: 'Soul of Big O',
        body: 'Big O ignores clock speed and hardware variations, measuring step growth rate as N expands.'
      },
      {
        heading: 'Core Complexity Hierarchy',
        body: 'O(1) < O(log N) < O(N) < O(N log N) < O(N²) < O(2^N) < O(N!).'
      }
    ],
    pythonCode: {
      title: 'Big-O Growth Rates in Python',
      code: `# O(1) Constant Time
def get_first(items):
    return items[0] if items else None

# O(N) Linear Time
def find_maximum(numbers):
    max_val = numbers[0]
    for num in numbers:
        if num > max_val:
            max_val = num
    return max_val

# O(log N) Logarithmic Time
def halve_until_one(n):
    steps = 0
    while n > 1:
        n //= 2
        steps += 1
    return steps`,
      explanation: 'O(1) has no loops; O(N) loops once; O(log N) repeatedly divides the problem size by 2.'
    },
    goldenRules: [
      'Big O drops constant multipliers (e.g. 2N becomes O(N)).',
      'Big O assumes the worst-case scenario by default.'
    ],
    commonPitfalls: [
      'Thinking O(1) must mean literally 1 operation. 5 constant operations is still O(1)!'
    ],
    feynmanPrompt: {
      question: 'Explain what O(log N) means without using math formulas.',
      rubricPoints: [
        'Concept of cutting the problem in half.',
        'Show how 1,000 items takes only 10 halvings.'
      ],
      sampleExplanation: 'Log N simply means: How many times can you fold a piece of paper in half until you reach 1 square? For 1,000 items, you can only cut it in half 10 times!'
    },
    quiz: [
      {
        id: 'q-dsa3-1',
        question: 'An algorithm takes 50 operations for 10 items, and 50 operations for 1,000,000 items. What is its Big O?',
        options: ['O(50)', 'O(N)', 'O(1)', 'O(log N)'],
        correctIndex: 2,
        explanation: 'Because operations remain constant regardless of N, it is O(1) Constant Time.'
      }
    ]
  },

  // ==========================================
  // TIER 4: SORTING & TWO-POINTERS ARENA
  // ==========================================
  {
    id: 'dsa-4',
    order: 14,
    tier: 'sorting-algorithms',
    tierName: '4. Sorting & Two-Pointers Arena',
    title: 'Bubble Sort & Quadratic Time O(N²)',
    subtitle: 'Adjacent Comparisons, Swapping Passes, and Nested Loops',
    source: 'Jay Wengrow Common-Sense DSA',
    difficulty: 'Easy',
    estimatedMinutes: 14,
    visualizerType: 'sorting',
    summary: 'Bubble Sort repeatedly compares adjacent pairs and swaps them if out of order. With nested passes, it illustrates Quadratic Time O(N²).',
    intuitionAnalogy: 'Like air bubbles rising in champagne, the largest numbers gradually bubble up to the right end of the array with each pass.',
    keyConcepts: [
      {
        heading: 'Bubble Sort Mechanics',
        body: 'Compare indices 0 & 1, swap if left > right. Move along array. Largest item lands at far right on pass 1. Repeat until zero swaps occur.'
      }
    ],
    pythonCode: {
      title: 'Python Bubble Sort with Early Exit',
      code: `def bubble_sort(arr):
    unsorted_until = len(arr) - 1
    is_sorted = False

    while not is_sorted:
        is_sorted = True
        for i in range(unsorted_until):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                is_sorted = False
        unsorted_until -= 1
    return arr

print(bubble_sort([65, 55, 45, 35, 25, 15, 10]))`,
      explanation: 'The `is_sorted` flag provides an early-exit optimization on already sorted data.'
    },
    goldenRules: [
      'Bubble Sort compares adjacent pairs and swaps them.',
      'Nested loops comparing elements to other elements usually denote O(N²) Quadratic complexity.'
    ],
    commonPitfalls: [
      'Comparing already sorted items at the end of the array.'
    ],
    feynmanPrompt: {
      question: 'How does Bubble Sort arrange 5 playing cards?',
      rubricPoints: [
        'Compare adjacent cards, swap if left is bigger.',
        'Biggest card reaches rightmost position after 1 pass.'
      ],
      sampleExplanation: 'Look at the first two cards. If left is bigger, swap. Move one card over and repeat. By the end of your first walk, the biggest card has bubbled all the way to the right!'
    },
    quiz: [
      {
        id: 'q-dsa4-1',
        question: 'If array size increases 10x from 10 to 100, how much longer does O(N²) Bubble Sort take at worst?',
        options: ['10x', '20x', '100x', '1000x'],
        correctIndex: 2,
        explanation: 'Because complexity is O(N²), 10² = 100x increase in operations.'
      }
    ]
  },
  {
    id: 'dsa-5',
    order: 15,
    tier: 'sorting-algorithms',
    tierName: '4. Sorting & Two-Pointers Arena',
    title: 'Selection Sort & Why Constants Matter',
    subtitle: 'N²/2 Comparisons, Max N Swaps, and Real-World Constants',
    source: 'Jay Wengrow Common-Sense DSA',
    difficulty: 'Easy',
    estimatedMinutes: 14,
    visualizerType: 'sorting',
    summary: 'Selection Sort finds the minimum value in each pass and places it at the front with at most 1 swap per pass, making it roughly twice as fast as Bubble Sort in practice.',
    intuitionAnalogy: 'Bubble sort shuffles people constantly. Selection sort scans the crowd with its eyes, spots the shortest person, and moves them to the front with just 1 physical move.',
    keyConcepts: [
      {
        heading: 'Selection Sort vs Bubble Sort',
        body: 'Both perform ~N²/2 comparisons. But Bubble Sort can do N²/2 memory swaps, while Selection Sort does at most N swaps!'
      }
    ],
    pythonCode: {
      title: 'Python Selection Sort',
      code: `def selection_sort(arr):
    for i in range(len(arr) - 1):
        min_idx = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

print(selection_sort([4, 2, 7, 1, 3]))`,
      explanation: 'Only one swap occurs per outer loop pass.'
    },
    goldenRules: [
      'Selection Sort performs at most N swaps.',
      'Big O ignores constant multipliers, but constants matter in real engineering.'
    ],
    commonPitfalls: [
      'Assuming all O(N²) algorithms execute in identical wall-clock time.'
    ],
    feynmanPrompt: {
      question: 'Why is Selection Sort faster than Bubble Sort if both are O(N²)?',
      rubricPoints: [
        'Both do the same number of comparisons (looking).',
        'Selection sort only moves/swaps an item once per round.'
      ],
      sampleExplanation: 'Looking with your eyes is cheap, but physically moving furniture is tiring! Selection sort looks at all the items, but moves only one item per round.'
    },
    quiz: [
      {
        id: 'q-dsa5-1',
        question: 'What is the maximum number of swaps Selection Sort performs on an array of 50 items?',
        options: ['2500', '1225', '49', '1'],
        correctIndex: 2,
        explanation: 'Selection sort performs at most 1 swap per pass (N-1 = 49 swaps max).'
      }
    ]
  },
  {
    id: 'dsa-6',
    order: 16,
    tier: 'sorting-algorithms',
    tierName: '4. Sorting & Two-Pointers Arena',
    title: 'Insertion Sort & Best-Case O(N)',
    subtitle: 'Shifting Subarrays, Early Exits, and Streaming Data Sorting',
    source: 'Jay Wengrow Common-Sense DSA',
    difficulty: 'Easy',
    estimatedMinutes: 14,
    visualizerType: 'sorting',
    summary: 'Insertion Sort extracts a temp value, shifts larger items right, and drops the value into place. It runs in O(N) linear time on already-sorted or nearly-sorted data.',
    intuitionAnalogy: 'How you sort playing cards dealt to your hand: you pick up each new card, slide larger cards right, and insert the card into its exact sorted spot.',
    keyConcepts: [
      {
        heading: 'Best vs Worst Case',
        body: '• Worst (reverse sorted): O(N²).\n• Best (already sorted): O(N) linear time (inner loop exits after 1 check without shifting!).'
      }
    ],
    pythonCode: {
      title: 'Python Insertion Sort',
      code: `def insertion_sort(arr):
    for index in range(1, len(arr)):
        temp_val = arr[index]
        pos = index - 1
        while pos >= 0 and arr[pos] > temp_val:
            arr[pos + 1] = arr[pos]
            pos -= 1
        arr[pos + 1] = temp_val
    return arr

print(insertion_sort([8, 4, 2, 9, 5, 1]))`,
      explanation: 'Insertion sort pulls out `temp_val`, shifts larger items right, and drops `temp_val` into position.'
    },
    goldenRules: [
      'Insertion Sort is O(N) on mostly sorted data.',
      'Ideal for streaming data where new items arrive one by one.'
    ],
    commonPitfalls: [
      'Off-by-one errors when placing `temp_val` at `pos + 1`.'
    ],
    feynmanPrompt: {
      question: 'Why is Insertion Sort so fast when sorting cards that are already in order?',
      rubricPoints: [
        'Each card is compared only to the card immediately to its left.',
        'Since left card is already smaller, 0 cards shift.',
        'Total checks = N-1 (O(N)).'
      ],
      sampleExplanation: 'If cards in your hand are already in order, every new card you pick up is already larger than the previous one! You check it once, see it belongs at the right end, and don\'t move a single other card.'
    },
    quiz: [
      {
        id: 'q-dsa6-1',
        question: 'What is the time complexity of Insertion Sort on an already sorted array?',
        options: ['O(N²)', 'O(N log N)', 'O(N)', 'O(1)'],
        correctIndex: 2,
        explanation: 'On sorted data, no shifts occur and the inner while loop breaks immediately, resulting in O(N) linear time.'
      }
    ]
  },
  {
    id: 'dsa-13',
    order: 17,
    tier: 'sorting-algorithms',
    tierName: '4. Sorting & Two-Pointers Arena',
    title: 'Quicksort, Partitioning & Quickselect',
    subtitle: 'Pivot Selection, In-Place Partitioning, O(N log N) Average Speed',
    source: 'Jay Wengrow Common-Sense DSA',
    difficulty: 'Medium',
    estimatedMinutes: 16,
    visualizerType: 'sorting',
    summary: 'Quicksort partitions the array around a Pivot, recursively sorting left and right partitions in O(N log N) average runtime. Quickselect finds the k-th smallest item in O(N) time.',
    intuitionAnalogy: 'Sorting test scores: pick 75 as Pivot. Toss scores < 75 to left pile, scores > 75 to right pile. 75 is now permanently sorted! Repeat on both smaller piles.',
    keyConcepts: [
      {
        heading: 'Partitioning Mechanics',
        body: 'Pick pivot (rightmost). Move left pointer rightward and right pointer leftward, swapping out-of-order items until pointers cross. Place pivot in middle.'
      }
    ],
    pythonCode: {
      title: 'Python Quicksort Implementation',
      code: `def quicksort(arr, left=0, right=None):
    if right is None: right = len(arr) - 1
    if right - left <= 0: return
    pivot_idx = partition(arr, left, right)
    quicksort(arr, left, pivot_idx - 1)
    quicksort(arr, pivot_idx + 1, right)
    return arr

def partition(arr, left, right):
    pivot = arr[right]
    i = left
    for j in range(left, right):
        if arr[j] < pivot:
            arr[i], arr[j] = arr[j], arr[i]
            i += 1
    arr[i], arr[right] = arr[right], arr[i]
    return i

print(quicksort([0, 5, 2, 1, 6, 3]))`,
      explanation: 'Quicksort divides and conquers in-place around the pivot index.'
    },
    goldenRules: [
      'Partitioning locks the pivot into its final sorted index.',
      'Quicksort average time is O(N log N).'
    ],
    commonPitfalls: [
      'Worst case O(N²) occurs if the pivot is always the minimum or maximum element on sorted data.'
    ],
    feynmanPrompt: {
      question: 'Why does Quicksort take O(N log N) time on average?',
      rubricPoints: [
        'Each partitioning level examines N items (O(N)).',
        'Halving the array creates log N levels.',
        'N × log N = O(N log N).'
      ],
      sampleExplanation: 'At each level, you look at every item once (N operations). If your pivot splits the array in half, you can only split it log N times before reaching single cards. Doing N operations across log N levels gives O(N log N)!'
    },
    quiz: [
      {
        id: 'q-dsa13-1',
        question: 'What is the average time complexity of Quickselect for finding the k-th smallest item?',
        options: ['O(N²)', 'O(N log N)', 'O(N)', 'O(1)'],
        correctIndex: 2,
        explanation: 'Quickselect discards half the array at each level without recursing both sides, summing N + N/2 + N/4... = O(N) average time.'
      }
    ]
  },

  // ==========================================
  // TIER 5: DATA STRUCTURES & HASH TABLES
  // ==========================================
  {
    id: 'dsa-8',
    order: 18,
    tier: 'data-structures',
    tierName: '5. Linear Structures & Hash Tables',
    title: 'Hash Tables & Separate Chaining',
    subtitle: 'Hash Functions, Collisions, O(1) Lookups, and Array Intersections',
    source: 'Jay Wengrow Common-Sense DSA',
    difficulty: 'Medium',
    estimatedMinutes: 16,
    visualizerType: 'hashTable',
    summary: 'Hash Tables combine flat arrays with hash functions to provide O(1) average lookups. Master separate chaining collision handling and turning O(N²) nested loops into O(N) linear passes.',
    intuitionAnalogy: 'A coat check at a theater: instead of searching through 500 coats (O(N)), the attendant gives you ticket #42. When you return, they go straight to hook #42 in 1 step (O(1))!',
    keyConcepts: [
      {
        heading: 'Collision Resolution',
        body: 'When two keys hash to the same bucket index, Separate Chaining stores both entries in a bucket list/chain.'
      }
    ],
    pythonCode: {
      title: 'Optimizing Array Intersection with Hash Set',
      code: `def has_duplicate_fast(array_a, array_b):
    seen = set()  # O(N) build
    for item in array_a:
        seen.add(item)
    for item in array_b:  # O(M) search
        if item in seen:
            return True
    return False

print(has_duplicate_fast(['apple', 'banana'], ['grape', 'banana'])) # True`,
      explanation: 'Hash set membership checks take O(1) time, collapsing nested loops into O(N + M).'
    },
    goldenRules: [
      'Hash table reads, inserts, and deletes are O(1) average time.',
      'Use Hash Maps to eliminate nested loops.'
    ],
    commonPitfalls: [
      'Ignoring worst-case O(N) degradation with pathological hash collisions.'
    ],
    feynmanPrompt: {
      question: 'What is a Hash Function?',
      rubricPoints: [
        'Converts a string key into an exact array index.',
        'Outputs the same index every time for the same input.'
      ],
      sampleExplanation: 'A hash function is a math recipe: give it the word "apple", and it instantly tells you: "Place this in drawer #42!" Every time you ask for "apple", you check drawer #42 directly.'
    },
    quiz: [
      {
        id: 'q-dsa8-1',
        question: 'What is the average lookup complexity in a Hash Table?',
        options: ['O(N)', 'O(log N)', 'O(1)', 'O(N²)'],
        correctIndex: 2,
        explanation: 'Because the hash function calculates the bucket address directly, average lookup is O(1) Constant Time.'
      }
    ]
  },
  {
    id: 'dsa-9',
    order: 19,
    tier: 'data-structures',
    tierName: '5. Linear Structures & Hash Tables',
    title: 'Stacks, Queues & Syntax Linters',
    subtitle: 'LIFO vs FIFO, Call Stacks, and Balanced Bracket Matching',
    source: 'Jay Wengrow Common-Sense DSA',
    difficulty: 'Medium',
    estimatedMinutes: 14,
    visualizerType: 'stackQueue',
    summary: 'Stacks (LIFO) and Queues (FIFO) enforce strict access disciplines to eliminate bugs. Master Undo/Redo buffers and bracket linters `({[]})`.',
    intuitionAnalogy: 'A Stack is a stack of cafeteria trays (you push/pop from the top). A Queue is a movie ticket line (first person in line gets served first).',
    keyConcepts: [
      {
        heading: 'Stack (LIFO) vs Queue (FIFO)',
        body: '• Stack: Push & Pop top O(1).\n• Queue: Enqueue back, Dequeue front O(1).'
      }
    ],
    pythonCode: {
      title: 'Python Bracket Linter using Stack',
      code: `def is_valid_brackets(syntax):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for char in syntax:
        if char in "({[":
            stack.append(char)
        elif char in ")}]":
            if not stack or stack.pop() != pairs[char]:
                return False
    return len(stack) == 0

print(is_valid_brackets("({[]})")) # True
print(is_valid_brackets("({[}])")) # False`,
      explanation: 'Opening brackets are pushed to stack; closing brackets must match and pop the top element.'
    },
    goldenRules: [
      'Stack = Last-In, First-Out (LIFO).',
      'Queue = First-In, First-Out (FIFO).'
    ],
    commonPitfalls: [
      'Using `list.pop(0)` for Queue operations in Python (O(N) shift cost!). Use `collections.deque` instead.'
    ],
    feynmanPrompt: {
      question: 'Explain the difference between a Stack and a Queue using everyday physical objects.',
      rubricPoints: [
        'Stack: stack of pancakes (eat from top).',
        'Queue: checkout line (first person served first).'
      ],
      sampleExplanation: 'A stack is a stack of pancakes: you eat the top pancake that was put on last (LIFO). A queue is a grocery line: the first customer to arrive gets checked out first (FIFO)!'
    },
    quiz: [
      {
        id: 'q-dsa9-1',
        question: 'Which data structure is ideal for implementing Undo history in a text editor?',
        options: ['Queue', 'Stack', 'Tree', 'Set'],
        correctIndex: 1,
        explanation: 'Undo reverts the most recent action first, which matches LIFO Stack behavior.'
      }
    ]
  },

  // ==========================================
  // TIER 6: RECURSION & DYNAMIC PROGRAMMING
  // ==========================================
  {
    id: 'dsa-10',
    order: 20,
    tier: 'recursion-dp',
    tierName: '6. Recursion & Dynamic Programming',
    title: 'Recursion & The Call Stack',
    subtitle: 'Base Cases, Recursive Cases, Stack Frames, and Stack Overflows',
    source: 'Jay Wengrow Common-Sense DSA',
    difficulty: 'Medium',
    estimatedMinutes: 15,
    visualizerType: 'recursion',
    summary: 'Recursion is when a function calls itself. Every recursive function requires a Base Case to stop and leverages the computer internal Call Stack frames.',
    intuitionAnalogy: 'Russian nesting dolls: you open a doll (recursive step) to find a smaller doll. When you reach the solid baby doll (base case), you stop opening and assemble them back together.',
    keyConcepts: [
      {
        heading: 'The 2 Mandatory Components',
        body: '1. Base Case: Halts recursion.\n2. Recursive Case: Calls itself with a smaller subproblem.'
      }
    ],
    pythonCode: {
      title: 'Factorial & Call Stack Tracing',
      code: `def factorial(n):
    # 1. Base Case
    if n <= 1:
        return 1
    # 2. Recursive Case
    return n * factorial(n - 1)

print("4! =", factorial(4)) # 24`,
      explanation: 'Each recursive call pushes a new frame onto the internal call stack until the base case returns.'
    },
    goldenRules: [
      'Always write and verify your Base Case first.',
      'Ensure recursive arguments move closer to the Base Case.'
    ],
    commonPitfalls: [
      'Missing base cases triggering infinite recursion and `RecursionError` stack overflows.'
    ],
    feynmanPrompt: {
      question: 'What happens to the Call Stack when running factorial(3)?',
      rubricPoints: [
        'Push fact(3) -> fact(2) -> fact(1).',
        'Hit base case at 1.',
        'Unwind: 1 * 2 * 3 = 6.'
      ],
      sampleExplanation: 'factorial(3) pauses and asks factorial(2). That pauses and asks factorial(1). factorial(1) hits the base case and says "1!". Then the stack unwinds: 2×1=2, then 3×2=6!'
    },
    quiz: [
      {
        id: 'q-dsa10-1',
        question: 'What happens if a recursive function does not have a base case?',
        options: ['Executes in O(1)', 'Crashes with RecursionError / Stack Overflow', 'Returns None', 'Loops forever without crashing'],
        correctIndex: 1,
        explanation: 'Without a base case, recursive calls push frames endlessly until stack memory is exhausted.'
      }
    ]
  },
  {
    id: 'dsa-12',
    order: 21,
    tier: 'recursion-dp',
    tierName: '6. Recursion & Dynamic Programming',
    title: 'Dynamic Programming & Memoization',
    subtitle: 'Overlapping Subproblems, Top-Down Caches, and Bottom-Up Tabulation',
    source: 'Jay Wengrow Common-Sense DSA',
    difficulty: 'Hard',
    estimatedMinutes: 16,
    visualizerType: 'recursion',
    summary: 'Dynamic Programming eliminates redundant computations by storing intermediate results via Top-Down Memoization or Bottom-Up Tabulation, collapsing O(2^N) exponential time to O(N) linear time.',
    intuitionAnalogy: 'If I ask you "1+1+1+1+1", you count and say "5". If I add "+ 1", you don\'t re-count from scratch—you remember the 5 and say "6"! That memory is Memoization.',
    keyConcepts: [
      {
        heading: 'Overlapping Subproblems',
        body: 'In naive Fibonacci `fib(N) = fib(N-1) + fib(N-2)`, subproblems are calculated millions of times redundantly (O(2^N)).'
      },
      {
        heading: 'Memoization vs Tabulation',
        body: '• Memoization: Top-down recursion with a dictionary cache.\n• Tabulation: Bottom-up iteration starting from base cases upwards.'
      }
    ],
    pythonCode: {
      title: 'Fibonacci: Naive vs Memoized vs Bottom-Up',
      code: `# Top-Down Memoization: O(N) Time, O(N) Space
def fib_memo(n, memo=None):
    if memo is None: memo = {}
    if n <= 1: return n
    if n not in memo:
        memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]

# Bottom-Up Tabulation: O(N) Time, O(1) Space
def fib_bottom_up(n):
    if n <= 1: return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

print("Fib(50) Memoized:", fib_memo(50)) # 12586269025
print("Fib(50) Tabulated:", fib_bottom_up(50)) # 12586269025`,
      explanation: 'Memoization and Tabulation compute each subproblem once, turning exponential into linear time.'
    },
    goldenRules: [
      'Look for Overlapping Subproblems: identical calls with identical arguments.',
      'Memoization stores results in a dictionary on the way down.',
      'Bottom-Up builds from base cases using loops in O(1) space.'
    ],
    commonPitfalls: [
      'Using a mutable default argument `memo={}` in Python function signatures.'
    ],
    feynmanPrompt: {
      question: 'Why is Fibonacci(40) with memoization instant, while naive Fibonacci(40) takes seconds?',
      rubricPoints: [
        'Naive recalculates the same tree of numbers trillions of times.',
        'Memoization writes each answer down once and reads it in 1 step.',
        'Contrast 2^40 (~1 trillion operations) with 40 operations.'
      ],
      sampleExplanation: 'Without a notebook, you recalculate Fib(5) thousands of times from scratch (over 1 trillion steps!). With a memo notebook, you calculate each number from 1 to 40 once and write it down. 40 steps vs 1 trillion steps!'
    },
    quiz: [
      {
        id: 'q-dsa12-1',
        question: 'What is the time complexity of calculating Fibonacci with Memoization?',
        options: ['O(2^N)', 'O(N²)', 'O(N)', 'O(log N)'],
        correctIndex: 2,
        explanation: 'Each value from 1 to N is computed exactly once, yielding O(N) linear time.'
      }
    ]
  },

  // ==========================================
  // TIER 7: TREES, HEAPS & TRIES
  // ==========================================
  {
    id: 'dsa-14',
    order: 22,
    tier: 'trees-heaps',
    tierName: '7. Trees, Heaps & Tries',
    title: 'Node-Based Linked Lists',
    subtitle: 'Singly Linked Lists, Doubly Linked Lists, and Pointer Chains',
    source: 'Jay Wengrow Common-Sense DSA',
    difficulty: 'Medium',
    estimatedMinutes: 16,
    visualizerType: 'linkedList',
    summary: 'Linked Lists store elements in non-contiguous Nodes connected by Pointers, allowing O(1) insertions and deletions at the head without memory shifting.',
    intuitionAnalogy: 'An Array is a row of houses on a street. A Linked List is a treasure hunt: clue #1 gives the secret address for clue #2, which points to clue #3 anywhere in town.',
    keyConcepts: [
      {
        heading: 'Node Anatomy',
        body: 'Each Node contains: 1. Data payload, 2. Next Pointer.'
      },
      {
        heading: 'Array vs Linked List Prepending',
        body: 'Array insertion at index 0 is O(N) (shifting). Linked list insertion at head is O(1) (pointer reassignment).'
      }
    ],
    pythonCode: {
      title: 'Python Singly Linked List',
      code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def insert_at_front(self, value):
        new_node = Node(value)
        new_node.next = self.head
        self.head = new_node

ll = LinkedList()
ll.insert_at_front("C")
ll.insert_at_front("B")
ll.insert_at_front("A") # Head is now "A" in O(1) steps!`,
      explanation: 'Inserting at head requires zero element shifting in memory.'
    },
    goldenRules: [
      'Insertion/deletion at the head is O(1) in a linked list.',
      'Reading by index is O(N) because you must traverse from head.'
    ],
    commonPitfalls: [
      'Losing node pointers during deletion, orphaning remaining nodes.'
    ],
    feynmanPrompt: {
      question: 'Why is prepending to a Linked List faster than prepending to an Array?',
      rubricPoints: [
        'Array requires shifting every item in memory.',
        'Linked list simply points new node to current head (no shifts).'
      ],
      sampleExplanation: 'In an array, adding someone to the front forces everyone in line to step back one spot. In a linked list, people are holding hands: the newcomer just takes the first person\'s hand without anyone else moving!'
    },
    quiz: [
      {
        id: 'q-dsa14-1',
        question: 'What is the time complexity of reading the 500th item of a Singly Linked List?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N²)'],
        correctIndex: 2,
        explanation: 'You must follow 500 pointers starting from the head, which is O(N) linear time.'
      }
    ]
  },
  {
    id: 'dsa-15',
    order: 23,
    tier: 'trees-heaps',
    tierName: '7. Trees, Heaps & Tries',
    title: 'Binary Search Trees (BST)',
    subtitle: 'BST Invariant, O(log N) Search/Insert/Delete, and Traversals',
    source: 'Jay Wengrow Common-Sense DSA',
    difficulty: 'Medium',
    estimatedMinutes: 18,
    visualizerType: 'bst',
    summary: 'A Binary Search Tree combines the O(log N) search speed of an ordered array with the O(log N) dynamic insertion/deletion speed of a node-based linked structure.',
    intuitionAnalogy: 'A family tree of numbers: the grandparent is Root. Smaller numbers go to the left wing of the house; larger numbers go to the right wing.',
    keyConcepts: [
      {
        heading: 'The BST Invariant',
        body: 'Left Subtree < Root Node < Right Subtree for every single node.'
      },
      {
        heading: 'Tree Traversals',
        body: '• In-Order (Left, Root, Right): Ascending sorted order!\n• Pre-Order (Root, Left, Right): Tree serialization.\n• Post-Order (Left, Right, Root): Tree deletion/cleanup.'
      }
    ],
    pythonCode: {
      title: 'Python Binary Search Tree & In-Order Sort',
      code: `class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

class BST:
    def __init__(self): self.root = None

    def insert(self, val):
        if not self.root: self.root = TreeNode(val)
        else: self._insert(self.root, val)

    def _insert(self, node, val):
        if val < node.val:
            if not node.left: node.left = TreeNode(val)
            else: self._insert(node.left, val)
        elif val > node.val:
            if not node.right: node.right = TreeNode(val)
            else: self._insert(node.right, val)

    def in_order(self, node, res=None):
        if res is None: res = []
        if node:
            self.in_order(node.left, res)
            res.append(node.val)
            self.in_order(node.right, res)
        return res

tree = BST()
for x in [50, 25, 75, 10, 33, 56, 89]: tree.insert(x)
print("In-Order Sorted:", tree.in_order(tree.root))`,
      explanation: 'In-order traversal always outputs values in ascending sorted order.'
    },
    goldenRules: [
      'Left < Node < Right.',
      'In-Order traversal on BST outputs sorted order in O(N) time.',
      'Deleting a node with 2 children requires replacing with In-Order Successor.'
    ],
    commonPitfalls: [
      'Inserting already sorted data (1, 2, 3, 4, 5) into an unbalanced BST degrades search to O(N) linear time like a linked list.'
    ],
    feynmanPrompt: {
      question: 'How do you delete a BST node with two children?',
      rubricPoints: [
        'Cannot leave two orphan branches.',
        'Find In-Order Successor (step right, then all the way left).',
        'Promote successor into vacant spot.'
      ],
      sampleExplanation: 'If you remove a manager with two sub-departments, you promote the next closest person in rank: step into the right wing, walk all the way left to find the smallest number, and promote them!'
    },
    quiz: [
      {
        id: 'q-dsa15-1',
        question: 'Which traversal visits nodes of a BST in ascending sorted order?',
        options: ['Pre-Order', 'In-Order', 'Post-Order', 'Level-Order'],
        correctIndex: 1,
        explanation: 'In-Order traversal (Left -> Root -> Right) always visits values in ascending sorted order.'
      }
    ]
  },
  {
    id: 'dsa-16',
    order: 24,
    tier: 'trees-heaps',
    tierName: '7. Trees, Heaps & Tries',
    title: 'Heaps & Priority Queues',
    subtitle: 'Binary Heaps, Trickle Up / Down, and Flat Array Indexing [2i+1]',
    source: 'Jay Wengrow Common-Sense DSA',
    difficulty: 'Hard',
    estimatedMinutes: 17,
    visualizerType: 'heap',
    summary: 'A Heap is a complete binary tree that maintains the Heap Property, serving as the high-performance backing structure for Priority Queues with O(log N) insert and extract-max.',
    intuitionAnalogy: 'An emergency room triage desk: patients aren\'t seen strictly in arrival order (FIFO). Severe emergencies jump to the front of the line immediately (Priority Queue).',
    keyConcepts: [
      {
        heading: 'Complete Binary Tree Property',
        body: 'Every level is completely filled, with the bottom level filled from left to right with no gaps.'
      },
      {
        heading: 'Flat Array Storage Formula',
        body: '• Left Child of index i = 2i + 1\n• Right Child of index i = 2i + 2\n• Parent of index i = (i - 1) // 2'
      }
    ],
    pythonCode: {
      title: 'Python Max-Heap Implementation',
      code: `class MaxHeap:
    def __init__(self): self.data = []

    def insert(self, value):
        self.data.append(value)
        curr = len(self.data) - 1
        # Trickle Up
        while curr > 0:
            parent = (curr - 1) // 2
            if self.data[curr] > self.data[parent]:
                self.data[curr], self.data[parent] = self.data[parent], self.data[curr]
                curr = parent
            else: break

    def extract_max(self):
        if not self.data: return None
        if len(self.data) == 1: return self.data.pop()
        max_val = self.data[0]
        self.data[0] = self.data.pop() # Move last item to root
        # Trickle down logic...
        return max_val

heap = MaxHeap()
for v in [55, 22, 34, 10, 99, 68]: heap.insert(v)
print("Root Max:", heap.data[0]) # 99`,
      explanation: 'Binary heaps store complete trees directly inside flat arrays without pointers.'
    },
    goldenRules: [
      'Max-Heap Root is always the maximum value in O(1) peek time.',
      'Heap Insertion and Extract-Max are O(log N).',
      'Heaps are stored in arrays using index math (2i+1, 2i+2).'
    ],
    commonPitfalls: [
      'Confusing Heaps with BSTs: In a Max-Heap, left child does NOT need to be smaller than right child; only parent >= children matters.'
    ],
    feynmanPrompt: {
      question: 'How do heaps store trees inside a simple list without using pointers?',
      rubricPoints: [
        'Complete tree has no gaps.',
        'Root at 0, left child at 2i+1, right at 2i+2.',
        'Hop to children using index math.'
      ],
      sampleExplanation: 'Because the tree has no gaps, you list nodes row-by-row! Root is index 0. Children are at 1 and 2. Using simple math (`2×index + 1`), you jump to any child instantly without storing a single pointer arrow!'
    },
    quiz: [
      {
        id: 'q-dsa16-1',
        question: 'In a 0-indexed array representation of a Heap, what is the array index of the Left Child of node at index 4?',
        options: ['8', '9', '10', '7'],
        correctIndex: 1,
        explanation: 'Using formula 2i + 1: 2 × 4 + 1 = 9.'
      }
    ]
  },
  {
    id: 'dsa-17',
    order: 25,
    tier: 'trees-heaps',
    tierName: '7. Trees, Heaps & Tries',
    title: 'Trie (Prefix Trees) & Autocomplete',
    subtitle: 'Prefix Trees, O(K) Word Lookups, and Predictive Search',
    source: 'Jay Wengrow Common-Sense DSA',
    difficulty: 'Hard',
    estimatedMinutes: 16,
    visualizerType: 'trie',
    summary: 'A Trie is a prefix tree data structure optimized for character search, dictionary lookups, and auto-complete features with O(K) lookup speed where K is word length.',
    intuitionAnalogy: 'Dialing an old telephone operator: typing "C-A-T" walks you down hallway C -> A -> T. All words starting with "CAT" (cat, cater, caterpillar) branch out from that exact same room!',
    keyConcepts: [
      {
        heading: 'O(K) Speed Independent of Dictionary Size (N)',
        body: 'Searching a word of length K takes K steps, whether the dictionary has 10 words or 10,000,000 words!'
      }
    ],
    pythonCode: {
      title: 'Python Trie & Autocomplete Engine',
      code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self): self.root = TrieNode()

    def insert(self, word):
        curr = self.root
        for char in word:
            if char not in curr.children:
                curr.children[char] = TrieNode()
            curr = curr.children[char]
        curr.is_end_of_word = True

    def autocomplete(self, prefix):
        curr = self.root
        for char in prefix:
            if char not in curr.children: return []
            curr = curr.children[char]
        words = []
        self._collect(curr, prefix, words)
        return words

    def _collect(self, node, prefix, results):
        if node.is_end_of_word: results.append(prefix)
        for char, child in node.children.items():
            self._collect(child, prefix + char, results)

t = Trie()
for w in ["cat", "cater", "catnip", "camera", "dog"]: t.insert(w)
print(t.autocomplete("cat")) # ['cat', 'cater', 'catnip']`,
      explanation: 'Trie traversal speed depends solely on prefix length (K), not dictionary size (N).'
    },
    goldenRules: [
      'Trie search and insert run in O(K) time where K is word length.',
      'Tries share common prefix branches, powering autocomplete and spell-check.'
    ],
    commonPitfalls: [
      'Forgetting the `is_end_of_word` flag, making it impossible to distinguish complete words from prefixes.'
    ],
    feynmanPrompt: {
      question: 'Why is searching in a Trie considered O(K) and not O(N)?',
      rubricPoints: [
        'N is total words in dictionary (1,000,000).',
        'K is letters in query ("dog" has K=3).',
        'You take only 3 hops (d -> o -> g) without checking other words.'
      ],
      sampleExplanation: 'If you search for "dog" in a dictionary of 10 million words, you take 1 hop for D, 1 for O, and 1 for G. 3 hops total! The other 9,999,997 words never even get looked at!'
    },
    quiz: [
      {
        id: 'q-dsa17-1',
        question: 'What is the search time complexity in a Trie for a word of length K in a dictionary of N words?',
        options: ['O(N)', 'O(log N)', 'O(K)', 'O(N · K)'],
        correctIndex: 2,
        explanation: 'Searching only takes steps equal to the number of characters in the word (K).'
      }
    ]
  },

  // ==========================================
  // TIER 8: GRAPHS & OPTIMIZATION
  // ==========================================
  {
    id: 'dsa-18',
    order: 26,
    tier: 'graphs-optimization',
    tierName: '8. Graphs & Code Optimization',
    title: 'Connecting Everything with Graphs',
    subtitle: 'Vertices, Edges, Breadth-First Search (BFS), and Depth-First Search (DFS)',
    source: 'Jay Wengrow Common-Sense DSA',
    difficulty: 'Hard',
    estimatedMinutes: 18,
    visualizerType: 'graph',
    summary: 'Graphs represent networks of interconnected data via Vertices and Edges. Master Breadth-First Search (BFS with Queue for Shortest Path) and Depth-First Search (DFS with Stack).',
    intuitionAnalogy: 'LinkedIn connections: you are a vertex, friendships are edges. Finding the shortest chain of introductions to a CEO is Breadth-First Search (BFS)!',
    keyConcepts: [
      {
        heading: 'BFS vs DFS',
        body: '• BFS (Queue FIFO): Radiates in concentric layers, guaranteed to find shortest path on unweighted graphs!\n• DFS (Stack/Recursion LIFO): Plunges deep down one path before backtracking.'
      },
      {
        heading: 'The `visited` Set',
        body: 'Because graphs can have cycles (loops), every traversal must track visited nodes to avoid infinite loops!'
      }
    ],
    pythonCode: {
      title: 'Python BFS & DFS Graph Traversals',
      code: `from collections import deque

class Vertex:
    def __init__(self, val):
        self.val = val
        self.neighbors = []

# BFS Shortest Path using Queue
def bfs(start_vertex, target_val):
    queue = deque([start_vertex])
    visited = {start_vertex.val}
    while queue:
        curr = queue.popleft()
        if curr.val == target_val:
            return curr
        for neighbor in curr.neighbors:
            if neighbor.val not in visited:
                visited.add(neighbor.val)
                queue.append(neighbor)
    return None`,
      explanation: 'BFS uses a FIFO queue to explore neighbors layer-by-layer.'
    },
    goldenRules: [
      'Always maintain a `visited` set to avoid infinite cycles.',
      'BFS uses a Queue and finds the shortest path on unweighted graphs.',
      'DFS uses a Stack/Recursion and dives deep before backtracking.'
    ],
    commonPitfalls: [
      'Omitting visited tracking in cyclic graphs, causing endless loops.'
    ],
    feynmanPrompt: {
      question: 'Why is BFS guaranteed to find the shortest path on a subway map while DFS is not?',
      rubricPoints: [
        'BFS checks all stations 1 stop away, then 2 stops away in ripples.',
        'DFS might ride a train 20 stops in the wrong direction before checking next door.'
      ],
      sampleExplanation: 'BFS radiates outward in ripples like a pebble dropped in water: it checks all stations 1 stop away, then 2 stops away. When it hits your stop, it took the fewest stops possible. DFS might ride a train 20 stops in the wrong direction first!'
    },
    quiz: [
      {
        id: 'q-dsa18-1',
        question: 'Which graph traversal algorithm is guaranteed to find the shortest path on an unweighted graph?',
        options: ['Depth-First Search (DFS)', 'Breadth-First Search (BFS)', 'In-Order Traversal', 'Quicksort'],
        correctIndex: 1,
        explanation: 'BFS searches outward layer-by-layer, guaranteeing the first arrival is via the shortest path.'
      }
    ]
  },
  {
    id: 'dsa-19',
    order: 27,
    tier: 'graphs-optimization',
    tierName: '8. Graphs & Code Optimization',
    title: 'Space Complexity & Auxiliary Memory',
    subtitle: 'Auxiliary Space, In-Place Swaps, and Time vs Space Trade-offs',
    source: 'Jay Wengrow Common-Sense DSA',
    difficulty: 'Medium',
    estimatedMinutes: 14,
    visualizerType: 'spaceTime',
    summary: 'Space complexity measures extra (auxiliary) memory consumed by an algorithm. Great engineering balances CPU time speedups against RAM memory trade-offs.',
    intuitionAnalogy: 'Sorting a closet: In-place swaps clothes inside the existing closet (O(1) space). Out-of-place buys a second closet to copy clothes into (O(N) space).',
    keyConcepts: [
      {
        heading: 'Auxiliary Memory',
        body: 'Measures additional memory allocated above the input data itself.'
      }
    ],
    pythonCode: {
      title: 'In-Place O(1) Space vs Out-of-Place O(N) Space',
      code: `# In-Place: O(1) Auxiliary Space!
def reverse_in_place(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr

nums = [1, 2, 3, 4, 5]
print("Reversed in-place:", reverse_in_place(nums))`,
      explanation: 'Two pointers swap items directly in memory without allocating additional arrays.'
    },
    goldenRules: [
      'In-Place algorithms operate in O(1) extra space.',
      'Trading memory (hash tables) often turns O(N²) time into O(N).'
    ],
    commonPitfalls: [
      'Assuming recursion uses O(1) space (recursive call stack frames consume O(N) memory!).'
    ],
    feynmanPrompt: {
      question: 'What is Auxiliary Space?',
      rubricPoints: [
        'Extra memory allocated by the algorithm.',
        'Does not include the original input data.'
      ],
      sampleExplanation: 'If someone gives you a messy box of toys, Auxiliary Space is the extra table space you need to spread them out while organizing them!'
    },
    quiz: [
      {
        id: 'q-dsa19-1',
        question: 'What is the auxiliary space complexity of an in-place two-pointer array reversal?',
        options: ['O(N)', 'O(N²)', 'O(1)', 'O(log N)'],
        correctIndex: 2,
        explanation: 'It allocates only two pointer variables regardless of array size, which is O(1) Constant Space.'
      }
    ]
  },
  {
    id: 'dsa-20',
    order: 28,
    tier: 'graphs-optimization',
    tierName: '8. Graphs & Code Optimization',
    title: 'The 4-Step Code Optimization Framework',
    subtitle: 'Current Big-O, Best Conceivable Runtime (BCR), and Two-Pointer Patterns',
    source: 'Jay Wengrow Common-Sense DSA',
    difficulty: 'Hard',
    estimatedMinutes: 18,
    visualizerType: 'bigO',
    summary: 'Jay Wengrow systematic 4-step framework: 1. Determine current Big-O, 2. Establish Best Conceivable Runtime (BCR), 3. Use Hash Tables for fast lookups, 4. Spot patterns and two-pointers.',
    intuitionAnalogy: 'A master mechanic: inspect the engine (Current Big-O), know physical speed limits (BCR), replace slow gears with ball-bearings (Hash Tables), and tune the timing belt (Patterns).',
    keyConcepts: [
      {
        heading: 'The 4-Step Framework',
        body: '1. Determine Current Big O\n2. Determine Best Conceivable Runtime (BCR)\n3. Use Hash Tables to eliminate inner loops\n4. Recognize Patterns (Two Pointers on sorted arrays)'
      }
    ],
    pythonCode: {
      title: 'Two Sum: From O(N²) to O(N) with Hash Map',
      code: `# Optimized O(N) Time, O(N) Space via 4-Step Framework
def two_sum_optimal(nums, target):
    seen = {} # val -> index
    for idx, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], idx]
        seen[num] = idx
    return None

print(two_sum_optimal([2, 7, 11, 15], 9)) # [0, 1] (2 + 7 = 9)`,
      explanation: 'The 4-step framework collapses brute-force nested loops into an optimal single-pass O(N) lookup.'
    },
    goldenRules: [
      'Always establish your Best Conceivable Runtime (BCR) first.',
      'Stop optimizing when your solution reaches the BCR.'
    ],
    commonPitfalls: [
      'Premature optimization before establishing algorithmic complexity.'
    ],
    feynmanPrompt: {
      question: 'What is Best Conceivable Runtime (BCR) and why does it guide your coding?',
      rubricPoints: [
        'BCR is the absolute theoretical fastest an algorithm can ever run.',
        'If you must inspect all items, BCR is O(N).',
        'Tells you when your solution is already optimal.'
      ],
      sampleExplanation: 'BCR is like the speed limit of physics: if you have to look at 30 test papers to find the highest score, you physically MUST look at all 30 papers (O(N)). Once your code hits O(N), you know you cannot do any better!'
    },
    quiz: [
      {
        id: 'q-dsa20-1',
        question: 'If an algorithm must inspect every item in an unsorted array of size N at least once, what is its Best Conceivable Runtime (BCR)?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N²)'],
        correctIndex: 2,
        explanation: 'Because every element must be inspected at least once, the algorithm can never run faster than O(N) Linear Time.'
      }
    ]
  }
];
