/**
 * CORS Global Navigation - Mobile Search 
 */
(function () {
    var ACTIVE_CLASS = 'is-active';
    var VIEW_NAME = 'mobile-search';

    var _this = document.querySelector('.js-overlay[data-overlay="' + VIEW_NAME + '"]');


    /***********/
    /* Overlay */
    /***********/

    if (!_this) return;

    var _isActive = false;

    /**
     * Set the overlay display modal
     * param  {Boolean}    isActive    Whether or not the overlay is active
     * return {undefined}
     */
    function setOverlay(isActive) {
        if (isActive) {
            return _this.classList.add(ACTIVE_CLASS);
        }
        _this.classList.remove(ACTIVE_CLASS);
    }

    /**
     * Handle close overlay toggle clicks
     */
    function onCloseOverlayToggle() {
        var activeElement = document.activeElement;
        if (!activeElement || activeElement.getAttribute('type') === 'search') return;
        var toggleEvent = document.createEvent('Event');
        toggleEvent.initEvent('OVERLAY_CLOSE', false, false);
        toggleEvent.detail = VIEW_NAME;
        document.dispatchEvent(toggleEvent);
    }

    var closeOverlayToggle = document.querySelector('.js-overlay-close');
    closeOverlayToggle.addEventListener('click', onCloseOverlayToggle, false);
    closeOverlayToggle.addEventListener('touch', onCloseOverlayToggle, false);

    document.addEventListener('OVERLAY_CLOSE',
        function (evt) {
            if (evt.detail !== VIEW_NAME) return;
            _isActive = false;
            setOverlay(_isActive);
        });

    document.addEventListener('OVERLAY_OPEN',
        function (evt) {
            if (evt.detail !== VIEW_NAME) return;
            _isActive = true;
            setOverlay(_isActive);
        });

    window.addEventListener('resize', onCloseOverlayToggle);
})();
