console.log("Typing Speed Test JS connected");

// -------------------------
// 1. Paragraphs
// -------------------------
const paragraphs = [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes perfect, so keep typing every day.",
    "Typing speed tests improve both accuracy and speed.",
    "JavaScript is fun when you see your code come alive.",
    "Consistency and focus are key to mastering typing skills."
];

// -------------------------
// 2. Select Elements
// -------------------------
const textDisplay = document.getElementById("text-display");
const textInput = document.getElementById("text-input");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart");

let charSpans = [];
let startTime = null;
let timerInterval = null;

// -------------------------
// 3. Load Random Paragraph
// -------------------------
function loadRandomParagraph() {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    const paragraph = paragraphs[randomIndex];

    textDisplay.innerHTML = "";
    paragraph.split("").forEach(char => {
        const charSpan = document.createElement("span");
        charSpan.innerText = char;
        textDisplay.appendChild(charSpan);
    });

    charSpans = textDisplay.querySelectorAll("span");

    // Highlight first character
    if (charSpans.length > 0) charSpans[0].classList.add("current");

    // Reset input, stats, timer
    textInput.value = "";
    clearInterval(timerInterval);
    startTime = null;
    timeDisplay.innerText = "0";
    wpmDisplay.innerText = "0";
    accuracyDisplay.innerText = "0";
}

// Load first paragraph on page load
loadRandomParagraph();

// -------------------------
// 4. Typing Logic
// -------------------------
textInput.addEventListener("input", () => {
    const inputValue = textInput.value;

    // Start timer on first input
    if (!startTime) {
        startTime = new Date();
        timerInterval = setInterval(() => {
            const elapsed = Math.floor((new Date() - startTime) / 1000);
            timeDisplay.innerText = elapsed;
        }, 1000);
    }

    // Highlight each character
    charSpans.forEach((span, index) => {
        span.classList.remove("correct", "incorrect", "current");
        if (index < inputValue.length) {
            if (inputValue[index] === span.innerText) {
                span.classList.add("correct");
            } else {
                span.classList.add("incorrect");
            }
        }
    });

    // Highlight current character
    if (inputValue.length < charSpans.length) {
        charSpans[inputValue.length].classList.add("current");
    } else {
        clearInterval(timerInterval);
    }

    // -------------------------
    // 5. Calculate Stats
    // -------------------------
    let correctChars = 0;
    charSpans.forEach((span, index) => {
        if (inputValue[index] === span.innerText) correctChars++;
    });

    const accuracy = inputValue.length === 0 ? 0 : Math.floor((correctChars / inputValue.length) * 100);
    accuracyDisplay.innerText = accuracy;

    const timeInMinutes = (parseInt(timeDisplay.innerText) || 1) / 60;
    const wpm = Math.floor((correctChars / 5) / timeInMinutes);
    wpmDisplay.innerText = wpm;
});

// -------------------------
// 6. Restart Button
// -------------------------
restartBtn.addEventListener("click", () => {
    loadRandomParagraph();
});