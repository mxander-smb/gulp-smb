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
        developmentAssets + '/css/*.css',
        developmentAssets + '/js/*.js',
        developmentAssets + '/images/**',
        developmentAssets + '/fonts/*'
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
    scss:    srcAssets + '/styles/**/*.scss',
    less:    srcAssets + '/styles/**/*.less',
    scripts: srcAssets + '/javascripts/**/*.js',
    images:  srcAssets + '/images/**/*',
    svg:     srcAssets + '/images/**/*.svg',
  },

  // Deletes all files from the dev build
  // @TODO: Refactor, right now the production task often
  // copies stuff first in dev, an extra task is currently necessary
  // to copy to production folder.
  delete: {
    src: [developmentAssets]
  },

  // CSS config
  styles: {
    src: {
      scss: srcAssets + '/styles/*.scss',
      less: srcAssets + '/styles/*.less'
    },
    dest:    developmentAssets + '/css',
    options: {
      scss: {
        'indentedSyntax': true
      },
      less: {},
      autoprefixer: {
        browsers: [
          'last 2 versions',
          'safari 5',
          'ie 8',
          'ie 9',
          'opera 12.1',
          'ios 6',
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
        srcAssets + '/styles/**/*.scss',
        '!' + srcAssets + '/styles/vendor/**'
      ],
      less: [
        srcAssets + '/styles/**/*.less',
        '!' + srcAssets + '/styles/vendor/**'
      ]
    },
    options: {
      stylelint: {}, // Use .stylelintrc !!
      reporter: {
        clearMessages: true
      }
    }
  },

  // RequireJS modules
  // @TODO: Not correctly working yet, check https://github.com/jlouns/gulp-requirejs-optimize/issues/9#issuecomment-161673480
  scripts: {
    src: [
      srcAssets + '/javascripts/modules/*.js'
    ],
    dest: developmentAssets + '/js',
    options: {}
  },

  // Lint JavaScript files
  LintJs: {
    src: srcAssets + '/javascripts/*.js'
  },

  // Icon sprites
  // @TODO: Not ideal if a mixed set of icon formats is used,
  // add gulp-svgfallback, or put sprites in a sprites folder.
  sprites: {
    src:  srcAssets + '/images/icons/**/*',
    dest: developmentAssets + '/images/icons'
  },

  // Copy HTML files
  // @TODO: We probably don’t need that if we use
  // Gulp only as an asset pipeline.
  copyhtml: {
    src:  src + '/**/*.html',
    dest: development
  },

  // Copy all images, but icons.
  // Icons are copied by the sprites task.
  images: {
    src: [
      srcAssets + '/images/**/*',
      '!' + srcAssets + '/images/icons/*'
    ],
    dest: developmentAssets + '/images'
  },

  // Copy production ready styles
  copycss: {
    src:  developmentAssets + '/css/*.css',
    dest: productionAssets + '/css/'
  },

  // Optimize CSS, JS, Images, HTML for production
  optimize: {
    css: {
      src:  productionAssets + '/css/*.css',
      dest: productionAssets + '/css/',
      options: {
        uncss: {
          html: [
            production + '/**/*.html'
          ],
          ignore: []
        }
      }
    },
    js: {
      src:  developmentAssets + '/js/*.js',
      dest: productionAssets + '/js/',
      options: {}
    },
    images: {
      src:  developmentAssets + '/images/**/*.{jpg,jpeg,png,gif,svg}',
      dest: productionAssets + '/images/',
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
        productionAssets + '/css/*.css',
        productionAssets + '/js/*.js'
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
