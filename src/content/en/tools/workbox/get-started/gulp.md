project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: How to use Workbox with Gulp.

{# wf_updated_on: 2017-10-14 #}
{# wf_published_on: 2017-10-14 #}

# Gulp

Use gulp and `workbox-build` to build a precaching service worker. Simply
install the module then cut and paste the code sample.

**1.** [Install Node.js](https://nodejs.org/en/).

**2.** Install the module with NPM.

```bash
npm install workbox-build --save-dev
```

**3.** Require `workbox-build` in your gulp `gulpfile.js`.

```javascript
const wbBuild = require('workbox-build');
```

**4.** Also in `gulpfile.js` add a task to build a service worker.

```javascript
gulp.task('bundle-sw', () => {
  return wbBuild.generateSW({
    globDirectory: './app/',
    swDest: './app/sw.js',
    globPatterns: ['**\/*.{html,js,css}'],
    globIgnores: ['admin.html'],
    templatedUrls: {
      '/shell': ['shell.hbs', 'main.css', 'shell.css'],
    },
  })
  .then(() => {
    console.log('Service worker generated.');
  })
  .catch((err) => {
    console.log('[ERROR] This happened: ' + err);
  });
})
```

**Note:** The gulp task for generating the service worker should always be
run as the last step in each build. This ensures that your service worker
contains any changes made during development.
