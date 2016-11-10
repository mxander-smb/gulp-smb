// Project source
var src = 'src';

// Build destination root
var build = 'build';

// Dev and production build paths
var development = build + '/development';
var production  = build + '/production';


// Asset paths
//
// Note: This depends on the project setup, and could
// be removed. I like having all assets in an extra
// folder. Right now BrowserSync only watches the
// asset files.
var srcAssets         = src + '/_assets';

// Folder names for assets
var cssFolder         = '/styles';
var jsFolder          = '/js';
var imgFolder         = '/img';

// Asset build paths
var developmentAssets = build + '/development/assets'; // Dev build
var productionAssets  = build + '/production/assets';  // Production build


module.exports = {

  // BrowserSync
  browsersync: {
    development: {
      server: {
        baseDir: [development]
      },
      port: 9999,
      // Watched files in the dev build. BS reloads
      // website on change.
      files: [
        developmentAssets + cssFolder + '/*.css',
        developmentAssets + jsFolder + '/*.js',
        developmentAssets + imgFolder + '/**'
      ],
      notify: false
    },
    production: {
      server: {
        baseDir: [production]
      },
      port: 9998,
      notify: false
    }
  },

  // Watch source files
  watch: {
    html:    src + '/**/*.html',
    scss:    srcAssets + cssFolder + '/**/*.scss',
    less:    srcAssets + cssFolder + '/**/*.less',
    scripts: srcAssets + jsFolder + '/**/*.js',
    images:  srcAssets + imgFolder + '/**/*',
    svg:     srcAssets + imgFolder + '/**/*.svg'
  },

  // Clean build folder by deleting asset files
  //
  // @TODO: Refactor, right now the production task often
  // copies stuff first in dev, an extra task is currently necessary
  // to copy to production folder.
  delete: {
    src: [
      developmentAssets,
      productionAssets
    ]
  },

  // CSS config
  styles: {
    src: {
      scss: srcAssets + cssFolder + '/*.scss',
      less: srcAssets + cssFolder + '/*.less'
    },
    dest: developmentAssets + cssFolder,
    options: {
      scss: {
        'indentedSyntax': true
      },
      less: {},
      autoprefixer: {
        browsers: [
          'last 2 versions',
          'ie 8',
          'ie 9',
          'android 4'
        ],
        cascade: true
      }
    }
  },

  // Lint CSS files, but none in /vendor/
  lintStyles: {
    src: {
      scss: [
        srcAssets + cssFolder + '/**/*.scss',
        '!' + srcAssets + cssFolder + '/vendor/**'
      ],
      less: [
        srcAssets + cssFolder + '/**/*.less',
        '!' + srcAssets + cssFolder + '/vendor/**'
      ]
    },
    options: {
      stylelint: {}, // Use .stylelintrc !!
      reporter: {
        clearMessages: true
      }
    }
  },

  // JavaScript config
  scripts: {
    // Among others used to copy JS files to the
    // build folder. Vendor files are ignored, as they
    // are handled through scripts.vendor. Files ending
    // with -config.js in the JS folder are also ignored,
    // as they are RequireJS config files.
    src: [
      srcAssets + jsFolder + '/**/*.js',
      '!' + srcAssets + jsFolder + '/*-config.js',
      '!' + srcAssets + jsFolder + '/vendor/'
    ],
    dest: developmentAssets + jsFolder,

    // RequireJS
    requireJs: {
      srcConfig: srcAssets + jsFolder + '/require-config.js',
      rename: { basename: 'config' } // Rename require-config.js to config.js
    },

    // Vendor scripts
    vendor: {
      src:  srcAssets + jsFolder + '/vendor/**/*.js',
      dest: developmentAssets + jsFolder + '/vendor',
      convertToAMD: [
        srcAssets + jsFolder + '/vendor/jquery.cookie-0.9/*.js'
        // Add files
      ]
    }
  },

  // Old JavaScript config (can be deleted if no longer needed)
  scriptsOld: {
    src: [
      srcAssets + jsFolder + '/*.js',
      '!' + srcAssets + jsFolder + '/requirejs-config.js',
      // Ignore shell example
      '!' + srcAssets + jsFolder + '/shell-rjs-example.js'

      // Use this config to demo the scripts:shell task, which
      // uses r.js instead of a wrapper.
      //srcAssets + jsFolder + '/shell-rjs-example.js',
      //'!' + srcAssets + jsFolder + '/requirejs-config.js'
    ],
    dest: developmentAssets + jsFolder,
    options: {}
  },

  // Lint JavaScript files
  LintJs: {
    src: [
      srcAssets + jsFolder + '/**/*.js',
      '!' + srcAssets + jsFolder + '/*-config.js',
      '!' + srcAssets + jsFolder + '/vendor/'
    ]
  },

  // Icon sprites
  // @TODO: Not ideal if a mixed set of icon formats is used,
  // add gulp-svgfallback, or put sprites in a sprites folder.
  sprites: {
    src:  srcAssets + imgFolder + '/icons/**/*',
    dest: developmentAssets + imgFolder + '/icons'
  },

  // Copy HTML files
  // @TODO: We probably don’t need that if we use
  // Gulp only as an asset pipeline.
  //
  // Currently only html files on the root level are
  // copied, as otherwise also files from js/sti would
  // be copied.
  copyhtml: {
    src: src + '/*.html',
    dest: development
  },

  // Copy all images, but icons.
  // Icons are copied by the sprites task.
  images: {
    src: [
      srcAssets + imgFolder + '/**/*',
      '!' + srcAssets + imgFolder + '/icons/*'
    ],
    dest: developmentAssets + imgFolder
  },

  // Copy production ready styles
  copycss: {
    src:  developmentAssets + cssFolder + '/*.css',
    dest: productionAssets + cssFolder
  },

  // Optimize CSS, JS, Images, HTML for production
  optimize: {
    css: {
      src:  productionAssets + cssFolder + '/*.css',
      dest: productionAssets + cssFolder,
      options: {
        uncss: {
          html: [
            production + '/**/*.html'
          ],
          ignore: []
        }
      }
    },
    // @TODO: Currently all JavaScript files are optimized
    // incl. vendor scripts, which could break stuff.
    // Adjust if though, and create an extra task to copy
    // JS files to production.
    js: {
      src:  developmentAssets + jsFolder + '/**/*.js',
      dest: productionAssets + jsFolder,
      options: {}
    },
    images: {
      src:  developmentAssets + imgFolder + '/**/*.{jpg,jpeg,png,gif,svg}',
      dest: productionAssets + imgFolder,
      // @TODO Options needs to be adjusted on update to imagemin@3.x.x
      options: {
        optimizationLevel: 3,
        progessive: true,
        interlaced: true,
        verbose: false,
        svgoPlugins: [{
          removeDesc: true
        }]
      }
    },
    html: {
      src:  src + '/**/*.html',
      dest: production,
      options: {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyJS: true,
        minifyCSS: true,
        processScripts: ['application/ld+json']
      }
    }
  },

  // Revision asset files
  revision: {
    src: {
      assets: [
        productionAssets + cssFolder + '/*.css',
        productionAssets + jsFolder + '/*.js'
      ],
      base: production
    },
    dest: {
      assets: production,
      manifest: {
        name: 'manifest.json',
        path: productionAssets
      }
    }
  },

  // Replace links to asset files, with rev version
  revUpdate: {
    src: [
      productionAssets + '/manifest.json',
      production + '/**/*.{html,xml,txt,json,css,js}',
      '!' + production + '/feed.xml'
    ],
    dest: production
  },

  // GZIP compression
  gzip: {
    src: production + '/**/*.{html,xml,json,css,js}',
    dest: production,
    options: {}
  }

};
