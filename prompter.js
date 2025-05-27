let isRunning = false;
let currentSentenceIndex = 0;
let sentences = [];
let sentenceDurations = [];
let timerInterval = null;
let elapsedTime = 0;
let themeIntervalId = null;

const themes = [
    'theme-dark', 'theme-light', 'theme-vibrant', 'theme-neon', 'theme-pastel',
    'theme-midnight', 'theme-sunset', 'theme-ocean', 'theme-forest', 'theme-retro',
    'theme-cosmic', 'theme-aurora', 'theme-velvet', 'theme-pop', 'theme-urban',
    'theme-twilight', 'theme-coral', 'theme-galaxy', 'theme-mint', 'theme-disco',
    'theme-starfield', 'theme-prism', 'theme-firefly', 'theme-nebula', 'theme-pulse',
    'theme-hologram', 'theme-radiance', 'theme-vortex', 'theme-spectrum', 'theme-aurorawave'
];
let currentThemeIndex = themes.indexOf('theme-aurorawave');
let isAutoMode = true;

function startThemeCycle() {
    if (!isAutoMode) return;
    if (themeIntervalId) clearInterval(themeIntervalId); // Clear any existing interval
    themeIntervalId = setInterval(() => {
        if (!document.fullscreenElement && isAutoMode) {
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            document.body.className = themes[currentThemeIndex];
        }
    }, 10000);
}

function stopThemeCycle() {
    if (themeIntervalId) clearInterval(themeIntervalId);
    themeIntervalId = null;
}

function changeTheme() {
    const selector = document.getElementById('theme-selector');
    const selectedTheme = selector.value;
    stopThemeCycle();
    if (selectedTheme === 'auto') {
        isAutoMode = true;
        startThemeCycle();
    } else {
        isAutoMode = false;
        document.body.className = selectedTheme;
        currentThemeIndex = themes.indexOf(selectedTheme);
    }
    localStorage.setItem('selectedTheme', selectedTheme);
    if (document.fullscreenElement) {
        document.body.classList.add('fullscreen');
    }
}

function showWarning(message) {
    const warningBox = document.getElementById('warning-box');
    const warningMessage = document.getElementById('warning-message');
    warningMessage.textContent = message;
    warningBox.style.display = 'block';
    warningBox.classList.add('show');
    setTimeout(hideWarning, 5000);
}

function hideWarning() {
    const warningBox = document.getElementById('warning-box');
    warningBox.classList.remove('show');
    warningBox.style.display = 'none';
}

let animationFrameId = null;

function toggleTeleprompter() {
    const normalToggle = document.getElementById('start-toggle');
    const fullscreenToggle = document.getElementById('fullscreen-toggle');
    if (normalToggle.checked || fullscreenToggle.checked) {
        if (!isRunning) {
            startTeleprompter();
        }
    } else {
        if (isRunning) {
            pauseTeleprompter();
        }
    }
}

function startTeleprompter() {
    if (isRunning) return;
    const script = document.getElementById('text-input').value.trim();
    const speedMode = document.getElementById('speed-select').value;
    let totalDuration = parseInt(document.getElementById('speed-input').value) * 1000;

    if (!script) {
        showWarning('Please enter a script text.');
        document.getElementById('start-toggle').checked = false;
        document.getElementById('fullscreen-toggle').checked = false;
        return;
    }
    if (speedMode === 'duration' && (isNaN(totalDuration) || totalDuration <= 0)) {
        showWarning('Please enter a valid duration.');
        document.getElementById('start-toggle').checked = false;
        document.getElementById('fullscreen-toggle').checked = false;
        return;
    }

    sentences = script.split(/(\[PAUSE\]|\[PAUSE, SMILE\]|\[PAUSE-TRANSITION\]|\[SLIDE\]|\[HIGHLIGHT\]|\[LOOK AT CAMERA\]|\[NOD\]|\[ANSWER\]|\.)/)
        .filter(s => s && s.trim().length > 0)
        .map(s => s.trim())
        .filter(s => s.length > 0);
    if (sentences.length === 0) {
        showWarning('No valid sentences found.');
        document.getElementById('start-toggle').checked = false;
        document.getElementById('fullscreen-toggle').checked = false;
        return;
    }

    sentenceDurations = [];
    let words = script.split(/\s+/).filter(w => w.length > 0);
    if (speedMode === 'duration') {
        const baseDurationPerWord = totalDuration / words.length;
        sentences.forEach(s => {
            sentenceDurations.push(s.startsWith('[') ? 2000 : Math.max(500, baseDurationPerWord));
        });
    } else {
        const wpm = speedMode === 'slow' ? 120 : speedMode === 'normal' ? 140 : 160;
        sentences.forEach(s => {
            if (s.startsWith('[')) {
                sentenceDurations.push(2000);
            } else {
                const wordCount = s.split(/\s+/).filter(w => w.length > 0).length;
                const duration = (wordCount * 60 / wpm) * 1000;
                sentenceDurations.push(Math.max(500, duration));
            }
        });
    }

    isRunning = true;
    document.getElementById('start-toggle').checked = true;
    document.getElementById('fullscreen-toggle').checked = true;
    currentSentenceIndex = 0;
    elapsedTime = 0;
    updateTimerDisplay();

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (isRunning) {
            elapsedTime += 100;
            updateTimerDisplay();
        }
    }, 100);

    function advanceSentence() {
        if (!isRunning || currentSentenceIndex >= sentences.length) {
            pauseTeleprompter();
            return;
        }
        updateTeleprompter();
        currentSentenceIndex++;
        if (currentSentenceIndex < sentences.length) {
            animationFrameId = setTimeout(advanceSentence, sentenceDurations[currentSentenceIndex - 1]);
        } else {
            pauseTeleprompter();
        }
    }

    if (sentences.length > 0) {
        advanceSentence();
    }
}

function pauseTeleprompter() {
    if (!isRunning) return;
    isRunning = false;
    if (animationFrameId) clearTimeout(animationFrameId);
    animationFrameId = null;
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById('start-toggle').checked = false;
    document.getElementById('fullscreen-toggle').checked = false;
}

function updateTeleprompter() {
    const container = document.getElementById('teleprompter-container');
    container.innerHTML = '';

    const startIndex = currentSentenceIndex;
    const endIndex = Math.min(currentSentenceIndex + 4, sentences.length);
    for (let i = startIndex; i < endIndex; i++) {
        const sentence = sentences[i];
        const isHighlight = i === currentSentenceIndex;
        const span = document.createElement('span');
        span.id = `sentence-${i}`;
        span.className = isHighlight ? 'highlight sentence' : 'sentence';
        span.textContent = sentence + (sentence.startsWith('[') ? '' : '.');
        container.appendChild(span);
    }

    if (!document.fullscreenElement && container.firstChild) {
        requestAnimationFrame(() => {
            document.getElementById('teleprompter').scrollTo({
                top: container.firstChild.offsetTop - document.getElementById('teleprompter').offsetTop - 10,
                behavior: 'smooth'
            });
        });
    }
    if (currentSentenceIndex >= sentences.length) {
        pauseTeleprompter();
    }
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

function updateSpeed() {
    const speedMode = document.getElementById('speed-select').value;
    document.getElementById('speed-input').disabled = speedMode !== 'duration';
    if (isRunning) {
        pauseTeleprompter();
        startTeleprompter();
    }
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen({ navigationUI: "hide" }).then(() => {
            document.body.classList.add('fullscreen');
            stopThemeCycle();
            document.getElementById('input-section').classList.add('hidden');
            document.getElementById('fullscreen-controls').style.display = 'flex';
            document.getElementById('fullscreen-toggle').checked = isRunning;
        }).catch(err => console.error(`Error: ${err.message}`));
    } else {
        document.exitFullscreen().then(() => {
            document.body.classList.remove('fullscreen');
            if (isAutoMode) {
                startThemeCycle();
            }
            document.getElementById('input-section').classList.remove('hidden');
            document.getElementById('fullscreen-controls').style.display = 'none';
        }).catch(err => console.error(`Error: ${err.message}`));
    }
}

window.onload = function() {
    const savedScript = localStorage.getItem('teleprompter-script');
    if (savedScript) {
        document.getElementById('text-input').value = savedScript;
        localStorage.removeItem('teleprompter-script');
        startTeleprompter();
    }

    const savedTheme = localStorage.getItem('selectedTheme') || 'auto';
    document.getElementById('theme-selector').value = savedTheme;
    if (savedTheme === 'auto') {
        isAutoMode = true;
        document.body.className = themes[currentThemeIndex];
        startThemeCycle();
    } else {
        isAutoMode = false;
        document.body.className = savedTheme;
        currentThemeIndex = themes.indexOf(savedTheme);
    }

    updateSpeed();
    document.getElementById('start-toggle').addEventListener('change', toggleTeleprompter);
    document.getElementById('fullscreen-toggle').addEventListener('change', toggleTeleprompter);
    document.getElementById('full-screen').addEventListener('click', toggleFullScreen);
    document.getElementById('toggle-mode').addEventListener('click', toggleFullScreen);
    document.getElementById('warning-close').addEventListener('click', hideWarning);
    document.getElementById('home-button').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    document.getElementById('speed-select').addEventListener('change', updateSpeed);
    document.getElementById('speed-input').addEventListener('change', updateSpeed);
    document.getElementById('theme-selector').addEventListener('change', changeTheme);
    document.getElementById('text-size').addEventListener('change', changeTextSize);
};
