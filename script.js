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
    themeIntervalId = setInterval(() => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        document.body.className = themes[currentThemeIndex];
    }, 10000);
}

function stopThemeCycle() {
    clearInterval(themeIntervalId);
}

function changeTheme() {
    const selector = document.getElementById('theme-selector');
    const selectedTheme = selector.value;
    if (selectedTheme === 'auto') {
        isAutoMode = true;
        startThemeCycle();
    } else {
        isAutoMode = false;
        stopThemeCycle();
        document.body.className = selectedTheme;
        currentThemeIndex = themes.indexOf(selectedTheme);
    }
    localStorage.setItem('selectedTheme', selectedTheme);
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

function startTeleprompter() {
    const script = document.getElementById('script-input').value.trim();
    const duration = parseInt(document.getElementById('duration-input').value) * 1000;

    if (!script) {
        showWarning('Please enter a script text.');
        return;
    }
    if (isNaN(duration) || duration <= 0) {
        showWarning('Please enter a valid duration.');
        return;
    }

    localStorage.setItem('teleprompter-script', script);
    window.location.href = 'prompter.html';
}

window.onload = function() {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme && savedTheme !== 'auto') {
        document.body.className = savedTheme;
        isAutoMode = false;
        document.getElementById('theme-selector').value = savedTheme;
    } else {
        isAutoMode = true;
        document.body.className = themes[currentThemeIndex];
        document.getElementById('theme-selector').value = 'auto';
        startThemeCycle();
    }

    document.getElementById('start-button').addEventListener('click', startTeleprompter);
    document.getElementById('warning-close').addEventListener('click', hideWarning);
    document.getElementById('sample-selector').addEventListener('change', function() {
        document.getElementById('script-input').value = this.value;
    });
};
