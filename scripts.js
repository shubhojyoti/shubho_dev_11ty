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
        child.removeAttribute('tabindex');
      });
    } else {
      obj.setAttribute('aria-hidden', 'true');

      var _children = getAllChildren(obj);

      _children.forEach(function (child) {
        child.setAttribute('aria-hidden', 'true');
        child.setAttribute('tabindex', '-1');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYWxsLnNjcmlwdC5qcyIsInNyYy9qcy90aGVtZS1zd2l0Y2hlci90aGVtZS1zd2l0Y2hlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLFNBQVMsc0JBQVQsR0FBa0M7QUFDOUIsTUFBTSxVQUFVLEdBQUcsQ0FBQyxVQUFELEVBQWEsTUFBYixDQUFuQjtBQUNBLEVBQUEsVUFBVSxDQUFDLE9BQVgsQ0FBbUIsVUFBQyxHQUFELEVBQVM7QUFDeEIsSUFBQSxRQUFRLENBQUMsYUFBVCxZQUEyQixHQUEzQixHQUFrQyxTQUFsQyxDQUE0QyxNQUE1QyxDQUFtRCxZQUFuRDtBQUNBLElBQUEsUUFBUSxDQUFDLGFBQVQsWUFBMkIsR0FBM0IsR0FBa0MsU0FBbEMsQ0FBNEMsR0FBNUMsQ0FBZ0QsYUFBaEQ7QUFDSCxHQUhEO0FBSUg7O0FBRUQsU0FBUyx3QkFBVCxDQUFrQyxHQUFsQyxFQUF1QztBQUNuQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsWUFBSixFQUFkO0FBQ0EsTUFBSSxhQUFhLEdBQUcsS0FBcEI7O0FBQ0EsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFiLEVBQWdCLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBMUIsRUFBa0MsQ0FBQyxFQUFuQyxFQUF1QztBQUNuQyxRQUFJLEtBQUssQ0FBQyxDQUFELENBQUwsSUFBWSxLQUFLLENBQUMsQ0FBRCxDQUFMLENBQVMsU0FBckIsSUFBa0MsS0FBSyxDQUFDLENBQUQsQ0FBTCxDQUFTLFNBQVQsQ0FBbUIsUUFBbkIsQ0FBNEIsTUFBNUIsQ0FBdEMsRUFBMkU7QUFDdkUsTUFBQSxhQUFhLEdBQUcsSUFBaEI7QUFDQTtBQUNIO0FBQ0o7O0FBQ0QsTUFBSSxhQUFKLEVBQW1CO0FBQ2YsSUFBQSxzQkFBc0I7QUFDekI7QUFDSjs7QUFFRCxTQUFTLGdCQUFU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Q1YsUUFBQSw0QkFBNEIsQ0FBQyxHQUFHLENBQUMsSUFBSixDQUFTLFFBQVQsR0FBb0IsV0FBcEIsRUFBRCxFQUFvQyxHQUFwQyxDQUE1QjtBQUNIO0FBQ0osS0FKRDtBQUtILEdBTkQ7QUFPSCxDQVREOztBQVdBLElBQU0sU0FBUyxHQUFHLFNBQVosU0FBWSxHQUFNO0FBQ3BCLEVBQUEsY0FBYztBQUNkLEVBQUEsV0FBVztBQUNYLEVBQUEsUUFBUTtBQUNSLEVBQUEsd0JBQXdCO0FBQ3hCLEVBQUEsMEJBQTBCO0FBQzFCLEVBQUEsNEJBQTRCO0FBQy9CLENBUEQ7O0FBU0EsTUFBTSxDQUFDLE9BQVAsR0FBaUI7QUFBRSxFQUFBLFNBQVMsRUFBVCxTQUFGO0FBQWEsRUFBQSxrQ0FBa0MsRUFBbEM7QUFBYixDQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgdGhlbWUgZnJvbSAnLi90aGVtZS1zd2l0Y2hlci90aGVtZS1zd2l0Y2hlcic7XG5cbmZ1bmN0aW9uIGNsb3NlQWxsTWFza0NvbXBvbmVudHMoKSB7XG4gICAgY29uc3Qgb2JqQ2xhc3NlcyA9IFsnb2ZmLW1lbnUnLCAnbWFzayddO1xuICAgIG9iakNsYXNzZXMuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke29ian1gKS5jbGFzc0xpc3QucmVtb3ZlKCdyb290LWJsb2NrJyk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke29ian1gKS5jbGFzc0xpc3QuYWRkKCdyb290LWhpZGRlbicpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmVPZmZNZW51T25NYXNrQ2xpY2soZXZ0KSB7XG4gICAgY29uc3QgcGF0aHMgPSBldnQuY29tcG9zZWRQYXRoKCk7XG4gICAgbGV0IGNsaWNrZWRPbk1hc2sgPSBmYWxzZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChwYXRoc1tpXSAmJiBwYXRoc1tpXS5jbGFzc0xpc3QgJiYgcGF0aHNbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdtYXNrJykpIHtcbiAgICAgICAgICAgIGNsaWNrZWRPbk1hc2sgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNsaWNrZWRPbk1hc2spIHtcbiAgICAgICAgY2xvc2VBbGxNYXNrQ29tcG9uZW50cygpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZG9jdW1lbnRDbGlja0V2dCgpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldnQpID0+IHtcbiAgICAgICAgdGhlbWUuY2xvc2VUaGVtZVN3aXRjaGVySWZDbGlja2VkT3V0c2lkZShldnQpO1xuICAgICAgICByZW1vdmVPZmZNZW51T25NYXNrQ2xpY2soZXZ0KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY29weVRoZW1lU3dpdGNoZXJUb09mZk1lbnUoKSB7XG4gICAgY29uc3QgY3VycldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgY29uc3QgdGhlbWVUb2dnbGVySG9sZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRoZW1lLXRvZ2dsZXItaG9sZGVyJyk7XG4gICAgY29uc3QgdGhlbWVUb2dnbGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRoZW1lLXRvZ2dsZXInKTtcbiAgICBjb25zdCBvZmZNZW51SXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aGVtZS1zd2l0Y2hlci1vZmYtbWVudS1ob2xkZXInKTtcbiAgICBpZiAodGhlbWVUb2dnbGVySG9sZGVyICYmIHRoZW1lVG9nZ2xlciAmJiBvZmZNZW51SXRlbSkge1xuICAgICAgICBjb25zdCBpc0luc2lkZU1haW5TcGFjZSA9IHRoZW1lVG9nZ2xlci5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygndGhlbWUtdG9nZ2xlci1ob2xkZXInKTtcbiAgICAgICAgaWYgKGlzSW5zaWRlTWFpblNwYWNlKSB7XG4gICAgICAgICAgICBpZiAoY3VycldpZHRoIDw9IDY0MCkge1xuICAgICAgICAgICAgICAgIG9mZk1lbnVJdGVtLmFwcGVuZENoaWxkKHRoZW1lVG9nZ2xlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY3VycldpZHRoID4gNjQwKSB7XG4gICAgICAgICAgICAgICAgdGhlbWVUb2dnbGVySG9sZGVyLmFwcGVuZENoaWxkKHRoZW1lVG9nZ2xlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNsb3NlT2ZmTWVudSgpIHtcbiAgICBjb25zdCBvYmogPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub2ZmLW1lbnUtY2xvc2UgPiBidXR0b24nKTtcbiAgICBvYmouYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vZmYtbWVudScpLmNsYXNzTGlzdC5hZGQoJ3Jvb3QtaGlkZGVuJyk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYXNrJykuY2xhc3NMaXN0LmFkZCgncm9vdC1oaWRkZW4nKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hc2snKS5jbGFzc0xpc3QucmVtb3ZlKCdyb290LWJsb2NrJyk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHNob3dPZmZNZW51KCkge1xuICAgIGNvbnN0IG9iaiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vZmYtbWVudS1zaG93ID4gYnV0dG9uJyk7XG4gICAgb2JqLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub2ZmLW1lbnUnKS5jbGFzc0xpc3QucmVtb3ZlKCdyb290LWhpZGRlbicpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFzaycpLmNsYXNzTGlzdC5yZW1vdmUoJ3Jvb3QtaGlkZGVuJyk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYXNrJykuY2xhc3NMaXN0LmFkZCgncm9vdC1ibG9jaycpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRBbGxDaGlsZHJlbihvYmopIHtcbiAgICBpZiAob2JqLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGNvbnN0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShvYmouY2hpbGRyZW4pO1xuICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goLi4uZ2V0QWxsQ2hpbGRyZW4oY2hpbGQpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gY2hpbGRyZW47XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUFyaWFIaWRkZW5PblNtYWxsU2NyZWVuKCkge1xuICAgIGNvbnN0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgY29uc3Qgb2JqcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbS1hcmlhLXNob3cnKTtcbiAgICBvYmpzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICBpZiAod2lkdGggPD0gNjQwKSB7XG4gICAgICAgICAgICBvYmoucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpO1xuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBnZXRBbGxDaGlsZHJlbihvYmopO1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICAgICAgICBjaGlsZC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgY2hpbGQucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmouc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbiA9IGdldEFsbENoaWxkcmVuKG9iaik7XG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNoaWxkLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICAgICAgICAgIGNoaWxkLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIHRoZW1lLm9ubG9hZEZucygpO1xuICAgIGRvY3VtZW50Q2xpY2tFdnQoKTtcbiAgICBjb3B5VGhlbWVTd2l0Y2hlclRvT2ZmTWVudSgpO1xuICAgIGNsb3NlT2ZmTWVudSgpO1xuICAgIHNob3dPZmZNZW51KCk7XG4gICAgcmVtb3ZlQXJpYUhpZGRlbk9uU21hbGxTY3JlZW4oKTtcbn0pO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgIGNvcHlUaGVtZVN3aXRjaGVyVG9PZmZNZW51KCk7XG4gICAgcmVtb3ZlQXJpYUhpZGRlbk9uU21hbGxTY3JlZW4oKTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiB0aGVtZVN3aXRjaGVyT3B0aW9uc0h0bWwoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3lzdGVtOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3M9XCJoLTYgdy02IGlubGluZS1ibG9ja1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiPlxuICAgIDxwYXRoIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS13aWR0aD1cIjJcIiBkPVwiTTkuNzUgMTdMOSAyMGwtMSAxaDhsLTEtMS0uNzUtM00zIDEzaDE4TTUgMTdoMTRhMiAyIDAgMDAyLTJWNWEyIDIgMCAwMC0yLTJINWEyIDIgMCAwMC0yIDJ2MTBhMiAyIDAgMDAyIDJ6XCIvPlxuPC9zdmc+XG48c3BhbiBjbGFzcz1cImlubGluZS1ibG9jayBtbC0xXCI+U3lzdGVtIERlZmF1bHQ8L3NwYW4+YCxcbiAgICAgICAgbGlnaHQ6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cImgtNiB3LTYgaW5saW5lLWJsb2NrXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XG4gICAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIGQ9XCJNMTIgM3YxbTAgMTZ2MW05LTloLTFNNCAxMkgzbTE1LjM2NCA2LjM2NGwtLjcwNy0uNzA3TTYuMzQzIDYuMzQzbC0uNzA3LS43MDdtMTIuNzI4IDBsLS43MDcuNzA3TTYuMzQzIDE3LjY1N2wtLjcwNy43MDdNMTYgMTJhNCA0IDAgMTEtOCAwIDQgNCAwIDAxOCAwelwiIC8+XG48L3N2Zz5cbjxzcGFuIGNsYXNzPVwiaW5saW5lLWJsb2NrIG1sLTFcIj5MaWdodCBUaGVtZTwvc3Bhbj5gLFxuICAgICAgICBkYXJrOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3M9XCJoLTYgdy02IGlubGluZS1ibG9ja1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiPlxuICAgIDxwYXRoIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS13aWR0aD1cIjJcIiBkPVwiTTIwLjM1NCAxNS4zNTRBOSA5IDAgMDE4LjY0NiAzLjY0NiA5LjAwMyA5LjAwMyAwIDAwMTIgMjFhOS4wMDMgOS4wMDMgMCAwMDguMzU0LTUuNjQ2elwiIC8+XG48L3N2Zz5cbjxzcGFuIGNsYXNzPVwiaW5saW5lLWJsb2NrIG1sLTFcIj5EYXJrIFRoZW1lPC9zcGFuPmBcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBleHBhbmRDb2xsYXBzZVRoZW1lT3B0aW9ucyhhY3Rpb24gPSAnJykge1xuICAgIGlmIChbJ2V4cGFuZCcsICdjb2xsYXBzZSddLmluZGV4T2YoYWN0aW9uKSA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB0aGVtZVN3aXRjaGVyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRoZW1lLXN3aXRjaGVyJyk7XG4gICAgY29uc3QgdGhlbWVTd2l0Y2hlck9wdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlbWUtc3dpdGNoZXItb3B0aW9ucycpO1xuICAgIGxldCBmaW5hbF9hY3Rpb24gPSBhY3Rpb24gIT09ICcnID8gYWN0aW9uLnRvTG93ZXJDYXNlKCkgOiAnJztcbiAgICBpZiAodGhlbWVTd2l0Y2hlckJ0biAmJiB0aGVtZVN3aXRjaGVyT3B0aW9ucykge1xuICAgICAgICBpZiAoYWN0aW9uID09PSAnJykge1xuICAgICAgICAgICAgaWYgKHRoZW1lU3dpdGNoZXJPcHRpb25zLmNsYXNzTGlzdC5jb250YWlucygnZXhwYW5kZWQnKSkge1xuICAgICAgICAgICAgICAgIGZpbmFsX2FjdGlvbiA9ICdjb2xsYXBzZSc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZpbmFsX2FjdGlvbiA9ICdleHBhbmQnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChmaW5hbF9hY3Rpb24gPT09ICdleHBhbmQnKSB7XG4gICAgICAgIHRoZW1lU3dpdGNoZXJPcHRpb25zLmNsYXNzTGlzdC5hZGQoJ2V4cGFuZGVkJyk7XG4gICAgICAgIHRoZW1lU3dpdGNoZXJCdG4uY2xhc3NMaXN0LmFkZCgndGhlbWUtc3dpdGNoZXItYnRuLS1hY3RpdmUnKTtcbiAgICAgICAgdGhlbWVTd2l0Y2hlckJ0bi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoZW1lU3dpdGNoZXJPcHRpb25zLmNsYXNzTGlzdC5yZW1vdmUoJ2V4cGFuZGVkJyk7XG4gICAgICAgIHRoZW1lU3dpdGNoZXJCdG4uY2xhc3NMaXN0LnJlbW92ZSgndGhlbWUtc3dpdGNoZXItYnRuLS1hY3RpdmUnKTtcbiAgICAgICAgdGhlbWVTd2l0Y2hlckJ0bi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICB9XG4gICAgc2V0QWN0aXZlRGVzY2VuZGFudEFyaWFPblVsKGZpbmFsX2FjdGlvbik7XG59XG5cbmZ1bmN0aW9uIGNsb3NlVGhlbWVTd2l0Y2hlcklmQ2xpY2tlZE91dHNpZGUoZXZ0KSB7XG4gICAgY29uc3QgcGF0aHMgPSBldnQuY29tcG9zZWRQYXRoKCk7XG4gICAgbGV0IGluc2lkZVRoZW1lVG9nZ2xlciA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHBhdGhzW2ldICYmIHBhdGhzW2ldLmNsYXNzTGlzdCAmJiBwYXRoc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoJ3RoZW1lLXRvZ2dsZXInKSkge1xuICAgICAgICAgICAgaW5zaWRlVGhlbWVUb2dnbGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghaW5zaWRlVGhlbWVUb2dnbGVyKSB7XG4gICAgICAgIGV4cGFuZENvbGxhcHNlVGhlbWVPcHRpb25zKCdjb2xsYXBzZScpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZVRoZW1lTWVudUl0ZW1zKCkge1xuICAgIGNvbnN0IHRoZW1lSHRtbHMgPSB0aGVtZVN3aXRjaGVyT3B0aW9uc0h0bWwoKTtcbiAgICBjb25zdCB0aGVtZVN3aXRjaGVyTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGhlbWUtc3dpdGNoZXItbGlzdC1pdGVtID4gLnRoZW1lLXN3aXRjaGVyLWxpbmsnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoZW1lU3dpdGNoZXJMaW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgdGhlbWVTd2l0Y2hlckxpbmtzW2ldLmlubmVySFRNTCA9IHRoZW1lSHRtbHMubGlnaHQ7XG4gICAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgdGhlbWVTd2l0Y2hlckxpbmtzW2ldLmlubmVySFRNTCA9IHRoZW1lSHRtbHMuZGFyaztcbiAgICAgICAgfSBlbHNlIGlmIChpID09PSAyKSB7XG4gICAgICAgICAgICB0aGVtZVN3aXRjaGVyTGlua3NbaV0uaW5uZXJIVE1MID0gdGhlbWVIdG1scy5zeXN0ZW07XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldEFjdGl2ZVRoZW1lTGluayhpZHgpIHtcbiAgICBjb25zdCB0aGVtZVN3aXRjaGVySXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGhlbWUtc3dpdGNoZXItbGlzdC1pdGVtJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGVtZVN3aXRjaGVySXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKE51bWJlcihpZHgpID09PSBpKSB7XG4gICAgICAgICAgICB0aGVtZVN3aXRjaGVySXRlbXNbaV0uY2xhc3NMaXN0LmFkZCgndGhlbWUtc3dpdGNoZXItbGlzdC1pdGVtLS1hY3RpdmUnKTtcbiAgICAgICAgICAgIHRoZW1lU3dpdGNoZXJJdGVtc1tpXS5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhlbWVTd2l0Y2hlckl0ZW1zW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3RoZW1lLXN3aXRjaGVyLWxpc3QtaXRlbS0tYWN0aXZlJyk7XG4gICAgICAgICAgICB0aGVtZVN3aXRjaGVySXRlbXNbaV0ucmVtb3ZlQXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldEFjdGl2ZURlc2NlbmRhbnRBcmlhT25VbChhY3Rpb24gPSAnJykge1xuICAgIGlmIChbJ2V4cGFuZCcsICdjb2xsYXBzZSddLmluZGV4T2YoYWN0aW9uKSA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB0aGVtZVN3aXRjaGVyT3B0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aGVtZS1zd2l0Y2hlci1vcHRpb25zJyk7XG4gICAgaWYgKGFjdGlvbiA9PT0gJ2NvbGxhcHNlJykge1xuICAgICAgICB0aGVtZVN3aXRjaGVyT3B0aW9ucy5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHRoZW1lU3dpdGNoZXJMaXN0QWN0aXZlSXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aGVtZS1zd2l0Y2hlci1saXN0LWl0ZW0tLWFjdGl2ZScpO1xuICAgIGlmICh0aGVtZVN3aXRjaGVyT3B0aW9ucyAmJiB0aGVtZVN3aXRjaGVyTGlzdEFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgY29uc3QgYWN0aXZlSWQgPSB0aGVtZVN3aXRjaGVyTGlzdEFjdGl2ZUl0ZW0uaWQ7XG4gICAgICAgIHRoZW1lU3dpdGNoZXJPcHRpb25zLnNldEF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50JywgYWN0aXZlSWQpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoZW1lU3dpdGNoZXJMaXN0QWN0aXZlSXRlbS5mb2N1cygpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGVtZVN3aXRjaGVyT3B0aW9ucy5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlSHRtbENsYXNzKHRoZW1lID0gJ2xpZ2h0Jykge1xuICAgIGxldCBzeXN0ZW1UaGVtZSA9ICcnO1xuICAgIGlmICh0aGVtZSA9PT0gJ3N5c3RlbScpIHtcbiAgICAgICAgc3lzdGVtVGhlbWUgPSBnZXRTeXN0ZW1Db2xvclNjaGVtZSgpO1xuICAgIH1cbiAgICBpZiAoc3lzdGVtVGhlbWUgPT09ICdkYXJrJyB8fCB0aGVtZSA9PT0gJ2RhcmsnKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKS5jbGFzc0xpc3QuYWRkKCd0aGVtZS1kYXJrJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpLmNsYXNzTGlzdC5yZW1vdmUoJ3RoZW1lLWRhcmsnKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldFN5c3RlbUNvbG9yU2NoZW1lKCkge1xuICAgIGNvbnN0IGRhcmtQcmVmZXJUaGVtZSA9IHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJyk7XG4gICAgY29uc3QgaGFzRGFya1ByZWZlclRoZW1lID0gdHlwZW9mIGRhcmtQcmVmZXJUaGVtZS5tYXRjaGVzID09PSAnYm9vbGVhbic7XG4gICAgaWYgKGhhc0RhcmtQcmVmZXJUaGVtZSkge1xuICAgICAgICByZXR1cm4gZGFya1ByZWZlclRoZW1lLm1hdGNoZXMgPyAnZGFyaycgOiAnbGlnaHQnO1xuICAgIH1cbiAgICByZXR1cm4gJ2xpZ2h0Jztcbn1cblxuZnVuY3Rpb24gZm9jdXNPblN3aXRjaGVyQnRuKCkge1xuICAgIGNvbnN0IHRoZW1lU3dpdGNoZXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlbWUtc3dpdGNoZXInKTtcbiAgICBpZiAodGhlbWVTd2l0Y2hlckJ0bikge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoZW1lU3dpdGNoZXJCdG4uZm9jdXMoKSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVDaGFuZ2VUaGVtZUV2dChpZHgsIGNvbGxhcHNlID0gdHJ1ZSkge1xuICAgIGlmIChpZHggPT09IDIpIHtcbiAgICAgICAgc2V0VGhlbWUoJ3N5c3RlbScpO1xuICAgIH0gZWxzZSBpZiAoaWR4ID09PSAxKSB7XG4gICAgICAgIHNldFRoZW1lKCdkYXJrJylcbiAgICB9IGVsc2Uge1xuICAgICAgICBzZXRUaGVtZSgnbGlnaHQnKTtcbiAgICB9XG4gICAgaWYgKGNvbGxhcHNlKSB7XG4gICAgICAgIGV4cGFuZENvbGxhcHNlVGhlbWVPcHRpb25zKCdjb2xsYXBzZScpO1xuICAgICAgICBmb2N1c09uU3dpdGNoZXJCdG4oKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1vdmVVcERvd25Td2l0Y2hlck9wdGlvbnMob3B0aW9uID0gJycpIHtcbiAgICBpZiAoWydwcmV2JywgJ25leHQnLCAnaG9tZScsICdlbmQnXS5pbmRleE9mKG9wdGlvbikgPT09IC0xKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc3dpdGNoZXJMaXN0T3B0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50aGVtZS1zd2l0Y2hlci1saXN0LWl0ZW0nKTtcbiAgICBjb25zdCBjdXJyZW50QWN0aXZlT3B0aW9uID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICBpZiAob3B0aW9uID09PSAnaG9tZScpIHtcbiAgICAgICAgc3dpdGNoZXJMaXN0T3B0aW9uc1swXS5mb2N1cygpO1xuICAgICAgICBoYW5kbGVDaGFuZ2VUaGVtZUV2dCgwLCBmYWxzZSk7XG4gICAgfSBlbHNlIGlmIChvcHRpb24gPT09ICdlbmQnKSB7XG4gICAgICAgIHN3aXRjaGVyTGlzdE9wdGlvbnNbc3dpdGNoZXJMaXN0T3B0aW9ucy5sZW5ndGggLSAxXS5mb2N1cygpO1xuICAgICAgICBoYW5kbGVDaGFuZ2VUaGVtZUV2dChzd2l0Y2hlckxpc3RPcHRpb25zLmxlbmd0aCAtIDEsIGZhbHNlKTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRBY3RpdmVPcHRpb24pIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2l0Y2hlckxpc3RPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc3dpdGNoZXJMaXN0T3B0aW9uc1tpXSA9PT0gY3VycmVudEFjdGl2ZU9wdGlvbikge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb24gPT09ICdwcmV2Jykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoZXJMaXN0T3B0aW9uc1tzd2l0Y2hlckxpc3RPcHRpb25zLmxlbmd0aCAtIDFdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVDaGFuZ2VUaGVtZUV2dChzd2l0Y2hlckxpc3RPcHRpb25zLmxlbmd0aCAtIDEsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaGVyTGlzdE9wdGlvbnNbaS0xXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQ2hhbmdlVGhlbWVFdnQoaS0xLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gc3dpdGNoZXJMaXN0T3B0aW9ucy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2hlckxpc3RPcHRpb25zWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVDaGFuZ2VUaGVtZUV2dCgwLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2hlckxpc3RPcHRpb25zW2krMV0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUNoYW5nZVRoZW1lRXZ0KGkrMSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBtb3ZlVG9TcGVjaWZpY1N3aXRjaE9wdGlvbkJ5S2V5KGtleSkge1xuICAgIGNvbnN0IGtleVZhbCA9IGtleS5zcGxpdCgna2V5Jykuc2xpY2UoLTEpWzBdO1xuICAgIGNvbnN0IHN3aXRjaGVyTGlzdE9wdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGhlbWUtc3dpdGNoZXItbGlzdC1pdGVtJyk7XG4gICAgaWYgKHN3aXRjaGVyTGlzdE9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gQXJyYXkuZnJvbShzd2l0Y2hlckxpc3RPcHRpb25zKS5tYXAob3B0ID0+IG9wdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3B0aW9uJykpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zW2ldICYmIG9wdGlvbnNbaV0uc3RhcnRzV2l0aChrZXlWYWwpKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoZXJMaXN0T3B0aW9uc1tpXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIGhhbmRsZUNoYW5nZVRoZW1lRXZ0KGksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlVGhlbWVJdGVtS2V5Ym9hcmRDb2RlcyhrZXksIGlkeCkge1xuICAgIGlmIChrZXkgPT09ICdlbnRlcicpIHtcbiAgICAgICAgaGFuZGxlQ2hhbmdlVGhlbWVFdnQoaWR4KTtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ2VzY2FwZScpIHtcbiAgICAgICAgZXhwYW5kQ29sbGFwc2VUaGVtZU9wdGlvbnMoJ2NvbGxhcHNlJyk7XG4gICAgICAgIGZvY3VzT25Td2l0Y2hlckJ0bigpO1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnYXJyb3d1cCcpIHtcbiAgICAgICAgbW92ZVVwRG93blN3aXRjaGVyT3B0aW9ucygncHJldicpO1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnYXJyb3dkb3duJykge1xuICAgICAgICBtb3ZlVXBEb3duU3dpdGNoZXJPcHRpb25zKCduZXh0Jyk7XG4gICAgfSBlbHNlIGlmIChrZXkgPT09ICdob21lJyB8fCBrZXkgPT09ICdlbmQnKSB7XG4gICAgICAgIG1vdmVVcERvd25Td2l0Y2hlck9wdGlvbnMoa2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBtb3ZlVG9TcGVjaWZpY1N3aXRjaE9wdGlvbkJ5S2V5KGtleSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVTd2l0Y2hlckJ0bktleWJvYXJkQ29kZXMoa2V5KSB7XG4gICAgY29uc3QgdGhlbWVTd2l0Y2hlckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aGVtZS1zd2l0Y2hlcicpO1xuICAgIGNvbnN0IGN1cnJlbnRBY3RpdmVUaGVtZUxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlbWUtc3dpdGNoZXItbGlzdC1pdGVtLS1hY3RpdmUnKTtcbiAgICBpZiAoa2V5ID09PSAnZW50ZXInKSB7XG4gICAgICAgIGlmIChjdXJyZW50QWN0aXZlVGhlbWVMaW5rKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGN1cnJlbnRBY3RpdmVUaGVtZUxpbmsuZm9jdXMoKSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ2Fycm93dXAnKSB7XG4gICAgICAgIGV4cGFuZENvbGxhcHNlVGhlbWVPcHRpb25zKCdleHBhbmQnKTtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ2Fycm93ZG93bicpIHtcbiAgICAgICAgZXhwYW5kQ29sbGFwc2VUaGVtZU9wdGlvbnMoJ2V4cGFuZCcpO1xuICAgIH1cbn1cblxuXG5jb25zdCByZXBsYWNlTG9nbyA9ICgpID0+IHtcbiAgICBjb25zdCBoYXNEYXJrVGhlbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdodG1sJykuY2xhc3NMaXN0LmNvbnRhaW5zKCd0aGVtZS1kYXJrJyk7XG4gICAgY29uc3QgbG9nb0ltZ09iaiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaXRlLWxvZ28nKTtcbiAgICBpZiAobG9nb0ltZ09iaikge1xuICAgICAgICBpZiAoaGFzRGFya1RoZW1lKSB7XG4gICAgICAgICAgICBsb2dvSW1nT2JqLnNldEF0dHJpYnV0ZSgnc3JjJywgJy9pbWFnZXMvZGFya2xvZ28uc3ZnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2dvSW1nT2JqLnNldEF0dHJpYnV0ZSgnc3JjJywgJy9pbWFnZXMvbGlnaHRsb2dvLnN2ZycpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuY29uc3Qgc2V0VGhlbWUgPSAoZm9yY2VkID0gbnVsbCkgPT4ge1xuICAgIGNvbnN0IHRoZW1lSHRtbHMgPSB0aGVtZVN3aXRjaGVyT3B0aW9uc0h0bWwoKTtcbiAgICBjb25zdCB0aGVtZSA9IGZvcmNlZCA/IGZvcmNlZCA6IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY29sb3ItdGhlbWUnKTtcbiAgICBjb25zdCB0aGVtZVN3aXRjaGVyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRoZW1lLXN3aXRjaGVyJyk7XG4gICAgaW5pdGlhbGl6ZVRoZW1lTWVudUl0ZW1zKCk7XG4gICAgaWYgKHRoZW1lU3dpdGNoZXJCdG4pIHtcbiAgICAgICAgaWYgKHRoZW1lLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSA9PT0gJ3N5c3RlbScpIHtcbiAgICAgICAgICAgIHRoZW1lU3dpdGNoZXJCdG4uaW5uZXJIVE1MID0gdGhlbWVIdG1scy5zeXN0ZW07XG4gICAgICAgICAgICBzZXRBY3RpdmVUaGVtZUxpbmsoMik7XG4gICAgICAgICAgICB1cGRhdGVIdG1sQ2xhc3MoJ3N5c3RlbScpO1xuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjb2xvci10aGVtZScsICdzeXN0ZW0nKTtcbiAgICAgICAgICAgIHRoZW1lU3dpdGNoZXJCdG4uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1VzaW5nIHN5c3RlbSBkZWZhdWx0IHRoZW1lJyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhlbWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpID09PSAnZGFyaycpIHtcbiAgICAgICAgICAgIHRoZW1lU3dpdGNoZXJCdG4uaW5uZXJIVE1MID0gdGhlbWVIdG1scy5kYXJrO1xuICAgICAgICAgICAgc2V0QWN0aXZlVGhlbWVMaW5rKDEpO1xuICAgICAgICAgICAgdXBkYXRlSHRtbENsYXNzKCdkYXJrJyk7XG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NvbG9yLXRoZW1lJywgJ2RhcmsnKTtcbiAgICAgICAgICAgIHRoZW1lU3dpdGNoZXJCdG4uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1VzaW5nIGRhcmsgdGhlbWUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoZW1lU3dpdGNoZXJCdG4uaW5uZXJIVE1MID0gdGhlbWVIdG1scy5saWdodDtcbiAgICAgICAgICAgIHNldEFjdGl2ZVRoZW1lTGluaygwKTtcbiAgICAgICAgICAgIHVwZGF0ZUh0bWxDbGFzcygnbGlnaHQnKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY29sb3ItdGhlbWUnLCAnbGlnaHQnKTtcbiAgICAgICAgICAgIHRoZW1lU3dpdGNoZXJCdG4uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1VzaW5nIGxpZ2h0IHRoZW1lJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmVwbGFjZUxvZ28oKTtcbiAgICB9XG59XG5cbmNvbnN0IGNoYW5nZVRoZW1lRXZ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRoZW1lLXN3aXRjaGVyLWxpc3QtaXRlbScpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlbXNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICBoYW5kbGVDaGFuZ2VUaGVtZUV2dChpKTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxuY29uc3QgdGhlbWVTd2l0Y2hlckJ0bkNsaWNrRXZ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHRoZW1lU3dpdGNoZXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlbWUtc3dpdGNoZXInKTtcbiAgICBpZiAodGhlbWVTd2l0Y2hlckJ0bikge1xuICAgICAgICB0aGVtZVN3aXRjaGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwYW5kQ29sbGFwc2VUaGVtZU9wdGlvbnMoJ2V4cGFuZCcpO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG5jb25zdCB0aGVtZVN3aXRjaGVyQnRuS2V5ZG93bkV2dCA9ICgpID0+IHtcbiAgICBjb25zdCB0aGVtZVN3aXRjaGVyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRoZW1lLXN3aXRjaGVyJyk7XG4gICAgaWYgKHRoZW1lU3dpdGNoZXJCdG4pIHtcbiAgICAgICAgdGhlbWVTd2l0Y2hlckJ0bi5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2dCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2dC5jb2RlKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlU3dpdGNoZXJCdG5LZXlib2FyZENvZGVzKGV2dC5jb2RlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbmNvbnN0IHRoZW1lU3dpdGNoT3B0aW9uc0tleWRvd25FdnQgPSAoKSA9PiB7XG4gICAgY29uc3QgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGhlbWUtc3dpdGNoZXItbGlzdC1pdGVtJyk7XG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSwgaWR4KSA9PiB7XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldnQuY29kZSkge1xuICAgICAgICAgICAgICAgIGhhbmRsZVRoZW1lSXRlbUtleWJvYXJkQ29kZXMoZXZ0LmNvZGUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLCBpZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KVxufTtcblxuY29uc3Qgb25sb2FkRm5zID0gKCkgPT4ge1xuICAgIGNoYW5nZVRoZW1lRXZ0KCk7XG4gICAgcmVwbGFjZUxvZ28oKTtcbiAgICBzZXRUaGVtZSgpO1xuICAgIHRoZW1lU3dpdGNoZXJCdG5DbGlja0V2dCgpO1xuICAgIHRoZW1lU3dpdGNoZXJCdG5LZXlkb3duRXZ0KCk7XG4gICAgdGhlbWVTd2l0Y2hPcHRpb25zS2V5ZG93bkV2dCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IG9ubG9hZEZucywgY2xvc2VUaGVtZVN3aXRjaGVySWZDbGlja2VkT3V0c2lkZSB9O1xuIl19

//# sourceMappingURL=scripts.js.map
