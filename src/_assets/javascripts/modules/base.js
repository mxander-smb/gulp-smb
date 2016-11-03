requirejs.config({
    baseUrl: '.',
    optimize: 'none',

    // Add modules that should be baked into base.js
    include: [
        'modules/lib',
        'modules/main1',
        'modules/main2'
    ]

});