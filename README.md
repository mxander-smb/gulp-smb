# gulp-smb

Build tooling, work in progress.

## Install

Make sure Node is installed. Currently tested with Node `v.4.6.0` (LTS).  Use [NVM](https://github.com/creationix/nvm) to manage versions.

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

## Configuration

Use `/gulp/config.js` to adjust project paths and options.

All available tasks are in `/gulp/tasks/`, separated by `production` and `development` (the latter includes additional tasks, and some adjusted for production).

**Run Sequence**

The run sequence of tasks is defined in the `build.js` task in `production` and `development`. Tasks in `[]` run parallel.

## Tasks

@TODO: Docu, LESS task, RequireJS isn’t correctly working yet.

## Resources

The structure is based on Stefan Imhoff’s wonderful [Gulp.js series](https://stefanimhoff.de/series/gulp/), and while there are new features, it should be useful as a reference, if you’ve any questions.