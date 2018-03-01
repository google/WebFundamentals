project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2018-02-22 #}
{# wf_published_on: 2018-02-22 #}
{# wf_blink_components: Blink>CSS #}

# Text Content {: .page-title }

{% include "web/_shared/contributors/dgash.html" %}


Text: letters and numbers, words and phrases, sentences and paragraphs. It's how we convey 
most of the meaning in web pages. Text content informs, describes, explains concepts and 
procedures to our readers (not just "visitors"). It is the very basis of web communication.

Text content on the web always has some structure -- even if only top-down, and some 
formatting -- even if only by default. It can also exhibit behavior, moving or changing, 
appearing or disappearing in response to a reader's action or the author's intent. But in 
and of itself, text content doesn't have these qualities and abilities; its structure, 
appearance, and behavior are implemented and affected by other text-based resources: HTML, 
CSS, and JavaScript code.

In a web page, every character of that content, structure, formatting, and behavior must be 
fetched from the server and downloaded to the browser, a decidedly non-trivial task. In this 
section we'll look at some effective methods for speeding up text content loading.

## Separate Development from Deployment

As you reduce the size of text resources and take other actions that affect their readability, 
it's important to remember that once you modify a 
chunk of code for deployment, you usually can't read it any longer, let alone maintain it. 
Always keep development and deployment files separate to avoid replacing a development
file with a deployment version. Although, if it does happen by accident, a code 
beautifier or "unminifier" (for example, [http://unminify.com/](http://unminify.com/)) 
might save the day.

## Minify Your Code

One simple and effective method is *minification*, which is essentially compressing a text 
resource by removing its whitespace and unnecessary characters without changing its validity 
or functionality. It doesn't sound that useful, but it is. For example, this little function 
(part of a table-sorting script) initially contains 348 characters.

```
function sortables_init() {
    // Find all tables with class sortable and make them sortable
    if (!document.getElementsByTagName) return;
    var tbls = document.getElementsByTagName("table");
    for (ti=0;ti<tbls.length;ti++) {
   	 thisTbl = tbls[ti];
   	 if (((' '+thisTbl.className+' ').indexOf("sortable") != -1) && (thisTbl.id)) {
   		 ts_makeSortable(thisTbl);
   	 }
    }
}
```

After minification, it looks like this, and only contains 257 characters. 

```
function sortables_init(){if(!document.getElementsByTagName)return;var tbls=document.
getElementsByTagName("table");for(ti=0;ti<tbls.length;ti++){thisTbl=tbls[ti];
if(((''+thisTbl.className+'').indexOf("sortable")!=-1)&&(thisTbl.id)){ts_makeSortable(thisTbl)}}}
```

Sure, we can't read it now, but the browser still can. That's a 26% reduction in size and 
required download time; pretty significant, even for this small sample.

Looking at the bigger picture, the entire script block from which that snippet came is over 
10k, but after minification it's down to 5,411 characters, a whopping 48% reduction.

HTML and CSS can be minified in the same way, so that you can achieve improved load times for 
both formatting- and behavior-related code.

Many (many!) online and desktop minification tools are available; one of the most popular 
and highly recommended online tools, due to its longevity and stability, is
[Kangax HTML Minifier](https://kangax.github.io/html-minifier/), which 
offers a broad array of output customization options for the minified code.

Other minification tools include:

- [Minifier](http://www.minifier.org/):
An online tool minifies JavaScript or CSS via copy and paste.
- [HTML Minifier](http://www.willpeavy.com/minifier/):
This online tool also handles HTML, and automatically identifies the code type(s).
- [Node module for Grunt](https://www.npmjs.com/package/grunt-html-minify):
An NPM minification package that integrates into the Grunt workflow.
- [Node module for Gulp](https://www.npmjs.com/package/gulp-html-minifier):
An NPM minification package that integrates into the Gulp workflow. 
- [Node module for HTML Minifier](https://www.npmjs.com/package/html-minifier):
An NPM package that includes a useful chart comparing its compression results with other methods.

### Frameworks

Of course, chances are good that you do (or will) use a framework, IDE, or other structured 
environment as you write, rather than copy/pasting your code into a web app one file at a time. 
Most modern systems have built-in facilities for keeping development files separate from 
deployment during the build process, and are able to perform a variety of transformations, 
such as minification, along the way.

For example, a Gulp development-to-deployment task that includes HTML minification might 
look like this.

```
var gulp = require('gulp');
var htmlmin = require('gulp-html-minifier');
gulp.task('minify', function() {
  gulp.src('./src/*.html') //development location
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist')) //deployment location
});
```

The execution command for that task would then be:

`gulp minify`

(Source: [npmjs](https://www.npmjs.com/package/gulp-html-minifier))

Note that the task pipes the HTML files from their original location to the deployment 
location, minifying them during the build. This not only prevents potentially irreversible 
modification of the source files, but avoids contaminating the production environment during 
later development and testing.

## Compress Text Resources

So far we've talked about compression in terms of individual image and text files. But it 
would also be helpful if we could get our server to automatically compress entire file sets 
as well, and that's where Gzip comes in.

Gzip is an application (and its file format) for compressing and decompressing files. Like 
solo file compression, it reduces the time required to deliver a server response by reducing 
the size of the resource. It is available via the GNU Project site.

[https://www.gnu.org/software/gzip/](https://www.gnu.org/software/gzip/)

Gzip performs best on text resources, and can regularly achieve up to 70% compression (even 
higher for large files). However, Gzipping non-text resources, such as images, that have 
already been individually compressed generally provides no significant size reduction.

Unlike desktop or browser-based local compression, Gzip works at the server to identify and 
process certain file types that you specify. While all modern browsers support Gzip compression 
for HTTP requests, you must properly configure your server to deliver the compressed resource 
when it is requested. Different server types, of course, have different setup requirements. 
You configure the Apache server, for example, via the `.htaccess` file, which would include 
something like this.

```
<IfModule deflate_module>
    # Enable compression for the following file types
    AddOutputFilterByType        	\
     DEFLATE                     	\
      application/javascript     	\
      text/css                   	\
      text/html                  	\
      text/javascript            	\
      text/plain                 	\
      text/xml
</IfModule>
```

BetterExplained has a very good 
[article on Gzip compression](https://betterexplained.com/articles/how-to-optimize-your-site-with-gzip-compression/), 
including background information, examples, and caveats.

So, having enabled GZip on your server, how do you know whether it's actually serving 
compressed files? An easy way to find out is to check it at GIDNetwork's Gzip test site.

[http://www.gidnetwork.com/tools/gzip-test.php](http://www.gidnetwork.com/tools/gzip-test.php)

The report includes general information about site compression, an interesting "What if" 
chart that shows how much compression the site would gain at various Gzip compression levels, 
and the response headers and page source. 

Here, we ran the test on GIDNetwork's own root URL -- interestingly, it did not appear 
to be compressed.

![GIDNetwork](images/image_303.png)

Gzip can further compress already-compressed files, and that's a valid approach. In fact, 
to get the greatest compression ratio for text-based resources, first minify them individually 
prior to deployment and then compress them at delivery via a Gzip-enabled server.

## Reduce Library Use

Popular CSS and JavaScript libraries do their best to minify and compress their download files, 
but generally they're still pretty serious bandwidth consumers. jQuery, for example -- depending 
on the version and the compression algorithms applied -- might range from 28k to over 250k. 
If you need most of a given library's features, fine; but if you only need one or two specific 
things, you can save a lot of download time by replacing those features with single-use 
functions or CSS rules.

For example, a website might use jQuery's handy `toggleClass` feature to flip classes in order 
to do something specific.

`$(el).toggleClass(className);`

Yes, it works great and it's easy to code, but jQuery is a lot of download overhead for one 
effect. You might consider swapping out that huge library for a far smaller 
single-purpose function 
(source: [You Might Not Need jQuery](http://youmightnotneedjquery.com/#toggle_class)).

```
if (el.classList) {
  el.classList.toggle(className);
} else {
  var classes = el.className.split(' ');
  var existingIndex = classes.indexOf(className);

  if (existingIndex >= 0)
    classes.splice(existingIndex, 1);
  else
    classes.push(className);

  el.className = classes.join(' ');
}
```

The point is, if you don't need an entire 250k library, don't download it. Instead, find 
and use small, single-purpose routines that do only what you need. (And don't forget to 
minify them!)

You can find many interesting and to-the-point alternatives to jQuery code at 
[You Might Not Need jQuery](http://youmightnotneedjquery.com/), which explores how the 
modern web has evolved to provide many of the same capabilities for which we might 
have previously used jQuery.

## Summary

While physically large items like images tend to get a lot of speed-improvement attention, 
text resources -- undoubtedly the primary content of most websites -- are often overlooked. 
Don't ignore text-based components, both visible and behind-the-scenes, as you look for 
ways to speed up your pages.
