({
    // Example file
    baseUrl: '/js',
    enforceDefine: false,
    optimize: 'none',
    paths: {
        'vendor/jquery.cookie': 'build/vendor/jquery.cookie-0.9/jquery.cookie'
    },
    shim: {
        'bootstrap-popover' : {
            deps: ['bootstrap-tooltip']
        },
        'vendor/jquery.agegate' : {
            deps: ['sti/jquery']
        }
    },
    map: {
        // See: http://requirejs.org/docs/jquery.html#noconflictmap
        '*': { 'jquery': 'sti/jquery' },
        'sti/jquery': { 'jquery': 'jquery' }
    }
})
