# PA Cities Challenge - React App

This project is a fun and interactive trivia game built using React, where users can guess the names of cities in Pennsylvania based on hints.

## Features

- A grid of 16 cities from Pennsylvania.
- Users select a square and guess the city name based on a hint.
- Displays feedback on correct and incorrect guesses.
- **Error handling with yellow messages** when users attempt to submit a guess without selecting a square.
- Fireworks and sound effects celebrate when all cities are guessed correctly.
- The game can be restarted at any time.
- **Comprehensive test suite** to ensure all functionalities work as expected.

## How to Play

1. **Select a square** on the grid.
2. Type the name of the city that you believe corresponds to the selected square.
3. Click **"Submit"** to check your guess.
4. A message will appear indicating if your guess was correct or not.
   - If you submit a guess **without selecting a square**, a yellow error message will prompt you to select a square first.
5. Continue until all cities are guessed correctly and enjoy a celebratory moment!

## Installation

To set up the project on your local machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/rodrigosf672/pa-cities-challenge-react-app.git
   cd pa-cities-challenge-react-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm start
   ```

4. Open your browser and go to `http://localhost:3000` to view the app.

## File Structure

```
.
├── public/
│   ├── images/                 # Contains images for cities
│   ├── sounds/                 # Contains sound effects like clapping
│   └── index.html              # The main HTML file
├── src/
│   ├── components/
│   │   └── GameGrid.tsx        # The main game component
│   ├── App.tsx                 # The main App component
│   ├── App.test.tsx            # Test suite for the app
│   └── index.tsx               # The entry point of the application
├── package.json                # Project dependencies and scripts
└── README.md                   # Project documentation
```

## Technologies Used

- React: JavaScript library for building user interfaces.
- TypeScript: Typed superset of JavaScript that compiles to plain JavaScript.
- Jest: Testing framework for JavaScript.
- React Testing Library: Testing utilities for React components.
- CSS: For basic styling.
- HTML: For the main structure.