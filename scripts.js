(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var theme = _interopRequireWildcard(require("./theme-switcher/theme-switcher"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function closeAllMaskComponents() {
  var objClasses = ['off-menu', 'mask'];
  objClasses.forEach(function (obj) {
    document.querySelector(".".concat(obj)).classList.remove('root-block');
    document.querySelector(".".concat(obj)).classList.add('root-hidden');
  });
}

function removeOffMenuOnMaskClick(evt) {
  var paths = evt.composedPath();
  var clickedOnMask = false;

  for (var i = 0; i < paths.length; i++) {
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
  document.addEventListener('click', function (evt) {
    theme.closeThemeSwitcherIfClickedOutside(evt);
    removeOffMenuOnMaskClick(evt);
  });
}

function copyThemeSwitcherToOffMenu() {
  var currWidth = window.innerWidth;
  var themeTogglerHolder = document.querySelector('.theme-toggler-holder');
  var themeToggler = document.querySelector('.theme-toggler');
  var offMenuItem = document.querySelector('.theme-switcher-off-menu-holder');

  if (themeTogglerHolder && themeToggler && offMenuItem) {
    var isInsideMainSpace = themeToggler.parentElement.classList.contains('theme-toggler-holder');

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
  var obj = document.querySelector('.off-menu-close > button');
  obj.addEventListener('click', function () {
    document.querySelector('.off-menu').classList.add('root-hidden');
    document.querySelector('.mask').classList.add('root-hidden');
    document.querySelector('.mask').classList.remove('root-block');
  });
}

function showOffMenu() {
  var obj = document.querySelector('.off-menu-show > button');
  obj.addEventListener('click', function () {
    document.querySelector('.off-menu').classList.remove('root-hidden');
    document.querySelector('.mask').classList.remove('root-hidden');
    document.querySelector('.mask').classList.add('root-block');
  });
}

function getAllChildren(obj) {
  if (obj.children.length === 0) {
    return [];
  }

  var children = Array.from(obj.children);
  children.forEach(function (child) {
    children.push.apply(children, _toConsumableArray(getAllChildren(child)));
  });
  return children;
}

function removeAriaHiddenOnSmallScreen() {
  var width = window.innerWidth;
  var objs = document.querySelectorAll('.sm-aria-show');
  objs.forEach(function (obj) {
    if (width <= 640) {
      obj.removeAttribute('aria-hidden');
      var children = getAllChildren(obj);
      children.forEach(function (child) {
        child.removeAttribute('aria-hidden');
      });
    } else {
      obj.setAttribute('aria-hidden', 'true');

      var _children = getAllChildren(obj);

      _children.forEach(function (child) {
        child.setAttribute('aria-hidden', 'true');
      });
    }
  });
}

window.addEventListener('DOMContentLoaded', function () {
  theme.onloadFns();
  documentClickEvt();
  copyThemeSwitcherToOffMenu();
  closeOffMenu();
  showOffMenu();
  removeAriaHiddenOnSmallScreen();
});
window.addEventListener('resize', function () {
  copyThemeSwitcherToOffMenu();
  removeAriaHiddenOnSmallScreen();
});

},{"./theme-switcher/theme-switcher":2}],2:[function(require,module,exports){
'use strict';

function themeSwitcherOptionsHtml() {
  return {
    system: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-6 w-6 inline-block\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z\"/>\n</svg>\n<span class=\"inline-block ml-1\">System Default</span>",
    light: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-6 w-6 inline-block\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z\" />\n</svg>\n<span class=\"inline-block ml-1\">Light Theme</span>",
    dark: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-6 w-6 inline-block\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z\" />\n</svg>\n<span class=\"inline-block ml-1\">Dark Theme</span>"
  };
}

function expandCollapseThemeOptions() {
  var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (['expand', 'collapse'].indexOf(action) === -1) {
    return;
  }

  var themeSwitcherBtn = document.querySelector('.theme-switcher');
  var themeSwitcherOptions = document.querySelector('.theme-switcher-options');
  var final_action = action !== '' ? action.toLowerCase() : '';

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
  var paths = evt.composedPath();
  var insideThemeToggler = false;

  for (var i = 0; i < paths.length; i++) {
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
  var themeHtmls = themeSwitcherOptionsHtml();
  var themeSwitcherLinks = document.querySelectorAll('.theme-switcher-list-item > .theme-switcher-link');

  for (var i = 0; i < themeSwitcherLinks.length; i++) {
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
  var themeSwitcherItems = document.querySelectorAll('.theme-switcher-list-item');

  for (var i = 0; i < themeSwitcherItems.length; i++) {
    if (Number(idx) === i) {
      themeSwitcherItems[i].classList.add('theme-switcher-list-item--active');
      themeSwitcherItems[i].setAttribute('aria-selected', 'true');
    } else {
      themeSwitcherItems[i].classList.remove('theme-switcher-list-item--active');
      themeSwitcherItems[i].removeAttribute('aria-selected');
    }
  }
}

function setActiveDescendantAriaOnUl() {
  var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (['expand', 'collapse'].indexOf(action) === -1) {
    return;
  }

  var themeSwitcherOptions = document.querySelector('.theme-switcher-options');

  if (action === 'collapse') {
    themeSwitcherOptions.removeAttribute('aria-activedescendant');
    return;
  }

  var themeSwitcherListActiveItem = document.querySelector('.theme-switcher-list-item--active');

  if (themeSwitcherOptions && themeSwitcherListActiveItem) {
    var activeId = themeSwitcherListActiveItem.id;
    themeSwitcherOptions.setAttribute('aria-activedescendant', activeId);
    setTimeout(function () {
      themeSwitcherListActiveItem.focus();
    });
  } else {
    themeSwitcherOptions.removeAttribute('aria-activedescendant');
  }
}

function updateHtmlClass() {
  var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'light';
  var systemTheme = '';

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
  var darkPreferTheme = window.matchMedia('(prefers-color-scheme: dark)');
  var hasDarkPreferTheme = typeof darkPreferTheme.matches === 'boolean';

  if (hasDarkPreferTheme) {
    return darkPreferTheme.matches ? 'dark' : 'light';
  }

  return 'light';
}

function focusOnSwitcherBtn() {
  var themeSwitcherBtn = document.querySelector('.theme-switcher');

  if (themeSwitcherBtn) {
    setTimeout(function () {
      return themeSwitcherBtn.focus();
    });
  }
}

function handleChangeThemeEvt(idx) {
  var collapse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (idx === 2) {
    setTheme('system');
  } else if (idx === 1) {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  if (collapse) {
    expandCollapseThemeOptions('collapse');
    focusOnSwitcherBtn();
  }
}

function moveUpDownSwitcherOptions() {
  var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (['prev', 'next', 'home', 'end'].indexOf(option) === -1) {
    return;
  }

  var switcherListOptions = document.querySelectorAll('.theme-switcher-list-item');
  var currentActiveOption = document.activeElement;

  if (option === 'home') {
    switcherListOptions[0].focus();
    handleChangeThemeEvt(0, false);
  } else if (option === 'end') {
    switcherListOptions[switcherListOptions.length - 1].focus();
    handleChangeThemeEvt(switcherListOptions.length - 1, false);
  } else if (currentActiveOption) {
    for (var i = 0; i < switcherListOptions.length; i++) {
      if (switcherListOptions[i] === currentActiveOption) {
        if (option === 'prev') {
          if (i === 0) {
            switcherListOptions[switcherListOptions.length - 1].focus();
            handleChangeThemeEvt(switcherListOptions.length - 1, false);
          } else {
            switcherListOptions[i - 1].focus();
            handleChangeThemeEvt(i - 1, false);
          }
        } else {
          if (i === switcherListOptions.length - 1) {
            switcherListOptions[0].focus();
            handleChangeThemeEvt(0, false);
          } else {
            switcherListOptions[i + 1].focus();
            handleChangeThemeEvt(i + 1, false);
          }
        }

        break;
      }
    }
  }
}

function moveToSpecificSwitchOptionByKey(key) {
  var keyVal = key.split('key').slice(-1)[0];
  var switcherListOptions = document.querySelectorAll('.theme-switcher-list-item');

  if (switcherListOptions.length > 0) {
    var options = Array.from(switcherListOptions).map(function (opt) {
      return opt.getAttribute('data-option');
    });

    for (var i = 0; i < options.length; i++) {
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
  var themeSwitcherBtn = document.querySelector('.theme-switcher');
  var currentActiveThemeLink = document.querySelector('.theme-switcher-list-item--active');

  if (key === 'enter') {
    if (currentActiveThemeLink) {
      setTimeout(function () {
        return currentActiveThemeLink.focus();
      });
    }
  } else if (key === 'arrowup') {
    expandCollapseThemeOptions('expand');
  } else if (key === 'arrowdown') {
    expandCollapseThemeOptions('expand');
  }
}

var replaceLogo = function replaceLogo() {
  var hasDarkTheme = document.querySelector('html').classList.contains('theme-dark');
  var logoImgObj = document.querySelector('.site-logo');

  if (logoImgObj) {
    if (hasDarkTheme) {
      logoImgObj.setAttribute('src', '/images/darklogo.svg');
    } else {
      logoImgObj.setAttribute('src', '/images/lightlogo.svg');
    }
  }
};

var setTheme = function setTheme() {
  var forced = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var themeHtmls = themeSwitcherOptionsHtml();
  var theme = forced ? forced : window.localStorage.getItem('color-theme');
  var themeSwitcherBtn = document.querySelector('.theme-switcher');
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
};

var changeThemeEvt = function changeThemeEvt() {
  var items = document.querySelectorAll('.theme-switcher-list-item');

  var _loop = function _loop(i) {
    items[i].addEventListener('click', function (evt) {
      handleChangeThemeEvt(i);
    });
  };

  for (var i = 0; i < items.length; i++) {
    _loop(i);
  }
};

var themeSwitcherBtnClickEvt = function themeSwitcherBtnClickEvt() {
  var themeSwitcherBtn = document.querySelector('.theme-switcher');

  if (themeSwitcherBtn) {
    themeSwitcherBtn.addEventListener('click', function () {
      expandCollapseThemeOptions('expand');
    });
  }
};

var themeSwitcherBtnKeydownEvt = function themeSwitcherBtnKeydownEvt() {
  var themeSwitcherBtn = document.querySelector('.theme-switcher');

  if (themeSwitcherBtn) {
    themeSwitcherBtn.addEventListener('keydown', function (evt) {
      if (evt.code) {
        handleSwitcherBtnKeyboardCodes(evt.code.toString().toLowerCase());
      }
    });
  }
};

var themeSwitchOptionsKeydownEvt = function themeSwitchOptionsKeydownEvt() {
  var items = document.querySelectorAll('.theme-switcher-list-item');
  items.forEach(function (item, idx) {
    item.addEventListener('keydown', function (evt) {
      if (evt.code) {
        handleThemeItemKeyboardCodes(evt.code.toString().toLowerCase(), idx);
      }
    });
  });
};

var onloadFns = function onloadFns() {
  changeThemeEvt();
  replaceLogo();
  setTheme();
  themeSwitcherBtnClickEvt();
  themeSwitcherBtnKeydownEvt();
  themeSwitchOptionsKeydownEvt();
};

module.exports = {
  onloadFns: onloadFns,
  closeThemeSwitcherIfClickedOutside: closeThemeSwitcherIfClickedOutside
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYWxsLnNjcmlwdC5qcyIsInNyYy9qcy90aGVtZS1zd2l0Y2hlci90aGVtZS1zd2l0Y2hlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLFNBQVMsc0JBQVQsR0FBa0M7QUFDOUIsTUFBTSxVQUFVLEdBQUcsQ0FBQyxVQUFELEVBQWEsTUFBYixDQUFuQjtBQUNBLEVBQUEsVUFBVSxDQUFDLE9BQVgsQ0FBbUIsVUFBQyxHQUFELEVBQVM7QUFDeEIsSUFBQSxRQUFRLENBQUMsYUFBVCxZQUEyQixHQUEzQixHQUFrQyxTQUFsQyxDQUE0QyxNQUE1QyxDQUFtRCxZQUFuRDtBQUNBLElBQUEsUUFBUSxDQUFDLGFBQVQsWUFBMkIsR0FBM0IsR0FBa0MsU0FBbEMsQ0FBNEMsR0FBNUMsQ0FBZ0QsYUFBaEQ7QUFDSCxHQUhEO0FBSUg7O0FBRUQsU0FBUyx3QkFBVCxDQUFrQyxHQUFsQyxFQUF1QztBQUNuQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsWUFBSixFQUFkO0FBQ0EsTUFBSSxhQUFhLEdBQUcsS0FBcEI7O0FBQ0EsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFiLEVBQWdCLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBMUIsRUFBa0MsQ0FBQyxFQUFuQyxFQUF1QztBQUNuQyxRQUFJLEtBQUssQ0FBQyxDQUFELENBQUwsSUFBWSxLQUFLLENBQUMsQ0FBRCxDQUFMLENBQVMsU0FBckIsSUFBa0MsS0FBSyxDQUFDLENBQUQsQ0FBTCxDQUFTLFNBQVQsQ0FBbUIsUUFBbkIsQ0FBNEIsTUFBNUIsQ0FBdEMsRUFBMkU7QUFDdkUsTUFBQSxhQUFhLEdBQUcsSUFBaEI7QUFDQTtBQUNIO0FBQ0o7O0FBQ0QsTUFBSSxhQUFKLEVBQW1CO0FBQ2YsSUFBQSxzQkFBc0I7QUFDekI7QUFDSjs7QUFFRCxTQUFTLGdCQUFU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SixLQUpEO0FBS0gsR0FORDtBQU9ILENBVEQ7O0FBV0EsSUFBTSxTQUFTLEdBQUcsU0FBWixTQUFZLEdBQU07QUFDcEIsRUFBQSxjQUFjO0FBQ2QsRUFBQSxXQUFXO0FBQ1gsRUFBQSxRQUFRO0FBQ1IsRUFBQSx3QkFBd0I7QUFDeEIsRUFBQSwwQkFBMEI7QUFDMUIsRUFBQSw0QkFBNEI7QUFDL0IsQ0FQRDs7QUFTQSxNQUFNLENBQUMsT0FBUCxHQUFpQjtBQUFFLEVBQUEsU0FBUyxFQUFULFNBQUY7QUFBYSxFQUFBLGtDQUFrQyxFQUFsQztBQUFiLENBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgKiBhcyB0aGVtZSBmcm9tICcuL3RoZW1lLXN3aXRjaGVyL3RoZW1lLXN3aXRjaGVyJztcblxuZnVuY3Rpb24gY2xvc2VBbGxNYXNrQ29tcG9uZW50cygpIHtcbiAgICBjb25zdCBvYmpDbGFzc2VzID0gWydvZmYtbWVudScsICdtYXNrJ107XG4gICAgb2JqQ2xhc3Nlcy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7b2JqfWApLmNsYXNzTGlzdC5yZW1vdmUoJ3Jvb3QtYmxvY2snKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7b2JqfWApLmNsYXNzTGlzdC5hZGQoJ3Jvb3QtaGlkZGVuJyk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZU9mZk1lbnVPbk1hc2tDbGljayhldnQpIHtcbiAgICBjb25zdCBwYXRocyA9IGV2dC5jb21wb3NlZFBhdGgoKTtcbiAgICBsZXQgY2xpY2tlZE9uTWFzayA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHBhdGhzW2ldICYmIHBhdGhzW2ldLmNsYXNzTGlzdCAmJiBwYXRoc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoJ21hc2snKSkge1xuICAgICAgICAgICAgY2xpY2tlZE9uTWFzayA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2xpY2tlZE9uTWFzaykge1xuICAgICAgICBjbG9zZUFsbE1hc2tDb21wb25lbnRzKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkb2N1bWVudENsaWNrRXZ0KCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4ge1xuICAgICAgICB0aGVtZS5jbG9zZVRoZW1lU3dpdGNoZXJJZkNsaWNrZWRPdXRzaWRlKGV2dCk7XG4gICAgICAgIHJlbW92ZU9mZk1lbnVPbk1hc2tDbGljayhldnQpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjb3B5VGhlbWVTd2l0Y2hlclRvT2ZmTWVudSgpIHtcbiAgICBjb25zdCBjdXJyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBjb25zdCB0aGVtZVRvZ2dsZXJIb2xkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlbWUtdG9nZ2xlci1ob2xkZXInKTtcbiAgICBjb25zdCB0aGVtZVRvZ2dsZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlbWUtdG9nZ2xlcicpO1xuICAgIGNvbnN0IG9mZk1lbnVJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRoZW1lLXN3aXRjaGVyLW9mZi1tZW51LWhvbGRlcicpO1xuICAgIGlmICh0aGVtZVRvZ2dsZXJIb2xkZXIgJiYgdGhlbWVUb2dnbGVyICYmIG9mZk1lbnVJdGVtKSB7XG4gICAgICAgIGNvbnN0IGlzSW5zaWRlTWFpblNwYWNlID0gdGhlbWVUb2dnbGVyLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0aGVtZS10b2dnbGVyLWhvbGRlcicpO1xuICAgICAgICBpZiAoaXNJbnNpZGVNYWluU3BhY2UpIHtcbiAgICAgICAgICAgIGlmIChjdXJyV2lkdGggPD0gNjQwKSB7XG4gICAgICAgICAgICAgICAgb2ZmTWVudUl0ZW0uYXBwZW5kQ2hpbGQodGhlbWVUb2dnbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjdXJyV2lkdGggPiA2NDApIHtcbiAgICAgICAgICAgICAgICB0aGVtZVRvZ2dsZXJIb2xkZXIuYXBwZW5kQ2hpbGQodGhlbWVUb2dnbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY2xvc2VPZmZNZW51KCkge1xuICAgIGNvbnN0IG9iaiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vZmYtbWVudS1jbG9zZSA+IGJ1dHRvbicpO1xuICAgIG9iai5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9mZi1tZW51JykuY2xhc3NMaXN0LmFkZCgncm9vdC1oaWRkZW4nKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hc2snKS5jbGFzc0xpc3QuYWRkKCdyb290LWhpZGRlbicpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFzaycpLmNsYXNzTGlzdC5yZW1vdmUoJ3Jvb3QtYmxvY2snKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc2hvd09mZk1lbnUoKSB7XG4gICAgY29uc3Qgb2JqID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9mZi1tZW51LXNob3cgPiBidXR0b24nKTtcbiAgICBvYmouYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vZmYtbWVudScpLmNsYXNzTGlzdC5yZW1vdmUoJ3Jvb3QtaGlkZGVuJyk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYXNrJykuY2xhc3NMaXN0LnJlbW92ZSgncm9vdC1oaWRkZW4nKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hc2snKS5jbGFzc0xpc3QuYWRkKCdyb290LWJsb2NrJyk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldEFsbENoaWxkcmVuKG9iaikge1xuICAgIGlmIChvYmouY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgY29uc3QgY2hpbGRyZW4gPSBBcnJheS5mcm9tKG9iai5jaGlsZHJlbik7XG4gICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgY2hpbGRyZW4ucHVzaCguLi5nZXRBbGxDaGlsZHJlbihjaGlsZCkpO1xuICAgIH0pO1xuICAgIHJldHVybiBjaGlsZHJlbjtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQXJpYUhpZGRlbk9uU21hbGxTY3JlZW4oKSB7XG4gICAgY29uc3Qgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBjb25zdCBvYmpzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNtLWFyaWEtc2hvdycpO1xuICAgIG9ianMuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgIGlmICh3aWR0aCA8PSA2NDApIHtcbiAgICAgICAgICAgIG9iai5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbiA9IGdldEFsbENoaWxkcmVuKG9iaik7XG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNoaWxkLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JqLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBnZXRBbGxDaGlsZHJlbihvYmopO1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICAgICAgICBjaGlsZC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIHRoZW1lLm9ubG9hZEZucygpO1xuICAgIGRvY3VtZW50Q2xpY2tFdnQoKTtcbiAgICBjb3B5VGhlbWVTd2l0Y2hlclRvT2ZmTWVudSgpO1xuICAgIGNsb3NlT2ZmTWVudSgpO1xuICAgIHNob3dPZmZNZW51KCk7XG4gICAgcmVtb3ZlQXJpYUhpZGRlbk9uU21hbGxTY3JlZW4oKTtcbn0pO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgIGNvcHlUaGVtZVN3aXRjaGVyVG9PZmZNZW51KCk7XG4gICAgcmVtb3ZlQXJpYUhpZGRlbk9uU21hbGxTY3JlZW4oKTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiB0aGVtZVN3aXRjaGVyT3B0aW9uc0h0bWwoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3lzdGVtOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3M9XCJoLTYgdy02IGlubGluZS1ibG9ja1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiPlxuICAgIDxwYXRoIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS13aWR0aD1cIjJcIiBkPVwiTTkuNzUgMTdMOSAyMGwtMSAxaDhsLTEtMS0uNzUtM00zIDEzaDE4TTUgMTdoMTRhMiAyIDAgMDAyLTJWNWEyIDIgMCAwMC0yLTJINWEyIDIgMCAwMC0yIDJ2MTBhMiAyIDAgMDAyIDJ6XCIvPlxuPC9zdmc+XG48c3BhbiBjbGFzcz1cImlubGluZS1ibG9jayBtbC0xXCI+U3lzdGVtIERlZmF1bHQ8L3NwYW4+YCxcbiAgICAgICAgbGlnaHQ6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cImgtNiB3LTYgaW5saW5lLWJsb2NrXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XG4gICAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIGQ9XCJNMTIgM3YxbTAgMTZ2MW05LTloLTFNNCAxMkgzbTE1LjM2NCA2LjM2NGwtLjcwNy0uNzA3TTYuMzQzIDYuMzQzbC0uNzA3LS43MDdtMTIuNzI4IDBsLS43MDcuNzA3TTYuMzQzIDE3LjY1N2wtLjcwNy43MDdNMTYgMTJhNCA0IDAgMTEtOCAwIDQgNCAwIDAxOCAwelwiIC8+XG48L3N2Zz5cbjxzcGFuIGNsYXNzPVwiaW5saW5lLWJsb2NrIG1sLTFcIj5MaWdodCBUaGVtZTwvc3Bhbj5gLFxuICAgICAgICBkYXJrOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3M9XCJoLTYgdy02IGlubGluZS1ibG9ja1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiPlxuICAgIDxwYXRoIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS13aWR0aD1cIjJcIiBkPVwiTTIwLjM1NCAxNS4zNTRBOSA5IDAgMDE4LjY0NiAzLjY0NiA5LjAwMyA5LjAwMyAwIDAwMTIgMjFhOS4wMDMgOS4wMDMgMCAwMDguMzU0LTUuNjQ2elwiIC8+XG48L3N2Zz5cbjxzcGFuIGNsYXNzPVwiaW5saW5lLWJsb2NrIG1sLTFcIj5EYXJrIFRoZW1lPC9zcGFuPmBcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBleHBhbmRDb2xsYXBzZVRoZW1lT3B0aW9ucyhhY3Rpb24gPSAnJykge1xuICAgIGlmIChbJ2V4cGFuZCcsICdjb2xsYXBzZSddLmluZGV4T2YoYWN0aW9uKSA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB0aGVtZVN3aXRjaGVyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRoZW1lLXN3aXRjaGVyJyk7XG4gICAgY29uc3QgdGhlbWVTd2l0Y2hlck9wdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlbWUtc3dpdGNoZXItb3B0aW9ucycpO1xuICAgIGxldCBmaW5hbF9hY3Rpb24gPSBhY3Rpb24gIT09ICcnID8gYWN0aW9uLnRvTG93ZXJDYXNlKCkgOiAnJztcbiAgICBpZiAodGhlbWVTd2l0Y2hlckJ0biAmJiB0aGVtZVN3aXRjaGVyT3B0aW9ucykge1xuICAgICAgICBpZiAoYWN0aW9uID09PSAnJykge1xuICAgICAgICAgICAgaWYgKHRoZW1lU3dpdGNoZXJPcHRpb25zLmNsYXNzTGlzdC5jb250YWlucygnZXhwYW5kZWQnKSkge1xuICAgICAgICAgICAgICAgIGZpbmFsX2FjdGlvbiA9ICdjb2xsYXBzZSc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZpbmFsX2FjdGlvbiA9ICdleHBhbmQnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChmaW5hbF9hY3Rpb24gPT09ICdleHBhbmQnKSB7XG4gICAgICAgIHRoZW1lU3dpdGNoZXJPcHRpb25zLmNsYXNzTGlzdC5hZGQoJ2V4cGFuZGVkJyk7XG4gICAgICAgIHRoZW1lU3dpdGNoZXJCdG4uY2xhc3NMaXN0LmFkZCgndGhlbWUtc3dpdGNoZXItYnRuLS1hY3RpdmUnKTtcbiAgICAgICAgdGhlbWVTd2l0Y2hlckJ0bi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoZW1lU3dpdGNoZXJPcHRpb25zLmNsYXNzTGlzdC5yZW1vdmUoJ2V4cGFuZGVkJyk7XG4gICAgICAgIHRoZW1lU3dpdGNoZXJCdG4uY2xhc3NMaXN0LnJlbW92ZSgndGhlbWUtc3dpdGNoZXItYnRuLS1hY3RpdmUnKTtcbiAgICAgICAgdGhlbWVTd2l0Y2hlckJ0bi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICB9XG4gICAgc2V0QWN0aXZlRGVzY2VuZGFudEFyaWFPblVsKGZpbmFsX2FjdGlvbik7XG59XG5cbmZ1bmN0aW9uIGNsb3NlVGhlbWVTd2l0Y2hlcklmQ2xpY2tlZE91dHNpZGUoZXZ0KSB7XG4gICAgY29uc3QgcGF0aHMgPSBldnQuY29tcG9zZWRQYXRoKCk7XG4gICAgbGV0IGluc2lkZVRoZW1lVG9nZ2xlciA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHBhdGhzW2ldICYmIHBhdGhzW2ldLmNsYXNzTGlzdCAmJiBwYXRoc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoJ3RoZW1lLXRvZ2dsZXInKSkge1xuICAgICAgICAgICAgaW5zaWRlVGhlbWVUb2dnbGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghaW5zaWRlVGhlbWVUb2dnbGVyKSB7XG4gICAgICAgIGV4cGFuZENvbGxhcHNlVGhlbWVPcHRpb25zKCdjb2xsYXBzZScpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZVRoZW1lTWVudUl0ZW1zKCkge1xuICAgIGNvbnN0IHRoZW1lSHRtbHMgPSB0aGVtZVN3aXRjaGVyT3B0aW9uc0h0bWwoKTtcbiAgICBjb25zdCB0aGVtZVN3aXRjaGVyTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGhlbWUtc3dpdGNoZXItbGlzdC1pdGVtID4gLnRoZW1lLXN3aXRjaGVyLWxpbmsnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoZW1lU3dpdGNoZXJMaW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgdGhlbWVTd2l0Y2hlckxpbmtzW2ldLmlubmVySFRNTCA9IHRoZW1lSHRtbHMubGlnaHQ7XG4gICAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgdGhlbWVTd2l0Y2hlckxpbmtzW2ldLmlubmVySFRNTCA9IHRoZW1lSHRtbHMuZGFyaztcbiAgICAgICAgfSBlbHNlIGlmIChpID09PSAyKSB7XG4gICAgICAgICAgICB0aGVtZVN3aXRjaGVyTGlua3NbaV0uaW5uZXJIVE1MID0gdGhlbWVIdG1scy5zeXN0ZW07XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldEFjdGl2ZVRoZW1lTGluayhpZHgpIHtcbiAgICBjb25zdCB0aGVtZVN3aXRjaGVySXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGhlbWUtc3dpdGNoZXItbGlzdC1pdGVtJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGVtZVN3aXRjaGVySXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKE51bWJlcihpZHgpID09PSBpKSB7XG4gICAgICAgICAgICB0aGVtZVN3aXRjaGVySXRlbXNbaV0uY2xhc3NMaXN0LmFkZCgndGhlbWUtc3dpdGNoZXItbGlzdC1pdGVtLS1hY3RpdmUnKTtcbiAgICAgICAgICAgIHRoZW1lU3dpdGNoZXJJdGVtc1tpXS5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhlbWVTd2l0Y2hlckl0ZW1zW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3RoZW1lLXN3aXRjaGVyLWxpc3QtaXRlbS0tYWN0aXZlJyk7XG4gICAgICAgICAgICB0aGVtZVN3aXRjaGVySXRlbXNbaV0ucmVtb3ZlQXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldEFjdGl2ZURlc2NlbmRhbnRBcmlhT25VbChhY3Rpb24gPSAnJykge1xuICAgIGlmIChbJ2V4cGFuZCcsICdjb2xsYXBzZSddLmluZGV4T2YoYWN0aW9uKSA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB0aGVtZVN3aXRjaGVyT3B0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aGVtZS1zd2l0Y2hlci1vcHRpb25zJyk7XG4gICAgaWYgKGFjdGlvbiA9PT0gJ2NvbGxhcHNlJykge1xuICAgICAgICB0aGVtZVN3aXRjaGVyT3B0aW9ucy5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHRoZW1lU3dpdGNoZXJMaXN0QWN0aXZlSXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aGVtZS1zd2l0Y2hlci1saXN0LWl0ZW0tLWFjdGl2ZScpO1xuICAgIGlmICh0aGVtZVN3aXRjaGVyT3B0aW9ucyAmJiB0aGVtZVN3aXRjaGVyTGlzdEFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgY29uc3QgYWN0aXZlSWQgPSB0aGVtZVN3aXRjaGVyTGlzdEFjdGl2ZUl0ZW0uaWQ7XG4gICAgICAgIHRoZW1lU3dpdGNoZXJPcHRpb25zLnNldEF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50JywgYWN0aXZlSWQpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoZW1lU3dpdGNoZXJMaXN0QWN0aXZlSXRlbS5mb2N1cygpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGVtZVN3aXRjaGVyT3B0aW9ucy5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlSHRtbENsYXNzKHRoZW1lID0gJ2xpZ2h0Jykge1xuICAgIGxldCBzeXN0ZW1UaGVtZSA9ICcnO1xuICAgIGlmICh0aGVtZSA9PT0gJ3N5c3RlbScpIHtcbiAgICAgICAgc3lzdGVtVGhlbWUgPSBnZXRTeXN0ZW1Db2xvclNjaGVtZSgpO1xuICAgIH1cbiAgICBpZiAoc3lzdGVtVGhlbWUgPT09ICdkYXJrJyB8fCB0aGVtZSA9PT0gJ2RhcmsnKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKS5jbGFzc0xpc3QuYWRkKCd0aGVtZS1kYXJrJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpLmNsYXNzTGlzdC5yZW1vdmUoJ3RoZW1lLWRhcmsnKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldFN5c3RlbUNvbG9yU2NoZW1lKCkge1xuICAgIGNvbnN0IGRhcmtQcmVmZXJUaGVtZSA9IHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJyk7XG4gICAgY29uc3QgaGFzRGFya1ByZWZlclRoZW1lID0gdHlwZW9mIGRhcmtQcmVmZXJUaGVtZS5tYXRjaGVzID09PSAnYm9vbGVhbic7XG4gICAgaWYgKGhhc0RhcmtQcmVmZXJUaGVtZSkge1xuICAgICAgICByZXR1cm4gZGFya1ByZWZlclRoZW1lLm1hdGNoZXMgPyAnZGFyaycgOiAnbGlnaHQnO1xuICAgIH1cbiAgICByZXR1cm4gJ2xpZ2h0Jztcbn1cblxuZnVuY3Rpb24gZm9jdXNPblN3aXRjaGVyQnRuKCkge1xuICAgIGNvbnN0IHRoZW1lU3dpdGNoZXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlbWUtc3dpdGNoZXInKTtcbiAgICBpZiAodGhlbWVTd2l0Y2hlckJ0bikge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoZW1lU3dpdGNoZXJCdG4uZm9jdXMoKSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVDaGFuZ2VUaGVtZUV2dChpZHgsIGNvbGxhcHNlID0gdHJ1ZSkge1xuICAgIGlmIChpZHggPT09IDIpIHtcbiAgICAgICAgc2V0VGhlbWUoJ3N5c3RlbScpO1xuICAgIH0gZWxzZSBpZiAoaWR4ID09PSAxKSB7XG4gICAgICAgIHNldFRoZW1lKCdkYXJrJylcbiAgICB9IGVsc2Uge1xuICAgICAgICBzZXRUaGVtZSgnbGlnaHQnKTtcbiAgICB9XG4gICAgaWYgKGNvbGxhcHNlKSB7XG4gICAgICAgIGV4cGFuZENvbGxhcHNlVGhlbWVPcHRpb25zKCdjb2xsYXBzZScpO1xuICAgICAgICBmb2N1c09uU3dpdGNoZXJCdG4oKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1vdmVVcERvd25Td2l0Y2hlck9wdGlvbnMob3B0aW9uID0gJycpIHtcbiAgICBpZiAoWydwcmV2JywgJ25leHQnLCAnaG9tZScsICdlbmQnXS5pbmRleE9mKG9wdGlvbikgPT09IC0xKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc3dpdGNoZXJMaXN0T3B0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50aGVtZS1zd2l0Y2hlci1saXN0LWl0ZW0nKTtcbiAgICBjb25zdCBjdXJyZW50QWN0aXZlT3B0aW9uID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICBpZiAob3B0aW9uID09PSAnaG9tZScpIHtcbiAgICAgICAgc3dpdGNoZXJMaXN0T3B0aW9uc1swXS5mb2N1cygpO1xuICAgICAgICBoYW5kbGVDaGFuZ2VUaGVtZUV2dCgwLCBmYWxzZSk7XG4gICAgfSBlbHNlIGlmIChvcHRpb24gPT09ICdlbmQnKSB7XG4gICAgICAgIHN3aXRjaGVyTGlzdE9wdGlvbnNbc3dpdGNoZXJMaXN0T3B0aW9ucy5sZW5ndGggLSAxXS5mb2N1cygpO1xuICAgICAgICBoYW5kbGVDaGFuZ2VUaGVtZUV2dChzd2l0Y2hlckxpc3RPcHRpb25zLmxlbmd0aCAtIDEsIGZhbHNlKTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRBY3RpdmVPcHRpb24pIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2l0Y2hlckxpc3RPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc3dpdGNoZXJMaXN0T3B0aW9uc1tpXSA9PT0gY3VycmVudEFjdGl2ZU9wdGlvbikge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb24gPT09ICdwcmV2Jykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoZXJMaXN0T3B0aW9uc1tzd2l0Y2hlckxpc3RPcHRpb25zLmxlbmd0aCAtIDFdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVDaGFuZ2VUaGVtZUV2dChzd2l0Y2hlckxpc3RPcHRpb25zLmxlbmd0aCAtIDEsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaGVyTGlzdE9wdGlvbnNbaS0xXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQ2hhbmdlVGhlbWVFdnQoaS0xLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gc3dpdGNoZXJMaXN0T3B0aW9ucy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2hlckxpc3RPcHRpb25zWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVDaGFuZ2VUaGVtZUV2dCgwLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2hlckxpc3RPcHRpb25zW2krMV0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUNoYW5nZVRoZW1lRXZ0KGkrMSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBtb3ZlVG9TcGVjaWZpY1N3aXRjaE9wdGlvbkJ5S2V5KGtleSkge1xuICAgIGNvbnN0IGtleVZhbCA9IGtleS5zcGxpdCgna2V5Jykuc2xpY2UoLTEpWzBdO1xuICAgIGNvbnN0IHN3aXRjaGVyTGlzdE9wdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGhlbWUtc3dpdGNoZXItbGlzdC1pdGVtJyk7XG4gICAgaWYgKHN3aXRjaGVyTGlzdE9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gQXJyYXkuZnJvbShzd2l0Y2hlckxpc3RPcHRpb25zKS5tYXAob3B0ID0+IG9wdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3B0aW9uJykpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zW2ldICYmIG9wdGlvbnNbaV0uc3RhcnRzV2l0aChrZXlWYWwpKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoZXJMaXN0T3B0aW9uc1tpXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIGhhbmRsZUNoYW5nZVRoZW1lRXZ0KGksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlVGhlbWVJdGVtS2V5Ym9hcmRDb2RlcyhrZXksIGlkeCkge1xuICAgIGlmIChrZXkgPT09ICdlbnRlcicpIHtcbiAgICAgICAgaGFuZGxlQ2hhbmdlVGhlbWVFdnQoaWR4KTtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ2VzY2FwZScpIHtcbiAgICAgICAgZXhwYW5kQ29sbGFwc2VUaGVtZU9wdGlvbnMoJ2NvbGxhcHNlJyk7XG4gICAgICAgIGZvY3VzT25Td2l0Y2hlckJ0bigpO1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnYXJyb3d1cCcpIHtcbiAgICAgICAgbW92ZVVwRG93blN3aXRjaGVyT3B0aW9ucygncHJldicpO1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnYXJyb3dkb3duJykge1xuICAgICAgICBtb3ZlVXBEb3duU3dpdGNoZXJPcHRpb25zKCduZXh0Jyk7XG4gICAgfSBlbHNlIGlmIChrZXkgPT09ICdob21lJyB8fCBrZXkgPT09ICdlbmQnKSB7XG4gICAgICAgIG1vdmVVcERvd25Td2l0Y2hlck9wdGlvbnMoa2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBtb3ZlVG9TcGVjaWZpY1N3aXRjaE9wdGlvbkJ5S2V5KGtleSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVTd2l0Y2hlckJ0bktleWJvYXJkQ29kZXMoa2V5KSB7XG4gICAgY29uc3QgdGhlbWVTd2l0Y2hlckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aGVtZS1zd2l0Y2hlcicpO1xuICAgIGNvbnN0IGN1cnJlbnRBY3RpdmVUaGVtZUxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlbWUtc3dpdGNoZXItbGlzdC1pdGVtLS1hY3RpdmUnKTtcbiAgICBpZiAoa2V5ID09PSAnZW50ZXInKSB7XG4gICAgICAgIGlmIChjdXJyZW50QWN0aXZlVGhlbWVMaW5rKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGN1cnJlbnRBY3RpdmVUaGVtZUxpbmsuZm9jdXMoKSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ2Fycm93dXAnKSB7XG4gICAgICAgIGV4cGFuZENvbGxhcHNlVGhlbWVPcHRpb25zKCdleHBhbmQnKTtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ2Fycm93ZG93bicpIHtcbiAgICAgICAgZXhwYW5kQ29sbGFwc2VUaGVtZU9wdGlvbnMoJ2V4cGFuZCcpO1xuICAgIH1cbn1cblxuXG5jb25zdCByZXBsYWNlTG9nbyA9ICgpID0+IHtcbiAgICBjb25zdCBoYXNEYXJrVGhlbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdodG1sJykuY2xhc3NMaXN0LmNvbnRhaW5zKCd0aGVtZS1kYXJrJyk7XG4gICAgY29uc3QgbG9nb0ltZ09iaiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaXRlLWxvZ28nKTtcbiAgICBpZiAobG9nb0ltZ09iaikge1xuICAgICAgICBpZiAoaGFzRGFya1RoZW1lKSB7XG4gICAgICAgICAgICBsb2dvSW1nT2JqLnNldEF0dHJpYnV0ZSgnc3JjJywgJy9pbWFnZXMvZGFya2xvZ28uc3ZnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2dvSW1nT2JqLnNldEF0dHJpYnV0ZSgnc3JjJywgJy9pbWFnZXMvbGlnaHRsb2dvLnN2ZycpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuY29uc3Qgc2V0VGhlbWUgPSAoZm9yY2VkID0gbnVsbCkgPT4ge1xuICAgIGNvbnN0IHRoZW1lSHRtbHMgPSB0aGVtZVN3aXRjaGVyT3B0aW9uc0h0bWwoKTtcbiAgICBjb25zdCB0aGVtZSA9IGZvcmNlZCA/IGZvcmNlZCA6IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY29sb3ItdGhlbWUnKTtcbiAgICBjb25zdCB0aGVtZVN3aXRjaGVyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRoZW1lLXN3aXRjaGVyJyk7XG4gICAgaW5pdGlhbGl6ZVRoZW1lTWVudUl0ZW1zKCk7XG4gICAgaWYgKHRoZW1lU3dpdGNoZXJCdG4pIHtcbiAgICAgICAgaWYgKHRoZW1lLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSA9PT0gJ3N5c3RlbScpIHtcbiAgICAgICAgICAgIHRoZW1lU3dpdGNoZXJCdG4uaW5uZXJIVE1MID0gdGhlbWVIdG1scy5zeXN0ZW07XG4gICAgICAgICAgICBzZXRBY3RpdmVUaGVtZUxpbmsoMik7XG4gICAgICAgICAgICB1cGRhdGVIdG1sQ2xhc3MoJ3N5c3RlbScpO1xuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjb2xvci10aGVtZScsICdzeXN0ZW0nKTtcbiAgICAgICAgICAgIHRoZW1lU3dpdGNoZXJCdG4uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1VzaW5nIHN5c3RlbSBkZWZhdWx0IHRoZW1lJyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhlbWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpID09PSAnZGFyaycpIHtcbiAgICAgICAgICAgIHRoZW1lU3dpdGNoZXJCdG4uaW5uZXJIVE1MID0gdGhlbWVIdG1scy5kYXJrO1xuICAgICAgICAgICAgc2V0QWN0aXZlVGhlbWVMaW5rKDEpO1xuICAgICAgICAgICAgdXBkYXRlSHRtbENsYXNzKCdkYXJrJyk7XG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NvbG9yLXRoZW1lJywgJ2RhcmsnKTtcbiAgICAgICAgICAgIHRoZW1lU3dpdGNoZXJCdG4uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1VzaW5nIGRhcmsgdGhlbWUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoZW1lU3dpdGNoZXJCdG4uaW5uZXJIVE1MID0gdGhlbWVIdG1scy5saWdodDtcbiAgICAgICAgICAgIHNldEFjdGl2ZVRoZW1lTGluaygwKTtcbiAgICAgICAgICAgIHVwZGF0ZUh0bWxDbGFzcygnbGlnaHQnKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY29sb3ItdGhlbWUnLCAnbGlnaHQnKTtcbiAgICAgICAgICAgIHRoZW1lU3dpdGNoZXJCdG4uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1VzaW5nIGxpZ2h0IHRoZW1lJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmVwbGFjZUxvZ28oKTtcbiAgICB9XG59XG5cbmNvbnN0IGNoYW5nZVRoZW1lRXZ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRoZW1lLXN3aXRjaGVyLWxpc3QtaXRlbScpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlbXNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICBoYW5kbGVDaGFuZ2VUaGVtZUV2dChpKTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxuY29uc3QgdGhlbWVTd2l0Y2hlckJ0bkNsaWNrRXZ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHRoZW1lU3dpdGNoZXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlbWUtc3dpdGNoZXInKTtcbiAgICBpZiAodGhlbWVTd2l0Y2hlckJ0bikge1xuICAgICAgICB0aGVtZVN3aXRjaGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwYW5kQ29sbGFwc2VUaGVtZU9wdGlvbnMoJ2V4cGFuZCcpO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG5jb25zdCB0aGVtZVN3aXRjaGVyQnRuS2V5ZG93bkV2dCA9ICgpID0+IHtcbiAgICBjb25zdCB0aGVtZVN3aXRjaGVyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRoZW1lLXN3aXRjaGVyJyk7XG4gICAgaWYgKHRoZW1lU3dpdGNoZXJCdG4pIHtcbiAgICAgICAgdGhlbWVTd2l0Y2hlckJ0bi5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2dCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2dC5jb2RlKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlU3dpdGNoZXJCdG5LZXlib2FyZENvZGVzKGV2dC5jb2RlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbmNvbnN0IHRoZW1lU3dpdGNoT3B0aW9uc0tleWRvd25FdnQgPSAoKSA9PiB7XG4gICAgY29uc3QgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGhlbWUtc3dpdGNoZXItbGlzdC1pdGVtJyk7XG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSwgaWR4KSA9PiB7XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldnQuY29kZSkge1xuICAgICAgICAgICAgICAgIGhhbmRsZVRoZW1lSXRlbUtleWJvYXJkQ29kZXMoZXZ0LmNvZGUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLCBpZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KVxufTtcblxuY29uc3Qgb25sb2FkRm5zID0gKCkgPT4ge1xuICAgIGNoYW5nZVRoZW1lRXZ0KCk7XG4gICAgcmVwbGFjZUxvZ28oKTtcbiAgICBzZXRUaGVtZSgpO1xuICAgIHRoZW1lU3dpdGNoZXJCdG5DbGlja0V2dCgpO1xuICAgIHRoZW1lU3dpdGNoZXJCdG5LZXlkb3duRXZ0KCk7XG4gICAgdGhlbWVTd2l0Y2hPcHRpb25zS2V5ZG93bkV2dCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IG9ubG9hZEZucywgY2xvc2VUaGVtZVN3aXRjaGVySWZDbGlja2VkT3V0c2lkZSB9O1xuIl19

//# sourceMappingURL=scripts.js.map
