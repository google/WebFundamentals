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
  const links = [];
  const srcs = [];
  const callouts = [];
  const linkDefs = [];
  const squareLinks = [];
  const specialWords = [];
  const pragmas = [];

  // Find markdown []() links and replace URL.
  text = text.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, (match, p1, p2, offset, str) => {
    links.push(p2);
    return `[${p1}](${links.length-1})`;
  });

  // Find markdown []: https:..... links and replace URL.
  text = text.replace(/^\[([^\]]+)\]:.*/, (match, p1, p2, offset, str) => {
    linkDefs.push(match); // the entire line
    return `LNKDFS${linkDefs.length-1}`;
  });

  // Find markdown [][] links and replace URL.
  text = text.replace(/\[([^\]]+)\]\[([^\]]+)\]/g, (match, p1, p2, offset, str) => {
    squareLinks.push(p2);
    return `[${p1}][${squareLinks.length-1}]`;
  });

  // Find markdown [][] links and replace URL.
  text = text.replace(/^(Note:|Caution:|Warning:|Success:|Key Point:|Key Term:)/g, (match, p1, p2, offset, str) => {
    callouts.push(p1);
    return `SPCLCLLTS${callouts.length-1}`;
  });

  // Find things that look like a src="" and don't replace
  text = text.replace(/src=\"([^\"]+)\"/g, (match, p1, p2, offset, str) => {
    srcs.push(match);
    return `SRCURL${srcs.length-1}`;
  });

  // Find things that look like a src='' and don't replace
  text = text.replace(/src=\'([^\']+)\'/g, (match, p1, p2, offset, str) => {
    srcs.push(match);
    return `SRCURL${srcs.length-1}`;
  });

  // Find things that look like a href='' and don't replace
  text = text.replace(/href=\'([^\']+)\'/g, (match, p1, p2, offset, str) => {
    srcs.push(match);
    return `SRCURL${srcs.length-1}`;
  });

  // Find things that look like a href="" and don't replace
  text = text.replace(/href=\"([^\']+)\"/g, (match, p1, p2, offset, str) => {
    srcs.push(match);
    return `SRCURL${srcs.length-1}`;
  });

  // Find {: } [][] links and replace URL.
  text = text.replace(/\{:([^\}]+)\}/g, (match, p1, p2, offset, str) => {
    pragmas.push(p1);
    return `PRGMS${pragmas.length-1}`;
  });

  // Find special words and don't translate
  text = text.replace(/\`([^\`]+)\`/g, (match, p1, p2, offset, str) => {
    specialWords.push(p1);
    return `SPCLWRD${specialWords.length-1}`;
  });

  const output = [];
  let results = await translate.translate(text, {to});

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

    // Remap all links of form []()
    translation = translation.replace(/\[([^\]]+)\]\((\d+)\)/gm, (match, p1, p2, offset, str) => {
      return `[${p1}](${links.shift()})`;
    });

    // Remap all callouts
    translation = translation.replace(/SPCLCLLTS(\d+)/gm, (match, p1, p2, offset, str) => {
      return `${callouts.shift()} `;
    });

    // Remap all links of form [][]
    translation = translation.replace(/\[([^\]]+)\]\[(\d+)\]/gm, (match, p1, p2, offset, str) => {
      return `[${p1}][${squareLinks.shift()}]`;
    });

    // Remap all {: } 
    translation = translation.replace(/PRGMS(\d+)/gm, (match, p1, p2, offset, str) => {
      return `{:${pragmas.shift()}}`;
    });

    // Remap all link defintions 
    translation = translation.replace(/^LNKDFS(\d+)/gm, (match, p1, p2, offset, str) => {
      return `${linkDefs.shift()}`;
    });

    // Remap all src="" and src=''
    translation = translation.replace(/SRCURL(\d+)/gm, (match, p1, p2, offset, str) => {
      return `${srcs.shift()}`;
    });

    // Remap all specialWords 
    translation = translation.replace(/SPCLWRD(\d+)/gm, (match, p1, p2, offset, str) => {
      return `\`${specialWords.shift()}\` `;
    });

    // Fix things after the major replacements have happened

    // Find annotated markdown links [@ChromeDevTools][twitter] {:.external} => [][]{}
    translation = translation.replace(/\[([^\]]+)\]\[([^\]]+)\] \{([^\}]+)\}/g,'[$1][$2]{$3}');
    // Find annotated markdown links [@ChromeDevTools](twitter){:.external} => [](){}
    translation = translation.replace(/\[([^\]]+)\]\(([^\)]+)\) \{([^\}]+)\}/g,'[$1]($2){$3}');
    // Clean up {:. external} => [][]{}
    translation = translation.replace(/\{:\. ([^\}]+)\}/g,  (match, p1, p2, offset, str) => {
      return `{: .${p1.toLowerCase().replace(' ', '')} }`;
    });

    // Bodge for Japan
    translation = translation.replace(/\S(\{: \.page-title \})/gm,' $1');
    translation = translation.replace(/^(#+)([^#\s])/gm,'$1 $2');
    translation = translation.replace(/^(#.+?)([^\s])({:[^}]+})([\r\n]|$)/gm,'$1$2 $3');
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

  // Statemachine variables.
  let inHeader = false;
  let inCodeTicks = false;
  let inCodeSpaces = false;
  let inQuote = false;
  let headerNeedsParse = true;
  for (const line of lines) {
    // Don't translate preamble - we are assuming there is a header that ends with just a \n
    if ((line.charAt(0) === '\n' || line.length === 0) && inHeader) { headerNeedsParse = false; inHeader = false; output.push(`{% include "web/_shared/machine-translation-start.html" %}`); output.push(line); continue; }
    if (headerNeedsParse) { inHeader = true; output.push(line); continue; }
    if (inHeader) { output.push(line); continue; }

    // Don't translate code
    if (inCodeTicks && line.startsWith('```')) { inCodeTicks = false; output.push(line); continue; }
    if (line.startsWith('```')) { inCodeTicks = true; if(translateBlock.length > 0) output.push(await translateLines(translateBlock.join(' '), target)); translateBlock = []; output.push(line); continue; }
    if (inCodeTicks) { output.push(line); continue; }

    // Don't translate code prefixed with spaces
    if (inCodeSpaces && line.startsWith('    ') === false) { inCodeSpaces = false; output.push(line); continue; }
    if (line.startsWith('    ')) { inCodeSpaces = true; if(translateBlock.length > 0) output.push(await translateLines(translateBlock.join(' '), target)); translateBlock = []; output.push(line); continue; }
    if (inCodeSpaces) { output.push(line); continue; }

    // Dont translate quotes
    if (inQuote && line.startsWith('>') === false) { inQuote = false; }
    if (line.startsWith('>')) { inQuote = true; if(translateBlock.length > 0) output.push(await translateLines(translateBlock.join(' '), target)); translateBlock = []; output.push(line); continue; }
    if (inQuote) { output.push(line); continue; }

    // Don't translate processing directives, but translate previous text
    if (line.startsWith('{# ')) { if(translateBlock.length > 0) output.push(await translateLines(translateBlock.join(' '), target)); output.push(line); translateBlock = []; continue; } 

     // Don't translate processing directives, but translate previous text
     if (line.startsWith('{% ')) { if(translateBlock.length > 0) output.push(await translateLines(translateBlock.join(' '), target)); output.push(line); translateBlock = []; continue; } 

    // Treat empty line as point to translate paragraph
    if (line.charAt(0) === '\n' || line.length === 0) { if(translateBlock.length > 0) output.push(await translateLines(translateBlock.join(' '), target)); output.push(line); translateBlock = []; continue; } 

    // Treat links in form [TEXT]: #blah as paragraphs, need to filter links `[][]` too
    if (line.match(/^\[([^\]]+)\]:/) !== null) { if(translateBlock.length > 0) output.push(await translateLines(translateBlock.join(' '), target)); translateBlock = [];} 

    // Treat list as paragraphs
    if (line.match(/^[\s]*\*/) !== null) { if(translateBlock.length > 0) output.push(await translateLines(translateBlock.join(' '), target)); translateBlock = [];} 

    translateBlock.push(line);
  }

  if(translateBlock.length > 0) output.push(await translateLines(translateBlock.join(' '), target));

  output.push('{% include "web/_shared/translation-end.html" %}')

  const result = output.join('\n');
  const newPath = filePath.replace(/src\/content\/en\//, `src/content/${target}/`);
  ensureDirectoryExistence(newPath);
  fs.writeFileSync(newPath, result);
  console.log(`Translation written to '${newPath}`);
}

targets.forEach(async (target) => {
  try {
    await processFile(program.source, target);
  } catch (ex) {
    console.log(target, ex)
    process.exit(-1);   
  }
})
