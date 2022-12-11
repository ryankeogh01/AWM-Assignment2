
function postReg(){
        let username = document.getElementById("user1").value;
        let password = document.getElementById("exampleInputPassword1").value;
        let email = document.getElementById("email1").value;

        console.log(username, password, email);

        $.ajax({
            type: "POST",
            url:  "http://127.0.0.1:8000/api/register/",
            timeout: 0,
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                "username": username,
                "password": password,
                "email": email
            })
        });

}

    function login(){
        let username = document.getElementById("user1").value;
        let password = document.getElementById("exampleInputPassword1").value;

        console.log(username, password);

        $.ajax({
            type: "POST",
            url:  "http://127.0.0.1:8000/api/login/",

            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                "username": username,
                "password": password
            })
        }).done(function (data, status, xhr) {
            console.log(data);
            localStorage.token = data.token;
            window.location.href="map.html";


        }).fail(function(){
            console.log("incorrect user or password");
    });

    }

    function logout(){

        $.ajax({
            type: "POST",
            headers: {"Authorization": "Token " + localStorage.token},
            url: "http://127.0.0.1:8000/api/logout/",
        }).done(function () {
            console.log("user logged out");
        });
    }

    function showPoiMarkers() {
        console.log("In showPoiMarkers");

        $.ajax({
            type: "POST",
            headers: {"Authorization": "Token " + localStorage.token},
            url: "http://127.0.0.1:8000/api/overpass/",
            data: {
                query: "hospital",
                bbox: map.getBounds().toBBoxString()
            }
        }).done(function (data, status, xhr) {
            poi_markers = L.markerClusterGroup();

            var geoJsonLayer = L.geoJson(data, {
                pointToLayer: function (feature, latlng) {
                    // Associate each point with the icon we made earlier
                    return L.circleMarker(latlng, geoJSONMarkerStyle).addTo(map);
                },
                onEachFeature: function (feature, layer) {
                    // For each feature associate a popup with the 'name' property
                    layer.bindPopup(feature.properties.name);
                }
            });

            // Add the GeoJSON layer to the cluster.
            poi_markers.addLayer(geoJsonLayer);

            // Add the cluster to the map.
            map.addLayer(poi_markers);
        }).fail(function (xhr, status, error) {
            var message = "OSM Overpass query failed.<br/>";
            console.log("Status: " + xhr.status + " " + xhr.responseText);
        }).always(function () {
        });
    }


function showPoiMarkers2() {
    console.log("In showPoiMarkers");

    let query = document.getElementById("poiInput").value;



    $.ajax({
        type: "POST",
        headers: {"Authorization": "Token " + localStorage.token},
        url: "http://127.0.0.1:8000/api/overpass/",
        data: {
            query: query,
            bbox: map.getBounds().toBBoxString()
        }
    }).done(function (data, status, xhr) {

        poi_markers = L.markerClusterGroup();

        var geoJsonLayer = L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
                // Associate each point with the icon we made earlier
                return L.circleMarker(latlng, geoJSONMarkerStyle).addTo(map);
            },
            onEachFeature: function (feature, layer) {
                // For each feature associate a popup with the 'name' property
                layer.bindPopup(feature.properties.name);
            }
        });

        if (poi_markers) {
            map.removeLayer(poi_markers);
        }

        // Add the GeoJSON layer to the cluster.
        poi_markers.addLayer(geoJsonLayer);

        // Add the cluster to the map.
        map.addLayer(poi_markers);
    }).fail(function (xhr, status, error) {
        console.log("Status: " + xhr.status + " " + xhr.responseText);
    }).always(function () {

    });
}


    function update_db(lng,lat) {
        let locString = lng + ", " + lat;
        $.ajax({
            type: "POST",
            headers: {
                "Authorization": "Token " + localStorage.token
            },
            url: "http://127.0.0.1:8000/api/updatedb/",
            data: {
                "last_location": locString
            }
        }).done(function (data, status, xhr) {
            console.log(data)
        }).fail(function (xhr, status, error) {
            console.log(error);
        });
    }

    const geoJSONMarkerStyle ={
        radius:8,
        fillColor: "#ff7800",
        color:"#000",
        weight: 1,
        opacity:1,
        fillOpacity:0.8
    };

function checkAuth(){
    $.ajax({
        type: "POST",
        headers: {
            "Authorization": "Token " + localStorage.token
        },
        url: "http://127.0.0.1:8000/api/check_auth/",
    }).done(function (data,status,xhr) {
        console.log("User is logged in");
    }).fail(function(data,status,xhr) {
        window.location.href = "login.html";
    });
}

