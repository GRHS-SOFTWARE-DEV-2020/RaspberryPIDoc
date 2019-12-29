(function () {

    var ACTIVE_CLASS = 'is-active';
    var VIEW_NAME = 'mobile-navigation';

    var _this = document.querySelector('.js-overlay[data-overlay="' + VIEW_NAME + '"]');

    /**
     * Return the closest parent, matching a given selector
     * param  {String}      el          The descendant which needs its parent node
     * return {HTMLElement}
     */
    function closest(el) {
        var _el = el;
        while (!_el.parentNode.classList.contains('c-navigation__item')) {
            _el = _el.parentNode;
        }
        return _el.parentNode;
    }

    /**
     * Toggle the navigation item's children
     * param  {Event}       e           The dispatched event
     */
    function toggleNavigationItem(evt) {
        evt.preventDefault();
        var parent = closest(evt.target);
        parent.classList.toggle(ACTIVE_CLASS);
    }

    var navigationItems = _this.querySelectorAll('.js-navigation-item-toggle');
    for (var i = 0; i < navigationItems.length; i++) {
        var navItem = navigationItems[i];
        navItem.addEventListener('click', toggleNavigationItem, false);
        navItem.addEventListener('touch', toggleNavigationItem, false);
    }


    /***********/
    /* Overlay */
    /***********/

    if (!_this) return;

    var _isActive = false;

    /**
     * Set the overlay display modle
     * param  {Boolean}    isActive    Whether or not the overlay is active
     * return null
     */
    function setOverlay(isActive) {
        if (isActive) {
            return _this.classList.add(ACTIVE_CLASS);
        }
        _this.classList.remove(ACTIVE_CLASS);
    }

    document.addEventListener('OVERLAY_TOGGLE', function (evt) {
        if (evt.detail !== VIEW_NAME) return;
        _isActive = !_isActive;
        setOverlay(_isActive);

        var EVENT_NAME = _isActive ? 'OVERLAY_OPEN' : 'OVERLAY_CLOSE';
        var _event = document.createEvent('Event');
        _event.initEvent(EVENT_NAME, false, false);
        _event.detail = VIEW_NAME;
        document.dispatchEvent(_event);
    });

    window.addEventListener('resize', function () {
        if (!_isActive) return;
        _isActive = false;
        setOverlay(_isActive);
    });

})();
