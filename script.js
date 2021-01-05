// Initialise map as global var
var map = new L.Map("mapid", {
    container: 'map',
    style: 'mapbox://styles/nrproudfoot/pk.eyJ1IjoibnJwcm91ZGZvb3QiLCJhIjoiY2tpaXR6c25xMGtyaTJzbnhzZGx6bzg1dCJ9.p_Y3dmkMBoqdr6YC01po1A?optimize=true', // optimize=true,
    center: [50, 0],
    zoom: 5,
    minZoom: 1,
    maxBounds: (  [[-90,-180],   [90,180]]  ),
    })
;
var Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});
Stadia_AlidadeSmooth.addTo(map);
var boundaryLayer;
var capitalIcon = L.icon({
        iconUrl: 'purplepin.png',
        shadowUrl: 'pinshadow.png',
    
        iconSize:     [23, 50], // size of the icon
        shadowSize:   [25, 32], // size of the shadow
        iconAnchor:   [11.5, 50], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 32],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
// Init capital marker
var capitalMarker = L.marker([0,50], {icon: capitalIcon, zIndexOffset: 100});
// Init YOU marker
var youIcon = L.icon({
    iconUrl: 'youpin.png',
    shadowUrl: 'youshadow.png',

    iconSize:     [60, 68], // size of the icon
    shadowSize:   [75, 55], // size of the shadow
    iconAnchor:   [30,68], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 50],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var youMarker = L.marker([0,50], {icon: youIcon, zIndexOffset: 100});
// Init history marker
var sightsIcon = L.icon({
    iconUrl: 'orangepin.png',
    shadowUrl: 'pinshadow.png',

    iconSize:     [17, 38], // size of the icon
    shadowSize:   [22, 27], // size of the shadow
    iconAnchor:   [8, 38], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 27],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var sightsGroup;
//Init parks marker
var parksIcon = L.icon({
    iconUrl: 'bluepin.png',
    shadowUrl: 'pinshadow.png',

    iconSize:     [17, 38], // size of the icon
    shadowSize:   [22, 27], // size of the shadow
    iconAnchor:   [8, 38], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 27],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var parksGroup;
// Init food marker
var foodIcon = L.icon({
    iconUrl: 'yellowpin.png',
    shadowUrl: 'pinshadow.png',

    iconSize:     [17, 38], // size of the icon
    shadowSize:   [22, 27], // size of the shadow
    iconAnchor:   [8, 38], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 27],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var foodGroup;
// Init bars marker
var barsIcon = L.icon({
    iconUrl: 'navypin.png',
    shadowUrl: 'pinshadow.png',

    iconSize:     [17, 38], // size of the icon
    shadowSize:   [22, 27], // size of the shadow
    iconAnchor:   [8, 38], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 27],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var barsGroup;

// Helper functions

// Create options
function createOptions(){
    $.ajax({
		url: "getCountries.php",
		type: 'GET',
		dataType: 'json',
		success: function(result){
            var countries = result;
            countries = countries.sort(function(a,b){
                return a.properties.name.localeCompare(b.properties.name);
            })
            var select = document.getElementById('selectCountry'); 
            for(var i = 0; i < countries.length; i++) {
                var opt = countries[i].properties;
                var el = document.createElement("option");
                el.textContent = opt.name;
                el.value = opt.iso_a2;
                select.appendChild(el);
            }
            console.log("Success: Options created");
        },
		error: function(jqXHR, textStatus, errorThrown) {
			console.log("Failure: Error retrieving countries array from getCountries.php")
}
})
}
function getInfo(code, lat=null, lng=null){
    /* Get information about given country from getInfo.php */
    code = code.trim();
    $.ajax({
		url: "getInfo.php",
		type: 'GET',
        dataType: 'json',
        data: {
            code: code,
        },
        success: function(result){
            console.log("Success: Recieved API response from getInfo.php");
            console.log(result);
            let country = result.data;
            addModalInfo(country);
            addMapLayers(country, lat, lng);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Failure: Error getting API response from getInfo.php");
        }
    });
}
function addModalInfo(country){
    
    // Format population string
    let population;
    if (country.population >= 1000000000){
        population = Number.parseFloat(country.population / 1000000000).toFixed(1) + " billion";
    } else {
        population = Number.parseFloat(country.population / 1000000).toFixed(1) + " million";
    };
    // Format currency string
    let currency = country.currencies[0].name + " (" + country.currencies[0].symbol + ")";

    // Update modal html
    $("#name").html(country.name);
    $("#name2").html(country.name);
    $("#capital").html(country.capital);
    $("#population").html(population);
    $("#region").html(country.region);
    $("#flag").attr("src",country.flag);
    $("#currency").html(currency);
    $("#cases").html(Number(country.covid.confirmed).toLocaleString());
    $("#deaths").html(Number(country.covid.deaths).toLocaleString());
    $("#7cases").html(Number(country.covid.weeklyconfirmed).toLocaleString());
    $("#7deaths").html(Number(country.covid.weeklydeaths).toLocaleString());
}
function addMapLayers(country, lat=null, lng=null){
    // Create you marker
    if (lat != null){
        let latlng = new L.LatLng(lat,lng);
        youMarker.setLatLng(latlng).addTo(map);
    }
    // Create sights markers
    let sights = [];
    country.foursquare.forEach(sight => { 
        sight = L.marker([sight.lat,sight.lng], {icon: sightsIcon}).bindTooltip("<div style='text-align:center'}><h5>" + sight.name + "</h5><p>"+ sight.category + "</p><img src=" + sight.icon + "><br><div style='text-align: center'>" + sight.address.join(",<br>") + "</div></div>");
        sights.push(sight);
    });
    if (sightsGroup){
        sightsGroup.clearLayers();
    }
    sightsGroup = L.layerGroup(sights).addTo(map);

    
    // Create parks markers
    let parks = [];
    country.parks.forEach(park => { 
        park = L.marker([park.lat,park.lng], {icon: parksIcon}).bindTooltip("<div style='text-align:center'}><h5>" + park.name + "</h5><p>"+ park.category + "</p><img src=" + park.icon + "><br><div style='text-align: center'>" + park.address.join(",<br>") + "</div></div>");
        parks.push(park);
    });
    if (parksGroup){
        parksGroup.clearLayers();
    }
    console.log(parks);
    parksGroup = L.layerGroup(parks).addTo(map);
   /*/ Create food markers
   let food = [];
   country.food.forEach(sight => { 
       sight = L.marker([sight.lat,sight.lng], {icon: sightsIcon}).bindTooltip("<div style='text-align:center'}><h5>" + sight.name + "</h5><p>"+ sight.category + "</p><img src=" + sight.icon + "><br><div style='text-align: center'>" + sight.address.join(",<br>") + "</div></div>");
       food.push(sight);
   });
   if (foodGroup){
       foodGroup.clearLayers();
   }
   foodGroup = L.layerGroup(food).addTo(map);
   // Create bars markers
   let bars = [];
   country.bars.forEach(sight => { 
       sight = L.marker([sight.lat,sight.lng], {icon: sightsIcon}).bindTooltip("<div style='text-align:center'}><h5>" + sight.name + "</h5><p>"+ sight.category + "</p><img src=" + sight.icon + "><br><div style='text-align: center'>" + sight.address.join(",<br>") + "</div></div>");
       bars.push(sight);
   });
   if (barsGroup){
       barsGroup.clearLayers();
   }
   barsGroup = L.layerGroup(bars).addTo(map);
  */
   

    // Create capital city marker
    var capLatLng = new L.LatLng(country.weather.coord.lat,country.weather.coord.lon);
    capitalMarker.setLatLng(capLatLng).addTo(map);
    capitalMarker.bindTooltip("<p><strong>Capital City: </strong><br>" + country.capital + "</p>");
    
    

    
    // Add boundary border to map
    // Reverse coordinates for creating bounds
    country = country.features;
    let coords = [];
    // Special case for countries with overseas territories or boundays that split the map
    if (country.properties.iso_a2 == "US" || country.properties.iso_a2 == "FR" || country.properties.iso_a2 == "RU" || country.properties.iso_a2 == "FJ"){
        let max = 0;
        let biggestIsland;
        country.geometry.coordinates.forEach(island => {
            if (island[0].length > max){
                max = island[0].length;
                biggestIsland = island;
            }
        })
        biggestIsland[0].forEach(coord => {
            let point = [];
            point[0] = coord[1];
            point[1] = coord[0];
            coords.push(point);
        })
    } else if (country.geometry.coordinates.length > 1){
        country.geometry.coordinates.forEach(island => {
            island[0].forEach(coord => {
                let point = [];
                point[0] = coord[1];
                point[1] = coord[0];
                coords.push(point);
            }) 
        })
    } else {
        country.geometry.coordinates[0].forEach(coord => {
            let point = [];
            point[0] = coord[1];
            point[1] = coord[0];
            coords.push(point);
        })
    }
    let bounds = new L.LatLngBounds(coords);
    map.fitBounds(bounds);
    var currentCountry = country;
    if (boundaryLayer)
    {  
        map.removeLayer(boundaryLayer);
    }
    boundaryLayer = L.geoJSON(currentCountry, {
    style: {color: "#33CC33"}
    }).addTo(map); 
    document.getElementById('selectCountry').value=country.properties.iso_a2;
}

function getCountryCode(position){
    /* Call API to get country code from lat,lng */
    console.log("Success: Retrieved location");
    $.ajax({
		url: "getCountryCode.php",
		type: 'POST',
		dataType: 'json',
		data: {
            lat: position.coords.latitude,
			lng: position.coords.longitude,
		},
		success: function(result){
            getInfo(result, position.coords.latitude, position.coords.longitude);
            console.log("Success: Retrieved country code")
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log("Failure: Error getting country code from getCountryCode.php");
}
	})
}
// get user location

 function getLocation() {
    var x = $("#demo");
     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(getCountryCode);

     } else {
        console.log("Failure: Geolocation not enabled");
        getInfo('GB');
     }
 }
 
     


$(window).on('load', function (){
   createOptions();
   getLocation();
   

})

$("#selectCountry").on('change', function(e){
    let country = $("#selectCountry");
    getInfo(country.val());
})
$("#collapseOne").on('click', function(e){
    console.log(e.target);
    $('#collapseOne').attr('open',true);
    

})

map.on('click', function(e){
    var latlng = e.latlng;
    $.ajax({
		url: "getCountryCode.php",
		type: 'POST',
		dataType: 'json',
		data: {
            lat: latlng.lat,
			lng: latlng.lng,
		},
		success: function(result){
            getInfo(result);
            console.log("Success: Retrieved country code");
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log("Failure: Error getting country code from getCountryCode.php");
}
})
    }
)


$('#bologna-list a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })