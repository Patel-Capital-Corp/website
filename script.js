document.addEventListener('DOMContentLoaded', () => {
    const debtButton = document.getElementById('debt-capital');
    const equityButton = document.getElementById('equity-capital');

    const tiltSeesaw = (side) => {
        window.postMessage({ action: 'tiltSeesaw', side }, '*');
    };

    debtButton.addEventListener('click', () => {
        tiltSeesaw('debt');
    });

    equityButton.addEventListener('click', () => {
        tiltSeesaw('equity');
    });
});