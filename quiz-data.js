// Quiz Data - Sample questions of different types
const quizQuestions = [
    {
        id: 1,
        type: 'single-select',
        difficulty: 'easy',
        question: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctAnswer: 2
    },
    {
        id: 2,
        type: 'multi-select',
        difficulty: 'medium',
        question: 'Which of the following are programming languages? (Select all that apply)',
        options: ['Python', 'HTML', 'JavaScript', 'CSS', 'Java'],
        correctAnswers: [0, 2, 4]
    },
    {
        id: 3,
        type: 'true-false',
        difficulty: 'easy',
        question: 'The Earth orbits around the Sun.',
        correctAnswer: true
    },
    {
        id: 4,
        type: 'single-select',
        difficulty: 'easy',
        question: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 1
    },
    {
        id: 5,
        type: 'multi-select',
        difficulty: 'medium',
        question: 'Which of these are fruits? (Select all that apply)',
        options: ['Carrot', 'Apple', 'Potato', 'Banana', 'Lettuce', 'Orange'],
        correctAnswers: [1, 3, 5]
    },
    {
        id: 6,
        type: 'fill-blank',
        difficulty: 'medium',
        question: 'The largest ocean on Earth is the __________ Ocean.',
        correctAnswer: 'Pacific'
    },
    {
        id: 7,
        type: 'single-select',
        difficulty: 'hard',
        question: 'In what year did World War II end?',
        options: ['1943', '1944', '1945', '1946'],
        correctAnswer: 2
    },
    {
        id: 8,
        type: 'true-false',
        difficulty: 'easy',
        question: 'Python is a statically typed programming language.',
        correctAnswer: false
    },
    {
        id: 9,
        type: 'fill-blank',
        difficulty: 'hard',
        question: 'The chemical symbol for gold is __________.',
        correctAnswer: 'Au'
    },
    {
        id: 10,
        type: 'multi-select',
        difficulty: 'medium',
        question: 'Which of the following are vowels? (Select all that apply)',
        options: ['A', 'B', 'E', 'I', 'O', 'U'],
        correctAnswers: [0, 2, 3, 4, 5]
    }
];

// Time allocation - Fixed 5 minutes for the entire quiz
const TOTAL_QUIZ_TIME = 5 * 60; // 5 minutes in seconds

// Calculate total quiz time based on difficulty
function calculateTotalQuizTime() {
    return TOTAL_QUIZ_TIME;
}
