const awm = "awmcache"
const assets = [
    "/",
    "/index.html",
    //"/map.html",
    "/login.html",
    "/register.html",
    "src/css/forms.css",
    "index.js"
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(awm).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})