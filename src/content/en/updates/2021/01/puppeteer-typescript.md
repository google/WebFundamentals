project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: How we migrate Puppeteer to TypeScript. The Chrome DevTools engineering blog - by the developers who build the DevTools.

{# wf_updated_on: 2021-01-19 #}
{# wf_published_on: 2021-01-21 #}
{# wf_tags: devtools-blog #}
{# wf_featured_image: /web/updates/images/2021/01/devtools-blog.png #}
{# wf_featured_snippet: How we migrate Puppeteer to TypeScript. #}
{# wf_blink_components: N/A #}

# Migrating Puppeteer to TypeScript {: .page-title }

{% include "web/_shared/contributors/jackfranklin.html" %}

<<../../_shared/devtools-research.md>>

We’re big fans of TypeScript on the DevTools team — so much so that new code in DevTools is being authored in it and we’re in the middle of a big migration of the entire codebase to being type-checked by TypeScript. You can find out more about that migration in [our talk at Chrome Dev Summit 2020](https://youtu.be/BHogHiiyuQk). It therefore made perfect sense to look at migrating [Puppeteer’s codebase](https://pptr.dev/) to TypeScript, too.

## Planning the migration

When planning how to migrate we wanted to be **able to make progress in small steps**. This keeps the overhead of the migration down — you’re working only on a small part of the code at anyone time — and keeps the risk down, too. If anything goes wrong with one of the steps you can easily revert it. Puppeteer has a lot of users and a broken release would cause problems for lots of them, so it was vital that we kept the risk of breaking changes to a minimum.

We were also fortunate that Puppeteer has a **robust set of unit tests** in place covering all of its functionality. This meant we could be confident that we weren’t breaking code as we migrated, but also that we weren’t introducing changes to our API. The goal of the migration was to complete it without any Puppeteer users even realising that we’d migrated, and the tests were a vital part of that strategy. If we hadn't had good test coverage, we would have added that before continuing with the migration.

Performing any code change without tests is risky, but changes where you’re touching entire files or the entirety of the codebase are especially risky. When making mechanical changes, it’s easy to miss a step, and on multiple occasions the tests caught a problem that had slipped past both the implementer and the reviewer.

One thing we did invest time in upfront was our **Continuous Integration (CI) setup**. We noticed that CI runs against pull requests were flaky and often failed. This happened so often that we’d gotten into the habit of ignoring our CI and merging the pull requests anyway, assuming that the failure was a one-off issue on CI rather than a problem in Puppeteer.

After some general maintenance and dedicated time to fix some regular test flakes, we got it into a much more consistently passing state, enabling us to listen to CI and know that a failure was indicating an actual problem. This work isn’t glamorous, and it’s frustrating watching endless CI runs, but it was vital to have our **test suite running reliably** given the number of pull requests that the migration was throwing at it.

## Pick and land one file

At this point we had our migration ready to go and a robust CI server full of tests to watch our backs. Rather than dive in on any arbitrary file, we purposefully **picked a small file to migrate**. This is a useful exercise because it lets you validate the planned process you’re about to undertake. If it works on this file, your approach is valid; if not, you can go back to the drawing board.

Additionally going file by file (and with regular Puppeteer releases, so all the changes didn’t ship in the same npm version) kept the risk down. [We picked `DeviceDescriptors.js` as the first file](https://github.com/puppeteer/puppeteer/pull/5595), because it was one of the most straightforward files in the codebase. It can feel slightly underwhelming to do all this prep work and land such a small change, but the goal isn’t to make huge changes immediately, but to proceed with caution and methodically file by file. Time spent validating the approach definitely saves time later on in the migration when you hit those more complicated files.


## Prove the pattern and repeat

Thankfully the change to `DeviceDescriptors.js` successfully made it into the codebase, and the plan worked as we’d hoped it would! At this point you’re ready to knuckle down and get on with it, which is [exactly what we did](https://github.com/puppeteer/puppeteer/issues?q=label%3Atypescript-migration+is%3Aclosed). Using a GitHub label is a really nice way to group all pull requests together, and we found that useful to track progress.

## Get it migrated and improve it later

For any individual JavaScript file our process was:

1. **Rename** the file from `.js` to `.ts`.
2. **Run** the TypeScript compiler.
3. **Fix** any issues.
4. Create the **pull request**.


Most of the work in these initial pull requests was to extract TypeScript interfaces for existing data structures. In the case of the [first pull request](https://github.com/puppeteer/puppeteer/pull/5595) that migrated `DeviceDescriptors.js` that we discussed previously, the code went from:

```
module.exports = [
  { 
    name: 'Pixel 4',
    … // Other fields omitted to save space
  }, 
  …
]
```

And became:

```
interface Device {
  name: string,
  …
}

const devices: Device[] = [{name: 'Pixel 4', …}, …]

module.exports = devices;
```

As part of this process that meant that we worked through every line of the codebase checking for issues. As with any codebase that’s been around a few years and grown over time, there are areas of opportunity to refactor code and improve the situation. Especially with the move to TypeScript, we saw places where a slight restructure of the code would enable us to lean on the compiler more and get better type safety.

Counter-intuitively, it’s really important to **resist making these changes straight away**. The goal of the migration is to get the codebase into TypeScript, and at all times during a large migration you should be thinking about the risk of causing breakages to the software and to your users. By keeping the initial changes minimal, we kept that risk low. Once the file was merged and migrated to TypeScript, we could then make follow-up changes to improve the code to leverage the type system. Make sure you **set strict boundaries for your migration** and try to stay within them.

## Migrating the tests to test our type definitions

Once we had the entire source code migrated to TypeScript, we could turn our **focus to our tests**. Our tests had great coverage, but were all written in JavaScript. This meant that one thing they didn’t test was our type definitions. One of the long-term goals of the project (which we’re [still working on](https://github.com/puppeteer/puppeteer/issues/6124)) is to ship high-quality type definitions out of the box with Puppeteer, but we didn’t have any checks in our codebase about our type definitions.

By migrating the tests to TypeScript (following the same process, going file by file), we found issues with our TypeScript that would otherwise have been left up to users to find for us. Now **our tests not only cover all our functionality, but act as a quality check of our TypeScript too**!

We’ve already benefited hugely from TypeScript as engineers who work on the Puppeteer codebase. Coupled with our much improved CI environment, it’s enabled us to become more productive when working on Puppeteer and have TypeScript catch bugs that otherwise would have made it into an npm release. We’re excited to get high quality TypeScript definitions shipped to enable all the developers using Puppeteer to benefit from this work too.



<<../../_shared/devtools-feedback.md>>

<<../../_shared/discover-devtools-blog.md>>

{% include "web/_shared/rss-widget-updates.html" %}