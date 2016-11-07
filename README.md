# gulp-smb

Build tooling, work in progress.

## Install

Make sure Node is installed. Currently tested with Node `v.4.6.0` (LTS). Use [NVM](https://github.com/creationix/nvm) to manage versions.

It’s also recommended to install Gulp globally.

```sh
npm install -g gulp
```

**Install Dependencies**

```sh
npm install
```

## Usage

### Create and Run Dev Build

```sh
gulp
```

BrowserSync will start a server on the configured port, currently `9999`. On file changes BrowserSync will reload all connected browsers.

### Create and Run Production Build

```sh
gulp production
```

Also opens a preview of the build with BrowserSync on port `9998`. Exit `ctrl + c` if all is okay, and rsync to server. Won’t be necessary once we’ve it on the Sandbox.


### Sandbox Tasks Without BrowserSync

Use the following two tasks when only the asset pipeline is needed *(probably default)*.

```sh
gulp sandbox
```

```sh
gulp sandbox-production
```

## Configuration

Use `/gulp/config.js` to adjust project paths and options.

All available tasks are in `/gulp/tasks/`, separated by `production` and `development` (the latter includes additional tasks, and some adjusted for production).

**Run Sequence**

The run sequence of tasks is defined in the `build.js` task in `production` and `development`. Tasks in `[]` run parallel.

## Project Structure and Tasks

**General**

The `gulpfile.js` loads all tasks in `/gulp/tasks/` and its subfolders. `default.js` *(Dev Build)* and `publish.js` *(Production Build)* are the two main tasks, who will run the tasks defined in `production` and `development` respectively.

**Dev Task**

Right now BrowserSync is used to start a server, which is why `default.js` just triggers the `watch` task, which then starts `browsersync`, which triggers the `build` task.

If BrowserSync isn’t needed, use the Sandbox task.

**Production Task**

The `publish.js` task has no Watcher (because production) and triggers the `browsersync:production` task, which then starts `build:production`. BrowserSync is used to provide a final preview.

If BrowserSync isn’t needed, use the Sandbox task.

### Task Notes

> Note: The file name reflects the task name, with a few exceptions. Dashes in file names are replaced with `:` when it made sense. Personal preference, adjust as you like. Below the task name is used, as some files have multiple tasks.

Alphabetical order.

**Dev**

- `browsersync`: Run build task and start a server with BrowserSync.
- `browsersync:reload`: Do a BrowserSync reload.
- `build`: Run all tasks needed for a build, in defined order.
- TMP (we probably don’t need this) `copy:html`: Copy HTML files.
- `delete`: Clean the build folder before a new build.
- `images`: Copy images to build folder.
- `lint-js`: Lint JavaScript files.
- `lint-styles`: Lint SCSS styles.
- `lint-styles:less`: Lint LESS styles.
- `rebuild`: Rebuild and trigger `browsersync:reload`.
- `scripts`: Create RequireJS modules, with Source Maps.
- TMP (we probably don’t need this) `scripts:shell`: Execute r.js directly via gulp-shell.
- `sprites`: Create SVG sprites.
- `styles`: Compile SCSS, and then run through PostCSS and it’s plugins (currently Autoprefixer and cssnano) (with source map generation).
- `styles:less`: Compile LESS, and then run through PostCSS and it’s plugins (currently Autoprefixer and cssnano) (with source map generation).
- `watch`: Start BrowserSync task, watch files for changes, and run defined task(s) on file change.

**Production**

Reminder: Production uses also some tasks from Dev, this is for example why there is a `copy:css` task, as CSS is copied from `/build/development/` to `/build/production/`.

- `browsersync:production`: Run production build task and start a server with BrowserSync.
- `build:production`: Run all tasks needed for a build, in defined order.
- `copy:css`: Copy CSS files to production build.
- `gzip`: Gzip files.
- `optimize:css`: Optimize CSS files with UnCSS (cssnano, afterwards).
- `optimize:html`: Copy and minimize HTML.
- `optimize:images`: Copy and minimize images, incl. sprites.
- `optimize:js`: Copy and minimize JS files with UglifyJS.
- `rev-update-references`: Replace all links to asset files via a manifest file.
- `revision`: Revision all asset files and write a manifest file.
- `styles`: Compile SCSS, and then run through PostCSS and it’s plugins (currently Autoprefixer and cssnano) **(without source map generation)**.
- `styles:less`: Compile LESS, and then run through PostCSS and it’s plugins (currently Autoprefixer and cssnano) **(without source map generation)**.

## Resources

The structure is based on Stefan Imhoff’s wonderful [Gulp.js series](https://stefanimhoff.de/series/gulp/), and while there are new features, it should be useful as a reference, if you’ve any questions.