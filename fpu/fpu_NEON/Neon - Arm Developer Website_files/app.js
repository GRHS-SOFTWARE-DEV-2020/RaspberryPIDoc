/**
 * TODO: Create separate JS module 
 */
(function($, config) {

    var keyCodeMap = {
        48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9", 59: ";",
        65: "a", 66: "b", 67: "c", 68: "d", 69: "e", 70: "f", 71: "g", 72: "h", 73: "i", 74: "j", 75: "k", 76: "l",
        77: "m", 78: "n", 79: "o", 80: "p", 81: "q", 82: "r", 83: "s", 84: "t", 85: "u", 86: "v", 87: "w", 88: "x", 89: "y", 90: "z",
        96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7", 104: "8", 105: "9"
    };

    /**
     * Set the ARIA attributes
     * @private
     */
    function setAriaAttributes() {
        var $this = $(this);
        var $children = $this.next('ul');

        // Set the `aria-expanded` attribute
        $this.attr('aria-expanded', false);

        // Set the `aria-haspopup` attribute
        $this.parent('li').attr('aria-haspopup', !!$children.length);

        // Set the `aria-hidden` attribute
        if (!$children.length) return;
        $children.attr('aria-hidden', true);
        $children.attr('tabindex', -1);
    }

    /**
     * Set the position of the item child container
     * @private
     */
    function setChildPosition() {
        var $this = $(this);
        var $children = $this.next('ul');
        if (!$children.length) return;

        var childOffsetX = $children.offset().left + $children.width();
        var clientWidth = $(window).innerWidth();

        if (childOffsetX <= clientWidth) return;
        $children.addClass('is-aligned-right').css('left', -($children.width() + 15));
    }

    /**
     * Initialise the navigation component
     * @param  {Object}     settings
     * @public
     */
    $.fn.navigation = function(settings) {
        var $this = $(this);

        settings = $.extend({
            menuHoverClass: 'c-navigation__items--active'
        }, settings);

        var top_level_links = $this.find('> li > a');
        var $navigationItems = $(this).find('li > a');

        // Set the ARIA attributes
        $navigationItems.each(setAriaAttributes);

        // Handle user events
        $navigationItems.on('mouseover', function() {
            setChildPosition.apply(this);
        });

        $navigationItems.on('focusout', function() {
            $(this).attr('aria-expanded', false);
        });

        $navigationItems.on('focus', function() {

            // Select the active navigation section
            var $activeNavigationItem = $(this);

            // De-activate the navigation items
            var $activeNavigationItems = $activeNavigationItem.closest('ul').find('.' + settings.menuHoverClass); 
            $activeNavigationItems.attr('aria-hidden', 'true');
            $activeNavigationItems.removeClass(settings.menuHoverClass);
            $activeNavigationItems.prev('a').attr('aria-expanded', false);
            $activeNavigationItems.find('a').attr('tabindex', -1);

            // Activate the new navigation section
            $activeNavigationItem.closest('a').attr('aria-expanded', true);
            var $activeNavigationItemSection = $activeNavigationItem.next('ul');
            $activeNavigationItemSection.addClass(settings.menuHoverClass);
            $activeNavigationItemSection.find('a').attr('tabindex', 0);
            if ($activeNavigationItemSection && $activeNavigationItemSection.length > 0) {
                $activeNavigationItem.attr('aria-expanded', true);
                $activeNavigationItemSection.attr('aria-hidden', 'false');
            }
        });

        // Bind arrow keys for navigation
        $(top_level_links).keydown(function(e) {
            if (e.keyCode === 37) {
                e.preventDefault();
                // This is the first item
                if ($(this).parent('li').prev('li').length === 0) {
                    $(this).parents('ul').find('> li').last().find('a').first().focus();
                } else {
                    $(this).parent('li').prev('li').find('a').first().focus();
                }
            } else if (e.keyCode === 38) {
                e.preventDefault();
                if ($(this).parent('li').find('ul').length > 0) {
                    $(this).parent('li').find('ul')
                        .attr('aria-hidden', 'false')
                        .addClass(settings.menuHoverClass)
                        .find('a').attr('tabIndex', 0)
                            .last().focus();
                }
            } else if (e.keyCode === 39) {
                e.preventDefault();
                // This is the last item
                if ($(this).parent('li').next('li').length === 0) {
                    $(this).parents('ul').find('> li').first().find('a').first().focus();
                } else {
                    $(this).parent('li').next('li').find('a').first().focus();
                }
            } else if (e.keyCode === 40) {
                e.preventDefault();
                if ($(this).parent('li').find('ul').length > 0) {
                    $(this).parent('li').find('ul')
                        .attr('aria-hidden', 'false')
                        .addClass(settings.menuHoverClass)
                        .find('a').attr('tabIndex', 0)
                            .first().focus();
                }
            } else if (e.keyCode === 13 || e.keyCode === 32) {
                // If submenu is hidden, open it
                e.preventDefault();
                $(this).parent('li').find('ul[aria-hidden=true]')
                        .attr('aria-hidden', 'false')
                        .addClass(settings.menuHoverClass)
                        .find('a').attr('tabIndex', 0)
                            .first().focus();
            } else if (e.keyCode === 27) {
                e.preventDefault();
                $('.' + settings.menuHoverClass)
                    .attr('aria-hidden', 'true')
                    .removeClass(settings.menuHoverClass)
                    .find('a')
                        .attr('tabIndex', -1);
            } else {
                $(this).parent('li').find('ul[aria-hidden=false] a').each(function() {
                    if ($(this).text().substring(0, 1).toLowerCase() === keyCodeMap[e.keyCode]) {
                        $(this).focus();
                        return false;
                    }
                });
            }
        });

        var links = $(top_level_links).parent('li').find('ul').find('a');
        $(links).keydown(function(e) {
            if (e.keyCode === 38) {
                e.preventDefault();
                // This is the first item
                if ($(this).parent('li').prev('li').length === 0) {
                    $(this).parents('ul').parents('li').find('a').first().focus();
                } else {
                    $(this).parent('li').prev('li').find('a').first().focus();
                }
            } else if (e.keyCode === 40) {
                e.preventDefault();
                if ($(this).parent('li').next('li').length === 0) {
                    $(this).parents('ul').parents('li').find('a').first().focus();
                } else {
                    $(this).parent('li').next('li').find('a').first().focus();
                }
            } else if (e.keyCode === 27 || e.keyCode === 37) {
                e.preventDefault();
                $(this)
                    .parents('ul').first()
                        .prev('a').focus()
                        .parents('ul').first().find('.' + settings.menuHoverClass)
                            .attr('aria-hidden', 'true')
                            .removeClass(settings.menuHoverClass)
                            .find('a')
                                .attr('tabIndex', -1);
            } else if (e.keyCode === 32) {
                e.preventDefault();
                window.location = $(this).attr('href');
            } else {
                var found = false;
                $(this).parent('li').nextAll('li').find('a').each(function() {
                    if ($(this).text().substring(0, 1).toLowerCase() == keyCodeMap[e.keyCode]) {
                        $(this).focus();
                        found = true;
                        return false;
                    }
                });

                if (!found) {
                    $(this).parent('li').prevAll('li').find('a').each(function() {
                        if ($(this).text().substring(0, 1).toLowerCase() == keyCodeMap[e.keyCode]) {
                            $(this).focus();
                            return false;
                        }
                    });
                }
            }
        });


        // Hide menu if click or focus occurs outside of navigation
        $(this).find('a').last().keydown(function(e) {
            if (e.keyCode === 9) {
                // If the user tabs out of the navigation hide all menus
                $('.' + settings.menuHoverClass)
                    .attr('aria-hidden', 'true')
                    .removeClass(settings.menuHoverClass)
                    .find('a')
                        .attr('tabindex', -1)
                        .attr('aria-expanded', 'false');
            }
        });

        $(document).click(function() {
            $('.' + settings.menuHoverClass).attr('aria-hidden', 'true').removeClass(settings.menuHoverClass).find('a').attr('tabIndex', -1);
        });
    };

})(jQuery, window.app);
