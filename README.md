# gulp-smb

Build tooling, work in progress.


## Install

Make sure Node is installed. Currently tested with Node `v.4.6.0` (LTS). Use [NVM](https://github.com/creationix/nvm) to manage versions.

It’s also recommended to install Gulp globally.

```sh
npm install -g gulp
```

**Install Project Dependencies**

```sh
npm install
```


## Usage

### Create Dev Build

```sh
gulp
```

Creates a dev build and watches asset files for changes.

### Create Production Build

```sh
gulp publish
```

Creates a production build.

### Additional: Build Tasks With BrowserSync

If you develop locally, the following two tasks will additionally start a server through BrowserSync:

```sh
gulp local
```

BrowserSync will start a server on the configured port, currently `9999`. On file changes BrowserSync will reload all connected browsers.

```sh
gulp local-production
```

Also opens a preview of the build with BrowserSync on port `9998`. Exit `ctrl + c` if all is okay, and rsync to server.


## Configuration

`/gulp/config.js` is the configuration file that all tasks are using. Everything but the *run sequence* can be adjusted there.

#### Run Sequence

The in **Usage** described tasks are the main tasks of gulp-smb, who run a sequence of defined tasks to make a complete build.

The run sequence of those is defined in `/gulp/tasks/development/build.js` and `/gulp/tasks/production/build.js`. Tasks in `[]` run parallel.


## Project Structure and Tasks

The `gulpfile.js` makes all tasks in `/gulp/tasks/` and its subfolders with [require-dir](https://www.npmjs.com/package/require-dir) available for Gulp.

`default.js` *(Dev Build)* and `publish.js` *(Production Build)* are the two main tasks, who will run the tasks defined in `/gulp/tasks/development/build.js` and `/gulp/tasks/production/build.js`. `local.js` and `local.js` are additional tasks for a local development environment with BrowserSync.

### Task Overview

> Note: Alphabetical order. Task names are used, but the file names aren’t that much different.

#### Development Folder

| Task | Description |
|:-----|:------------|
| `browsersync` | Run build task and start a server with BrowserSync. Only used for `gulp local`.
| `browsersync:reload` | Do a BrowserSync reload.
| `build` | Run all tasks needed for a build, in defined order.
| `copy:html` | Copy HTML files. *(TEMPORARY, we probably don’t need this)*
| `delete` | Clean the asset build folder before a new build.
| `images` | Copy images to build folder.
| `lint-js` | Lint JavaScript files.
| `lint-styles` | Lint SCSS styles.
| `lint-styles:less` | Lint LESS styles. Extra task, so that we can easily disable, or switch to another linter for LESS, as stylelint support is experimental for LESS.
| `rebuild` | Rebuild, when HTML files are changed.
| `rebuild:browsersync` | Rebuild and trigger `browsersync:reload`. Only used for `gulp local`.
| `scripts:base` | Create base.js bundle with r.js and `/js/build-base-config.js`.
| `scripts:modules` | WIP! Should pipe `/js/sti/*/` files and use r.js with the `/js/require-config.js` and `/js/build-module-config.js` config files and the extending arguments, defined somewhere in config.js or the module provides a config file.
| `scripts:require-config` | Create RequireJS `config.js`.
| `scripts:vendor` | Copy vendor JS and create AMD modules for in config.js defined files.
| `sprites` | Create SVG sprites.
| `styles` | Compile SCSS, and then run through PostCSS and it’s plugins (currently Autoprefixer and cssnano) (with source map generation).
| `styles:less` | Compile LESS, and then run through PostCSS and it’s plugins (currently Autoprefixer and cssnano) (with source map generation).
| `watch` | Watch files for changes, and run defined task(s) on file change.
| `watch:browsersync` | Start BrowserSync task, watch files for changes, and run defined task(s) on file change. Only used for `gulp local`.

#### Production Folder

> Reminder: Production uses also some tasks from Dev. This is for example why there is a `copy:css` task, as the Dev task saves the outcome to  `/build/development/`, so we still need to copy it to production.

| Task | Description |
|:-----|:------------|
| `browsersync:production` | Run production build task and start a server with BrowserSync. Only used for `gulp local-production`.
| `build:production` | Run all tasks needed for a build, in defined order.
| `copy:css` | Copy CSS files to production build.
| `copy:html` | Copy HTML files to production build.
| `gzip` | Gzip files.
| `optimize:css` | Optimize CSS files with UnCSS (cssnano, afterwards).
| `optimize:images` | Copy and minimize images, incl. sprites.
| `optimize:js` | Copy and minimize JS files with UglifyJS.
| `rev-update-references` | Replace all links to asset files via a manifest file.
| `revision` | Revision all asset files and write a manifest file.
| `styles` | Compile SCSS, and then run through PostCSS and it’s plugins (currently Autoprefixer and cssnano) **(without source map generation)**.
| `styles:less` | Compile LESS, and then run through PostCSS and it’s plugins (currently Autoprefixer and cssnano) **(without source map generation)**.


## Resources

The structure is based on Stefan Imhoff’s wonderful [Gulp.js series](https://stefanimhoff.de/series/gulp/), and while there are new features, it should be useful as a reference, if you’ve any questions.