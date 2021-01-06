// Initialise options object

class Options {
    constructor(){
        this.history = true;
        this.parks = true;
        this.earthquakes = true;
        this.food = true;
        this.bars = true;
        this.sort = "country";
        this.location;
        this.clickLocation;
    }
    setHistory(){
        if (this.history === true){
            this.history = false;
        } else {
            this.history = true;
        }
    }
    setParks(){
        if (this.parks === true){
            this.parks = false;
        } else {
            this.parks = true;
        }
    }
    setEarthquakes(){
        if (this.earthquakes === true){
            this.earthquakes = false;
        } else {
            this.earthquakes = true;
        }
    }
    setFood(){
        if (this.food === true){
            this.food = false;
        } else {
            this.food = true;
        }
    }
    setBars(){
        if (this.bars === true){
            this.bars = false;
        } else {
            this.bars = true;
        }
    }
    setSort(sort){
        if (sort === "near" || sort === "country"){
            this.sort = sort;
        } else {
            alert("There was an error");
        } 
    }
    setLocation(location){
            this.location = location;
    }
    getLocation(){
        return this.location;
    }
    setClickLocation(location){
        this.clickLocation = location;
    }
    getClickLocation(){
        return this.clickLocation;
    }
    getClickLat(){
        return this.clickLocation[0];
    }
    getClickLng(){
        return this.clickLocation[1];
    }
    getLat(){
        return this.location[0];
    }
    getLng(){
        return this.location[1];
    }
    getHistory(){
        return this.history;
    }
    getParks(){
        return this.parks;
    }
    getEarthquakes(){
        return this.earthquakes;
    }
    getFood(){
        return this.food;
    }
    getBars(){
        return this.bars;
    }
    getSort(){
        return this.sort
    }
};
class Data {
    constructor(){
        this.info;
        this.localInfo = null;
        this.bounds;
    }
    setCountryInfo(data){
        this.info = data
        }  
    setLocalInfo(data){
        this.localInfo = data
    }
    getCountryInfo(){
        return this.info;
    }
    getLocalInfo(){
        return this.localInfo;
    }
    setBoundary(bounds){
        this.bounds = bounds;
    }
    getBoundary(){
        return this.bounds;
    }
}

let mapOpts = new Options();
let data = new Data();
var circle;

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
    iconUrl: 'historypin.png',
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
    iconUrl: 'parkspin.png',
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
    iconUrl: 'barsicon.png',
    shadowUrl: 'pinshadow.png',

    iconSize:     [17, 38], // size of the icon
    shadowSize:   [22, 27], // size of the shadow
    iconAnchor:   [8, 38], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 27],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var barsGroup;
// Init earthquake marker
var eqIcon = L.icon({
    iconUrl: 'eqpin.png',
    shadowUrl: 'pinshadow.png',

    iconSize:     [17, 38], // size of the icon
    shadowSize:   [22, 27], // size of the shadow
    iconAnchor:   [8, 38], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 27],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var eqGroup;

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
function getInfo(code, options){
    /* Get information about given country from getInfo.php */
    if(code){  // If country code provided
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
                data.setCountryInfo(result.data);
                console.log(result.status);
                addModalInfo(data.getCountryInfo());
                addBasicLayers(data.getCountryInfo(), options);
                if (options.sort == "country"){
                    addInterestLayers(data.getCountryInfo(), options);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Failure: Error getting API response from getInfo.php");
            }
        });
    } else if (options.getClickLocation()) { // Else if map has been clicked
        $.ajax({
		    url: "getInfo.php",
		    type: 'GET',
            dataType: 'json',
            data: {
                code: null,
                lat: options.getClickLat(),
                lng: options.getClickLng(),
            },
            success: function(result){
                console.log("Success: Recieved API response from getInfo.php");
                options.setClickLocation(null);
                data.setCountryInfo(result.data);
                console.log(result.status);
                addModalInfo(data.getCountryInfo());
                addBasicLayers(data.getCountryInfo(), options);
                if (options.sort == "country"){
                    addInterestLayers(data.getCountryInfo(), options);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Failure: Error getting API response from getInfo.php");
            }
        });
    } else { // Else no code or map click
        $.ajax({
		    url: "getInfo.php",
		    type: 'GET',
            dataType: 'json',
            data: {
                code: null,
                lat: options.getLat(),
                lng: options.getLng(),
            },
            success: function(result){
                console.log("Success: Recieved API response from getInfo.php",result);
                options.setClickLocation(null);
                data.setCountryInfo(result.data);
                console.log(result.status);
                addModalInfo(data.getCountryInfo());
                addBasicLayers(data.getCountryInfo(), options);
                if (options.sort == "country"){
                    addInterestLayers(data.getCountryInfo(), options);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Failure: Error getting API response from getInfo.php");
            }
        });
    };
    if (!data.getLocalInfo()){
        $.ajax({
		    url: "getLocalInfo.php",
		    type: 'GET',
            dataType: 'json',
            data: {
                lat: options.getLat(),
                lng: options.getLng(),
            },
            success: function(result){
                console.log("Success: Recieved API response from getLocalInfo.php");
                data.setLocalInfo(result.data);
                console.log(result.status);
                if (options.sort == "near"){
                    addInterestLayers(data.getLocalInfo(), options);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Failure: Error getting API response from getLocalInfo.php");
            }
            });
    }
    if (options.getSort() == "near"){
        addInterestLayers(data.getLocalInfo(), options);
    }
}
function addLocalRadius(options){
    if (circle){
        map.removeLayer(circle)
    };
    circle = L.circle([options.getLat(),options.getLng()], {radius: 15000}).addTo(map);
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
function addInterestLayers(country, options){
    // Create sights markers
    if (sightsGroup){
        sightsGroup.clearLayers();
    }
    let sights = [];
    country.foursquare.forEach(sight => { 
        sight = L.marker([sight.lat,sight.lng], {icon: sightsIcon}).bindTooltip("<div style='text-align:center'}><h5>" + sight.name + "</h5><p>"+ sight.category + "</p><img src=" + sight.icon + "><br><div style='text-align: center'>" + sight.address.join(",<br>") + "</div></div>");
        sights.push(sight);
    });
    sightsGroup = L.layerGroup(sights);
    if(options.getHistory() == true){
        sightsGroup.addTo(map);
    }
    // Create parks markers
    if (parksGroup){
        parksGroup.clearLayers();
    }
    let parks = [];
    country.parks.forEach(park => { 
        park = L.marker([park.lat,park.lng], {icon: parksIcon}).bindTooltip("<div style='text-align:center'}><h5>" + park.name + "</h5><p>"+ park.category + "</p><img src=" + park.icon + "><br><div style='text-align: center'>" + park.address.join(",<br>") + "</div></div>");
        parks.push(park);
    });
    parksGroup = L.layerGroup(parks);
    if(options.getParks() == true){
        parksGroup.addTo(map);
    }
   // Create food markers
    if (foodGroup){
        foodGroup.clearLayers();
    }
    let food = [];
    country.food.forEach(sight => { 
        sight = L.marker([sight.lat,sight.lng], {icon: foodIcon}).bindTooltip("<div style='text-align:center'}><h5>" + sight.name + "</h5><p>"+ sight.category + "</p><img src=" + sight.icon + "><br><div style='text-align: center'>" + sight.address.join(",<br>") + "</div></div>");
        food.push(sight);
    });
    foodGroup = L.layerGroup(food);
    if(options.getFood() == true){
        foodGroup.addTo(map);
    }
    
   // Create bars markers
    if (barsGroup){
         barsGroup.clearLayers();
    }
    let bars = [];
    country.bars.forEach(sight => { 
        sight = L.marker([sight.lat,sight.lng], {icon: barsIcon}).bindTooltip("<div style='text-align:center'}><h5>" + sight.name + "</h5><p>"+ sight.category + "</p><img src=" + sight.icon + "><br><div style='text-align: center'>" + sight.address.join(",<br>") + "</div></div>");
        bars.push(sight);
    });
    barsGroup = L.layerGroup(bars);
    if(options.getBars() == true){
        barsGroup.addTo(map);
    }
   // Create eq markers
    if (eqGroup){
        eqGroup.clearLayers();
    }
    let eq = [];
    let earthquakes = country.earthquakes.earthquakes;
    earthquakes.forEach(sight => { 
        sight = L.marker([sight.lat,sight.lng], {icon: eqIcon}).bindTooltip("<table style='text-align:left'><tr><th colspan=2 style='text-align:center'>Earthquake<th></tr><tr><th>Date</th><td>" + sight.datetime + "</td></tr><tr><th>Magnitude</th><td>" + sight.magnitude + "</td></tr><tr><th>Depth</th><td>" + sight.depth + "</td></tr></table></div>");
        eq.push(sight);
    });
    eqGroup = L.layerGroup(eq);
    if(options.getEarthquakes() == true){     
        eqGroup.addTo(map);
    }
}
function addBasicLayers(country, options){
    // Create you marker
    if (options.getLocation()){
        let latlng = new L.LatLng(options.getLat(),options.getLng());
        youMarker.setLatLng(latlng).addTo(map);
    }
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
    data.setBoundary(bounds);
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

// get user location

 function getLocation() {
    var x = $("#demo");
     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition((position)=> {
            console.log("Success: Retrieved location");
            mapOpts.setLocation([position.coords.latitude,position.coords.longitude]);
            getInfo(null,mapOpts)
         }),
          ()=>{
             console.log("Error finding location");
             getInfo("GB", mapOpts);
         };
 }}
 
     


$(window).on('load', function (){
   createOptions();
   getLocation();
   

})

$("#selectCountry").on('change', function(e){
    let country = $("#selectCountry");
    mapOpts.setSort("country");
    getInfo(country.val(), mapOpts);
})
$("#collapseOne").on('click', function(e){
    console.log(e.target);
    $('#collapseOne').attr('open',true);
    

})

map.on('click', function(e){
    mapOpts.setClickLocation([e.latlng.lat,e.latlng.lng]);
    getInfo(null, mapOpts);
})


$("#history").on("change", function(e){
    mapOpts.setHistory();
    if(mapOpts.getHistory()){
        sightsGroup.addTo(map);     
    } else {
        map.removeLayer(sightsGroup);   
    };
})
$("#parks").on("change", function(e){
    mapOpts.setParks();
    if(mapOpts.getParks()){
        parksGroup.addTo(map);
    } else {
        map.removeLayer(parksGroup);  
    };

})
$("#earthquakes").on("change",function(e){
    mapOpts.setEarthquakes();
    if(mapOpts.getEarthquakes()){
        eqGroup.addTo(map);
    } else {
        map.removeLayer(eqGroup);
    };
})
$('#restaurants').on("change",function(e){
    mapOpts.setFood();
    if(mapOpts.getFood()){
        foodGroup.addTo(map);
    } else {
        map.removeLayer(foodGroup);
    };
})
$('#bars').on("change",function(e){
    mapOpts.setBars();
    if(mapOpts.getBars()){
        barsGroup.addTo(map);
    } else {
        map.removeLayer(barsGroup);
    };
})

$('#where').on('change',function(e){
    if (mapOpts.getSort() == "country"){
        if (mapOpts.getLocation()){
            mapOpts.setSort("near");
            addLocalRadius(mapOpts);
            map.fitBounds(circle.getBounds());
            addInterestLayers(data.getLocalInfo(),mapOpts);
        } else {
            alert("I need location data to show points of interest near you!");
            $('#where2').attr('checked');
        }
    } else {
        mapOpts.setSort("country");
        map.removeLayer(circle);
        map.fitBounds(data.getBoundary());
        addInterestLayers(data.getCountryInfo(),mapOpts);
    };
    console.log(mapOpts.getSort());
})


$('#bologna-list a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })