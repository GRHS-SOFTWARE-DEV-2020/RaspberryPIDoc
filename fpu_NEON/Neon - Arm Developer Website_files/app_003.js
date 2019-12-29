/**
 * New arm.com - Constants
 */

(function() {

    if (!window.app) window.app = {};


    /* Constants */

    window.app.constants = {
        NAMESPACE: 'com.arm'
    }


    /* Events */

    window.app.events = {

        OVERLAY_CLOSE: window.app.constants.NAMESPACE + '.overlay.close',
        OVERLAY_OPEN: window.app.constants.NAMESPACE + '.overlay.open',

        // Search
        TOGGLE_SEARCH: window.app.constants.NAMESPACE + '.search.toggle',
        TOGGLE_MOBILE_SEARCH: window.app.constants.NAMESPACE + '.search.toggle.mobile',

        // Navigation
        TOGGLE_NAVIGATION: window.app.constants.NAMESPACE + '.navigation.toggle'
    }

})();
