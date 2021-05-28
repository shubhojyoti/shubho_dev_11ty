'use strict';

import * as theme from './theme-switcher/theme-switcher';

function closeAllMaskComponents() {
    const objClasses = ['off-menu', 'mask'];
    objClasses.forEach((obj) => {
        document.querySelector(`.${obj}`).classList.remove('root-block');
        document.querySelector(`.${obj}`).classList.add('root-hidden');
    });
}

function removeOffMenuOnMaskClick(evt) {
    const paths = evt.composedPath();
    let clickedOnMask = false;
    for (let i = 0; i < paths.length; i++) {
        if (paths[i] && paths[i].classList && paths[i].classList.contains('mask')) {
            clickedOnMask = true;
            break;
        }
    }
    if (clickedOnMask) {
        closeAllMaskComponents();
    }
}

function documentClickEvt() {
    document.addEventListener('click', (evt) => {
        theme.closeThemeSwitcherIfClickedOutside(evt);
        removeOffMenuOnMaskClick(evt);
    });
}

function copyThemeSwitcherToOffMenu() {
    const currWidth = window.innerWidth;
    const themeTogglerHolder = document.querySelector('.theme-toggler-holder');
    const themeToggler = document.querySelector('.theme-toggler');
    const offMenuItem = document.querySelector('.theme-switcher-off-menu-holder');
    if (themeTogglerHolder && themeToggler && offMenuItem) {
        const isInsideMainSpace = themeToggler.parentElement.classList.contains('theme-toggler-holder');
        if (isInsideMainSpace) {
            if (currWidth <= 640) {
                offMenuItem.appendChild(themeToggler);
            }
        } else {
            if (currWidth > 640) {
                themeTogglerHolder.appendChild(themeToggler);
            }
        }
    }
}

function closeOffMenu() {
    const obj = document.querySelector('.off-menu-close > button');
    obj.addEventListener('click', () => {
        document.querySelector('.off-menu').classList.add('root-hidden');
        document.querySelector('.mask').classList.add('root-hidden');
        document.querySelector('.mask').classList.remove('root-block');
    });
}

function showOffMenu() {
    const obj = document.querySelector('.off-menu-show > button');
    obj.addEventListener('click', () => {
        document.querySelector('.off-menu').classList.remove('root-hidden');
        document.querySelector('.mask').classList.remove('root-hidden');
        document.querySelector('.mask').classList.add('root-block');
    });
}

function getAllChildren(obj) {
    if (obj.children.length === 0) {
        return [];
    }
    const children = Array.from(obj.children);
    children.forEach((child) => {
        children.push(...getAllChildren(child));
    });
    return children;
}

function removeAriaHiddenOnSmallScreen() {
    const width = window.innerWidth;
    const objs = document.querySelectorAll('.sm-aria-show');
    objs.forEach((obj) => {
        if (width <= 640) {
            obj.removeAttribute('aria-hidden');
            const children = getAllChildren(obj);
            children.forEach((child) => {
                child.removeAttribute('aria-hidden');
            });
        } else {
            obj.setAttribute('aria-hidden', 'true');
            const children = getAllChildren(obj);
            children.forEach((child) => {
                child.setAttribute('aria-hidden', 'true');
            });
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    theme.onloadFns();
    documentClickEvt();
    copyThemeSwitcherToOffMenu();
    closeOffMenu();
    showOffMenu();
    removeAriaHiddenOnSmallScreen();
});

window.addEventListener('resize', () => {
    copyThemeSwitcherToOffMenu();
    removeAriaHiddenOnSmallScreen();
});
