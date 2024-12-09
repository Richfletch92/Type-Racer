document.addEventListener('DOMContentLoaded', (event) => {
    updateSampleText();
    document.getElementById('levelSelector').addEventListener('change', updateSampleText);
});

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

    sampleText.value = randomText;
}