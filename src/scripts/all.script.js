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
                child.removeAttribute('tabindex');
            });
        } else {
            obj.setAttribute('aria-hidden', 'true');
            const children = getAllChildren(obj);
            children.forEach((child) => {
                child.setAttribute('aria-hidden', 'true');
                child.setAttribute('tabindex', '-1');
            });
        }
    });
}

function jumpBtnKeyboardEvtHandler() {
    const obj = document.querySelector('#skip-content-link');
    if (obj) {
        obj.addEventListener('keydown', (evt) => {
            if (evt.code) {
                if (evt.code.toString().toLowerCase() === 'escape') {
                    obj.blur();
                }
            }
        });
    }
}

function replaceMediaPrint() {
    const objs = document.querySelectorAll("link[media='print']");
    objs.forEach((obj) => {
        obj.setAttribute('media', 'all');
    });
}

window.addEventListener('DOMContentLoaded', () => {
    theme.onloadFns();
    documentClickEvt();
    removeAriaHiddenOnSmallScreen();
    jumpBtnKeyboardEvtHandler();
    replaceMediaPrint();
});

window.addEventListener('resize', () => {
    removeAriaHiddenOnSmallScreen();
});
