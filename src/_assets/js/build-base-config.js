({
    baseUrl: '.',
    optimize: 'none',
    enforceDefine: false,
    findNestedDependencies: false,
    useStrict: true,

    paths: {
        'jquery': 'vendor/jquery-1.11.1/jquery',
        'vendor/cookies': 'vendor/jquery.cookie-0.9/jquery.cookie'
    },

    excludeShallow: [
        'jquery'
    ],

    // Add modules that should be baked into base.js
    include: [
        'vendor/cookies',
        'sti/foo'
    ]
})
