let isRunning = false;
let intervalId = null;
let currentSentenceIndex = 0;
let sentences = [];
let sentenceDuration = 0;
let timerInterval = null;
let elapsedTime = 0;

function startTeleprompter() {
    if (isRunning) return;
    isRunning = true;

    const script = document.getElementById('script-input').value.trim();
    const speedMode = document.getElementById('speed-selector').value;
    let duration = parseInt(document.getElementById('duration-input').value) * 100;

    if (!script || (speedMode === 'duration' && duration <= 0)) {
        alert('Please enter a script and a valid duration (if using Duration-Based).');
        isRunning = false;
        return;
    }

    sentences = script.split(/(\[PAUSE\]|\[PAUSE, SMILE\]|\[PAUSE, TRANSITION\]|\[SLIDE CHANGE\]|\[EMPHASIZE\]|\[HIGHLIGHT FEATURE\]|\[LOOK AT CAMERA\]|\[NOD\]|\[ANSWER\]|\.)/)
        .filter(s => s.trim().length > 0)
        .map(s => s.trim())
        .filter(s => s.length > 0);
    if (sentences.length === 0) {
        alert('No valid sentences found.');
        isRunning = false;
        return;
    }

    if (speedMode !== 'duration') {
        const wordCount = script.split(/\s+/).filter(w => w.length > 0).length;
        const wpm = speedMode === 'slow' ? 120 : speedMode === 'normal' ? 140 : 160;
        duration = (wordCount / wpm) * 60 * 1000;
    }
    sentenceDuration = duration / sentences.length;

    const teleprompter = document.getElementById('teleprompter');
    teleprompter.innerHTML = sentences.map((sentence, index) => 
        `<span class="sentence" id="sentence-${index}">${sentence}${sentence.startsWith('[') ? '' : '.'}</span>`
    ).join('');

    currentSentenceIndex = 0;
    teleprompter.scrollTop = 0;

    elapsedTime = 0;
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        if (isRunning) {
            elapsedTime += 10;
            updateTimerDisplay();
        }
    }, 100);

    intervalId = setInterval(() => {
        if (currentSentenceIndex >= sentences.length) {
            pauseTeleprompter();
            return;
        }

        const currentSentence = document.getElementById(`sentence-${currentSentenceIndex}`);
        if (currentSentence) {
            document.querySelectorAll('.sentence').forEach(s => s.classList.remove('highlight'));
            currentSentence.classList.add('highlight');
            if (!document.fullscreenElement) {
                teleprompter.scrollTo({ top: currentSentence.offsetTop - teleprompter.offsetTop - 10, behavior: 'smooth' });
            }
        }

        currentSentenceIndex++;
    }, sentenceDuration);
}

function pauseTeleprompter() {
    if (!isRunning) return;
    isRunning = false;
    clearInterval(intervalId);
    clearInterval(timerInterval);
}

function updateTimerDisplay() {
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    document.getElementById('timer').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function changeTextSize() {
    const size = document.getElementById('text-size').value;
    document.getElementById('teleprompter').style.fontSize = `${size}px`;
}

function updateSpeedMode() {
    const speedMode = document.getElementById('speed-selector').value;
    document.getElementById('duration-input').disabled = speedMode !== 'duration';
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            document.body.classList.add('fullscreen');
        }).catch(err => console.error(`Error: ${err.message}`));
    }
}

function exitFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen().then(() => {
            document.body.classList.remove('fullscreen');
        });
    }
}

window.onload = () => {
    const savedScript = localStorage.getItem('teleprompterScript');
    if (savedScript) {
        document.getElementById('script-input').value = savedScript;
    }
};
