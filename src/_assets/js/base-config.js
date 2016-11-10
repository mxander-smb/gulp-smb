// Example
({
    baseUrl: '.',
    optimize: 'none',
    findNestedDependencies: false,

    paths: {
        'jquery': 'build/vendor/jquery-1.11.1/jquery'
    },

    excludeShallow: [
        'jquery',
        'angular'
    ],

    // Add modules that should be baked into base.js
    include: [
        'vendor/cookies'
    ]
})


