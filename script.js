document.getElementById('start-button').addEventListener('click', () => {
    const sample = document.getElementById('sample-selector').value;
    if (!sample) {
        showWarning('Please select a sample prompt to proceed.');
        return;
    }
    localStorage.setItem('teleprompter-script', sample);
    window.location.href = 'prompter.html';
});

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

document.getElementById('warning-close').addEventListener('click', hideWarning);
