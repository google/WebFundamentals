/**
 * Copyright 2018 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Creates web directory of agencies based on JSON data
 *
 * @author Nidhi Reddy <nidhireddy@google.com>
 */
/**
 * Initializing the entire directory
 *
 * @param {string} requestUrl
 * path to relevant directory JSON file
 * @param {string} alphabeticalSortKey
 * data key to sort all data by alphabetically
 */
var initializeDirectory = function(requestUrl, alphabeticalSortKey) {
  // Constants
  var ATTR_SORT_ASCENDING = 'data-sort-ascending';
  var ATTR_SORT_BY = 'data-sort-by';
  var ATTR_SORT_KEY = 'data-sort-key';
  var CLASS_CARDS_WRAPPER= 'cards__wrapper';
  var CLASS_FILTERS = 'filters';
  var CLASS_FILTERS_DROPDOWNS = 'filters__dropdowns';
  var CLASS_FILTERS_FILTER = 'filters__filter';
  var CLASS_FILTERS_INPUT = 'filters__input';
  var CLASS_FILTERS_INPUT_WRAPPER = 'filters__input-wrapper';
  var CLASS_FILTERS_IS_ACTIVE = 'is-active';
  var CLASS_FILTERS_LABEL = 'filters__label';
  var CLASS_FILTERS_SELECTED_ITEMS = 'filters__selected-items';
  var CLASS_FILTERS_TITLE = 'filters__filter-title';
  var CLASS_FRAMEBOX = 'directory-framebox__wrapper';
  var CLASS_SEARCH_BAR = 'filters__search';
  var CLASS_SEARCH_FIELD = 'filters__search__field';

  // Element vars
  var frameboxWrapperEl = document.querySelector('.' + CLASS_FRAMEBOX);
  var cardsWrapperEl;
  var filterEls;
  var div = document.createElement('div');
  var img = document.createElement('img');
  var text = document.createElement('p');
  var link = document.createElement('a');
  var h4 = document.createElement('h4');
  var span = document.createElement('span');

  // Data vars
  var cardsData;
  var filtersData;
  var modifiedCardsData;
  var checkedFilters = {};
  var searchQuery = '';

  // Map vars
  var infoWin;
  var map;
  var markers = [];

  /**
  * Sets HTML attributes on a DOM element
  * @param {HTMLElement} el
  * @param {Object} attributesObject
  * @param {Boolean} isSvg, optional
  */
  var setAttributes = function(el, attributesObject, isSvg) {
    for (var attr in attributesObject) {
      if (isSvg) {
        el.setAttributeNS(null, attr, attributesObject[attr]);
      } else {
        if (typeof(attr) == 'string') {
          el.setAttribute(attr, attributesObject[attr]);
        }
      }
    }
  };

  /**
  * Append all children in an array
  * @param {HTMLElement} parent
  * @param {Array} children
  */
  var appendChildren = function(parent, children) {
    children.forEach(function(child) {
      parent.appendChild(child);
    });
  };

  /**
  * Format urls
  * @param {string} url
  * @return {string}
  */
  var formatUrl = function(url) {
    return url.split('//')[1].replace('www.', '');
  };

  /**
  * Polyfill for forEach
  * @param {Function} callback
  * @param {Object} thisArg
  */
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function(callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
          callback.call(thisArg, this[i], i, this);
      }
    };
  }

 /**
 *
 * Initialize all the things!
 * @param {!Object} response
 *
 */
  var initData = function(response) {
    cardsData = response.data;
    filtersData = response.filters_;

    // Sort cards alphabetically on load
    sortCardsAlphabetically(alphabeticalSortKey, cardsData);
    addSortListeners();

    // Modified data (either sorted or filtered)
    modifiedCardsData = cardsData.slice(0);

    // Initialize cards
    initCards(modifiedCardsData);

    // Initialize filters
    initSearchBar();
    for (var filter in filtersData) {
      if (typeof filter == 'string') {
        checkedFilters[filter] = [];
        initFilterBar(filter);
      }
    }

    if (response.noInitMap) {
      return;
    }

    initMap();
    initPins(cardsData);
  };

  /**
  * Creates cards based on card data
  * @param {!Array} data
  */
   var initCards = function(data) {
     var SVG_NS_URL = 'http://www.w3.org/2000/svg';
     var svg = document.createElementNS(SVG_NS_URL, 'svg');
     var circle = document.createElementNS(SVG_NS_URL, 'circle');

     var CLASS_AGENCY_CARD = 'agency__card';
     var CLASS_AGENCY_INFO = 'agency__info';
     var CLASS_AGENCY_LOGO = 'agency__logo';
     var CLASS_AGENCY_NAME = 'agency__name';
     var CLASS_AGENCY_URLS = 'agency__urls';
     var CLASS_AGENCY_VERTICAL = 'agency__vertical';
     var CLASS_AGENCY_SMALL_TEXT = 'agency__small-text';
     var CLASS_AGENCY_LIGHTHOUSE_SCORE = 'agency__lighthouse-score';
     var CLASS_AGENCY_DESCRIPTION = 'agency__description';
     var CLASS_AGENCY_LOCATIONS = 'agency__locations';
     var CLASS_AGENCY_LOCATION= 'agency__location';
     var CLASS_AGENCY_HEADER_TITLE = 'agency__header-title';
     var CLASS_AGENCY_PROJECTS = 'agency__projects';
     var CLASS_AGENCY_PROJECT = 'agency__project';
     var CLASS_PROJECT_SCORE = 'project__lighthouse-score';
     var CLASS_ANALYTICS = 'gc-analytics-event';
     var CLASS_DESKTOP_HIDDEN= 'desktop-is-hidden';
     var CLASS_MOBILE_HIDDEN= 'mobile-is-hidden';
     var CLASS_NO_RESULTS = 'cards__no-results';
     var NO_RESULTS_TEXT =
      'No results found for the filters currently applied.';

     cardsWrapperEl = div.cloneNode(false);
     cardsWrapperEl.className = CLASS_CARDS_WRAPPER;

     if (data.length === 0) {
        var noResultsEl = document.createElement('h3');

        noResultsEl.innerHTML = NO_RESULTS_TEXT;
        noResultsEl.className = CLASS_NO_RESULTS;
        cardsWrapperEl.appendChild(noResultsEl);
      } else {
       data.forEach(function(company) {
         var cardEl = div.cloneNode(false);
         cardEl.classList.add(CLASS_AGENCY_CARD);

         var logoDiv = div.cloneNode(false);
         logoDiv.classList.add(CLASS_AGENCY_LOGO, CLASS_MOBILE_HIDDEN);

         var logoImg = img.cloneNode(false);
         var logoImgAttrs = {
           'alt': company.agency_name + ' logo',
           'src': company.image_url,
         };
         setAttributes(logoImg, logoImgAttrs);
         logoDiv.appendChild(logoImg);

         var infoDiv = div.cloneNode(false);
         infoDiv.classList.add(CLASS_AGENCY_INFO);

         var nameText = text.cloneNode(false);
         nameText.classList.add(CLASS_AGENCY_NAME);
         nameText.innerText = company.agency_name;

         var websiteH4 = h4.cloneNode(false);
         websiteH4.classList.add(CLASS_AGENCY_URLS);
         var websiteLink = link.cloneNode(false);
         var websiteLinkAttrs = {
           'class': CLASS_ANALYTICS,
           'data-action': 'click',
           'data-category': 'webFu',
           'data-label': 'directory-agency-website',
           'href': company.website,
           'rel': 'noopener noreferrer',
           'target': '_parent',
         };
         websiteLink.innerText = formatUrl(company.website);
         setAttributes(websiteLink, websiteLinkAttrs);

         var contactLink = websiteLink.cloneNode(true);
         var contactLinkAttrs = {
           'href': 'mailto:' + company.contact,
           'data-label': 'directory-agency-contact',
         };
         contactLink.innerText = company.contact;
         setAttributes(contactLink, contactLinkAttrs);
         appendChildren(websiteH4, [websiteLink, contactLink]);

         var verticalDiv = div.cloneNode(false);
         if (company.vertical.length) {
           verticalDiv.classList.add(
               CLASS_AGENCY_VERTICAL,
               CLASS_AGENCY_SMALL_TEXT);
           var verticalLabel =
               company.vertical.length == 1 ? 'Vertical: ' : 'Verticals: ';
           var verticalString = verticalLabel + company.vertical.join(', ');
           var verticalSpan = span.cloneNode(false);
           verticalSpan.innerText = verticalString;
           verticalDiv.appendChild(verticalSpan);
         }

         var lighthouseDivMobile = div.cloneNode(false);
         lighthouseDivMobile.classList.add(
           CLASS_AGENCY_LIGHTHOUSE_SCORE,
           CLASS_DESKTOP_HIDDEN);
         var dataPercent = company.max_lighthouse_score;
         if (dataPercent == null) {
           dataPercent = 'N/A';
         }
         lighthouseDivMobile.setAttribute('data-percent', dataPercent);
         var lighthouseSvg = svg.cloneNode(false);
         lighthouseSvg.setAttributeNS(null, 'viewbox', '0 0 120 120');

         var baseCircle = circle.cloneNode(false);
         var radius = 70;
         var baseCircleAttrs = {
           'cx': '75',
           'cy': '75',
           'fill': 'none',
           'r': radius,
           'stroke': '#e6e6e6',
           'stroke-width': '7',
         };
         setAttributes(baseCircle, baseCircleAttrs, true);

         var progressCircle = baseCircle.cloneNode(true);
         var strokeDashArray = Math.PI * 2 * radius;
         var progressPercent =
           Math.round(strokeDashArray *
           (1 - (company.max_lighthouse_score * 0.01)));
         var progressCircleAttrs = {
           'stroke': '#34a853',
           'stroke-dasharray': strokeDashArray,
           'stroke-dashoffset': progressPercent,
         };
         progressCircle.setAttributeNS(null, 'id', 'progress');
         setAttributes(progressCircle, progressCircleAttrs, true);

         appendChildren(lighthouseSvg, [baseCircle, progressCircle]);
         lighthouseDivMobile.appendChild(lighthouseSvg);

         var descriptionText = text.cloneNode(false);
         descriptionText.classList.add(CLASS_AGENCY_DESCRIPTION);
         descriptionText.innerText = company.description;

         var locationsDiv = div.cloneNode(false);
         locationsDiv.classList.add(CLASS_AGENCY_LOCATIONS);

         for (var i=0; i<company.locations_view; i++) {
           var location = company.locations_view[i];
           var countryDiv = div.cloneNode(false);
           countryDiv.classList.add(CLASS_AGENCY_LOCATION);
           var countryTitle = text.cloneNode(false);
           countryTitle.classList.add(CLASS_AGENCY_HEADER_TITLE);
           countryTitle.innerText = location.country_name;
           var citiesSpan = span.cloneNode(false);
           citiesSpan.innerText = location.cities.join(', ');
           appendChildren(countryDiv, [countryTitle, citiesSpan]);
         }

         var projectsTitle = text.cloneNode(false);
         projectsTitle.classList.add(CLASS_AGENCY_HEADER_TITLE);
         projectsTitle.innerText = 'Work examples';

         var projectsDiv = div.cloneNode(false);
         projectsDiv.classList.add(CLASS_AGENCY_PROJECTS);

         for (var i=0; i<company.projects.length; i++) {
           var projectDiv = div.cloneNode(false);
           projectDiv.classList.add(CLASS_AGENCY_PROJECT);

           var projectLink = link.cloneNode(false);
           var projectLinkAttrs = {
             'class': CLASS_ANALYTICS,
             'data-action': 'click',
             'data-category': 'webFu',
             'data-label': 'directory-project-website',
             'href': company.projects[i].url,
             'rel': 'noopener noreferrer',
             'target': '_parent',
           };
           projectLink.innerText = formatUrl(company.projects[i].url);
           setAttributes(projectLink, projectLinkAttrs);

           var projectScoreText = text.cloneNode(false);
           var projectScore = company.projects[i].lighthouse_score;
           if (projectScore == 'null') {
             projectScore = 'N/A';
           }
           projectScoreText.innerText = 'Lighthouse score: ';
           var projectScoreSpan = span.cloneNode(false);
           projectScoreSpan.classList.add(CLASS_PROJECT_SCORE);
           projectScoreSpan.innerText = projectScore;
           projectScoreText.appendChild(projectScoreSpan);

           appendChildren(projectDiv, [projectLink, projectScoreText]);
         }

         var lighthouseDivDesktop = lighthouseDivMobile.cloneNode(true);
         lighthouseDivDesktop.classList.remove(CLASS_DESKTOP_HIDDEN);
         lighthouseDivDesktop.classList.add(CLASS_MOBILE_HIDDEN);

         appendChildren(
           infoDiv,
           [nameText, websiteH4, verticalDiv, lighthouseDivMobile,
            descriptionText, locationsDiv, projectsTitle, projectDiv]);


         appendChildren(cardEl, [logoDiv, infoDiv, lighthouseDivDesktop]);
         cardsWrapperEl.appendChild(cardEl);
       });
      }

     // Once all cards are created, append wrapper element to DOM
     frameboxWrapperEl.appendChild(cardsWrapperEl);

     // Update height of framebox
     devsite.framebox.AutoSizeClient.updateSize();
   };

  /**
   * Returns filtered data based on checkedFilters object
   * @return {Array} tempFilterData
   */
  var filterCards = function() {
    var tempFilterData = cardsData.slice(0);

    // apply checkbox filters
    for (var filterName in checkedFilters) {
      if (typeof filterName == 'string') {
        tempFilterData = tempFilterData.filter(function(item) {
          if (item.invalid) {
            return false;
          }
          if (checkedFilters[filterName].length > 0) {
            var hasIntersection = false;
            for (var i = 0; i < item[filterName].length; i++) {
              var checkedFilter = checkedFilters[filterName];
              if ((checkedFilter).indexOf(item[filterName][i]) > -1) {
                hasIntersection = true;
              }
            }
            return hasIntersection;
          } else {
           return true;
          }
        });

        // apply search bar filter
        tempFilterData = tempFilterData.filter(function(item) {
          var hasAgencyName =
            item.agency_name.toLowerCase().indexOf(searchQuery) >= 0;
          var hasDescription =
            item.description.toLowerCase().indexOf(searchQuery) >= 0;
          var hasWebsite =
            item.website.toLowerCase().indexOf(searchQuery) >= 0;
          return hasAgencyName || hasDescription || hasWebsite;
        });
      }
    }

    return tempFilterData;
  };

  /**
   *  Sort functions
   * */

  /**
   * Sort cards alphabetically by property sortKey
   * @param {string} sortKey
   * @param {!Array} data
   **/
  var sortCardsAlphabetically = function(sortKey, data) {
    data.sort(function(a, b) {
      var textA = a[sortKey].toUpperCase();
      var textB = b[sortKey].toUpperCase();
       return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  };

  /**
   * Sort cards numerically by property sortKey
   * @param {string} sortKey
   * @param {Boolean} isAscending
   * @param {!Array} data
   **/
  var sortCardsNumerically = function(sortKey, isAscending, data) {
    var direction = isAscending ? 1 : -1;
    data.sort(function(a, b) {
      return direction * (a[sortKey] - b[sortKey]);
    });
  };

/**
 * Manages the various sort functions
 * @param {string} sortBy
 * @param {string} sortKey
 * @param {Boolean} isAscending
 **/
  var sortHandler = function(sortBy, sortKey, isAscending) {
    switch (sortBy) {
      case 'alphabetically':
        sortCardsAlphabetically(sortKey, modifiedCardsData);
        break;
      case 'numerically':
        sortCardsNumerically(sortKey, isAscending, modifiedCardsData);
        break;
      default:
        break;
    }

     // Empty out framebox card wrapper
    frameboxWrapperEl.removeChild(cardsWrapperEl);

    // Reinitialize cards
    initCards(modifiedCardsData);
  };

  var addSortListeners = function() {
    var sortClickEls = document.querySelectorAll('[' + ATTR_SORT_KEY + ']');

    sortClickEls.forEach(function(el) {
      el.addEventListener('click', function() {
        var sortBy = this.getAttribute(ATTR_SORT_BY);
        var sortKey = this.getAttribute(ATTR_SORT_KEY);
        if (!sortBy && !sortKey) {
          return;
        }
        var isAscending = this.getAttribute(ATTR_SORT_ASCENDING);
        isAscending = !(isAscending == 'false');

        sortHandler(sortBy, sortKey, isAscending);
      });
    });
  };

  var initSearchBar = function() {
    var searchBarEl =
      document.querySelector('.' + CLASS_SEARCH_BAR +
        ' .' + CLASS_SEARCH_FIELD);
    searchBarEl.addEventListener('input', function() {
      searchQuery = searchBarEl.value.toLowerCase();
      // Initialize cards with filtered data
      modifiedCardsData = filterCards();

      // Empty out framebox card wrapper
      frameboxWrapperEl.removeChild(cardsWrapperEl);

      // Initialize cards and map with filtered data
      initCards(modifiedCardsData);
      initPins(modifiedCardsData);
    });
  };

  /**
   * Return label for filter
   * @param {!Array} selectedItemsArray
   * @param {!Array} allItemsArray
   * @return {string}
   */
  var setSelectedItemsLabel =
    function(selectedItemsArray, allItemsArray) {
    if (selectedItemsArray.length === 1) {
      return selectedItemsArray[0];
    }
    if (selectedItemsArray.length === allItemsArray.length) {
      return 'All';
    }
    if (selectedItemsArray.length === 0) {
      return '';
    }
    return 'Multiple';
  };

  /**
   * Initializes dropdowns in filter bar
   * @param {string} filterKey
   */
  var initFilterBar = function(filterKey) {
    var filterList = filtersData[filterKey];
    var filterDropdownsEl
      = document.querySelector('.' + CLASS_FILTERS_DROPDOWNS);
    var filterEl = div.cloneNode(false);
    filterEl.classList.add(
      CLASS_FILTERS + '__' + filterKey,
      CLASS_FILTERS_FILTER);

    var filterLabelEl = span.cloneNode(false);
    filterLabelEl.classList.add(CLASS_FILTERS_LABEL,
      CLASS_FILTERS_LABEL + '--' + filterKey);
    filterLabelEl.innerHTML = filterKey.replace('_', ' ') + ':';
    filterEl.appendChild(filterLabelEl);

    var filterTitleEl = div.cloneNode(false);
    filterTitleEl.classList.add(CLASS_FILTERS_TITLE);
    filterTitleEl.setAttribute('aria-haspopup', true);
    filterTitleEl.setAttribute('role', 'button');

    var filterSelectedItemsEl = span.cloneNode(false);
    filterSelectedItemsEl.className = CLASS_FILTERS_SELECTED_ITEMS;
    filterTitleEl.appendChild(filterSelectedItemsEl);
    // Set selected items label ('Multiple', 'All', ' ', etc.)
    filterSelectedItemsEl.innerHTML =
      setSelectedItemsLabel(checkedFilters[filterKey], filterList);

    var dropdownIcon = span.cloneNode(false);
    dropdownIcon.className = 'material-icons';
    dropdownIcon.innerHTML = 'arrow_drop_down';
    filterTitleEl.appendChild(dropdownIcon);
    filterEl.appendChild(filterTitleEl);

    var filterInputWrapperEl = div.cloneNode(false);
    filterInputWrapperEl.classList.add(CLASS_FILTERS_INPUT_WRAPPER);

    for (var i=0; i < filterList.length; i++) {
      var checkboxEl = div.cloneNode(false);
      checkboxEl.className = CLASS_FILTERS_INPUT;
      var checkboxId = 'checkbox-' + (filterList[i]).toLowerCase();

      var checkboxInputEl = document.createElement('input');
      checkboxInputEl.classList.add(CLASS_FILTERS_INPUT + '--' + filterKey);
      var checkboxInputAttrs = {
        'type': 'checkbox',
        'name': filterList[i],
        'id': checkboxId,
      };
      setAttributes(checkboxInputEl, checkboxInputAttrs);

      var checkboxLabelEl = document.createElement('label');
      checkboxLabelEl.innerHTML = filterList[i];
      checkboxLabelEl.setAttribute('for', checkboxId);

      appendChildren(checkboxEl, [checkboxInputEl, checkboxLabelEl]);
      filterInputWrapperEl.appendChild(checkboxEl);
    }

    filterEl.appendChild(filterInputWrapperEl);
    filterDropdownsEl.appendChild(filterEl);

    // Initialize dropdown events
    var checkboxEls =
      document.querySelectorAll('.' + CLASS_FILTERS_INPUT + '--' + filterKey);
    checkboxEls.forEach(function(checkboxEl) {
      checkboxEl.addEventListener('click', function() {
        var isChecked = this.checked;
        checkboxEl.setAttribute('checked', isChecked);
        var filterName = this.getAttribute('name');
        if (isChecked) {
          checkedFilters[filterKey].push(filterName);
        } else {
          var index = checkedFilters[filterKey].indexOf(filterName);
          checkedFilters[filterKey].splice(index, 1);
        }

        // Initialize cards with filtered data
        modifiedCardsData = filterCards();

        // Set selected items label ('Multiple', 'All', ' ', etc.)
        filterSelectedItemsEl.innerHTML =
          setSelectedItemsLabel(checkedFilters[filterKey], filterList);

        // Empty out framebox card wrapper
        frameboxWrapperEl.removeChild(cardsWrapperEl);

        // Initialize cards and map with filtered data
        initCards(modifiedCardsData);
        initPins(modifiedCardsData);
      });
    });

    // Toggle display for filter dropdown
    filterTitleEl.addEventListener('click', function(event) {
      // Close other open filters
      closeFilters(event);

      this.parentNode.querySelector('.' + CLASS_FILTERS_INPUT_WRAPPER)
      .classList.toggle(CLASS_FILTERS_IS_ACTIVE);
    });

    // Define filterEls for click event
    filterEls = document.querySelectorAll('.' + CLASS_FILTERS_FILTER);
  };

  /**
   * Filter events
   */

  // Close filter dropdowns when you click anywhere else on the window
  document.addEventListener('click', function(event) {
    var isOnFilter = false;
    [].forEach.call(filterEls, function(filterEl) {
      var target = event.target || event.currentTarget;
      if (filterEl.contains(target)) {
        isOnFilter = true;
      }
    });

    if (!isOnFilter) {
     closeFilters(event);
    }
  });

  // If there are any filters open that are not the target filter, close them
  var closeFilters = function(event) {
    var activeDropdownEls =
      document.querySelectorAll('.' + CLASS_FILTERS_INPUT_WRAPPER +
        '.' + CLASS_FILTERS_IS_ACTIVE);
    if (activeDropdownEls) {
      activeDropdownEls.forEach(function(dropdownEl) {
        var isDropdown =
          !event.currentTarget.parentNode ||
          !event.currentTarget.parentNode.contains(dropdownEl);
        if (isDropdown) {
          dropdownEl.classList.remove(CLASS_FILTERS_IS_ACTIVE);
        }
      });
    }
  };

  /**
   * Kick off map creation.
   */
  var initMap = function() {
    var mapOptions = {
      center: new google.maps.LatLng(0, 0),
      zoom: 2,
      fullscreenControl: false,
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    infoWin = new google.maps.InfoWindow();

    // Close infoWindow on ESC keypress
    window.addEventListener('keyup', function(e) {
      if (e.keyCode === 27 || e.key == 'Escape') {
        infoWin.close();
      }
    });
  };

 /**
 * Add pins to map
 * @param {!Array} data
 */
  var initPins = function(data) {
    // Clear markers before re-initializing
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }

    for (var i = 0; i < data.length; i++) {
      var locations = data[i].locations_map;
      for (var j = 0; j < locations.length; j++) {
        var entry = locations[j];
        var coords = entry.geo;
        if (!coords) {
          console.error('No geo data:', entry);
          continue;
        }
        var latLng = new google.maps.LatLng(coords.lat, coords.lng);
        var marker = new google.maps.Marker({
          map: map,
          position: latLng,
          title: entry.city_name,
        });
        markers.push(marker);

        google.maps.event.addListener(marker, 'click',
          (function(marker, infoWin) {
          return function() {
            // Create a fragment to hold all the cards once filtering
            // is complete.
            var allCards = div.cloneNode(false);
            allCards.classList.add('devsite-info-window-wrapper');
            data.filter(function(company) {
                    var isInCity = false;
                    for (var k = 0; k < company.locations_map.length; k++) {
                      if (company.locations_map[k].city_name == marker.title) {
                        isInCity = true;
                      }
                    }
                    return isInCity ? company : false;
                })
                .map(function(company) {
                  allCards.appendChild(createCardDom(company, marker.title));
                  return company;
                });

            // close() must be called here otherwise new target InfoWindow
            // content is screwy.
            infoWin.close();
            infoWin.setContent(allCards);
            infoWin.open(map, marker);
          };
        })(marker, infoWin));
      }
    }
  };

 /**
 * Retrieve JSON
 */
(function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', requestUrl, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var responseText = xhr.responseText;
        var responseJSON = JSON.parse(responseText);
        initData(responseJSON);
      } else {
        console.error('Error : ', xhr.status);
      }
    }
  };
  xhr.send();
})();

 /**
 * Create info cards for map pins
 * @return {function}
 */
  var createCardDom = (function() {
    var ctn_;
    var title_;
    var textDiv_;
    var location_;
    var description_;
    var projects_;
    var cta_;
    (function() {
      title_ = document.createElement('h4');
      location_ = document.createElement('p');
      description_ = location_.cloneNode(false);
      projects_ = document.createElement('div');

      ctn_ = div.cloneNode(false);
      ctn_.classList.add('devsite-info-window');

      textDiv_ = div.cloneNode(false);
      textDiv_.classList.add('devsite-info-window-description');

      cta_ = document.createElement('a');
      cta_.appendChild(document.createTextNode('Website'));
      cta_.classList.add('button', 'button-flat');
    })();

    /**
     * Creates elements and builds a document fragment for populating
     * the InfoWindow.
     * @param {Object} company Company object from JSON
     * @param {string} cityName
     * @return {HTMLElement}
     */
    function createCardDom(company, cityName) {
      // Clone existing nodes and add text, children, etc.
      var fragment = document.createDocumentFragment();
      var ctn = ctn_.cloneNode(false);

      var textDiv = textDiv_.cloneNode(false);

      var title = title_.cloneNode(false);
      title.appendChild(document.createTextNode(company.agency_name));

      var location = location_.cloneNode(false);
      location.appendChild(document.createTextNode(cityName));

      if (company.image_url) {
        var imageCtn = div.cloneNode(false);
        imageCtn.classList.add('devsite-info-window-logo');
        var logoImg = img.cloneNode(false);
        var logoImgAttrs = {
         'alt': company.agency_name + ' logo',
         'src': company.image_url,
        };
        setAttributes(logoImg, logoImgAttrs);
        imageCtn.appendChild(logoImg);
        ctn.appendChild(imageCtn);
      }

      appendChildren(textDiv, [title, location]);

      if (company.description) {
        var description = description_.cloneNode(false);
        description.appendChild(document.createTextNode(company.description));
        textDiv.appendChild(description);
      }

      // Some companies don't have a website (at least in the trix).
      if (company.website) {
        var cta = cta_.cloneNode(true);
        cta.classList.add('gc-analytics-event');
        var ctaAttrs = {
          'data-action': 'link',
          'data-category': 'Agency Web Directory',
          'data-label': 'Map Infobox',
          'href': company.website,
          'rel': 'noopener noreferer',
          'target': '_parent',
        };
        setAttributes(cta, ctaAttrs);
        textDiv.appendChild(cta);
      }

      // For projects with lighthouse scores
      if (company.projects) {
        var projects = projects_.cloneNode(false);
        projects.classList.add('gc-analytics-event',
        'devsite-info-window-projects');

        var projectsHeading = document.createElement('h6');
        var projectsHeadingText = document.createTextNode('Work examples');
        projectsHeading.appendChild(projectsHeadingText);
        projects.appendChild(projectsHeading);

        company.projects.forEach(function(project) {
          var projectWrapper = document.createElement('div');
          projectWrapper.classList.add('devsite-info-window-project-wrapper');
          var projectLinkText =
            document.createTextNode((project.url).split('//')[1]);
          var projectLink = document.createElement('a');
          var projectLinkAttrs = {
            'data-action': 'link',
            'data-category': 'Agency Web Directory',
            'data-label': 'Map Infobox',
            'href': project.url,
            'rel': 'noopener noreferer',
            'target': '_parent',
          };
          setAttributes(projectLink, projectLinkAttrs);
          projectLink.appendChild(projectLinkText);

          var lighthouseScoreParagraph = document.createElement('p');
          var lighthouseScoreSpan = document.createElement('span');
          lighthouseScoreSpan.classList.add('project__lighthouse-score');
          var lighthouseScore =
            project.lighthouse_score != null ? project.lighthouse_score : 'N/A';
          var lighthouseScoreLabel =
            document.createTextNode('Lighthouse score: ');
          var lighthouseScoreNumber =
            document.createTextNode(lighthouseScore);

          lighthouseScoreSpan.appendChild(lighthouseScoreNumber);
          appendChildren(lighthouseScoreParagraph,
            [lighthouseScoreLabel, lighthouseScoreSpan]);
          projectWrapper.appendChild(lighthouseScoreParagraph);
          appendChildren(projectWrapper,
            [projectLink, lighthouseScoreParagraph]);
          projects.appendChild(projectWrapper);
        });
        textDiv.appendChild(projects);
      }

      ctn.appendChild(textDiv);

      fragment.appendChild(ctn);
      return fragment;
    }

    return createCardDom;
  })();
};
