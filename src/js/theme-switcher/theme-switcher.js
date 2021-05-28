function themeSwitcherOptionsHtml() {
    return {
        system: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
</svg>
<span class="inline-block ml-1">System Default</span>`,
        light: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
</svg>
<span class="inline-block ml-1">Light Theme</span>`,
        dark: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
</svg>
<span class="inline-block ml-1">Dark Theme</span>`
    };
}

function expandCollapseThemeOptions(action = '') {
    if (['expand', 'collapse'].indexOf(action) === -1) {
        return;
    }
    const themeSwitcherBtn = document.querySelector('.theme-switcher');
    const themeSwitcherOptions = document.querySelector('.theme-switcher-options');
    let final_action = action !== '' ? action.toLowerCase() : '';
    if (themeSwitcherBtn && themeSwitcherOptions) {
        if (action === '') {
            if (themeSwitcherOptions.classList.contains('expanded')) {
                final_action = 'collapse';
            } else {
                final_action = 'expand';
            }
        }
    }
    if (final_action === 'expand') {
        themeSwitcherOptions.classList.add('expanded');
        themeSwitcherBtn.classList.add('theme-switcher-btn--active');
        themeSwitcherBtn.setAttribute('aria-expanded', 'true');
    } else {
        themeSwitcherOptions.classList.remove('expanded');
        themeSwitcherBtn.classList.remove('theme-switcher-btn--active');
        themeSwitcherBtn.setAttribute('aria-expanded', 'false');
    }
    setActiveDescendantAriaOnUl(final_action);
}

function closeThemeSwitcherIfClickedOutside(evt) {
    const paths = evt.composedPath();
    let insideThemeToggler = false;
    for (let i = 0; i < paths.length; i++) {
        if (paths[i] && paths[i].classList && paths[i].classList.contains('theme-toggler')) {
            insideThemeToggler = true;
            break;
        }
    }
    if (!insideThemeToggler) {
        expandCollapseThemeOptions('collapse');
    }
}

function initializeThemeMenuItems() {
    const themeHtmls = themeSwitcherOptionsHtml();
    const themeSwitcherLinks = document.querySelectorAll('.theme-switcher-list-item > .theme-switcher-link');
    for (let i = 0; i < themeSwitcherLinks.length; i++) {
        if (i === 0) {
            themeSwitcherLinks[i].innerHTML = themeHtmls.light;
        } else if (i === 1) {
            themeSwitcherLinks[i].innerHTML = themeHtmls.dark;
        } else if (i === 2) {
            themeSwitcherLinks[i].innerHTML = themeHtmls.system;
        }
    }
}

function setActiveThemeLink(idx) {
    const themeSwitcherItems = document.querySelectorAll('.theme-switcher-list-item');
    for (let i = 0; i < themeSwitcherItems.length; i++) {
        if (Number(idx) === i) {
            themeSwitcherItems[i].classList.add('theme-switcher-list-item--active');
            themeSwitcherItems[i].setAttribute('aria-selected', 'true');
        } else {
            themeSwitcherItems[i].classList.remove('theme-switcher-list-item--active');
            themeSwitcherItems[i].removeAttribute('aria-selected');
        }
    }
}

function setActiveDescendantAriaOnUl(action = '') {
    if (['expand', 'collapse'].indexOf(action) === -1) {
        return;
    }
    const themeSwitcherOptions = document.querySelector('.theme-switcher-options');
    if (action === 'collapse') {
        themeSwitcherOptions.removeAttribute('aria-activedescendant');
        return;
    }
    const themeSwitcherListActiveItem = document.querySelector('.theme-switcher-list-item--active');
    if (themeSwitcherOptions && themeSwitcherListActiveItem) {
        const activeId = themeSwitcherListActiveItem.id;
        themeSwitcherOptions.setAttribute('aria-activedescendant', activeId);
        setTimeout(() => {
            themeSwitcherListActiveItem.focus();
        });
    } else {
        themeSwitcherOptions.removeAttribute('aria-activedescendant');
    }
}

function updateHtmlClass(theme = 'light') {
    let systemTheme = '';
    if (theme === 'system') {
        systemTheme = getSystemColorScheme();
    }
    if (systemTheme === 'dark' || theme === 'dark') {
        document.querySelector('html').classList.add('theme-dark');
    } else {
        document.querySelector('html').classList.remove('theme-dark');
    }
}

function getSystemColorScheme() {
    const darkPreferTheme = window.matchMedia('(prefers-color-scheme: dark)');
    const hasDarkPreferTheme = typeof darkPreferTheme.matches === 'boolean';
    if (hasDarkPreferTheme) {
        return darkPreferTheme.matches ? 'dark' : 'light';
    }
    return 'light';
}

function focusOnSwitcherBtn() {
    const themeSwitcherBtn = document.querySelector('.theme-switcher');
    if (themeSwitcherBtn) {
        setTimeout(() => themeSwitcherBtn.focus());
    }
}

function handleChangeThemeEvt(idx, collapse = true) {
    if (idx === 2) {
        setTheme('system');
    } else if (idx === 1) {
        setTheme('dark')
    } else {
        setTheme('light');
    }
    if (collapse) {
        expandCollapseThemeOptions('collapse');
        focusOnSwitcherBtn();
    }
}

function moveUpDownSwitcherOptions(option = '') {
    if (['prev', 'next', 'home', 'end'].indexOf(option) === -1) {
        return;
    }
    const switcherListOptions = document.querySelectorAll('.theme-switcher-list-item');
    const currentActiveOption = document.activeElement;
    if (option === 'home') {
        switcherListOptions[0].focus();
        handleChangeThemeEvt(0, false);
    } else if (option === 'end') {
        switcherListOptions[switcherListOptions.length - 1].focus();
        handleChangeThemeEvt(switcherListOptions.length - 1, false);
    } else if (currentActiveOption) {
        for (let i = 0; i < switcherListOptions.length; i++) {
            if (switcherListOptions[i] === currentActiveOption) {
                if (option === 'prev') {
                    if (i === 0) {
                        switcherListOptions[switcherListOptions.length - 1].focus();
                        handleChangeThemeEvt(switcherListOptions.length - 1, false);
                    } else {
                        switcherListOptions[i-1].focus();
                        handleChangeThemeEvt(i-1, false);
                    }
                } else {
                    if (i === switcherListOptions.length - 1) {
                        switcherListOptions[0].focus();
                        handleChangeThemeEvt(0, false);
                    } else {
                        switcherListOptions[i+1].focus();
                        handleChangeThemeEvt(i+1, false);
                    }
                }
                break;
            }
        }
    }
}

function moveToSpecificSwitchOptionByKey(key) {
    const keyVal = key.split('key').slice(-1)[0];
    const switcherListOptions = document.querySelectorAll('.theme-switcher-list-item');
    if (switcherListOptions.length > 0) {
        const options = Array.from(switcherListOptions).map(opt => opt.getAttribute('data-option'));
        for (let i = 0; i < options.length; i++) {
            if (options[i] && options[i].startsWith(keyVal)) {
                switcherListOptions[i].focus();
                handleChangeThemeEvt(i, false);
                break;
            }
        }
    }
}

function handleThemeItemKeyboardCodes(key, idx) {
    if (key === 'enter') {
        handleChangeThemeEvt(idx);
    } else if (key === 'escape') {
        expandCollapseThemeOptions('collapse');
        focusOnSwitcherBtn();
    } else if (key === 'arrowup') {
        moveUpDownSwitcherOptions('prev');
    } else if (key === 'arrowdown') {
        moveUpDownSwitcherOptions('next');
    } else if (key === 'home' || key === 'end') {
        moveUpDownSwitcherOptions(key);
    } else {
        moveToSpecificSwitchOptionByKey(key);
    }
}

function handleSwitcherBtnKeyboardCodes(key) {
    const themeSwitcherBtn = document.querySelector('.theme-switcher');
    const currentActiveThemeLink = document.querySelector('.theme-switcher-list-item--active');
    if (key === 'enter') {
        if (currentActiveThemeLink) {
            setTimeout(() => currentActiveThemeLink.focus());
        }
    } else if (key === 'arrowup') {
        expandCollapseThemeOptions('expand');
    } else if (key === 'arrowdown') {
        expandCollapseThemeOptions('expand');
    }
}


const replaceLogo = () => {
    const hasDarkTheme = document.querySelector('html').classList.contains('theme-dark');
    const logoImgObj = document.querySelector('.site-logo');
    if (logoImgObj) {
        if (hasDarkTheme) {
            logoImgObj.setAttribute('src', '/images/darklogo.svg');
        } else {
            logoImgObj.setAttribute('src', '/images/lightlogo.svg');
        }
    }
};

const setTheme = (forced = null) => {
    const themeHtmls = themeSwitcherOptionsHtml();
    const theme = forced ? forced : window.localStorage.getItem('color-theme');
    const themeSwitcherBtn = document.querySelector('.theme-switcher');
    initializeThemeMenuItems();
    if (themeSwitcherBtn) {
        if (theme.toString().toLowerCase() === 'system') {
            themeSwitcherBtn.innerHTML = themeHtmls.system;
            setActiveThemeLink(2);
            updateHtmlClass('system');
            window.localStorage.setItem('color-theme', 'system');
            themeSwitcherBtn.setAttribute('aria-label', 'Using system default theme');
        } else if (theme.toString().toLowerCase() === 'dark') {
            themeSwitcherBtn.innerHTML = themeHtmls.dark;
            setActiveThemeLink(1);
            updateHtmlClass('dark');
            window.localStorage.setItem('color-theme', 'dark');
            themeSwitcherBtn.setAttribute('aria-label', 'Using dark theme');
        } else {
            themeSwitcherBtn.innerHTML = themeHtmls.light;
            setActiveThemeLink(0);
            updateHtmlClass('light');
            window.localStorage.setItem('color-theme', 'light');
            themeSwitcherBtn.setAttribute('aria-label', 'Using light theme');
        }
        replaceLogo();
    }
}

const changeThemeEvt = () => {
    const items = document.querySelectorAll('.theme-switcher-list-item');
    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', (evt) => {
            handleChangeThemeEvt(i);
        });
    }
};

const themeSwitcherBtnClickEvt = () => {
    const themeSwitcherBtn = document.querySelector('.theme-switcher');
    if (themeSwitcherBtn) {
        themeSwitcherBtn.addEventListener('click', () => {
            expandCollapseThemeOptions('expand');
        });
    }
};

const themeSwitcherBtnKeydownEvt = () => {
    const themeSwitcherBtn = document.querySelector('.theme-switcher');
    if (themeSwitcherBtn) {
        themeSwitcherBtn.addEventListener('keydown', (evt) => {
            if (evt.code) {
                handleSwitcherBtnKeyboardCodes(evt.code.toString().toLowerCase());
            }
        });
    }
};

const themeSwitchOptionsKeydownEvt = () => {
    const items = document.querySelectorAll('.theme-switcher-list-item');
    items.forEach((item, idx) => {
        item.addEventListener('keydown', (evt) => {
            if (evt.code) {
                handleThemeItemKeyboardCodes(evt.code.toString().toLowerCase(), idx);
            }
        });
    })
};

const onloadFns = () => {
    changeThemeEvt();
    replaceLogo();
    setTheme();
    themeSwitcherBtnClickEvt();
    themeSwitcherBtnKeydownEvt();
    themeSwitchOptionsKeydownEvt();
};

export { onloadFns, closeThemeSwitcherIfClickedOutside };
