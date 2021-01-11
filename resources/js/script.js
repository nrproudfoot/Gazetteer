// Define options class

class Options {
    constructor(){
        this.history = true;
        this.parks = true;
        this.earthquakes = true;
        this.food = true;
        this.bars = true;
        this.weather = true;
        this.sort = "country";
        this.location = null;
        this.clickLocation;
    }
    setWeather(){
        if(this.weather === true){
            this.weather = false;
        } else {
            this.weather = true;
        }
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
    setLocation(location){this.location = location;}
    getLocation(){return this.location;}
    setClickLocation(location){this.clickLocation = location;}
    getClickLocation(){return this.clickLocation;}
    getClickLat(){return this.clickLocation[0];}
    getClickLng(){return this.clickLocation[1];}
    getWeather(){return this.weather;}
    getLat(){return this.location[0];}
    getLng(){return this.location[1];}
    getHistory(){return this.history;}
    getParks(){return this.parks;}
    getEarthquakes(){return this.earthquakes;}
    getFood(){return this.food;}
    getBars(){return this.bars;}
    getSort(){return this.sort}
};

// Define data class

class Data {
    constructor(){
        this.info;
        this.prevInfo;
        this.localInfo = null;
        this.bounds;
    }
    setCountryInfo(data){this.info = data}  
    setLocalInfo(data){this.localInfo = data}
    setPrevInfo(data){this.prevInfo = data}
    getPrevInfo(){return this.prevInfo}
    getCountryInfo(){return this.info;}
    getLocalInfo(){return this.localInfo;}
    setBoundary(bounds){this.bounds = bounds;}
    getBoundary(){return this.bounds;}
}

// Initialise global options object
let mapOpts = new Options();

// Initialise global data object
let data = new Data();

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
// Init capital marker
var capitalIcon = L.icon({
        iconUrl: '/SpinGlobe/resources/images/capitalpin.png',
        shadowUrl: '/SpinGlobe/resources/images/capitalshadow.png',
    
        iconSize:     [60, 70], // size of the icon
        shadowSize:   [60, 60], // size of the shadow
        iconAnchor:   [30, 70], // point of the icon which will correspond to marker's location
        shadowAnchor: [15, 70],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
var capitalMarker = L.marker([0,50], {icon: capitalIcon});

// Init YOU marker
var youIcon = L.icon({
    iconUrl: '/SpinGlobe/resources/images/youpin.png',
    shadowUrl: '/SpinGlobe/resources/images/youshadow.png',

    iconSize:     [60, 68], // size of the icon
    shadowSize:   [80, 68], // size of the shadow
    iconAnchor:   [30, 68], // point of the icon which will correspond to marker's location
    shadowAnchor: [7, 66],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var youMarker = L.marker([0,50], {icon: youIcon});

// Init history marker
var sightsIcon = L.icon({
    iconUrl: '/SpinGlobe/resources/images/historypin.png',
    shadowUrl: '/SpinGlobe/resources/images/historyshadow.png', 

    iconSize:     [22, 38], // size of the icon
    shadowSize:   [30, 27], // size of the shadow
    iconAnchor:   [11, 38], // point of the icon which will correspond to marker's location
    shadowAnchor: [3, 27],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var sightsGroup;
//Init parks marker
var parksIcon = L.icon({
    iconUrl: '/SpinGlobe/resources/images/parkspin.png',
    shadowUrl: '/SpinGlobe/resources/images/parksshadow.png',

    iconSize:     [25, 38], // size of the icon
    shadowSize:   [42, 27], // size of the shadow
    iconAnchor:   [12, 38], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 27],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var parksGroup;
// Init food marker
var foodIcon = L.icon({
    iconUrl: '/SpinGlobe/resources/images/foodpin.png',
    shadowUrl: '/SpinGlobe/resources/images/foodshadow.png',

    iconSize:     [25, 38], // size of the icon
    shadowSize:   [30, 27], // size of the shadow
    iconAnchor:   [15, 38], // point of the icon which will correspond to marker's location
    shadowAnchor: [3, 27],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var foodGroup;
// Init bars marker
var barsIcon = L.icon({
    iconUrl: '/SpinGlobe/resources/images/barsicon.png',
    shadowUrl: '/SpinGlobe/resources/images/barsshadow.png',

    iconSize:     [22, 38], // size of the icon
    shadowSize:   [30, 27], // size of the shadow
    iconAnchor:   [11, 38], // point of the icon which will correspond to marker's location
    shadowAnchor: [3, 22],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var barsGroup;
// Init earthquake marker
var eqIcon = L.icon({
    iconUrl: '/SpinGlobe/resources/images/eqpin.png',
    shadowUrl: '/SpinGlobe/resources/images/eqshadow.png',

    iconSize:     [18, 38], // size of the icon
    shadowSize:   [32, 27], // size of the shadow
    iconAnchor:   [9, 38], // point of the icon which will correspond to marker's location
    shadowAnchor: [5, 27],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var eqGroup;
// Init local radius
var circle;

// Helper functions

// Create options
function createOptions(){
    $.ajax({
		url: "/SpinGlobe/resources/php/getCountries.php",
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
    if (code){
        $("#loadingText").html("There was a problem finding your location, too bad!");
    }
    if(data.getCountryInfo()){
        data.setPrevInfo(data.getCountryInfo());
    }
    if(code){  // If country code provided
        code = code.trim();
        $.ajax({
		    url: "/SpinGlobe/resources/php/getInfo.php",
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
		    url: "/SpinGlobe/resources/php/getInfo.php",
		    type: 'GET',
            dataType: 'json',
            data: {
                code: null,
                lat: options.getClickLat(),
                lng: options.getClickLng(),
            },
            success: function(result){
                console.log("Success: Recieved API response from getInfo.php");
                console.log(result.status);
                options.setClickLocation(null);
                data.setPrevInfo(data.getCountryInfo());
                data.setCountryInfo(result.data);
                // If clicked country is different from current country
                if (data.getCountryInfo().code != data.getPrevInfo().code){
                    console.log(result.status);
                    mapOpts.setSort("country");
                    addModalInfo(data.getCountryInfo());
                    addBasicLayers(data.getCountryInfo(), options);
                    addInterestLayers(data.getCountryInfo(), options);
                    $("#where2").prop("checked",true);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Failure: Error getting API response from getInfo.php");
            }
        });
    } else { // Else no code or map click
        $.ajax({
		    url: "/SpinGlobe/resources/php/getInfo.php",
		    type: 'GET',
            dataType: 'json',
            data: {
                code: null,
                lat: options.getLat(),
                lng: options.getLng(),
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
    };
    if (!data.getLocalInfo()){
        $.ajax({
		    url: "/SpinGlobe/resources/php/getLocalInfo.php",
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
        sight = L.marker([sight.lat,sight.lng], {icon: sightsIcon}).bindTooltip("<div style='text-align:center'}><h5 class='tooltipText'>" + sight.name + "</h5><p class='tooltipText'>"+ sight.category + "</p><img src=" + sight.icon + "><br><div style='text-align: center' class='tooltipText'>" + sight.address.join(",<br>") + "</div></div>");
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
        park = L.marker([park.lat,park.lng], {icon: parksIcon}).bindTooltip("<div style='text-align:center'}><h5 class='tooltipText'>" + park.name + "</h5><p class='tooltipText'>"+ park.category + "</p><img src=" + park.icon + "><br><div style='text-align: center' class='tooltipText'>" + park.address.join(",<br>") + "</div></div>");
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
        sight = L.marker([sight.lat,sight.lng], {icon: foodIcon}).bindTooltip("<div style='text-align:center'}><h5 class='tooltipText'>" + sight.name + "</h5><p class='tooltipText'>"+ sight.category + "</p><img src=" + sight.icon + "><br><div style='text-align: center' class='tooltipText'>" + sight.address.join(",<br>") + "</div></div>");
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
        sight = L.marker([sight.lat,sight.lng], {icon: barsIcon}).bindTooltip("<div style='text-align:center'}><h5 class='tooltipText'>" + sight.name + "</h5><p class='tooltipText'>"+ sight.category + "</p><img src=" + sight.icon + "><br><div style='text-align: center' class='tooltipText'>" + sight.address.join(",<br>") + "</div></div>");
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
        sight = L.marker([sight.lat,sight.lng], {icon: eqIcon}).bindTooltip("<table style='text-align:left'><tr><th colspan=2 style='text-align:center' class='tooltipText'>Earthquake<th></tr><tr><th class='tooltipText'>Date</th><td style='padding-left:5px' class='tooltipText'>" + sight.datetime + "</td></tr><tr><th class='tooltipText'>Magnitude</th><td style='padding-left:5px' class='tooltipText'>" + sight.magnitude + "</td></tr><tr><th class='tooltipText'>Depth</th><td style='padding-left:5px' class='tooltipText' >" + sight.depth + "</td></tr></table></div>");
        eq.push(sight);
    });
    eqGroup = L.layerGroup(eq);
    if(options.getEarthquakes() == true){     
        eqGroup.addTo(map);
    }
    // Create weather div
    $("#weatherName").html(country.weather.name + " " + country.weather.sys.country);
    $("#weatherIcon").prop('src','https://openweathermap.org/img/wn/' + country.weather.weather[0].icon + '@2x.png');
    $("#weatherTemp").html(Math.round(country.weather.main.temp) + "&deg;C");
    $("#weatherDesc").html(country.weather.weather[0].description);
    $("#weatherPress").html(country.weather.main.pressure + " hPa");
    $("#weatherHumid").html(country.weather.main.humidity + " %");
    if(options.getWeather() == true){     
        $("#weather").show();
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
    capitalMarker.bindPopup("<div class='container'><div class='row'><div class='col-12'><h4 class='tooltipText'>" + country.capital + "</h4></div></div><div class='row'><div class='col-12'><p class='tooltipText'>Capital City</p></div></div><div class='row'><div class='col-12'><p class='tooltipText'>" + country.wikipedia.capital.summary + "</p></div></div><div class'row'><div class='col-12'><a class='tooltipText' target='blank' href='https://" + country.wikipedia.capital.wikipediaUrl + "'>More on Wikipedia</a></div></div></div>");
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
    style: {color: "rgb(168,224,112)"}
    }).addTo(map); 
    $(".se-pre-con").fadeOut("slow");
    document.getElementById('selectCountry').value=country.properties.iso_a2;
}

// get user location

 function getLocation() {
    var x = $("#demo");
    $("#loadingText").html("Just getting your location...");
     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition((position)=> {
            $("#loadingText").html("Got it! Populating map...");
            console.log("Success: Retrieved location");
            mapOpts.setLocation([position.coords.latitude,position.coords.longitude]);
            getInfo(null,mapOpts);
         }),
          ()=>{
             console.log("Error finding location");
             getInfo("GB", mapOpts);
         };
 };
};
 
$(window).on('load', function (){
    $("#loadingText").html("Welcome to SpinGlobe!");
    $("#weather").hide();
    createOptions();
    getLocation();
    setTimeout(()=>{
    if (mapOpts.getLocation() == null){
        $("#loadingText").html("Still working on it!");
        setTimeout(()=>{
            if (mapOpts.getLocation() == null){
                getInfo("GB",mapOpts);
        }},3000);   
    }
}, 4500);
   

})

$("#selectCountry").on('change', function(e){
    let country = $("#selectCountry");
    mapOpts.setSort("country");
    $("#where2").prop("checked",true);
    getInfo(country.val(), mapOpts);
})
$("#collapseOne").on('click', function(e){
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
$("#weatherOpt").on("change",function(e){
    mapOpts.setWeather();
    if(mapOpts.getWeather()){
        $("#weather").show();
    } else {
        $("#weather").hide();
    }
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
            $("#where2").prop("checked",true);
        }
    } else {
        mapOpts.setSort("country");
        map.removeLayer(circle);
        map.fitBounds(data.getBoundary());
        addInterestLayers(data.getCountryInfo(),mapOpts);
    };
})
