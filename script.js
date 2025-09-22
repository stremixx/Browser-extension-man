document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('darkMode');
    if (!themeToggleButton) return;

    const themeToggleIcon = themeToggleButton.querySelector('img');
    const htmlElement = document.documentElement;

    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        if (theme === 'dark') {
            themeToggleIcon.src = './assets/images/icon-sun.svg';
            themeToggleIcon.alt = 'Switch to light mode';
        } else {
            themeToggleIcon.src = './assets/images/icon-moon.svg';
            themeToggleIcon.alt = 'Switch to dark mode';
        }
    };

    themeToggleButton.addEventListener('click', () => {
        const isDarkMode = htmlElement.getAttribute('data-theme') === 'dark';
        applyTheme(isDarkMode ? 'light' : 'dark');
    });

    // Set initial theme based on user's OS preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark');
    }
});