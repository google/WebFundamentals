'use strict';

console.log('Migration Assistant');
console.log(' - Helps migrate content to the new Web Fundamentals folder structure');
console.log('   This file is only meant as a temporary tool and should be removed');
console.log('   once the migration has been completed.');
console.log('Usage: node migrate.js path/to/files/');
console.log('');
if (!process.argv[2]) {
  console.log('Error: no path provided.');
}

var fs = require('fs');

function updateFile(filename) {
  fs.readFile(filename, {'encoding': 'utf8'}, function(err, data) {
    if (err) {
      console.error('ERROR: could not read file: ' + filename);
      console.dir(err);
    } else {
      console.log('Migrating ' + filename);
      // change the layout
      data = data.replace(/^layout: article\n/m, 'layout: shared/plain\n');
      data = data.replace(/^layout: section\n/m, 'layout: shared/plain\n');

      //remove: article, collection, id
      data = data.replace(/^article:\n/m, '');
      data = data.replace(/^collection: .+?\n/m, '');
      data = data.replace(/^id: .+?\n/m, '');

      // un-indent written_on, updated_on and order
      data = data.replace(/^\s{2}(written_on: \d{4}-\d{2}-\d{2}\n)/m, '$1');
      data = data.replace(/^\s{2}(updated_on: \d{4}-\d{2}-\d{2}\n)/m, '$1');
      data = data.replace(/^\s{2}(order: \d{1,3}\n)/m, '$1');

      // change priority to translation_priority
      data = data.replace(/^(priority: \d{1,2}\n)/m, 'translation_$1');

      // change related to related-guides and remember to notes
      data = data.replace(/^related:\n/m, 'related-guides:\n');
      data = data.replace(/^({\%.+related_guides\.liquid.+\slist=page)\.(related)\./m, '$1.related-guides.');
      data = data.replace(/^remember:\n/m, 'notes:\n');
      data = data.replace(/^({\%.+remember\.liquid.+\slist=page)\.(remember)\./m, '$1.notes.');

      // remove {% wrap content %} and {% endwrap %}
      data = data.replace(/^{%\s*wrap content\s*\%}\n/m, '<p class="intro">\n__XX_INTRO_XX__\n</p>\n');
      data = data.replace(/^{%\s*endwrap\s*\%}\n/m, '');

      // Update guides to use shared instead of modules
      data = data.replace(/^{\%\s*include modules\/takeaway.liquid/mg, '{% include shared/takeaway.liquid');
      data = data.replace(/^{\%\s*include modules\/remember.liquid/mg, '{% include shared/remember.liquid');
      data = data.replace(/^{\%\s*include modules\/related_guides.liquid/mg, '{% include shared/related_guides.liquid');
      data = data.replace(/^{\%\s*include modules\/toc.liquid.*}/mg, '{% include shared/toc.liquid %}');

      // Remove nextarticle.liquid
      data = data.replace(/^{\%.*include modules\/nextarticle.liquid.*}\n/m, '');

      // Update Snippets
      data = data.replace(/^{\% include_code _code\/([^ ]*)\s*\%}/gm, '{% include_code src=_code/$1 %}');
      data = data.replace(/^{\% include_code _code\/([^ ]*) (\w+)\s*\%}/gm, '{% include_code src=_code/$1 snippet=$2 %}');
      data = data.replace(/^{\% include_code _code\/([^ ]*) (\w+) (\w+)\s*\%}/gm, '{% include_code src=_code/$1 snippet=$2 lang=$3 %}');

      // Update Tables
      data = data.replace(/class="g-wide--1 g-medium--half"/gm, 'class="mdl-cell mdl-cell--6--col"');
      data = data.replace(/class="g-wide--3 g-wide--last g-medium--half g--last"/gm, 'class="mdl-cell mdl-cell--6--col"');
      data = data.replace(/class="g--half"/gm, 'class="mdl-cell mdl-cell--6--col"');
      data = data.replace(/class="g--half g--last"/gm, 'class="mdl-cell mdl-cell--6--col"');

      // Use the new YouTube player
      data = data.replace(/{\%\s*include modules\/video\.liquid id="(\w+)"\s*\%}/gm, '{% ytvideo $1 %}');

      // Handle the introduction
      var reIntro = /^introduction:[\s'"]{0,2}(.*?)['"]?\n/m;
      var result = reIntro.exec(data);
      if (result && result.length > 0) {
        var intro = result[0];
        intro = intro.replace(/^introduction:[\s'"]{0,2}/m, '');
        data = data.replace(/__XX_INTRO_XX__/m, '  ' + intro);
      }
      data = data.replace(reIntro, '');

      fs.writeFile(filename, data);
    }
  });
}

if (!String.prototype.endsWith) {
  Object.defineProperty(String.prototype, 'endsWith', {
    value: function(searchString, position) {
      var subjectString = this.toString();
      if (position === undefined || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    }
  });
}

var dir = process.argv[2];
var files = fs.readdirSync(dir);
files.forEach(function(filename) {
  if (filename.endsWith('.markdown')) {
    updateFile(dir + filename);
  }
});
