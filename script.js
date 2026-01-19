// Quiz Game Logic
let currentQuestion = 0;
let userAnswers = [];
let quizStartTime = 0;
let quizEndTime = 0;
let timerInterval = null;
let totalQuizTime = 0;
let remainingTime = 0;
let timeWarningShown = false;

// Initialize the quiz
function startQuiz() {
    // Reset state
    currentQuestion = 0;
    userAnswers = new Array(quizQuestions.length).fill(null);
    quizStartTime = Date.now();
    timeWarningShown = false;

    // Calculate total quiz time based on difficulty
    totalQuizTime = calculateTotalQuizTime();
    remainingTime = totalQuizTime;

    // Show quiz screen
    showScreen('quizScreen');

    // Load first question
    loadQuestion();

    // Start timer
    startCountdownTimer();
}

// Show specific screen
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// Load current question
function loadQuestion() {
    const question = quizQuestions[currentQuestion];
    const container = document.getElementById('questionContainer');

    // Update question text
    document.getElementById('questionText').textContent = `${currentQuestion + 1}. ${question.question}`;

    // Update progress
    updateProgress();

    // Clear previous options
    container.innerHTML = '';

    // Render based on question type
    if (question.type === 'single-select') {
        renderSingleSelect(question, container);
    } else if (question.type === 'multi-select') {
        renderMultiSelect(question, container);
    } else if (question.type === 'true-false') {
        renderTrueFalse(question, container);
    } else if (question.type === 'fill-blank') {
        renderFillBlank(question, container);
    }

    // Update button states
    document.getElementById('prevBtn').disabled = currentQuestion === 0;
    document.getElementById('nextBtn').textContent = 
        currentQuestion === quizQuestions.length - 1 ? 'Submit' : 'Next';
}

// Render single-select (radio buttons)
function renderSingleSelect(question, container) {
    const group = document.createElement('div');
    group.className = 'question-group';

    question.options.forEach((option, index) => {
        const label = document.createElement('label');
        label.className = 'option';

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `question-${question.id}`;
        input.value = index;

        // Check if this option was previously selected
        if (userAnswers[currentQuestion] === index) {
            input.checked = true;
            label.classList.add('selected');
        }

        input.addEventListener('change', (e) => {
            userAnswers[currentQuestion] = parseInt(e.target.value);
            // Update visual state
            document.querySelectorAll(`input[name="question-${question.id}"]`).forEach(inp => {
                inp.parentElement.classList.remove('selected');
            });
            label.classList.add('selected');
        });

        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        group.appendChild(label);
    });

    container.appendChild(group);
}

// Render multi-select (checkboxes)
function renderMultiSelect(question, container) {
    const group = document.createElement('div');
    group.className = 'question-group';

    question.options.forEach((option, index) => {
        const label = document.createElement('label');
        label.className = 'option';

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = `question-${question.id}`;
        input.value = index;

        // Check if this option was previously selected
        if (userAnswers[currentQuestion] && userAnswers[currentQuestion].includes(index)) {
            input.checked = true;
            label.classList.add('selected');
        }

        input.addEventListener('change', (e) => {
            if (!userAnswers[currentQuestion]) {
                userAnswers[currentQuestion] = [];
            }

            if (e.target.checked) {
                userAnswers[currentQuestion].push(parseInt(e.target.value));
            } else {
                userAnswers[currentQuestion] = userAnswers[currentQuestion].filter(
                    item => item !== parseInt(e.target.value)
                );
            }

            // Update visual state
            if (e.target.checked) {
                label.classList.add('selected');
            } else {
                label.classList.remove('selected');
            }
        });

        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        group.appendChild(label);
    });

    container.appendChild(group);
}

// Render true/false
function renderTrueFalse(question, container) {
    const group = document.createElement('div');
    group.className = 'true-false-group';

    [true, false].forEach((value) => {
        const button = document.createElement('button');
        button.className = 'true-false-btn';
        button.textContent = value ? 'True' : 'False';

        if (userAnswers[currentQuestion] === value) {
            button.classList.add('selected');
        }

        button.addEventListener('click', () => {
            userAnswers[currentQuestion] = value;

            // Update visual state
            group.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });

        group.appendChild(button);
    });

    container.appendChild(group);
}

// Render fill-in-the-blank
function renderFillBlank(question, container) {
    const group = document.createElement('div');
    group.className = 'question-group';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'blank-input';
    input.placeholder = 'Type your answer here...';

    if (userAnswers[currentQuestion]) {
        input.value = userAnswers[currentQuestion];
    }

    input.addEventListener('input', (e) => {
        userAnswers[currentQuestion] = e.target.value.trim();
    });

    group.appendChild(input);
    container.appendChild(group);
}

// Update progress bar and counter
function updateProgress() {
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('questionNumber').textContent = 
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
}

// Navigate to next question
function nextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        submitQuiz();
    }
}

// Navigate to previous question
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

// Submit quiz and calculate score
function submitQuiz() {
    quizEndTime = Date.now();
    clearInterval(timerInterval);

    let score = 0;
    let results = [];

    quizQuestions.forEach((question, index) => {
        let isCorrect = false;
        let userAnswer = userAnswers[index];
        let correctAnswer = '';

        if (question.type === 'single-select') {
            isCorrect = userAnswers[index] === question.correctAnswer;
            correctAnswer = question.options[question.correctAnswer];
            userAnswer = userAnswer !== null ? question.options[userAnswer] : 'Not answered';
        } else if (question.type === 'multi-select') {
            isCorrect = arraysEqual(userAnswers[index], question.correctAnswers);
            correctAnswer = question.correctAnswers.map(idx => question.options[idx]).join(', ');
            userAnswer = (userAnswers[index] && userAnswers[index].length > 0) 
                ? userAnswers[index].map(idx => question.options[idx]).join(', ')
                : 'Not answered';
        } else if (question.type === 'true-false') {
            isCorrect = userAnswers[index] === question.correctAnswer;
            correctAnswer = question.correctAnswer ? 'True' : 'False';
            userAnswer = userAnswers[index] !== null ? (userAnswers[index] ? 'True' : 'False') : 'Not answered';
        } else if (question.type === 'fill-blank') {
            isCorrect = normalizeString(userAnswers[index]) === 
                       normalizeString(question.correctAnswer);
            correctAnswer = question.correctAnswer;
            userAnswer = userAnswers[index] || 'Not answered';
        }

        if (isCorrect) {
            score++;
        }

        results.push({
            question: question.question,
            type: question.type,
            isCorrect: isCorrect,
            userAnswer: userAnswer,
            correctAnswer: correctAnswer
        });
    });

    displayResults(score, results);
}

// Helper function to normalize strings for comparison
function normalizeString(str) {
    return (str || '').toLowerCase().trim();
}

// Helper function to compare arrays
function arraysEqual(arr1, arr2) {
    if (!arr1 || !arr2) return false;
    if (arr1.length !== arr2.length) return false;

    const sorted1 = [...arr1].sort();
    const sorted2 = [...arr2].sort();

    return sorted1.every((val, idx) => val === sorted2[idx]);
}

// Display results
function displayResults(score, results) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const timeSpent = Math.round((quizEndTime - quizStartTime) / 1000);

    // Set score
    document.getElementById('finalScore').textContent = percentage;

    // Set message based on score
    let message = '';
    if (percentage === 100) {
        message = 'Perfect! Outstanding performance! 🎉';
    } else if (percentage >= 80) {
        message = 'Excellent! You did great! 🌟';
    } else if (percentage >= 60) {
        message = 'Good job! Keep practicing to improve! 📚';
    } else if (percentage >= 40) {
        message = 'Nice try! Review and try again! 💪';
    } else {
        message = 'Keep learning! You\'ll do better next time! 🚀';
    }

    document.getElementById('scoreMessage').textContent = message;

    // Display detailed results with correct answers
    const resultDetail = document.getElementById('resultsDetail');
    resultDetail.innerHTML = '';

    results.forEach((result, index) => {
        const item = document.createElement('div');
        item.className = `result-item ${result.isCorrect ? 'correct' : 'incorrect'}`;

        const label = document.createElement('div');
        label.className = 'result-label';
        label.innerHTML = `<strong>Q${index + 1}:</strong> ${result.question}`;

        const details = document.createElement('div');
        details.className = 'result-details-box';

        // Your answer
        const yourAnswerDiv = document.createElement('div');
        yourAnswerDiv.className = `answer-row ${result.isCorrect ? 'your-answer-correct' : 'your-answer-incorrect'}`;
        yourAnswerDiv.innerHTML = `
            <span class="answer-label">Your Answer:</span>
            <span class="answer-value">${result.userAnswer}</span>
            ${result.isCorrect ? '<span class="badge correct-badge">✓ Correct</span>' : '<span class="badge incorrect-badge">✗ Incorrect</span>'}
        `;
        details.appendChild(yourAnswerDiv);

        // Correct answer (show if incorrect)
        if (!result.isCorrect) {
            const correctAnswerDiv = document.createElement('div');
            correctAnswerDiv.className = 'answer-row correct-answer-row';
            correctAnswerDiv.innerHTML = `
                <span class="answer-label">Correct Answer:</span>
                <span class="answer-value">${result.correctAnswer}</span>
                <span class="badge correct-answer-badge">✓ Right Answer</span>
            `;
            details.appendChild(correctAnswerDiv);
        }

        item.appendChild(label);
        item.appendChild(details);
        resultDetail.appendChild(item);
    });

    // Show results screen
    showScreen('resultsScreen');
}

// Retake quiz (start over)
function retakeQuiz() {
    startQuiz();
}

// Go back to home
function restartQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    clearInterval(timerInterval);
    showScreen('welcomeScreen');
}

// Countdown timer functionality
function startCountdownTimer() {
    displayTimeRemaining();

    timerInterval = setInterval(() => {
        remainingTime--;

        displayTimeRemaining();

        // Warning at 2 minutes remaining
        if (remainingTime === 120 && !timeWarningShown) {
            timeWarningShown = true;
            showTimeWarning('⏰ Warning: 2 minutes remaining!');
        }

        // Warning at 30 seconds remaining
        if (remainingTime === 30) {
            showTimeWarning('⚠️ URGENT: 30 seconds remaining!');
            document.querySelector('.quiz-timer').style.color = '#ff6b6b';
        }

        // Auto-submit when time runs out
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            showTimeWarning('⏳ Time\'s up! Submitting your quiz...');
            setTimeout(() => {
                submitQuiz();
            }, 1500);
        }
    }, 1000);
}

// Display remaining time
function displayTimeRemaining() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('timer').textContent = timeString;

    // Change color based on remaining time
    const timerElement = document.querySelector('.quiz-timer');
    if (remainingTime <= 30) {
        timerElement.style.color = '#ff6b6b';
    } else if (remainingTime <= 120) {
        timerElement.style.color = '#ffa500';
    } else {
        timerElement.style.color = 'white';
    }
}

// Show time warning notification
function showTimeWarning(message) {
    const warningDiv = document.createElement('div');
    warningDiv.className = 'time-warning';
    warningDiv.textContent = message;
    document.body.appendChild(warningDiv);

    setTimeout(() => {
        warningDiv.style.opacity = '0';
        setTimeout(() => warningDiv.remove(), 300);
    }, 3000);
}

// Timer functionality
function startTimer() {
    let seconds = 0;
    timerInterval = setInterval(() => {
        seconds++;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        let timeString = '';
        if (hours > 0) {
            timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        } else {
            timeString = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }

        document.getElementById('timer').textContent = timeString;
    }, 1000);
}
