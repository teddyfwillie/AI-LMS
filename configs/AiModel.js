const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const courseOutlineAIModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a study material for Python for Exam and level of difficulty will be EASY with summery of course, List of Chapters along with summery for each chapter, Topic list in each chapter, All resule in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "course_title": "Python for Beginners: Exam Prep (Easy Level)",\n  "course_summary": "This course provides a gentle introduction to Python programming, focusing on the fundamental concepts needed for a basic understanding and exam preparation. It covers essential topics like data types, control flow, functions, and basic input/output. The goal is to build a solid foundation for further Python learning.",\n  "difficulty_level": "Easy",\n  "chapters": [\n    {\n      "chapter_number": 1,\n      "chapter_title": "Introduction to Python",\n      "chapter_summary": "This chapter introduces Python\'s history, features, and how to install and set up a Python environment.  It also covers the basics of writing and executing simple Python programs.",\n      "topics": [\n        "What is Python?",\n        "History and Features of Python",\n        "Installing Python (Windows, macOS, Linux)",\n        "Setting up a Development Environment (e.g., IDLE, VS Code)",\n        "Writing and Running Your First Python Program (\'Hello, World!\')",\n        "Python\'s interactive shell",\n        "Comments in Python"\n      ]\n    },\n    {\n      "chapter_number": 2,\n      "chapter_title": "Data Types and Variables",\n      "chapter_summary": "This chapter explains fundamental data types in Python, such as integers, floats, strings, and booleans. It also covers how to declare and use variables to store data.",\n      "topics": [\n        "Data Types: Integers (int), Floating-Point Numbers (float), Strings (str), Booleans (bool)",\n        "Variables: Declaration, Assignment, Naming Conventions",\n        "Type Conversion (e.g., int() to float(), str() to int())",\n        "Operators: Arithmetic (+, -, *, /, //, %), Comparison (==, !=, >, <, >=, <=), Logical (and, or, not)",\n        "String Operations: Concatenation, Slicing, Indexing"\n      ]\n    },\n    {\n      "chapter_number": 3,\n      "chapter_title": "Control Flow: Conditional Statements",\n      "chapter_summary": "This chapter covers the use of conditional statements (if, elif, else) to control the flow of execution based on certain conditions.",\n      "topics": [\n        "Conditional Statements: if, elif, else",\n        "Boolean Expressions",\n        "Nested if Statements",\n        "Comparison Operators in Conditional Statements",\n        "Truthiness and Falsiness"\n      ]\n    },\n    {\n      "chapter_number": 4,\n      "chapter_title": "Control Flow: Loops",\n      "chapter_summary": "This chapter explains the use of loops (for and while) to repeat a block of code multiple times.",\n      "topics": [\n        "for Loops: Iterating over sequences (strings, lists)",\n        "while Loops: Repeating a block of code until a condition is met",\n        "Loop Control Statements: break, continue",\n        "Range Function (range())"\n      ]\n    },\n    {\n      "chapter_number": 5,\n      "chapter_title": "Functions",\n      "chapter_summary": "This chapter introduces the concept of functions, how to define them, and how to call them. It also covers function parameters and return values.",\n      "topics": [\n        "Defining Functions: def keyword",\n        "Calling Functions",\n        "Function Parameters: Positional arguments",\n        "Return Values",\n        "Docstrings (Function Documentation)"\n      ]\n    },\n    {\n      "chapter_number": 6,\n      "chapter_title": "Basic Input and Output",\n      "chapter_summary": "This chapter covers how to take input from the user using the input() function and display output using the print() function.",\n      "topics": [\n        "Input Function: input()",\n        "Output Function: print()",\n        "String Formatting (f-strings)",\n        "Reading data from a user"\n      ]\n    }\n  ]\n}\n```',
        },
      ],
    },
  ],
});

export const generateNotesAiModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Generate exam material detail content for each chapter. Make sure to include all topic points in the content, and provide the content in HTML format (Do not add HTML, Head, Body, or Title tags). The chapters:\n\n{\n  "chapter_number": 1,\n  "chapter_title": "Object-Oriented Programming (OOP) Fundamentals",\n  "chapter_summary": "This chapter introduces the core concepts of OOP: classes, objects, inheritance, polymorphism, and encapsulation. Students will learn how to model real-world entities using classes and objects and understand the advantages of OOP.",\n  "topics": [\n    {\n      "topic": "Classes and Objects",\n      "details": "Defining classes, creating objects (instances), attributes, methods, constructors (__init__)"\n    },\n    {\n      "topic": "Encapsulation",\n      "details": "Data hiding, access modifiers (private, protected, public - language specific), getters and setters"\n    },\n    {\n      "topic": "Inheritance",\n      "details": "Single inheritance, multiple inheritance (language specific considerations), method overriding, the \'super()\' function"\n    },\n    {\n      "topic": "Polymorphism",\n      "details": "Method overloading (language specific), method overriding, duck typing (in dynamically typed languages like Python)"\n    },\n    {\n      "topic": "Abstract Classes and Interfaces",\n      "details": "Defining abstract classes and abstract methods, interfaces (if the language supports them), using abstract classes to enforce a common interface"\n    }\n  ]\n}',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```html\n<div class="chapter-content">\n  <h2>Chapter 1: Object-Oriented Programming (OOP) Fundamentals</h2>\n  <p class="chapter-summary">This chapter introduces the core concepts of OOP: classes, objects, inheritance, polymorphism, and encapsulation. Students will learn how to model real-world entities using classes and objects and understand the advantages of OOP.</p>\n\n  <section class="topic">\n    <h3>1.1 Classes and Objects</h3>\n    <div class="key-concepts">\n      <h4>Core Concepts:</h4>\n      <ul>\n        <li><strong>Class Definition:</strong> A blueprint for creating objects (e.g., <code>class Car:</code>).</li>\n        <li><strong>Object Instantiation:</strong> Creating instances using constructors (<code>my_car = Car()</code>).</li>\n        <li><strong>Attributes:</strong> Variables that store object state (<code>self.color = "red"</code>).</li>\n        <li><strong>Methods:</strong> Functions defining object behavior (<code>def accelerate(self): ...</code>).</li>\n        <li><strong>__init__:</strong> Constructor method for initializing object attributes.</li>\n      </ul>\n    </div>\n    <div class="exam-questions">\n      <h4>Exam Focus Areas:</h4>\n      <ul>\n        <li>Explain the difference between a class and an object with an example.</li>\n        <li>Write a Python class with attributes and methods.</li>\n        <li>Describe the purpose of the <code>__init__</code> method.</li>\n        <li>Identify attributes and methods in a given class definition.</li>\n      </ul>\n    </div>\n  </section>\n\n  <section class="topic">\n    <h3>1.2 Encapsulation</h3>\n    <div class="key-concepts">\n      <h4>Core Concepts:</h4>\n      <ul>\n        <li><strong>Data Hiding:</strong> Restricting direct access to object attributes.</li>\n        <li><strong>Access Modifiers:</strong> Private, protected, and public access levels (language-specific).</li>\n        <li><strong>Getters and Setters:</strong> Methods to control access to attributes.</li>\n      </ul>\n    </div>\n    <div class="exam-questions">\n      <h4>Exam Focus Areas:</h4>\n      <ul>\n        <li>Define encapsulation and its importance in OOP.</li>\n        <li>Explain the purpose of access modifiers.</li>\n        <li>Write a class with private attributes and getter/setter methods.</li>\n        <li>Identify encapsulation violations in a code snippet.</li>\n      </ul>\n    </div>\n  </section>\n\n  <section class="topic">\n    <h3>1.3 Inheritance</h3>\n    <div class="key-concepts">\n      <h4>Core Concepts:</h4>\n      <ul>\n        <li><strong>Single Inheritance:</strong> A class inheriting from one parent class.</li>\n        <li><strong>Multiple Inheritance:</strong> A class inheriting from multiple parent classes (language-specific).</li>\n        <li><strong>Method Overriding:</strong> Redefining a method in a child class.</li>\n        <li><strong>super():</strong> Accessing parent class methods and attributes.</li>\n      </ul>\n    </div>\n    <div class="exam-questions">\n      <h4>Exam Focus Areas:</h4>\n      <ul>\n        <li>Explain the benefits of inheritance.</li>\n        <li>Compare single and multiple inheritance.</li>\n        <li>Demonstrate method overriding with an example.</li>\n        <li>Use <code>super()</code> in a class hierarchy.</li>\n      </ul>\n    </div>\n  </section>\n\n  <section class="topic">\n    <h3>1.4 Polymorphism</h3>\n    <div class="key-concepts">\n      <h4>Core Concepts:</h4>\n      <ul>\n        <li><strong>Method Overloading:</strong> Multiple methods with the same name but different parameters (language-specific).</li>\n        <li><strong>Method Overriding:</strong> Redefining a method in a child class.</li>\n        <li><strong>Duck Typing:</strong> Object suitability based on behavior (e.g., Python).</li>\n      </ul>\n    </div>\n    <div class="exam-questions">\n      <h4>Exam Focus Areas:</h4>\n      <ul>\n        <li>Define polymorphism and its benefits.</li>\n        <li>Compare method overloading and overriding.</li>\n        <li>Explain duck typing with an example.</li>\n        <li>Predict the output of a polymorphic code snippet.</li>\n      </ul>\n    </div>\n  </section>\n\n  <section class="topic">\n    <h3>1.5 Abstract Classes and Interfaces</h3>\n    <div class="key-concepts">\n      <h4>Core Concepts:</h4>\n      <ul>\n        <li><strong>Abstract Classes:</strong> Classes that cannot be instantiated.</li>\n        <li><strong>Abstract Methods:</strong> Methods without implementation in the parent class.</li>\n        <li><strong>Interfaces:</strong> Completely abstract classes (language-specific).</li>\n      </ul>\n    </div>\n    <div class="exam-questions">\n      <h4>Exam Focus Areas:</h4>\n      <ul>\n        <li>Define abstract classes and methods.</li>\n        <li>Explain the purpose of interfaces.</li>\n        <li>Design an abstract class with concrete subclasses.</li>\n        <li>Compare abstract classes and interfaces.</li>\n      </ul>\n    </div>\n  </section>\n</div>\n```',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());

export const GenerateStudyTypeContentAiModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate the flashcard on topic : Flutter Fundamentals,User Interface (UI) Development,Basic App Navigation in JSON format with front back content, Maximum 15",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "front": "What is a Widget in Flutter?",\n    "back": "The fundamental building block of a Flutter UI. Everything is a widget, from simple buttons to complex layouts."\n  },\n  {\n    "front": "Name three commonly used Layout Widgets in Flutter.",\n    "back": "Column, Row, Container, Stack, ListView, GridView"\n  },\n  {\n    "front": "What is the purpose of the `setState()` method?",\n    "back": "It informs Flutter that the internal state of a State object has changed, triggering a UI rebuild."\n  },\n  {\n    "front": "What is the difference between `StatelessWidget` and `StatefulWidget`?",\n    "back": "`StatelessWidget` is immutable and describes a part of the user interface which doesn\'t change dynamically. `StatefulWidget` maintains state that can change during the lifetime of the widget."\n  },\n  {\n    "front": "How do you add padding around a Widget?",\n    "back": "Wrap the Widget with a `Padding` Widget and specify the desired padding using `EdgeInsets`."\n  },\n  {\n    "front": "What is the purpose of the `MaterialApp` Widget?",\n    "back": "It provides the basic structure for a Material Design app, including theming, navigation, and title."\n  },\n  {\n    "front": "How do you navigate to a new screen in Flutter?",\n    "back": "Using the `Navigator` widget and its methods like `Navigator.push()` or `Navigator.pushNamed()`."\n  },\n  {\n    "front": "What is a `Route` in Flutter?",\n    "back": "An abstraction for a screen or a page in a Flutter application."\n  },\n  {\n    "front": "Explain what `pushReplacementNamed()` does?",\n    "back": "It replaces the current route in the navigator stack with a new route, preventing the user from going back to the previous screen using the back button."\n  },\n  {\n    "front": "What is the purpose of the `Scaffold` Widget?",\n    "back": "It provides the basic visual structure for a screen in a Material Design app, including AppBar, Body, Drawer, etc."\n  },\n  {\n    "front": "How do you pass data to a new route when navigating?",\n    "back": "You can pass data as arguments to the `Navigator.push()` or `Navigator.pushNamed()` methods, often bundled in a class or map."\n  },\n   {\n    "front": "What is the use of `BuildContext`?",\n    "back": "A handle to the location of a widget in the widget tree. It provides access to the theme, media queries, and other inherited widgets."\n  },\n  {\n    "front": "How do you define a named route in Flutter?",\n    "back": "In the `MaterialApp` widget, use the `routes` property, which is a map of route names (Strings) to `WidgetBuilder` functions."\n  },\n  {\n    "front": "What is the purpose of the `Expanded` widget?",\n    "back": "It forces a child widget to fill the available space within a `Row` or `Column`."\n  },\n  {\n    "front": "Explain the concept of hot reload and hot restart in Flutter.",\n    "back": "Hot reload injects updated source code files into the running Dart VM. Hot restart fully restarts the application, resetting the app state."\n  }\n]\n```',
        },
      ],
    },
  ],
});

export const GenerateQuizAiModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Quiz on topic : Intermediate Chemistry with Question and Options along with correct answer in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "quizTitle": "Intermediate Chemistry Quiz",\n  "quizDescription": "Test your knowledge of intermediate chemistry concepts.",\n  "questions": [\n    {\n      "questionText": "Which of the following factors primarily affects the rate of a chemical reaction?",\n      "options": [\n        "Volume of the reaction vessel",\n        "Color of the reactants",\n        "Temperature of the reaction mixture",\n        "Density of the solvent"\n      ],\n      "correctAnswer": "Temperature of the reaction mixture",\n      "explanation": "Temperature directly affects the kinetic energy of molecules, leading to more frequent and energetic collisions, thus affecting reaction rate. According to the Arrhenius equation, the rate constant (and hence reaction rate) increases exponentially with temperature."\n    },\n    {\n      "questionText": "What is the pH of a solution with a hydroxide ion concentration [OH-] of 1.0 x 10^-3 M?",\n      "options": [\n        "3",\n        "11",\n        "7",\n        "1"\n      ],\n      "correctAnswer": "11",\n      "explanation": "First, calculate the pOH: pOH = -log[OH-] = -log(1.0 x 10^-3) = 3. Then, use the relationship pH + pOH = 14 to find the pH: pH = 14 - 3 = 11."\n    },\n    {\n      "questionText": "Which of the following is a characteristic of an ideal gas?",\n      "options": [\n        "Significant intermolecular forces",\n        "Elastic collisions between gas particles",\n        "Gas particles occupy a significant volume",\n        "Gas particles condense at low temperatures"\n      ],\n      "correctAnswer": "Elastic collisions between gas particles",\n      "explanation": "Ideal gases are characterized by negligible intermolecular forces and the absence of volume for the particles themselves.  Collisions are perfectly elastic, meaning no kinetic energy is lost during collisions."\n    },\n    {\n      "questionText": "What is the primary difference between a sigma (σ) and a pi (π) bond in covalent bonding?",\n      "options": [\n        "Sigma bonds are weaker than pi bonds.",\n        "Sigma bonds are formed by end-to-end overlap of orbitals, while pi bonds are formed by side-to-side overlap.",\n        "Sigma bonds only occur in single bonds, while pi bonds only occur in double or triple bonds.",\n        "Sigma bonds are more reactive than pi bonds."\n      ],\n      "correctAnswer": "Sigma bonds are formed by end-to-end overlap of orbitals, while pi bonds are formed by side-to-side overlap.",\n      "explanation": "Sigma bonds have electron density concentrated along the internuclear axis, formed by direct overlap. Pi bonds have electron density above and below the internuclear axis, formed by sideways overlap."\n    },\n    {\n      "questionText": "Which of the following functional groups is present in carboxylic acids?",\n      "options": [\n        "-OH",\n        "-CHO",\n        "-COOH",\n        "-NH2"\n      ],\n      "correctAnswer": "-COOH",\n      "explanation": "Carboxylic acids are characterized by the presence of the carboxyl group, -COOH."\n    },\n    {\n      "questionText": "What type of intermolecular force is primarily responsible for the high boiling point of water?",\n      "options": [\n        "London dispersion forces",\n        "Dipole-dipole interactions",\n        "Hydrogen bonding",\n        "Ion-dipole interactions"\n      ],\n      "correctAnswer": "Hydrogen bonding",\n      "explanation": "Hydrogen bonding is a strong dipole-dipole interaction that occurs when hydrogen is bonded to highly electronegative atoms like oxygen, nitrogen, or fluorine. This strong attraction between water molecules requires a significant amount of energy to overcome, resulting in a high boiling point."\n    },\n    {\n      "questionText": "Which of the following is NOT a colligative property?",\n      "options": [\n        "Boiling point elevation",\n        "Freezing point depression",\n        "Osmotic pressure",\n        "Molar mass"\n      ],\n      "correctAnswer": "Molar mass",\n      "explanation": "Colligative properties depend on the number of solute particles in a solution, not the nature of the solute. Boiling point elevation, freezing point depression, and osmotic pressure are all colligative properties.  Molar mass is an intrinsic property of the solute itself."\n    },\n    {\n      "questionText": "What is the oxidation number of sulfur in the sulfate ion (SO4^2-)?",\n      "options": [\n        "+2",\n        "+4",\n        "+6",\n        "-2"\n      ],\n      "correctAnswer": "+6",\n      "explanation": "The oxidation number of oxygen is usually -2.  Since there are four oxygen atoms, their total contribution is -8.  The overall charge of the sulfate ion is -2.  Therefore, the oxidation number of sulfur (S) must be +6 to satisfy the equation: S + 4(O) = -2, so S + (-8) = -2, and S = +6."\n    },\n    {\n      "questionText": "Which of the following statements best describes Le Chatelier\'s principle?",\n      "options": [\n        "A system at equilibrium will remain unchanged regardless of external conditions.",\n        "A system at equilibrium will shift to relieve stress applied to it.",\n        "The rate of a reaction is directly proportional to the concentration of reactants.",\n        "The equilibrium constant is always constant regardless of temperature changes."\n      ],\n      "correctAnswer": "A system at equilibrium will shift to relieve stress applied to it.",\n      "explanation": "Le Chatelier\'s principle states that if a change of condition (stress) is applied to a system in equilibrium, the system will shift in a direction that relieves the stress. The stress can be a change in concentration, temperature, pressure, or volume."\n    },\n    {\n      "questionText": "Which of the following metals is most likely to be oxidized?",\n      "options": [\n        "Gold (Au)",\n        "Silver (Ag)",\n        "Copper (Cu)",\n        "Potassium (K)"\n      ],\n      "correctAnswer": "Potassium (K)",\n      "explanation": "The ease of oxidation is related to the standard reduction potential.  Metals with more negative standard reduction potentials are more easily oxidized. Potassium is an alkali metal and is readily oxidized, while gold, silver, and copper are much less reactive and have higher reduction potentials."\n    }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});
