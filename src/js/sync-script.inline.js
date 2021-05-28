(function() {
    function getColorTheme() {
        const savedTheme = window.localStorage.getItem('color-theme');
        const hasSavedTheme = typeof savedTheme === 'string';
        if (hasSavedTheme) {
            if (savedTheme.trim().toLowerCase() === 'system') {
                return getAndSetSystemColorScheme();
            } else if (['light', 'dark'].indexOf(savedTheme.trim()) > -1) {
                return savedTheme;
            }
        }
        return getAndSetSystemColorScheme();
    }

    function getMediaColorScheme() {
        const darkPreferTheme = window.matchMedia('(prefers-color-scheme: dark)');
        const hasDarkPreferTheme = typeof darkPreferTheme.matches === 'boolean';
        if (hasDarkPreferTheme) {
            return darkPreferTheme.matches ? 'dark' : 'light';
        }
        return 'light';
    }

    function getAndSetSystemColorScheme() {
        const systemTheme = getMediaColorScheme();
        window.localStorage.setItem('color-theme', 'system');
        return systemTheme;
    }

    const colorScheme = getColorTheme();
    if (colorScheme === 'dark') {
        document.querySelector('html').classList.add('theme-dark');
        document.querySelector('html').classList.add('js-present');
    } else {
        document.querySelector('html').classList.remove('theme-dark');
        document.querySelector('html').classList.remove('js-present');
    }
})();
