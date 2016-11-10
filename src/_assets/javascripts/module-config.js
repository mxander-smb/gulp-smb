// Example
({
  // The js root/base from a sti module directory perspecive
  baseUrl: '../../',
  // Required to pass r.js build
  paths: {
    'jquery': 'build/vendor/jquery-1.11.1/jquery'
  },
  // Exclude everything that is already included within base.js.
  // See base-config.js for already included modules.
  exclude: [
    'vendor/cookies'
  ]
})
