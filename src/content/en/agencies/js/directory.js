/**
 * @fileoverview Creates web directory of agencies based on JSON data
 * TODO: Eventually refactor this to be used as a 'library' for a variety of directories
 */

/**
 * Initializing the entire directory
 *
 * @param {String} markup, defined in script in HTML file
 * Example: "<div><% this.example_data %></div>"
 *
 * @param {String} requestUrl, path to relevant directory JSON file
 */

var initializeDirectory = function(markup, requestUrl, alphabeticalSortKey) {

  /**
  *
  * Directory-level vars
  *
  */

  // Element vars
  var frameboxEl = document.querySelector('.directory-framebox');
  var frameboxWrapperEl = document.querySelector('.directory-framebox__wrapper');
  var cardsWrapperEl;
  var filterEls;

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
 *
 *
 * Helper functions
 *
 *
 */

  /**
   * A basic templating engine, uses <% %> as its preferred delimiters
   *
   * @param {String} html
   * Example: "<div><% this.example_data %></div>"
   *
   * @param {Object} data
   * Example: { "example_data" : "print this" }
   *
   */
  var TemplateEngine = function(html, data) {
    var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0, match;
    var add = function(line, js) {
        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    while(match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
  }

  // Capitalizes any string
  var capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Sets HTML attributes on a DOM element
  var setAttributes = function(el, attributesObject) {
    for(var attr in attributesObject) {
      el.setAttribute(attr, attributesObject[attr]);
    }
  }

  // Append all children in an array
  var appendChildren = function(parent, children) {
    children.forEach(function(child) {
      parent.appendChild(child);
    })
  }

  // Polyfill for forEach
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
          callback.call(thisArg, this[i], i, this);
      }
    };
  }

 /**
 *
 * Initialize all the things!
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
    initCards(markup, modifiedCardsData);

    // Initialize filters
    initSearchBar();
    for (var filter in filtersData) {
      checkedFilters[filter] = [];
      initFilterBar(filter);
    }

    if(response.noInitMap) {
      return;
    }

    initMap();
    initPins(cardsData);
  }

  /**
  * Creates cards based on card data and markup
  */
   var initCards = function(markup, data) {
     cardsWrapperEl = document.createElement('div');
     cardsWrapperEl.className = 'cards__wrapper';
     if(data.length === 0){
        var noResultsEl = document.createElement('h3');
        noResultsEl.innerHTML = 'No results found for the filters currently applied.';
        noResultsEl.className = 'cards__no-results';
        cardsWrapperEl.appendChild(noResultsEl);
      } else {

       data.forEach(function(company){
         var cardEl = document.createElement('div');
         cardEl.classList.add("agency__card");
         cardEl.innerHTML = TemplateEngine(markup, company).trim();
         cardsWrapperEl.appendChild(cardEl);
       });
      }

     // Once all cards are created, append wrapper element to DOM
     frameboxWrapperEl.appendChild(cardsWrapperEl);

     // Update height of framebox
     devsite.framebox.AutoSizeClient.updateSize();
   }

  /**
   * Returns filtered data based on checkedFilters object
   * Note: the filter within the data should be an Array
   */
  var filterCards = function() {
    var tempFilterData = cardsData.slice(0);

    // apply checkbox filters
    for (var filterName in checkedFilters) {
      tempFilterData = tempFilterData.filter(function(item) {
        if (item.invalid){
          return false;
        }
        if (checkedFilters[filterName].length > 0) {
          var hasIntersection = false;
          for(var i = 0; i < item[filterName].length; i++) {
            if((checkedFilters[filterName]).indexOf(item[filterName][i]) > -1) {
              hasIntersection = true;
            }
          }
          return hasIntersection;
        } else {
         return true;
        }
      })

      // apply search bar filter
      tempFilterData = tempFilterData.filter(function(item) {
        var hasAgencyName = item.agency_name.toLowerCase().indexOf(searchQuery) >= 0;
        var hasDescription = item.description.toLowerCase().indexOf(searchQuery) >= 0;
        var hasWebsite = item.website.toLowerCase().indexOf(searchQuery) >= 0;
        return hasAgencyName || hasDescription || hasWebsite;
      });
    }

    return tempFilterData;
  }

  /**
   *  Sort functions
   * */

  /**
   * Sort cards alphabetically by property sortKey
   * @param {String} sortKey
   **/
  var sortCardsAlphabetically = function(sortKey, data) {
    data.sort(function(a, b) {
      var textA = a[sortKey].toUpperCase();
      var textB = b[sortKey].toUpperCase();
       return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

  /**
   * Sort cards numerically by property sortKey
   * @param {String} sortKey, @param {Boolean} isAscending
   **/
  var sortCardsNumerically = function(sortKey, isAscending, data) {
    var direction = isAscending ? 1 : -1;
    data.sort(function(a, b) {
      return direction * (a[sortKey] - b[sortKey]);
    });
  }

  /**
 * Manages the various sort functions
 * @param {String} sortBy, @param {String} sortKey, @param {Boolean} isAscending
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
    initCards(markup, modifiedCardsData);
  }

  var addSortListeners = function() {
    var sortClickEls = document.querySelectorAll('[data-sort-key]');

    sortClickEls.forEach(function(el) {
      el.addEventListener('click', function(e) {
        var sortBy = this.getAttribute('data-sort-by');
        var sortKey = this.getAttribute('data-sort-key');
        if (!sortBy && !sortKey) { return; }
        var isAscending = this.getAttribute('data-sort-ascending');
        isAscending = !(isAscending == 'false');

        sortHandler(sortBy, sortKey, isAscending);
      });
    });
  }

  var initSearchBar = function() {
    var searchBarEl = document.querySelector('.filters__search .filters__search__field');
    searchBarEl.addEventListener('input', function(e) {
      searchQuery = searchBarEl.value.toLowerCase();
      // Initialize cards with filtered data
      modifiedCardsData = filterCards();

      // Empty out framebox card wrapper
      frameboxWrapperEl.removeChild(cardsWrapperEl);

      // Initialize cards and map with filtered data
      initCards(markup, modifiedCardsData);
      initPins(modifiedCardsData);
    });
  }

  /**
   * Return label for filter
   * @param {array}
   */
  var setSelectedItemsLabel = function(selectedItemsArray, allItemsArray) {
    if (selectedItemsArray.length === 1) {
      return  selectedItemsArray[0];
    }
    if (selectedItemsArray.length === allItemsArray.length) {
      return  'All';
    }
    if (selectedItemsArray.length === 0) {
      return  '';
    }
    return 'Multiple';
  }

  /**
   * Initializes dropdowns in filter bar
   * @param {string} any object key from JSON
   */
  var initFilterBar = function(filterKey) {
    var filterList = filtersData[filterKey];
    var filterDropdownsEl = document.querySelector('.filters__dropdowns');
    var filterEl = document.createElement('div');
    filterEl.classList.add('filters__' + filterKey, 'filters__filter');

    var filterLabelEl = document.createElement('span');
    filterLabelEl.classList.add('filters__label', 'filters__label--' + filterKey);
    filterLabelEl.innerHTML = filterKey.replace('_', ' ') + ':';
    filterEl.appendChild(filterLabelEl);

    var filterTitleEl = document.createElement('div');
    filterTitleEl.classList.add('filters__filter-title');
    filterTitleEl.setAttribute('aria-haspopup', true);
    filterTitleEl.setAttribute('role', 'button');

    var filterSelectedItemsEl = document.createElement('span');
    filterSelectedItemsEl.className = 'filters__selected-items';
    filterTitleEl.appendChild(filterSelectedItemsEl);
    // Set selected items label ('Multiple', 'All', ' ', etc.)
    filterSelectedItemsEl.innerHTML = setSelectedItemsLabel(checkedFilters[filterKey], filterList);

    var dropdownIcon = document.createElement('span');
    dropdownIcon.className = 'material-icons';
    dropdownIcon.innerHTML = 'arrow_drop_down';
    filterTitleEl.appendChild(dropdownIcon);
    filterEl.appendChild(filterTitleEl);

    var filterInputWrapperEl = document.createElement('div');
    filterInputWrapperEl.classList.add('filters__input-wrapper');

    for (var i=0; i < filterList.length; i++) {
      var checkboxEl = document.createElement('div');
      checkboxEl.className = 'filters__input';
      var checkboxId = 'checkbox-' + (filterList[i]).toLowerCase();

      var checkboxInputEl = document.createElement('input');
      checkboxInputEl.classList.add('filters__input--' + filterKey);
      var checkboxInputAttrs = {
        'type' : 'checkbox',
        'name' : filterList[i],
        'id' : checkboxId
      }
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
    var checkboxEls = document.querySelectorAll('.filters__input--' + filterKey);
    checkboxEls.forEach(function(checkboxEl) {
      checkboxEl.addEventListener('click', function(e){
        var isChecked = this.checked;
        checkboxEl.setAttribute('checked', isChecked);
        var filterName = this.getAttribute('name');
        if(isChecked){
          checkedFilters[filterKey].push(filterName);
        } else {
          var index = checkedFilters[filterKey].indexOf(filterName);
          checkedFilters[filterKey].splice(index, 1);
        }

        // Initialize cards with filtered data
        modifiedCardsData = filterCards();

        // Set selected items label ('Multiple', 'All', ' ', etc.)
        filterSelectedItemsEl.innerHTML = setSelectedItemsLabel(checkedFilters[filterKey], filterList);

        // Empty out framebox card wrapper
        frameboxWrapperEl.removeChild(cardsWrapperEl);

        // Initialize cards and map with filtered data
        initCards(markup, modifiedCardsData);
        initPins(modifiedCardsData);
      });
    });

    // Toggle display for filter dropdown
    filterTitleEl.addEventListener('click', function(event) {
      // Close other open filters
      closeFilters(event);

      this.parentNode.querySelector('.filters__input-wrapper').classList.toggle('is-active');
    });

    // Define filterEls for click event
    filterEls = document.querySelectorAll('.filters__filter');
  }

  /**
   * Filter events
   */

  // Close filter dropdowns when you click anywhere else on the window
  document.addEventListener('click', function(event) {
    var isOnFilter = false;
    [].forEach.call(filterEls,function(filterEl) {
      var target = event.target || event.currentTarget;
      if (filterEl.contains(target)) {
        isOnFilter = true;
      }
    });

    if(!isOnFilter){
     closeFilters(event);
    }
  });

  // If there are any filters open that are not the target filter, close them
  var closeFilters = function(event) {
    var activeDropdownEls = document.querySelectorAll('.filters__input-wrapper.is-active');
    if (activeDropdownEls) {
      activeDropdownEls.forEach(function(dropdownEl) {
        if(!event.currentTarget.parentNode || !event.currentTarget.parentNode.contains(dropdownEl)){
          dropdownEl.classList.remove('is-active');
        }
      })
    }
  }

  /**
   * Kick off map creation.
   */
  var initMap = function() {
    var mapOptions = {
      center: new google.maps.LatLng(0, 0),
      zoom: 2,
      fullscreenControl: false
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    infoWin = new google.maps.InfoWindow();

    // Close infoWindow on ESC keypress
    window.addEventListener('keyup', function(e){
      if(e.keyCode === 27 || e.key == 'Escape') {
        infoWin.close();
      }
    })
  };

 /**
 * Add pins to map
 */
  var initPins = function(data) {
    // Clear markers before re-initializing
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }

    for(var i = 0; i < data.length; i++){
      var locations = data[i].locations_map;
      for(var j = 0; j < locations.length; j++) {
        var entry = locations[j];
        var coords = entry.geo;
        if (!coords) {
          console.log('No geo data:', entry)
          continue;
        }
        var latLng = new google.maps.LatLng(coords.lat, coords.lng);
        var marker = new google.maps.Marker({
          map: map,
          position: latLng,
          title: entry.city_name
        });
        markers.push(marker);

        google.maps.event.addListener(marker, 'click', (function(marker, infoWin){
          return function() {
            // Create a fragment to hold all the cards once filtering is complete
            var allCards = document.createElement('div');
            allCards.classList.add('devsite-info-window-wrapper');
            var matching = data
              .filter(function(company) {
                var isInCity = false;
                for (var k = 0; k < company.locations_map.length; k++) {
                  if (company.locations_map[k].city_name == marker.title) {
                    isInCity = true;
                  }
                }
                return isInCity ? company : false;
              })
              .map(function(company){
                allCards.appendChild(createCardDom(company, marker.title));
                return company;
              });

            // close() must be called here otherwise new target InfoWindow content is screwy.
            infoWin.close();
            infoWin.setContent(allCards);
            infoWin.open(map, marker);
          }
        })(marker, infoWin));
      }
    }
  }

 /**
 * Retrieve JSON
 */
  var fetchData = function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', requestUrl, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4){
        if (xhr.status === 200) {
          var responseText = xhr.responseText;
          var responseJSON = JSON.parse(responseText);
          initData(responseJSON);
        }
        else {
          console.error('Error : ', xhr.status);
        }
      }
    };
    xhr.send();
  }();

 /**
 * Create info cards for map pins
 */
  var createCardDom = (function() {
    var div, ctn_, img_, title_, textDiv_, location_, description_, projects_, cta_;
    (function() {
      div = document.createElement('div');
      img_ = document.createElement('img');
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
     * Creates elements and builds a document fragment for populating the InfoWindow.
     * @param {any} company Company object from JSON
     */
    function createCardDom(company, city_name) {
      // Clone existing nodes and add text, children, etc.
      var fragment = document.createDocumentFragment();
      var ctn = ctn_.cloneNode(false);

      var textDiv = textDiv_.cloneNode(false);

      var title = title_.cloneNode(false);
      title.appendChild(document.createTextNode(company.agency_name));

      var location = location_.cloneNode(false);
      location.appendChild(document.createTextNode(city_name));

      if (company.image_url) {
        var imageCtn = div.cloneNode(false);
        imageCtn.classList.add('devsite-info-window-logo')
        var img = img_.cloneNode(false);
        img.src = company.image_url;
        imageCtn.appendChild(img)
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
          'data-action' : 'link',
          'data-category' : 'Agency Web Directory',
          'data-label': 'Map Infobox',
          'href' : company.website,
          'rel' : 'noopener noreferer',
          'target' : '_parent'
        }
        setAttributes(cta, ctaAttrs);
        textDiv.appendChild(cta);
      }

      // For projects with lighthouse scores
      if (company.projects) {
        var projects = projects_.cloneNode(false);
        projects.classList.add('gc-analytics-event', 'devsite-info-window-projects');

        var projectsHeading = document.createElement('h6');
        var projectsHeadingText = document.createTextNode('Work examples');
        projectsHeading.appendChild(projectsHeadingText);
        projects.appendChild(projectsHeading);

        company.projects.forEach(function(project){
          var projectWrapper = document.createElement('div');
          projectWrapper.classList.add('devsite-info-window-project-wrapper');
          var projectLinkText = document.createTextNode((project.url).split('//')[1]);
          var projectLink = document.createElement('a');
          var projectLinkAttrs = {
            'data-action' : 'link',
            'data-category' : 'Agency Web Directory',
            'data-label': 'Map Infobox',
            'href': project.url,
            'rel' : 'noopener noreferer',
            'target': '_parent'
          }
          setAttributes(projectLink, projectLinkAttrs);
          projectLink.appendChild(projectLinkText);

          var lighthouseScoreParagraph = document.createElement('p');
          var lighthouseScoreSpan = document.createElement('span');
          lighthouseScoreSpan.classList.add('project__lighthouse-score');
          var lighthouseScore = project.lighthouse_score != null ? project.lighthouse_score : 'N/A';
          var lighthouseScoreLabel = document.createTextNode('Lighthouse score: ');
          var lighthouseScoreNumber = document.createTextNode(lighthouseScore);

          lighthouseScoreSpan.appendChild(lighthouseScoreNumber);
          appendChildren(lighthouseScoreParagraph, [lighthouseScoreLabel, lighthouseScoreSpan]);
          projectWrapper.appendChild(lighthouseScoreParagraph);
          appendChildren(projectWrapper, [projectLink, lighthouseScoreParagraph]);
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
