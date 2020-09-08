project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: How we migrate Chrome DevTools to JavaScript modules. The Chrome DevTools engineering blog - by the developers who build the DevTools.

{# wf_updated_on: 2020-09-08 #}
{# wf_published_on: 2020-09-08 #}
{# wf_tags: devtools-blog #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: How we migrate Chrome DevTools to JavaScript modules. #}
{# wf_blink_components: N/A #}

# DevTools architecture refresh: Migrating to JavaScript modules {: .page-title }

{% include "web/_shared/contributors/tvanderlippe.html" %}

As you might know, [Chrome DevTools](/web/tools/chrome-devtools) is a web application written using HTML, CSS and JavaScript.
Over the years, DevTools has gotten more feature-rich, smarter and knowledgeable about the broader web platform. 
While DevTools has expanded over the years, its architecture largely resembles the original architecture while it was still part of [WebKit](https://webkit.org/web-inspector/).

This post is part of a **series of blog posts** describing **the changes we are making to DevTools' architecture and how it is built**.
We will explain how DevTools has historically worked, what the benefits and limitations were and what we have done to alleviate the limitations.
Therefore, let's dive deep into module systems, how to load code and how we ended up using JavaScript modules.

## In the beginning, there was nothing
While the current frontend landscape has a variety of module systems with tools built around them, as well as the [now-standardized JavaScript modules format](https://v8.dev/features/modules), none of these existed when DevTools was first built.
DevTools is built on top of code that initially shipped in WebKit more than 12 years ago.

The first mention of a module system in DevTools stems from 2012: [the introduction of a list of modules with an associated list of sources](https://chromium.googlesource.com/chromium/src/+/3a68bf939c8c8909ca84fea932fd42739e796638%5E%21/).
This was part of the Python infrastructure used back then to compile and build DevTools.
A follow-up change extracted all modules into a separate `frontend_modules.json` file ([commit](https://chromium.googlesource.com/chromium/src/+/f8dbf1efbac98ffb266a10a32469b28ca0dff7b4)) in 2013 and then into separate `module.json` files ([commit](https://chromium.googlesource.com/chromium/src/+/f0148d511def6522b3166ec507a18328e72ea652)) in 2014.

An example `module.json` file:
```js
{
  "dependencies": [
    "common"
  ],
  "scripts": [
    "StylePane.js",
    "ElementsPanel.js"
  ]
}
```

Since 2014, the `module.json` pattern has been used in DevTools to specify its modules and source files.
Meanwhile, the web ecosystem was rapidly iterating and multiple module formats were created, including UMD, CommonJS and the eventually standardized JavaScript modules.
However, DevTools remained using the `module.json` format.

While DevTools remained working, there were a couple of downsides of using a non-standardized and unique module system:

1. The `module.json` format required custom build tooling, akin to modern bundlers.
2. There was no IDE integration, which required custom tooling to generate files modern IDEs could understand ([the original script to generate jsconfig.json files for VS Code](https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/2098602/3/scripts/generate_jsconfig.js)).
3. Functions, classes and objects were all put on the global scope to make sharing between modules possible.
4. Files were order-dependent, meaning the order in which `sources` were listed was important. There was no guarantee that code you rely on would be loaded, other than that a human had verified it.

All in all, when evaluating the current state of the module system in DevTools and the other (more widely used) module formats, we concluded that the `module.json` pattern was creating more problems than it solved and it was time to plan our move away from it.

## The benefits of standards

Out of the existing module systems, we chose JavaScript modules as the one to migrate to.
At the time of that decision JavaScript modules were still shipping behind a flag in Node.js and a large amount of packages available on NPM did not have an JavaScript modules bundle we could use.
Despite this, we concluded that JavaScript modules were the best option.

The primary benefit of JavaScript modules is that it is **the standardized module format for JavaScript**.
When we listed the downsides of the `module.json` (see above), we realized that almost all of them were related to using a non-standardized and unique module format.

> Choosing a module format that is non-standardized means that we have to invest time ourselves into building integrations with the build tools and tools our maintainers used.

These integrations often were brittle and lacking support for features, requiring additional maintenance time, sometimes leading to subtle bugs that would eventually ship to users.

Since JavaScript modules were the standard, it meant that IDEs like VS Code, type checkers like Closure Compiler/TypeScript and build tools like Rollup/minifiers would be able to understand the source code we wrote.
Moreover, when a new maintainer would join the DevTools team, they would not have to spend time learning a proprietary `module.json` format, whereas they would (likely) already be familiar with JavaScript modules.

Of course, when DevTools was initially built, none of the above benefits were there.
It took years of work in standards groups, runtime implementations and developers using JavaScript modules providing feedback to get to the point where they are now.
But when JavaScript modules became available we had a choice to make: either keep maintaining our own format, or invest in migrating to the new one.

## The cost of the shiny new

Even though JavaScript modules had plenty of benefits that we would like to use, we remained in the non-standard `module.json` world.
Reaping the benefits of JavaScript modules meant that we had to significantly invest in cleaning up technical debt, performing a migration that could potentially break features and introduce regression bugs.

At this point, it was not a question of "Do we want to use JavaScript modules?", but a question of **"How expensive is it to be able to use JavaScript modules?"**.
Here, we had to balance the risk of breaking our users with regressions, the cost of engineers spending (a large amount of) time migrating and the temporary worse state we would work in.

That last point turned out to be very important. Even though we could in theory get to JavaScript modules, during a migration we would end up with code that would have to take into account **both** `module.json` and JavaScript modules.
Not only was this technically difficult to achieve, it also meant that all engineers working on DevTools would need to know how to work in this environment.
They would have to continuously ask themselves "For this part of the codebase, is it `module.json` or JavaScript modules and how do I make changes?".

> Sneak peek: The hidden cost of guiding our fellow maintainers through a migration was bigger than we anticipated.

After the cost analysis, we concluded that it was still worthwhile to migrate to JavaScript modules.
Therefore, our main goals were the following:

1. Make sure that the usage of JavaScript modules reaps the benefits to the fullest extent possible.
2. Make sure that the integration with the existing `module.json`-based system is safe and does not lead to negative user impact (regression bugs, user frustration).
3. Guide all DevTools maintainers through the migration, primarily with checks and balances built-in to prevent accidental mistakes.

## Spreadsheets, transformations and technical debt

While the goal was clear, the limitations imposed by the `module.json` format proved to be difficult to workaround.
It took several iterations, prototypes and architectural changes before we developed a solution we were comfortable with.
We wrote [a design doc](https://docs.google.com/document/d/1h9dOy3nNPNfZ2AtZXzB-DwJqG4Oo37WWvKLCuzCcPzo/preview) with the migration strategy we ended up.
The design doc also listed our initial time estimation: 2-4 weeks.

> Spoiler alert: the most intensive part of the migration took 4 months and from start to finish took 7 months!

The initial plan, however, stood the test of time: we would teach the DevTools runtime to load all files listed in the `scripts` array in the `module.json` file using the old way, while all files in listed in the `modules` array with [JavaScript modules dynamic import](https://v8.dev/features/dynamic-import).
Any file that would reside in the `modules` array would be able to use ES imports/exports.

Additionally, we would perform the migration in 2 phases (we eventually split up the last phase into 2 sub-phases, see below): the `export`- and `import`-phases.
The status of which module would be in which phase was tracked in a large spreadsheet:

![JavaScript modules migration spreadsheet](/web/updates/images/2020/09/es-migrate-spreadsheet.png)

A snippet of the progress sheet is publicly available [here](https://docs.google.com/spreadsheets/d/1V3__BKLaiVHF7t9cgX-4DNwO1FgZdteF35hOlH0QLVo/preview).

### `export`-phase

The first phase would be to add `export`-statements for all symbols that were supposed to be shared between modules/files.
The transformation would be automated, by [running a script per folder](https://chromium-review.googlesource.com/c/chromium/src/+/1808867).
Given the following symbol would exist in the `module.json` world:

```js
Module.File1.exported = function() {
  console.log('exported');
  Module.File1.localFunctionInFile();
};
Module.File1.localFunctionInFile = function() {
  console.log('Local');
};
```
(Here, `Module` is the name of the module and `File1` the name of the file. In our sourcetree, that would be `front_end/module/file1.js`.)

This would be transformed to the following:

```js
export function exported() {
  console.log('exported');
  Module.File1.localFunctionInFile();
}
export function localFunctionInFile() {
  console.log('Local');
}

/** Legacy export object */
Module.File1 = {
  exported,
  localFunctionInFile,
};
```

Initially, our plan was to rewrite same-file imports during this phase as well.
For example, in the above example we would rewrite `Module.File1.localFunctionInFile` to `localFunctionInFile`.
However, we realized that it would be easier to automate and safer to apply if we separated these two transformations.
Therefore, the "migrate all symbols in the same file" would become the second sub-phase of the `import`-phase.

Since adding the `export` keyword in a file transforms the file from a "script" to a "module", a lot of the DevTools infrastructure had to be updated accordingly.
This included the runtime (with dynamic import), but also tools like `ESLint` to run in module mode.

One discovery we made while working through these issues is that our tests were running in "sloppy" mode.
Since JavaScript modules imply that files run in `"use strict"` mode, this would also affect our tests.
As it turned out, [a non-trivial amount of tests](https://chromium-review.googlesource.com/c/chromium/src/+/1958116) were relying on this sloppiness, including [a test](https://chromium-review.googlesource.com/c/chromium/src/+/1958116/3/third_party/blink/web_tests/http/tests/devtools/console/console-eval-scoped.js) that used a `with`-statement 😱.

In the end, updating the very first folder to include `export`-statements [took about a week](https://chromium-review.googlesource.com/c/chromium/src/+/1816563) and [multiple attempts with relands](https://chromium-review.googlesource.com/c/chromium/src/+/1825420).

### `import`-phase

After all symbols are both exported using `export`-statements and remained on the global scope (legacy), we had to update all references to cross-file symbols to use ES imports.
The end goal would be to remove all "legacy export objects”, cleaning up the global scope.
The transformation would be automated, by [running a script per folder](https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/1958525).

For example, for the following symbols that exist in the `module.json` world:

```js
Module.File1.exported();
AnotherModule.AnotherFile.alsoExported();
SameModule.AnotherFile.moduleScoped();
```

They would be transformed to:

```js
import * as Module from '../module/Module.js';
import * as AnotherModule from '../another_module/AnotherModule.js';

import {moduleScoped} from './AnotherFile.js';

Module.File1.exported();
AnotherModule.AnotherFile.alsoExported();
moduleScoped();
```

However, there were some caveats with this approach:

1. Not every symbol was named as `Module.File.symbolName`.
Some symbols were named solely `Module.File` or even `Module.CompletelyDifferentName`.
This inconsistency meant that we had to create an internal mapping from the old global object to the new imported object.
2. Sometimes there would be clashes between moduleScoped names.
Most prominently, we used a pattern of declaring certain types of `Events`, where each symbol was named just `Events`.
This meant that if you were listening for multiple types of events declared in different files, a nameclash would occur on the `import`-statement for those `Events`.
3. As it turned out, there were circular dependencies between files.
This was fine in a global scope context, as the usage of the symbol was after all code was loaded.
However, if you require an `import`, the circular dependency would be made explicit.
This isn't a problem immediately, unless you have side-effect function calls in your global scope code, which DevTools also had.
All in all, it required some surgery and refactoring to make the transformation safe.

## A whole new world with JavaScript modules

In February 2020, 6 months after the start in September 2019, [the last cleanups](https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/2055066) were performed in the `ui/` folder.
This marked the unofficial end to the migration.
After letting the dust settle down, we officially marked the migration as [finished on March 5th 2020](https://bugs.chromium.org/p/chromium/issues/detail?id=1006759#c410). 🎉

Now, all modules in DevTools use JavaScript modules to share code.
We still put some symbols on the global scope (in the `module-legacy.js` files) for our legacy tests or to integrate with other parts of the DevTools architecture.
These will be removed over time, but we don't consider them a blocker for future development.
We also have [a style guide for our usage of JavaScript modules](https://docs.google.com/presentation/d/1KaTDaKEcLmgv3Wum79gPP9mv9x2fm3kuEgx_b8wLVug/preview).

### Statistics

Conservative estimates for the number of CLs (abbreviation for changelist - the term used in Gerrit that represents a change - similar to a GitHub pull request) involved in this migration are around **250 CLs, largely performed by 2 engineers**.
We don't have definitive statistics on the size of changes made, but a conservative estimate of lines changed (calculated as the sum of absolute difference between insertions and deletions for each CL) to be around **30,000 (~20% of all of DevTools frontend code)**.

The first file using `export` shipped in Chrome 79, released to stable in December 2019.
The last change to migrate to `import` shipped in Chrome 83, released to stable in May 2020.

We are aware of 1 regression that shipped to Chrome stable and that was introduced as part of this migration.
The auto-completion of snippets in the command menu [broke](https://bugs.chromium.org/p/chromium/issues/detail?id=1060565) due to an [extraneous `default` export](https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/2107222/2/front_end/snippets/SnippetsQuickOpen.js).
We have had several other regressions, but our automated test suites and Chrome Canary users reported these and we fixed them before they were able to reach Chrome stable users.

You can see the full journey (not all CLs are attached to this bug, but most of them are) logged on [crbug.com/1006759](https://crbug.com/1006759).

## What we learned

1. Decisions made in the past can have a long lasting impact on your project.
Even though JavaScript modules (and other module formats) were available for quite some time, DevTools was not in a position to justify the migration.
Deciding when to and when not to migrate is difficult and based on educated guesses.
2. Our initial time estimates were in weeks rather than months.
This largely stems from the fact that we found more unexpected problems than we anticipated in our initial cost analysis.
Even though the migration plan was solid, technical debt was (more often than we would have liked) the blocker.
3. The JavaScript modules migration included a large amount of (seemingly unrelated) technical debt cleanups.
The migration to a modern standardized module format allowed us to realign our coding best practices with modern day web development.
For example, we were able to replace our custom Python bundler with a minimal Rollup configuration.
4. Despite the large impact on our codebase (~20% of code changed), very few regressions were reported.
While we did have numerous issues migrating the first couple of files, after a while we had a solid, partially automated, workflow.
This meant that negative user impact for our stable users was minimal for this migration.
5. Teaching the intricacies of a particular migration to fellow maintainers is difficult and sometimes impossible.
Migrations of this scale are difficult to follow and require a lot of domain knowledge.
Transferring that domain knowledge to others working in the same codebase is not desirable per se for the job they are doing.
Knowing what to share and what details not to share is an art, but a necessary one.
It is therefore crucial to reduce the amount of large migrations, or at the very least not perform them at the same time.

<<../../_shared/devtools-feedback.md>>

<<../../_shared/discover-devtools-blog.md>>

{% include "web/_shared/rss-widget-updates.html" %}