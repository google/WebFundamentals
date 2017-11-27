project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: How to use Workbox with NPM Scripts.

{# wf_updated_on: 2017-10-09 #}
{# wf_published_on: 2017-10-14 #}

# NPM {: .page-title }

If you already have a build process based on npm scripts you can use
`workbox-cli` to generate a service worker.

**1.** From your project folder, install the module with NPM.

```bash
npm install --save-dev workbox-cli
```

**2.** Add a command to the `scripts` section of your `package.json`:

```json
"scripts": {
  "build": "node existing_build_script.js && workbox-cli generate:sw"
},
```

**Note:** The command for generating the service worker,
`workbox-cli generate:sw`, should always be the last step in your site's
build process. This ensures that your service worker contains any changes
made during development.

**3.** Run your new command.

```bash
npm run build
```

The first time you run this, a wizard asks several questions about your
project before the module generates a service worker. Answer `Y` when
prompted to save your choices. Your answers will be saved in a file called
`workbox-cli-config.json`.

The next time you run `npm run build`, Workbox uses the JSON file to
regenerate the service worker. If you need to update the
`workbox-cli-config.json`, you can either do it by hand or delete the file
and rerun the wizard.
