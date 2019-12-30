/**
 * Cors Global Navigation - Main container
 */
(function() {
    /**
     * Handle interactions for a give selector
     * param  {HTMLElement}     selector    The element which needs interaction handling
     * param  {Function}        cb          The interaction handler for the element
     */
    function handleInteraction(selector, cb) {
        var el = document.querySelector(selector);
        if (el) {
            el.addEventListener('click', cb, false);
            el.addEventListener('touch', cb, false);
        }
    }

    handleInteraction('.js-toggle-mobile-navigation',
        function() {
            var evt = document.createEvent('Event');
            evt.initEvent('OVERLAY_TOGGLE', false, false);
            evt.detail = 'mobile-navigation';
            document.dispatchEvent(evt);
        });

    handleInteraction('.js-toggle-mobile-search',
        function() {
            var evt = document.createEvent('Event');
            evt.initEvent('OVERLAY_OPEN', false, false);
            evt.detail = 'mobile-search';
            document.dispatchEvent(evt);
        });

    handleInteraction('.js-search-open',
        function() {
            var evt = document.createEvent('Event');
            evt.initEvent('SEARCH_TOGGLE', false, false);
            evt.detail = 'search-open';
            document.dispatchEvent(evt);
        });

    handleInteraction('.js-search-close',
        function() {
            var evt = document.createEvent('Event');
            evt.initEvent('SEARCH_TOGGLE', false, false);
            evt.detail = 'search-close';
            document.dispatchEvent(evt);
        });

    var globalSearch = document.getElementsByClassName('js-header-bar-autocomplete-search')[0];
    var globalNavigation = document.getElementsByClassName('js-header-bar-navigation')[0];
    var searchOpenBtn = document.getElementsByClassName('js-search-open')[0];
    var searchCloseBtn = document.getElementsByClassName('js-search-close')[0];

    document.addEventListener('SEARCH_TOGGLE',
        function() {
            searchOpenBtn.classList.toggle('hide');
            searchCloseBtn.classList.toggle('hide');
            globalSearch.classList.toggle('hide');
            globalNavigation.classList.toggle('hide');
        });

})();
