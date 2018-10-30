#! /usr/bin/node
// Imports the Google Cloud client library
const { Translate } = require('@google-cloud/translate');
const program = require('commander');
const fs = require('fs');
const path = require('path');

program
  .version('0.1.0')
  .option('-s, --source [path]', 'Add in the source file.')
  .option('-t, --target <lang>', 'Add target language.')
  .parse(process.argv);

// Creates a client
const translate = new Translate({
  projectId: 'html5rocks-hrd'
});

const targets = program.target.split(',')

async function translateLines(text, to) {
  if(text === ' ') return ' ';

  const replaceText = '<span class="notranslate">$&<\/span>';
  const wordsToReplace = [];

  let replacer = (match) => {
    wordsToReplace.push(match);
    // Gogole translate doesn't like HTML in the span so we have to do something special.
    return `<span class="notranslate">WORDS${wordsToReplace.length - 1}</span>`;
  };

  // # headings should not be considered in the translations
  text = text.replace(/^(#+)/g, replacer);

  // Find markdown [](){: } links and replace URL.
  text = text.replace(/\[([^\]]+)\]\(([^\)]+)\)\{:([^\}]+)\}/g, replacer);

  // Find markdown []() links and replace URL.
  text = text.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, replacer);

  // Find markdown []: https:..... links and replace URL.
  text = text.replace(/^\[([^\]]+)\]:.*/, replacer);

  // Find markdown [][]{: } links
  text = text.replace(/\[([^\]]+)\]\[([^\]]+)\]\{:([^\}]+)\}/g, replacer);

  // Find markdown [][] links
  text = text.replace(/\[([^\]]+)\]\[([^\]]+)\]/g, replacer);

  // Find special words and don't translate
  text = text.replace(/\`([^\`]+)\`/g, replacer);

  // Find special markdown commands.
  text = text.replace(/^(Note:|Caution:|Warning:|Success:|Key Point:|Key Term:)/g, replaceText);

  // Find things that look like a src="" and don't replace
  text = text.replace(/src=\"([^\"]+)\"/g, replaceText);

  // Find things that look like a src='' and don't replace
  text = text.replace(/src=\'([^\']+)\'/g, replaceText);

  // Find things that look like a href='' and don't replace
  text = text.replace(/href=\'([^\']+)\'/g, replaceText);

  // Find things that look like a href="" and don't replace
  text = text.replace(/href=\"([^\"]+)\"/g, replaceText);

  // Find {: } and replace that are remaining.
  text = text.replace(/\{:([^\}]+)\}/g, replacer);

  // NOTE: The ordering of above is important, we need to work out what to do
  // when we have nested replacers [Some `text` goes here]  everthing in the [] is left un-translated

  const output = [];

  let results = await translate.translate(text, {to, from: 'en', format: 'html'});

  let translations = results[0];
  translations = Array.isArray(translations)
    ? translations
    : [translations];

  // Note these fixes are not sustainable
  translations.forEach((translation, i) => {
    // Find markdown links that are broken [] () => []()
    translation = translation.replace(/\[([^\]]+)\] \(([^\)]+)\)/g,'[$1]($2)');
    // Find markdown links that are broken [] [] => [][]
    translation = translation.replace(/\[([^\]]+)\] \[([^\]]+)\]/g,'[$1][$2]');
    
    // Clean up things that look like broken tags
    translation = translation.replace(/<\/ ([^>]+)>/g,  (match, p1, p2, offset, str) => {
      return `${match.replace(' ', '')}`;
    });

    // Find markdown image links that are broken ! []() => ![]()
    translation = translation.replace(/! \[([^\]]+)\]\(([^\)]+)\)/g,' ![$1]($2)');
    // Find markdown image links that are broken ! []() => ![][]
    translation = translation.replace(/! \[([^\]]+)\]\[([^\]+)])/g,' ![$1][$2]');
    // Find markdown links where the target has spaces in the wrong place [](/ ERROR /)
    translation = translation.replace(/\[([^\]]+)\]\(\/( ([^\)]+) )\/\)/g,'[$1]($3)');
    translation = translation.replace(/\[([^\]]+)\]\u{FF08}([^\u{FF09}]+)\u{FF09}/gu,'[$1]($2)');
    translation = translation.replace(/＃/gu,'#');

    translation = translation.replace(/<span class="notranslate">WORDS(\d+)<\/span>/gm, (match, p1) => {
      return wordsToReplace[parseInt(p1)];
    });

    translation = translation.replace(/<span class="notranslate">(.+?)<\/span>/gm, '$1');

    // Fix things after the major replacements have happened

    // Find annotated markdown links [@ChromeDevTools][twitter] {:.external} => [][]{}
    translation = translation.replace(/\[([^\]]+)\]\[([^\]]+)\] \{([^\}]+)\}/g,'[$1][$2]{$3}');
    // Find annotated markdown links [@ChromeDevTools](twitter){:.external} => [](){}
    translation = translation.replace(/\[([^\]]+)\]\(([^\)]+)\) \{([^\}]+)\}/g,'[$1]($2){$3}');
   
    // Bodge for Japan
    //translation = translation.replace(/\S(\{: \.page-title \})/gm,' $1');
    translation = translation.replace(/^(#+)([^#\s])/gm,'$1 $2');
    //translation = translation.replace(/^(#.+?)([^\s])({:[^}]+})([\r\n]|$)/gm,'$1$2 $3');
    translation = translation.replace(/：/gu,':');
    // Remove double spaces to clean up.
    translation = translation.replace(/  /g, ' ');
    
    output.push(translation);
  });

  return output.join('\n');
};


function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

// Translates the text into the target language. "text" can be a string for
// translating a single piece of text, or an array of strings for translating
// multiple texts.
async function processFile(filePath, target) {

  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split('\n');
  const output = [];
  let translateBlock = [];

  // State machine variables.
  let inHeader = false;
  let inCodeTicks = false;
  let inCodeSpaces = false;
  let inQuote = false;
  let headerNeedsParse = true;

  let inHTML = false;

  let translate = async () => {
    if(translateBlock.length > 0) {
      output.push(await translateLines(translateBlock.join(' '), target));
    }
    translateBlock = [];
  }

  for (const line of lines) {
    // Don't translate preamble - we are assuming there is a header that ends with just a \n
    if ((line.charAt(0) === '\n' || line.length === 0) && inHeader) { headerNeedsParse = false; inHeader = false; output.push(`{% include "web/_shared/machine-translation-start.html" %}`); output.push(line); continue; }
    if (headerNeedsParse) { inHeader = true; output.push(line); continue; }
    if (inHeader) { output.push(line); continue; }

    // Don't translate code
    if (inCodeTicks && line.startsWith('```')) { inCodeTicks = false; output.push(line); continue; }
    if (line.startsWith('```')) { inCodeTicks = true; await translate(); translateBlock = []; output.push(line); continue; }
    if (inCodeTicks) { output.push(line); continue; }

    // Don't translate code prefixed with spaces
    if (inCodeSpaces && line.startsWith('    ') === false) { inCodeSpaces = false; output.push(line); continue; }
    if (line.startsWith('    ') && !inHTML) { inCodeSpaces = true; await translate(); output.push(line); continue; }
    if (inCodeSpaces) { output.push(line); continue; }

    // Dont translate quotes
    if (inQuote && line.startsWith('>') === false) { inQuote = false; }
    if (line.startsWith('>')) { inQuote = true; await translate(); output.push(line); continue; }
    if (inQuote) { output.push(line); continue; }

    // Don't translate HTML - valid HTML has a <
    if (inHTML && line.length === 0) { inHTML = false; output.push(line); continue; }
    if (line.startsWith('<')) { inHTML = true; await translate(); output.push(line); continue; }
    if (inHTML) { output.push(line); continue; }

    // Don't translate processing directives, but translate previous text
    if (line.startsWith('{# ')) { await translate(); output.push(line); continue; }

    // Don't translate processing directives, but translate previous text
    if (line.startsWith('{% ')) { await translate(); output.push(line); continue; }

    // Treat empty line as point to translate paragraph
    if (line.charAt(0) === '\n' || line.length === 0) { await translate(); output.push(line); continue; } 

    // Treat links in form [TEXT]: #blah as paragraphs, need to filter links `[][]` too
    if (line.match(/^\[([^\]]+)\]:/) !== null) { await translate(); }

    // Treat list as paragraphs
    if (line.match(/^[\s]*\*/) !== null) { await translate(); }

    translateBlock.push(line);
  }

  if(translateBlock.length > 0) output.push(await translateLines(translateBlock.join(' '), target));

  output.push('{% include "web/_shared/translation-end.html" %}')

  const result = output.join('\n');
  const newPath = filePath.replace(/src\/content\/en\//, `src/content/${target}/`);
  ensureDirectoryExistence(newPath);
  fs.writeFileSync(newPath, result);
  return newPath;
}


const run = async () => {
  for (const target of targets) {
    try {
      console.log(`Translating ${program.source} in to ${target}`)
      let newPath = await processFile(program.source, target);
      console.log(`Translation written to '${newPath}`);
    } catch (ex) {
      console.log(target, ex)
      process.exit(-1);   
    }
  }
};

run();