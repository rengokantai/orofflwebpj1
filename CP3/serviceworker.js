/**
 * Created by Hernan Y.Ke on 2016/1/25.
 */
var urls=['/projectroot','search.js'];
self.addEventListener("install",function(e){
    console.log("installed");
    e.waitUntil(caches.open("mycache").then(function(cache){
        return cache.addAll(urls);
    }));
});
self.addEventListener("fetch",function(event){
    if(!navigator.onLine && event.request.url.indexOf("wiki.php")>0){
        event.respondWith(new Response("offline"),
            {
                "headers":{
                    "Content-Type":"text/html"
                }
            });
    }else {
        event.respondWith(caches.match(event.request)).then(function (response) {
            if (response) {
                return response;
            } else {
                return fetch(event.request).then(function(response){
                    caches.open("myacache").then(function(cache){
                        cache.put(event.request, response.clone());
                        return response;
                    })
                });
            }
        });
    }
});