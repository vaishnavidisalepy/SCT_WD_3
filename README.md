# SCT_WD_3
Quiz Game Application
# Interactive Multiple Choice Quiz Game

## Overview
This is a fully interactive quiz game built with HTML, CSS, and JavaScript that supports multiple question types and provides comprehensive scoring and feedback.

## Features

### Question Types
1. **Single Select** - Multiple choice with one correct answer
2. **Multi-Select** - Multiple choice with multiple correct answers
3. **True/False** - Boolean answer questions
4. **Fill in the Blanks** - Text input questions

### Game Features
- ✅ Progress bar showing quiz completion
- ⏱️ Timer tracking quiz duration
- 🎯 Smart scoring system
- 📊 Detailed results display showing correct/incorrect answers
- 🎨 Beautiful responsive design
- ⚡ Fast and smooth navigation between questions
- 📱 Mobile-friendly interface

## How to Run

### Option 1: Direct File Opening
1. Simply open `index.html` in your web browser
2. Click "Start Quiz" to begin

### Option 2: Using Python (Python 3+)
```bash
cd "path/to/Task3"
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser

### Option 3: Using Node.js (with http-server)
```bash
npm install -g http-server
cd "path/to/Task3"
http-server -p 8000
```
Then visit `http://localhost:8000` in your browser

### Option 4: Using VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html` and select "Open with Live Server"

## File Structure

```
Task3/
├── index.html       - Main HTML file with quiz structure
├── style.css        - Complete CSS styling
├── script.js        - Quiz logic and game mechanics
├── quiz-data.js     - Quiz questions and answers
└── README.md        - This file
```

## How to Use

1. **Start Quiz** - Click the "Start Quiz" button on the welcome screen
2. **Answer Questions** - Select your answer(s) using the appropriate method:
   - Single Select: Click the radio button
   - Multi-Select: Click checkboxes (can select multiple)
   - True/False: Click True or False button
   - Fill in Blank: Type your answer
3. **Navigate** - Use Previous/Next buttons to move between questions
4. **Submit** - The "Next" button becomes "Submit" on the last question
5. **View Results** - See your score, performance feedback, and detailed results
6. **Retake** - Click "Retake Quiz" to answer all questions again or "Back to Home" to return to start

## Customizing Questions

To add or modify questions, edit `quiz-data.js`:

```javascript
{
    id: 1,
    type: 'single-select',  // or 'multi-select', 'true-false', 'fill-blank'
    question: 'Your question here?',
    options: ['Option 1', 'Option 2', 'Option 3'],
    correctAnswer: 0  // Index of correct answer
}
```

### For Multi-Select:
```javascript
correctAnswers: [0, 2]  // Array of correct indices
```

### For True/False:
```javascript
correctAnswer: true  // or false
```

### For Fill-in-the-Blank:
```javascript
correctAnswer: 'Pacific'  // String answer (case-insensitive)
```

## Scoring System

- **100%** - Perfect! Outstanding performance! 🎉
- **80-99%** - Excellent! You did great! 🌟
- **60-79%** - Good job! Keep practicing to improve! 📚
- **40-59%** - Nice try! Review and try again! 💪
- **Below 40%** - Keep learning! You'll do better next time! 🚀

## Browser Compatibility

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features in Detail

### Progress Tracking
- Visual progress bar showing quiz completion
- Question counter (e.g., "Question 3 of 10")
- Timer display showing elapsed time

### Answer Validation
- Automatic validation of answers
- Case-insensitive matching for fill-in-the-blank questions
- Support for multiple correct answers

### User Experience
- Smooth animations between screens
- Visual feedback for selected answers
- Disabled navigation when appropriate
- Responsive design for all screen sizes

## Future Enhancement Ideas

- Add question categories
- Implement difficulty levels
- Add timed mode with countdown
- Store results in local storage
- Add keyboard shortcuts (Arrow keys for navigation)
- Add question explanations
- Implement leaderboard
- Add export results feature

---

**Developed with ❤️**
