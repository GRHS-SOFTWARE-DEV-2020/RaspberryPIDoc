/**
 * ADS Autocomplete search
 * @param {object} settings
 */

function autocompleteSearch(settings) {
    if (settings === undefined) return;
    //set search element
    var searchElement = settings.searchElement;
    var searchUrl = settings.searchUrl;
    var searchHintsEndpoint = settings.searchHintsEndpoint;
    var keyPressCount = 0;

    searchElement.addEventListener('adsSearchInput', function (evt) {
        //increment key press count to keep track of async response sequence
        keyPressCount++;
        //get query value
        var query = evt.detail.value;

        if (query.length > 2) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'json'; 
            xhr.open('GET', searchHintsEndpoint + '?query=' + query + '&sequence=' + keyPressCount);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    try {
                        var json = JSON.parse(xhr.response);
                        if (json != undefined && json.length > 0) {
                            //only update suggestions if response last in sequence
                            if (json[0].sequence >= keyPressCount) {
                                searchElement.suggestionsData = json;
                            }
                        } else {
                            searchElement.suggestionsData = [];
                        }
                    }
                    catch (err) {
                        searchElement.suggestionsData = [];
                    }                    
                }
                else {
                    searchElement.suggestionsData = [];
                }
            };
            xhr.send();
        } else {
            searchElement.suggestionsData = [];
        }
    });

    searchElement.submitHandler = function (evt, value) {
        //prevent default and redirect to search page
        evt.preventDefault();
        if (value === undefined) return;
        window.location.href = searchUrl + '#q=' + value;
    };
}
