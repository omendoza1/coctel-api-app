self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);

    if (requestUrl.pathname.match(/\.(jpg|png|webp)$/)) {
      event.respondWith(
        caches.match(event.request).then((response) => {
          if (response) {
            return response;
          }
  
          return fetch(event.request).then((networkResponse) => {
            caches.open('images-cache').then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
  
            return networkResponse;
          });
        })
      );
    }
  });