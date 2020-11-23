const CACHE_NAME = 'DUPA';

// List of files which are store in cache.
let filesToCache = [
    './homepage.html',
    './',
    './dupa.html',
    './mapwizeui.js',
    './main.js'
];

self.addEventListener('install', function (evt) {
    evt.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log(filesToCache)
            return cache.addAll(filesToCache);
        }).catch(function (err) {
            // Snooze errors...
             console.error(err);
        })
    );
});

self.addEventListener('fetch', function (evt) {
    // Snooze logs...
    // console.log(event.request.url);
    evt.respondWith(
        // Firstly, send request..
        fetch(evt.request).catch(function () {
            // When request failed, return file from cache...
            return caches.match(evt.request);
        })
    );
});