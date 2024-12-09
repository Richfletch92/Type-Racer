document.addEventListener('DOMContentLoaded', (event) => {
    updateSampleText();
    document.getElementById('levelSelector').addEventListener('change', updateSampleText);
    document.getElementById('startButton').addEventListener('click', startTest);
    document.getElementById('stopButton').addEventListener('click', stopTest);
    document.getElementById('typingArea').addEventListener('input', checkTypingAccuracy);
});

let startTime;
let timerInterval;

/**
 * Start the typing test.
 * 
 */
function startTest() {
    updateSampleText(); // Update the sample text with a new sentence
    startTime = new Date();
    document.getElementById('typingArea').value = '';
    document.getElementById('startButton').disabled = true;
    document.getElementById('stopButton').disabled = false;
    document.getElementById('typingArea').focus();
    timerInterval = setInterval(updateTime, 100);
}

/**
 * Stop the typing test.
 */
function stopTest() {
    clearInterval(timerInterval);
    const endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000;
    document.querySelector('.time').textContent = timeTaken.toFixed(2);
    document.getElementById('startButton').disabled = false;
    document.getElementById('stopButton').disabled = true;

    const sampleText = document.getElementById('sampleText').textContent;
    const userInput = document.getElementById('typingArea').value;
    const wpm = calculateWPM(sampleText, userInput, timeTaken);
    document.querySelector('.wordsPerMin').textContent = wpm;

    const difficulty = document.getElementById('levelSelector').value;
    document.querySelector('.level').textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
}

/**
 * Update the elapsed time on the screen.
 */
function updateTime() {
    const currentTime = new Date();
    const timeElapsed = (currentTime - startTime) / 1000;
    document.querySelector('.time').textContent = timeElapsed.toFixed(2);
}

/**
 * Calculate the WPM (Words per minute).
 */
function calculateWPM(sampleText, userInput, timeTaken) {
    const sampleWords = sampleText.split(' ');
    const userWords = userInput.split(' ');
    let correctWords = 0;

    for (let i = 0; i < userWords.length; i++) {
        if (userWords[i] === sampleWords[i]) {
            correctWords++;
        }
    }

    const minutesTaken = timeTaken / 60;
    const wpm = correctWords / minutesTaken;
    return Math.round(wpm);
}

/**
 * Update the sample text based on the selected difficulty level.
 */
function updateSampleText() {
    const difficulty = document.getElementById('levelSelector').value;
    const sampleText = document.getElementById('sampleText');

    const texts = {
        easy: [
            'The cat sat on the mat.',
            'A quick brown fox jumps over the lazy dog.',
            'She sells seashells by the seashore.',
            'The sun is shining brightly.',
            'Birds are singing in the trees.',
            'The dog barked at the mailman.',
            'The fish swam in the pond.',
            'The child played with a toy.',
            'The car drove down the street.',
            'The flowers bloomed in the garden.',
            'The rain fell softly on the roof.'
        ],
        medium: [
            'The quick brown fox jumps over the lazy dog.',
            'Pack my box with five dozen liquor jugs.',
            'How razorback-jumping frogs can level six piqued gymnasts!',
            'Jack quickly moved up the hill.',
            'The zebra ran across the savannah.',
            'The chef prepared a delicious meal.',
            'The artist painted a beautiful picture.',
            'The scientist conducted an experiment.',
            'The teacher explained the lesson clearly.',
            'The musician played a lovely tune.',
            'The athlete ran a marathon.'
        ],
        hard: [
            'She sells seashells by the seashore.',
            "The sixth sick sheik's sixth sheep's sick.",
            'Fred fed Ted bread and Ted fed Fred bread.',
            'The complex algorithm solved the problem.',
            'The intricate design was hard to replicate.',
            'The professor lectured on quantum mechanics.',
            'The engineer built a sophisticated machine.',
            'The surgeon performed a delicate operation.',
            'The lawyer presented a compelling argument.',
            'The architect designed a modern building.',
            'The programmer wrote efficient code.'
        ],
        hardest: [
            'How much wood would a woodchuck chuck if a woodchuck could chuck wood?',
            'The quick onyx goblin jumps over the lazy dwarf.',
            'Jinxed wizards pluck ivy from the big quilt.',
            'The perplexing puzzle baffled everyone.',
            'The enigmatic riddle was hard to solve.',
            'The cryptic message was difficult to decode.',
            'The labyrinthine maze was hard to navigate.',
            'The arcane spell was hard to cast.',
            'The esoteric knowledge was hard to understand.',
            'The abstruse theory was hard to grasp.',
            'The recondite subject was hard to study.'
        ]
    };

    const selectedTexts = texts[difficulty];
    const randomText = selectedTexts[Math.floor(Math.random() * selectedTexts.length)];

    sampleText.textContent = randomText;
}

/**
 * Check typing accuracy and highlight incorrect words.
 */
function checkTypingAccuracy() {
    const sampleText = document.getElementById('sampleText').textContent;
    const userInput = document.getElementById('typingArea').value;

    const sampleWords = sampleText.split(' ');
    const userWords = userInput.split(' ');

    let highlightedText = '';

    for (let i = 0; i < sampleWords.length; i++) {
        if (userWords[i] === undefined) {
            highlightedText += `<span>${sampleWords[i]}</span> `;
        } else if (userWords[i] === sampleWords[i]) {
            highlightedText += `<span style="color: blue;">${sampleWords[i]}</span> `;
        } else {
            highlightedText += `<span style="color: red;">${sampleWords[i]}</span> `;
        }
    }

    document.getElementById('sampleText').innerHTML = highlightedText.trim();
}