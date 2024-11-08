self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('productos-cache').then(cache => {
            return cache.addAll([
                'index.html',
                'app.js',
                'img/icons/android-icon-144x144.png',
                'img/icons/android-icon-192x192.png',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
                'https://unpkg.com/@popperjs/core@2'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('push', function (event) {
    const options = {
        body: event.data ? event.data.text() : 'Notificación',
        icon: 'img/icons/android-icon-192x192.png',
        badge: 'img/icons/android-icon-192x192.png'
    };
    event.waitUntil(
        self.registration.showNotification('Nueva notificación', options)
    );
});