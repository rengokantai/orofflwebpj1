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
    event.respondWith(caches.match(event.request)).then(function(response){
        if(response){
            return response;
        }else{
            return fetch(event.request);
        }
    })
});