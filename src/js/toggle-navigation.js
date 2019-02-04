// -- VARIABLES --
const getNavigationList = () => {
    return document.getElementById('navigation-list');
}
const getWindowWidth = () => {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

const getSitewideHeader = () => {
    return document.getElementById('sitewide-header');
}

const getHeaderAnchors = () => {
    return getSitewideHeader().getElementsByTagName('a');
}

const getHeaderButtons = () => {
    return getSitewideHeader().getElementsByTagName('button');
}

const getMenuButton = () => {
    return document.getElementById('toggle-navigation');
}

// -- START WINDOW LOAD --
window.onload = windowLoaded;

function windowLoaded() {
    if (getWindowWidth() >= 768) {
        getNavigationList().setAttribute('aria-hidden', 'false');
    }
}

// -- START WINDOW RESIZE
window.addEventListener('resize', debounce(windowResized), 75);

function windowResized() {
    if (getWindowWidth() >= 768) {
        getNavigationList().setAttribute('aria-hidden', 'false');
    } else {
        getNavigationList().setAttribute('aria-hidden', 'true');
    }
}

// --START ANCHOR CLICK -- 
for (let i = getHeaderAnchors().length - 1; i >= 0; i--) {
    getHeaderAnchors()[i].addEventListener('click', closeMenu);
}

function closeMenu() {
    if (getWindowWidth() <= 767) {
        let ariaHidden = getNavigationList().getAttribute('aria-hidden'),
        ariaExpanded = getMenuButton().getAttribute('aria-expanded');
        if (ariaHidden === 'false') {
            getNavigationList().setAttribute('aria-hidden', 'true');
            getMenuButton().setAttribute('aria-expanded', 'false');
        }
    }
}

// -- START BUTTON CLICK --
for (var i = getHeaderButtons().length - 1; i >= 0; i--) {
    getHeaderButtons()[i].addEventListener('click', toggleControlled);
}

const toggleAria = (target) => {
    let ariaControls = target.getAttribute('aria-controls'),
    controlledAria = document.getElementById(ariaControls),
    ariaHidden = controlledAria.getAttribute('aria-hidden');
    if (ariaHidden === 'true') {
        controlledAria.setAttribute('aria-hidden', 'false');
        target.setAttribute('aria-expanded', 'true');
    } else {
        controlledAria.setAttribute('aria-hidden', 'true');
        target.setAttribute('aria-expanded', 'false');
    }
}

function toggleControlled({ target }) {
    toggleAria(target);
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        let context = this,
            args = arguments;
        let later = function() {
            timeout = null;
            if ( !immediate ) {
                func.apply(context, args);
            }
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait || 100);
        if ( callNow ) { 
            func.apply(context, args);
        }
    };
};

