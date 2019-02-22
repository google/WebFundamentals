project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2019-02-21 #}
{# wf_published_on: 2012-07-03 #}
{# wf_tags: news,regions,css #}
{# wf_blink_components: N/A #}

# Writing a flippable book using CSS Regions and 3D transforms {: .page-title }

{% include "web/_shared/contributors/ilmariheikkinen.html" %}


So. The day has come. You have finally grown bored of long scrolls of text and are looking for a new format. Something elegant. Something compact. Something that takes the long scroll, cuts it into neat little rectangles and binds them together. I call this invention the "book".

With the power of CSS regions ([CanIUse](https://caniuse.com/#feat=css-regions), go to [chrome://flags](chrome://flags) and enable CSS Regions) and CSS 3D transformations, cutting-edge book technology is finally available on modern browsers. All you need is a few lines of JavaScript and a whole lot of CSS.

Let's start off by defining our book structure. The book consists of pages and the pages consists of two sides. The sides contain the book content:


    <div class="book">
      <div> <!-- first page -->
        <div> <!-- front cover -->
          # My Fancy Book
        </div>
        <div> <!-- backside of cover -->
          # By Me I. Myself
          ## 2012 Bogus HTML Publishing Ltd
        </div>
      </div>
      <!-- content pages -->
      <div>
        <!-- front side of page -->
        <div class="book-pages"></div>
        <!-- back side of page -->
        <div class="book-pages"></div>
      </div>
     <div>
        <div class="book-pages"></div>
        <div class="book-pages"></div>
      </div>
      <div>
        <div class="book-pages"></div>
        <div class="book-pages"></div>
      </div>
    </div>


We're going to use CSS regions to flow the book text into the book pages. But first we need the book text.


    <span id="book-content">
      blah blah blah ...
    </span>


Now that we have written our book, let's define the flow CSS. I'm using the + character as a vendor prefix placeholder, replace it with `-webkit-` for WebKit browsers, `-moz-` for Firefox, and so on:


    #book-content {
      +flow-into: book-text-flow;
    }
    .book-pages {
      +flow-from: book-text-flow;
    }


Now the content from the #book-content span will go into the .book-pages divs instead. This is a rather poor book though. For a more bookish book we must embark on a quest. Our journey shall lead over the rainbow bridge of CSS transforms to the clockwork kingdom of JavaScript. In the halls of the mechanist fairylords we shall unleash epic transition magicks and obtain the fabled three keys that control the overworld interface.

The guardian of the rainbow bridge imparts on us the wisdom of stylish structural selectors so that we may turn our HTML book structure into a more book-shaped form:


    html {
      width: 100%;
      height: 100%;
    }
    body {
      /* The entire body is clickable area. Let the visitor know that. */
      cursor: pointer;
      width: 100%;
      height: 100%;
      /* Set the perspective transform for the page so that our book looks 3D. */
      +perspective: 800px;
      /* Use 3D for body, the book itself and the page containers. */
      +transform-style: preserve-3d;
    }
    .book {
      +transform-style: preserve-3d;
      position: absolute;
    }
    /* Page containers, contain the two sides of the page as children. */
    .book > div {
      +transform-style: preserve-3d;
      position: absolute;
    }
    /* Both sides of a page. These are flat inside the page container, so no preserve-3d. */
    .book > div > div {
      /* Fake some lighting with a gradient. */
      background: +linear-gradient(-45deg, #ffffff 0%, #e5e5e5 100%);
      width: 600px;
      height: 400px;
      overflow: hidden;
      /* Pad the page text a bit. */
      padding: 30px;
      padding-bottom: 80px;
    }
    /* Front of a page */
    .book > div > div:first-child {
      /* The front side of a page should be slightly above the back of the page. */
      +transform: translate3d(0px, 0px, 0.02px);
      /* Add some extra padding for the gutter. */
      padding-left: 40px;
      /* Stylish border in the gutter for visual effect. */
      border-left: 2px solid #000;
    }
    /* Back of a page */
    .book > div > div:last-child {
      /* The back side of a page is flipped. */
      +transform: rotateY(180deg);
      padding-right: 40px;
      border-right: 2px solid #000;
    }
    /* Front cover of the book */
    .book > div:first-child > div:first-child {
      /* The covers have a different color. */
      background: +linear-gradient(-45deg, #8c9ccc 0%, #080f40 100%);
      /* Put a border around the cover to make it cover the pages. */
      border: 2px solid #000;
      /* And center the cover. */
      margin-left: -1px;
      margin-top: -1px;
    }
    /* Back cover of the book */
    .book > div:last-child > div:last-child {
      background: +linear-gradient(-45deg, #8c9ccc 0%, #080f40 100%);
      border: 2px solid #000;
      margin-left: -1px;
      margin-top: -1px;
    }


In thus creating a somewhat paper-shaped style for our HTML, we arrive at the trillion-geared gates of the JavaScript kingdom. To pass through the gate, we must turn our flat book into a proper volume. To add some volume to the book, we offset each page slightly on the z-axis.


    (function() {
    var books = document.querySelectorAll('.book');
    for (var i = 0; i < books.length; i++) {
      var book = books[i];
      var pages = book.childNodes;
      for (var j = 0; j < pages.length; j++) {
        if (pages[j].tagName == "DIV") {
          setTransform(pages[j], 'translate3d(0px, 0px, ' + (-j) + 'px)');
        }
      }
    }
    })();


Casting transition magic to impress the fairylords is not the most difficult of invocations. Yet, the results make the pages of our book animate their turning in a smooth fashion.


    .book > div {
      +transition: 1s ease-in-out;
    }


Finally, to make the pages actually turn, we need to bind the events themselves to our cause.


    (function(){
    	// Get all the pages.
    	var pages = document.querySelectorAll('.book > div');
    	var currentPage = 0;
    	// Go to previous page when clicking on left side of window.
    	// Go to the next page when clicking on the right side.
    	window.onclick = function(ev) {
    	  if (ev.clientX < window.innerWidth/2) {
    	    previousPage();
    	  } else {
    	    nextPage();
    	  }
    	  ev.preventDefault();
    	};
    	var previousPage = function() {
    	  if (currentPage > 0) {
    	    currentPage--;
                // Rotate the page to closed position and move it to its place in the closed page stack.
    	    setTransform(pages[currentPage], 'translate3d(0px,0px,' + (-currentPage) + 'px) rotateY(0deg)');
    	  }
    	};
    	var nextPage = function() {
    	  if (currentPage < pages.length) {
                // Rotate the page to open position and move it to its place in the opened stack.
    	    setTransform(pages[currentPage], 'translate3d(0px,0px,' + currentPage + 'px) rotateY(-150deg)');
    	    currentPage++;
    	  }
    	};
    })();


With that, we have acquired the "book" technology and can evacuate the overworld crystal towers and leave behind their blinding glare and the fierce nuclear fires of Achenar, the great blue star of the overworld nexus. We triumphantly return to our homes, brandishing our books high above our heads, ready for the inevitable cascade of parades and celebrations in our honor.

You can see an example online [here](https://fhtr.org/html-book/) and get the [full source](https://github.com/kig/html-book) for the examples. If you don't have CSS Regions in your browser, the example will look quite broken. In which case you can try [this example](https://fhtr.org/html-book/no_regions.html) instead.


