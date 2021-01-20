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
        this.theme = "light";
        this.boundaryColor = "rgb(239,121,0)";
    }
    setTheme(theme){
        switch(theme){
            case "light":
                this.theme = "light";
                this.boundaryColor = "rgb(239,121,0)";
                break;
            case "dark":
                this.theme = "dark";
                this.boundaryColor = "rgb(57,251,215)";
                break;
            case "satellite":
                this.theme = "satellite";
                this.boundaryColor = "rgb(251,251,251)"
                break;
        }
    }
    getTheme(){
        return this.theme;
    }
    getBoundaryColor(){
        return this.boundaryColor;
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
var lightTheme = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});
lightTheme.addTo(map);

var darkTheme = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});


var satelliteTheme = L.tileLayer('https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=dTMVm5vDRnkBNdwZyhyL', {
	maxZoom: 20,
	attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
});


L.easyButton("<img class='icon' src='/Gazetteer/resources/images/info.png' style='max-width: 26px;max-height: 26px;'>", function(){
    $('#detailsModal').modal('show');
  }).addTo(map);

L.easyButton("<img class='icon' src='/Gazetteer/resources/images/weather.png' style='max-width: 26px;max-height: 26px;'>", function(){
    $('#weatherModal').modal('show');
  }).addTo(map);

  L.easyButton("<img class='icon' src='/Gazetteer/resources/images/news.png' style='max-width: 26px;max-height: 26px;'>", function(){
    $('#newsModal').modal('show');
  }).addTo(map);

  L.easyButton("<img class='icon' src='/Gazetteer/resources/images/covid.png' style='max-width: 26px;max-height: 26px;'>", function(){
    $('#covidModal').modal('show');
  }).addTo(map);

  L.easyButton("<img class='icon' src='/Gazetteer/resources/images/currency.png' style='max-width: 26px;max-height: 26px;'>", function(){
    $('#currencyModal').modal('show');
  }).addTo(map);

  L.easyButton("<img class='icon' src='/Gazetteer/resources/images/settings.png' style='max-width: 26px;max-height: 26px;'>", function(){
    $('#optionsModal').modal('show');
  }).addTo(map);

  

var boundaryLayer;
// Init capital marker
var capitalIcon = L.icon({
        iconUrl: '/Gazetteer/resources/images/capitalpin.png',
        shadowUrl: '/Gazetteer/resources/images/capitalshadow.png',
    
        iconSize:     [60, 70], // size of the icon
        shadowSize:   [60, 60], // size of the shadow
        iconAnchor:   [30, 70], // point of the icon which will correspond to marker's location
        shadowAnchor: [15, 70],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
var capitalDarkIcon = L.icon({
        iconUrl: '/Gazetteer/resources/images/capitalpin.png',
        shadowUrl: '/Gazetteer/resources/images/capitaldarkshadow.png',
    
        iconSize:     [60, 70], // size of the icon
        shadowSize:   [80, 80], // size of the shadow
        iconAnchor:   [30, 70], // point of the icon which will correspond to marker's location
        shadowAnchor: [10, 80],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
var capitalMarker; 

// Init YOU marker
var youIcon = L.icon({
    iconUrl: '/Gazetteer/resources/images/youpin.png',
    shadowUrl: '/Gazetteer/resources/images/youshadow.png',

    iconSize:     [60, 68], // size of the icon
    shadowSize:   [80, 68], // size of the shadow
    iconAnchor:   [30, 68], // point of the icon which will correspond to marker's location
    shadowAnchor: [7, 66],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var youDarkIcon = L.icon({
    iconUrl: '/Gazetteer/resources/images/youpin.png',
    shadowUrl: '/Gazetteer/resources/images/youdarkshadow.png',

    iconSize:     [60, 68], // size of the icon
    shadowSize:   [80, 68], // size of the shadow
    iconAnchor:   [30, 68], // point of the icon which will correspond to marker's location
    shadowAnchor: [7, 66],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var youMarker;

// Init history marker
var sightsIcon = L.icon({
    iconUrl: '/Gazetteer/resources/images/historypin.png',
    shadowUrl: '/Gazetteer/resources/images/historyshadow.png', 

    iconSize:     [22, 38], // size of the icon
    shadowSize:   [30, 27], // size of the shadow
    iconAnchor:   [11, 38], // point of the icon which will correspond to marker's location
    shadowAnchor: [3, 27],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var sightsDarkIcon = L.icon({
    iconUrl: '/Gazetteer/resources/images/historypin.png',
    shadowUrl: '/Gazetteer/resources/images/historydarkshadow.png', 

    iconSize:     [22, 38], // size of the icon
    shadowSize:   [30, 27], // size of the shadow
    iconAnchor:   [11, 38], // point of the icon which will correspond to marker's location
    shadowAnchor: [3, 27],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var sightsGroup;
//Init parks marker
var parksIcon = L.icon({
    iconUrl: '/Gazetteer/resources/images/parkspin.png',
    shadowUrl: '/Gazetteer/resources/images/parksshadow.png',

    iconSize:     [25, 38], // size of the icon
    shadowSize:   [42, 27], // size of the shadow
    iconAnchor:   [12, 38], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 27],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var parksDarkIcon = L.icon({
    iconUrl: '/Gazetteer/resources/images/parkspin.png',
    shadowUrl: '/Gazetteer/resources/images/parksdarkshadow.png',

    iconSize:     [25, 38], // size of the icon
    shadowSize:   [42, 27], // size of the shadow
    iconAnchor:   [12, 38], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 27],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var parksGroup;
// Init food marker
var foodIcon = L.icon({
    iconUrl: '/Gazetteer/resources/images/foodpin.png',
    shadowUrl: '/Gazetteer/resources/images/foodshadow.png',

    iconSize:     [25, 38], // size of the icon
    shadowSize:   [30, 27], // size of the shadow
    iconAnchor:   [15, 38], // point of the icon which will correspond to marker's location
    shadowAnchor: [3, 27],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var foodDarkIcon = L.icon({
    iconUrl: '/Gazetteer/resources/images/foodpin.png',
    shadowUrl: '/Gazetteer/resources/images/fooddarkshadow.png',

    iconSize:     [25, 38], // size of the icon
    shadowSize:   [32, 30], // size of the shadow
    iconAnchor:   [15, 38], // point of the icon which will correspond to marker's location
    shadowAnchor: [3, 30],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var foodGroup;
// Init bars marker
var barsIcon = L.icon({
    iconUrl: '/Gazetteer/resources/images/barsicon.png',
    shadowUrl: '/Gazetteer/resources/images/barsshadow.png',

    iconSize:     [22, 38], // size of the icon
    shadowSize:   [30, 27], // size of the shadow
    iconAnchor:   [11, 38], // point of the icon which will correspond to marker's location
    shadowAnchor: [3, 22],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var barsDarkIcon = L.icon({
    iconUrl: '/Gazetteer/resources/images/barsicon.png',
    shadowUrl: '/Gazetteer/resources/images/barsdarkshadow.png',

    iconSize:     [22, 38], // size of the icon
    shadowSize:   [40, 30], // size of the shadow
    iconAnchor:   [11, 38], // point of the icon which will correspond to marker's location
    shadowAnchor: [3, 26],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var barsGroup;
// Init earthquake marker
var eqIcon = L.icon({
    iconUrl: '/Gazetteer/resources/images/eqpin.png',
    shadowUrl: '/Gazetteer/resources/images/eqshadow.png',

    iconSize:     [18, 38], // size of the icon
    shadowSize:   [32, 27], // size of the shadow
    iconAnchor:   [9, 38], // point of the icon which will correspond to marker's location
    shadowAnchor: [5, 27],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var eqDarkIcon = L.icon({
    iconUrl: '/Gazetteer/resources/images/eqpin.png',
    shadowUrl: '/Gazetteer/resources/images/eqdarkshadow.png',

    iconSize:     [18, 38], // size of the icon
    shadowSize:   [40, 27], // size of the shadow
    iconAnchor:   [9, 38], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 27],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var eqGroup;
// Init local radius
var circle;

var ctx3 = document.getElementById('covidChart').getContext("2d");
var covidChart = new Chart(ctx3, {
    type: 'bar',
    data: {
        datasets: [{
            label: 'Deaths',
            data: [],
            // this dataset is drawn below
            order: 1,
            type: 'line',
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
            ],
        }],
        labels: []
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

var ctx4 = document.getElementById('covidChart2').getContext("2d");
var covidChart2 = new Chart(ctx4, {
    type: 'bar',
    data: {
        datasets: [{
            label: 'Confirmed Cases',
            data: [],
            // this dataset is drawn below
            order: 1,
            type: 'line',
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
            ],
        }],
        labels: []
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});



var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June','July','August','September','October','November','December'],
        datasets: [{
            label: 'Minimum (\u00B0C)',
            data: [0,0,0,0,0,0,0,0,0,0,0,0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        },{
        label: 'Maximum (\u00B0C)',
        data: [0,0,0,0,0,0,0,0,0,0,0,0],
        backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 99, 132, 0.5)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1
    }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
var ctx2 = document.getElementById('myChart2').getContext('2d');
var myChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June','July','August','September','October','November','December'],
        datasets: [{
            label: 'Precipitation (mm)',
            data: [0,0,0,0,0,0,0,0,0,0,0,0],
            backgroundColor: [
                
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                
            ],
            borderColor: [
               
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
// Helper functions

// Create options
function createOptions(){
    $.ajax({
		url: "/Gazetteer/resources/php/getCountries.php",
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
        },
		error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error: Problem retrieving countries data from server, retrying");
            createOptions();
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
		    url: "/Gazetteer/resources/php/getInfo.php",
		    type: 'GET',
            dataType: 'json',
            data: {
                code: code,
            },
            success: function(result){
                data.setCountryInfo(result.data);
                addModalInfo(data.getCountryInfo());
                addBasicLayers(data.getCountryInfo(), options);
                if (options.sort == "country"){
                    addInterestLayers(data.getCountryInfo(), options);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Error: Not getting API response, retrying");
                getInfo(code,mapOpts);
            }
        });
    } else if (options.getClickLocation()) { // Else if map has been clicked
        $.ajax({
		    url: "/Gazetteer/resources/php/getInfo.php",
		    type: 'GET',
            dataType: 'json',
            data: {
                code: null,
                lat: options.getClickLat(),
                lng: options.getClickLng(),
            },
            success: function(result){
                if (result != "Invalid Click Location"){
                options.setClickLocation(null);
                data.setPrevInfo(data.getCountryInfo());
                data.setCountryInfo(result.data);
                // If clicked country is different from current country
                if (data.getCountryInfo().code != data.getPrevInfo().code){
                    mapOpts.setSort("country");
                    addModalInfo(data.getCountryInfo());
                    addBasicLayers(data.getCountryInfo(), options);
                    addInterestLayers(data.getCountryInfo(), options);
                    $("#where2").prop("checked",true);
                }
            }},
            error: function(jqXHR, textStatus, errorThrown) {
                $("#loadingText").html("Sorry, taking longer than usual!");
                console.log("Error: No API response, retrying");
                getInfo(code=null,options);
            }
        });
    } else { 
        // Else no code or map click
        $("#loadingText").html("Got it! Populating map...");
        $.ajax({
		    url: "/Gazetteer/resources/php/getInfo.php",
		    type: 'GET',
            dataType: 'json',
            data: {
                code: null,
                lat: options.getLat(),
                lng: options.getLng(),
            },
            success: function(result){
                options.setClickLocation(null);
                data.setCountryInfo(result.data);
                addModalInfo(data.getCountryInfo());
                addBasicLayers(data.getCountryInfo(), options);
                if (options.getSort() == "country"){
                    addInterestLayers(data.getCountryInfo(), options);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $("#loadingText").html("Sorry, taking longer than usual!");
                getInfo(code=null,mapOpts);
            }
        });
    };
    if ((!data.getLocalInfo()) && (options.getLocation() != null)){
        $.ajax({
		    url: "/Gazetteer/resources/php/getLocalInfo.php",
		    type: 'GET',
            dataType: 'json',
            data: {
                lat: options.getLat(),
                lng: options.getLng(),
            },
            success: function(result){
                data.setLocalInfo(result.data);
                if (options.getSort() == "near"){
                    addInterestLayers(data.getLocalInfo(), options);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                
                console.log("Error: no API response for local info");
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
    circle = L.circle([options.getLat(),options.getLng()], {radius: 15000,color: "rgb(57,251,215)", fillColor:"rgb(57,251,215)", fillOpacity: 0.2}).addTo(map);
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

    // Format languages string
    let languages;
    if (country.languages.length == 1){
        languages = country.languages[0].name;
    } else {
        languages = [];
        country.languages.forEach(language => {
            languages.push(language.name);
        });
        languages = languages.join(", ");
    };

    // Format area string
    let area;
    if (country.allInfo.rest.area){
        area = country.allInfo.rest.area.toLocaleString("en-GB");
        area = area + " km&sup2;";
    } else {
        area = "Unavailable";
    }


    // Format timezone
    let timezone;
    if (country.code == "GB"){
        timezone = "UTC";
    } else if (country.allInfo.rest.timezones.length == 1){
        timezone = country.allInfo.rest.timezones[0];
    } else {
        timezone = country.allInfo.rest.timezones;
        timezone = timezone.join(", ");
    };
    // Format dialling code
    let dialling = "+" + country.allInfo.rest.callingCodes[0];

    // Format wikipedia
    let wikiKey = Object.keys(country.wikipedia.country.query.pages);
    wikiKey = wikiKey[0];
    let summary = country.wikipedia.country.query.pages[wikiKey].extract;
    let wikiTitle = country.wikipedia.country.query.pages[wikiKey].title;
    wikiTitle = wikiTitle.replace(" ", "_");
    let summaryArray = summary.split(" ");
    summaryArray = summaryArray.slice(0,50);
    let summaryString = summaryArray.join(" ") + " (...)";
    while (summaryString.includes("(listen)")){
        summaryString = summaryString.replace("(listen); ", "");
        summaryString = summaryString.replace("(listen)", "");

    }
    
    let wikiUrl = "https://en.wikipedia.org/wiki/" + wikiTitle;

    // Update modal html
    $("#name").html(country.name);
    $("#name2").html(country.name);
    $("#capital").html(country.capital);
    $("#area").html(area);
    $("#continent").html(country.allInfo.geonames.geonames[0].continentName);
    $("#diallingCode").html(dialling);
    $("#population").html(population);
    $("#timezone").html(timezone);
    $("#languages").html(languages);
    $("#region").html(country.region);
    $("#flag").attr("src",country.flag);
    $("#cases").html(Number(country.covid.confirmed).toLocaleString());
    $("#deaths").html(Number(country.covid.deaths).toLocaleString());
    $("#7cases").html(Number(country.covid.weeklyconfirmed).toLocaleString());
    $("#7deaths").html(Number(country.covid.weeklydeaths).toLocaleString());
    $("#wikiCountry").html(summaryString);
    $("#wikiLink").attr("href",wikiUrl);

    // Currency
    $("#symbol").html(country.currencies[0].symbol);
    $("#currencyName").html(country.currencies[0].name);
    $("#currencyCode").html(country.currencies[0].code);

    if (country.currencies.length > 1){
        let other =[];
        country.currencies.forEach(currency =>{
            other.push(currency.name + " (" + currency.symbol + ")");
        });
        let otherCurrencies = other.join(", ");
        $("#otherCurrencies").html(otherCurrencies);
        $('#other').attr("style","{display:block}");
    } else {
        $('#other').attr("style","{display:none}");
    }
    if (country.currencies[0].code == "GBP"){
        $("#exch1").html("Euro");
        $("#exch2").html("US Dollar");
        $("#exch3").html("");
        $("#rate3").html("");
        $("#rate1").html(Number.parseFloat(country.exchange.pound.rates.EUR).toFixed(2));
        $("#rate2").html(Number.parseFloat(country.exchange.pound.rates.USD).toFixed(2));
    } else if (country.currencies[0].code == "EUR"){
        $("#exch1").html("UK Pound");
        $("#exch2").html("US Dollar");
        $("#exch3").html("");
        $("#rate3").html("");
        $("#rate1").html(Number.parseFloat(country.exchange.euro.rates.GBP).toFixed(2));
        $("#rate2").html(Number.parseFloat(country.exchange.euro.rates.USD).toFixed(2));
    } else if (country.currencies[0].code == "USD"){
        $("#exch1").html("UK Pound");
        $("#exch2").html("Euro");
        $("#exch3").html("");
        $("#rate3").html("");
        $("#rate1").html(Number.parseFloat(country.exchange.dollar.rates.GBP).toFixed(2));
        $("#rate2").html(Number.parseFloat(country.exchange.dollar.rates.EUR).toFixed(2));
    } else {
        let available = Object.keys(country.exchange.dollar.rates);
        if (available.includes(country.currencies[0].code)){
            $("#exch1").html("UK Pound");
            $("#exch2").html("Euro");
            $("#exch3").html("US Dollar");
            $("#rate1").html(Number.parseFloat(1 / country.exchange.pound.rates[country.currencies[0].code]).toFixed(2));
            $("#rate2").html(Number.parseFloat(1 / country.exchange.euro.rates[country.currencies[0].code]).toFixed(2));
            $("#rate3").html(Number.parseFloat(1 / country.exchange.dollar.rates[country.currencies[0].code]).toFixed(2));
        } else {
            $("#exch1").html("UK Pound");
            $("#exch2").html("Euro");
            $("#exch3").html("US Dollar");
            $("#rate1").html("Unavailable");
            $("#rate2").html("Unavailable");
            $("#rate3").html("Unavailable");

        }
    };
    let available = Object.keys(country.exchange.dollar.rates);
    if (available.includes(country.currencies[0].code)){
            var select = document.getElementById("currencyTo"); 
            let currencyKeys = Object.keys(country.exchange.pound.rates);
            currencyKeys = currencyKeys.sort(function(a,b){
                return a.localeCompare(b);
            });
            for(var i = 0; i < currencyKeys.length; i++) {
                var el = document.createElement("option");
                el.textContent = currencyKeys[i];
                el.value = currencyKeys[i];
                select.appendChild(el);
            };
            if(country.currencies[0].code == "GBP"){
                select.value="EUR";
            } else {
                select.value="GBP";
            };
            
            $(".noConverter").css("display","none");
            $(".converter").css("display","");
            $("#convertAmount").val("");
            $("#fromUnit").html(country.currencies[0].code);
            $("#fromSymbol").html(country.currencies[0].symbol);
            $("#convertedVal").html("");
            $("#convertedUnit").html("");
        } else {
            $(".converter").css("display","none");
            $(".noConverter").css("display","block");
        };
    

    let headlines = [$("#headline1"),$("#headline2"),$("#headline3"),$("#headline4"),$("#headline5")];
    let images = [$('#image1'),$('#image2'),$('#image3'),$('#image4'),$('#image5')];
    let sources =[$("#source1"),$("#source2"),$("#source3"),$("#source4"),$("#source5")];
    let dates = [$("#date1"),$("#date2"),$("#date3"),$("#date4"),$("#date5")];
    let descriptions = [$("#description1"),$("#description2"),$("#description3"),$("#description4"),$("#description5")];
    let urls = [$("#url1"),$("#url2"),$("#url3"),$("#url4"),$("#url5")];
    let urlnames = [$("#urlname1"),$("#urlname2"),$("#urlname3"),$("#urlname4"),$("#urlname5")];
    let news =[];
    if (country.news.code != "rateLimited"){
    country.news.articles.forEach(article => {
        if (article.urlToImage){
            if (news.length < 5){
                news.push(article);
            }
        }
    });
    console.log(news);

    
    
    for (let i=0; i < news.length ; i++){
        let date = news[i].publishedAt;
        let day = date.slice(8,10);
        let month = date.slice(5,7);
        let year = date.slice(0,4);
        let suffix;
        switch (day.charAt(day.length-1)){
            case "1":
                if (day == "11"){
                    suffix = "th";
                } else {
                    suffix = "st";
                }      
                break;
            case "2":
                suffix = "nd";
                break;
            case "3":
                suffix = "rd";
            default:
                suffix = "th"
        };
        let monthString;
        switch (month){
            case "01":
                monthString = "January";
                break;
            case "02":
                monthString = "February";
                break;
            case "03":
                monthString = "March";
                break;
            case "04":
                monthString = "April";
                break;
            case "05":
                monthString = "May";
                break;
            case "06":
                monthString = "June";
                break;
            case "07":
                monthString = "July";
                break;
            case "08":
                monthString = "August";
                break;
            case "09":
                monthString = "September";
                break;
            case "10":
                monthString = "October";
                break;
            case "11":
                monthString = "November";
                break;
            case "12":
                monthString = "December";
                break;
        }
        let dateString = day + suffix + " " + monthString + " " + year;
        
        headlines[i].html(news[i].title);
        images[i].attr("src",news[i].urlToImage);
        sources[i].html(news[i].source.name);
        dates[i].html(dateString);
        descriptions[i].html(news[i].description);
        urls[i].attr("href",news[i].url);
        urlnames[i].html(news[i].source.name);
    }
} else {
    let todaysDate = new Date();
    todaysDate = todaysDate.toDateString();
    for (let i = 0; i<5 ; i++){
        headlines[i].html("Cambridge-based, full stack developer has so many visitors to their site that News api can't keep up!");
        images[i].attr("src","/Gazetteer/resources/images/newserror.png");
        sources[i].html("Nathan Proudfoot");
        dates[i].html(todaysDate);
        descriptions[i].html("Sorry! Only 100 calls allowed per day and it seems that limit has been exceeded.");
        urls[i].attr("href","https://newsapi.org/pricing");
        urlnames[i].html("News API");
    }
};

    // Create covid graph
    let covidDates = [];
    country.dailyCovid.date.forEach(entry =>{
        let day = entry.slice(8,10);
        let month = entry.slice(5,7);
        let year = entry.slice(2,4);
        covidDates.push(day + "/" + month + "/" + year);
    })
    covidChart.data.datasets[0].data = country.dailyCovid.deaths;
    covidChart2.data.datasets[0].data = country.dailyCovid.cases;
    covidChart.data.labels = covidDates;
    covidChart2.data.labels = covidDates;
    covidChart.update();
    covidChart2.update();
   
}
function addInterestLayers(country, options){
    let icons = {};
    if (options.getTheme() == "dark"){
        icons.sights = sightsDarkIcon;
        icons.parks = parksDarkIcon;
        icons.food = foodDarkIcon;
        icons.bars = barsDarkIcon;
        icons.eq = eqDarkIcon;
    } else {
        icons.sights = sightsIcon;
        icons.parks = parksIcon;
        icons.food = foodIcon;
        icons.bars = barsIcon;
        icons.eq = eqIcon;
    };
    // Create sights markers
    if (sightsGroup){
        sightsGroup.clearLayers();
    }
    let sights = [];
    country.foursquare.forEach(sight => { 
        sight = L.marker([sight.lat,sight.lng], {icon: icons.sights}).bindTooltip("<div style='text-align:center'><h5 class='tooltipText'>" + sight.name + "</h5><p class='tooltipText'>"+ sight.category + "</p><img src=" + sight.icon + "><br><div style='text-align: center' ><p class='tooltipText'>" + sight.address.join(",<br>") + "</p></div></div>",);
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
        park = L.marker([park.lat,park.lng], {icon: icons.parks}).bindTooltip("<div style='text-align:center'}><h5 class='tooltipText'>" + park.name + "</h5><p class='tooltipText'>"+ park.category + "</p><img src=" + park.icon + "><br><div style='text-align: center' class='tooltipText'>" + park.address.join(",<br>") + "</div></div>");
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
        sight = L.marker([sight.lat,sight.lng], {icon: icons.food}).bindTooltip("<div style='text-align:center'}><h5 class='tooltipText'>" + sight.name + "</h5><p class='tooltipText'>"+ sight.category + "</p><img src=" + sight.icon + "><br><div style='text-align: center' class='tooltipText'>" + sight.address.join(",<br>") + "</div></div>");
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
        sight = L.marker([sight.lat,sight.lng], {icon: icons.bars}).bindTooltip("<div style='text-align:center'}><h5 class='tooltipText'>" + sight.name + "</h5><p class='tooltipText'>"+ sight.category + "</p><img src=" + sight.icon + "><br><div style='text-align: center' class='tooltipText'>" + sight.address.join(",<br>") + "</div></div>");
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
        sight = L.marker([sight.lat,sight.lng], {icon: icons.eq}).bindTooltip("<h5 class='tooltipText'>Earthquake</h5><table class='table table-sm'><tr><th class='tooltipText' scope='row'>Date</th><td style='padding-left:5px' class='tooltipText'>" + sight.datetime + "</td></tr><tr><th class='tooltipText' scope='row'>Magnitude</th><td style='padding-left:5px' class='tooltipText'>" + sight.magnitude + "</td></tr><tr><th class='tooltipText' scope='row'>Depth</th><td style='padding-left:5px' class='tooltipText' >" + sight.depth + "</td></tr></table></div>");
        eq.push(sight);
    });
    eqGroup = L.layerGroup(eq);
    if(options.getEarthquakes() == true){     
        eqGroup.addTo(map);
    }
    // Create weather div
    $("#weatherName").html(country.weather.name);
    $("#weatherCode").html(country.weather.sys.country);
    $("#weatherIcon").prop('src','https://openweathermap.org/img/wn/' + country.weather.weather[0].icon + '@2x.png');
    $("#weatherTemp").html(Math.round(country.weather.main.temp) + "&deg;C");
    $("#weatherDesc").html(country.weather.weather[0].description);
    $("#weatherPress").html(country.weather.main.pressure + " hPa");
    $("#weatherHumid").html(country.weather.main.humidity + " %");
    if(options.getWeather() == true){     
        $("#weather").show();
    }
    // Create weather graphs
    let monthly = country.monthly;
    let mintemp = [];
    let maxtemp =[];
    let prec = [];
    monthly.forEach(month =>{
        mintemp.push(month.tmin);
        prec.push(month.prcp);
        maxtemp.push(month.tmax);
    });
    myChart.data.datasets[0].data = mintemp;
    myChart.data.datasets[1].data = maxtemp;
    myChart.update();
    myChart2.data.datasets[0].data = prec;
    myChart2.update(); 
    }

function addBasicLayers(country, options){
    // Create you marker
    if (options.getLocation()){
        let latlng = new L.LatLng(options.getLat(),options.getLng());
        if (youMarker){
            map.removeLayer(youMarker);
        }
        let icon;
        if (options.getTheme() == "dark"){
            icon = youDarkIcon;
        } else{
            icon = youIcon;
        }
        youMarker = L.marker([0,50], {icon: icon})
        youMarker.setLatLng(latlng).addTo(map);
    }
    // Create capital city marker
    var capLatLng = new L.LatLng(country.weather.coord.lat,country.weather.coord.lon);
    if (capitalMarker){
        map.removeLayer(capitalMarker);
    }
    let capicon;
    if (options.getTheme() == "dark"){
        capicon = capitalDarkIcon;
    } else{
        capicon = capitalIcon;
    }
    capitalMarker = L.marker([0,50], {icon: capicon});
    capitalMarker.setLatLng(capLatLng).addTo(map);
    capitalMarker.bindPopup("<div class='container'><div class='row'><div class='col-12'><h4 class='tooltipText'>" + country.capital + "</h4></div></div><div class='row'><div class='col-12'><h5 class='tooltipText' style={font-weight:lighter}>Capital City</h5></div></div><div class='row'><div class='col-12'><p class='tooltipText'>" + country.wikipedia.capital.summary + "</p></div></div><div class'row'><div class='col-12'><a class='tooltipText' target='blank' href='https://" + country.wikipedia.capital.wikipediaUrl + "'>More on Wikipedia</a></div></div></div>");
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
    style: {color: options.getBoundaryColor()}
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
            mapOpts.setLocation([position.coords.latitude,position.coords.longitude]);
            getInfo(null,mapOpts);
         }),
          ()=>{
             getInfo("GB", mapOpts);
         };
 };
};
 
$(window).on('load', function (){
    $("#fullscreenLoader").fadeOut("slow");
    $("#loadingText").html("Welcome to Gazetteer!");
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

$("#theme").on('change',function(e){
    switch (e.target.value){
        case "light":
            map.removeLayer(darkTheme);
            map.removeLayer(satelliteTheme);
            mapOpts.setTheme("light");
            boundaryLayer.setStyle({color:"rgb(239,121,0)"});
            capitalMarker.setIcon(capitalIcon);
            sightsGroup.eachLayer(layer=>{
                layer.setIcon(sightsIcon);
            });
            parksGroup.eachLayer(layer => {
                layer.setIcon(parksIcon);
            });
            foodGroup.eachLayer(layer => {
                layer.setIcon(foodIcon);
            });
            barsGroup.eachLayer(layer => {
                layer.setIcon(barsIcon);
            });
            eqGroup.eachLayer(layer => {
                layer.setIcon(eqIcon);
            });
            if(youMarker){
                youMarker.setIcon(youIcon);
            };
            lightTheme.addTo(map);
            break;
        case "dark":
            map.removeLayer(lightTheme);
            map.removeLayer(satelliteTheme);
            mapOpts.setTheme("dark");
            boundaryLayer.setStyle({color: "rgb(57,251,215)"});
            capitalMarker.setIcon(capitalDarkIcon);
            sightsGroup.eachLayer(layer=>{
                layer.setIcon(sightsDarkIcon);
            });
            parksGroup.eachLayer(layer => {
                layer.setIcon(parksDarkIcon);
            });
            foodGroup.eachLayer(layer => {
                layer.setIcon(foodDarkIcon);
            });
            barsGroup.eachLayer(layer => {
                layer.setIcon(barsDarkIcon);
            });
            eqGroup.eachLayer(layer => {
                layer.setIcon(eqDarkIcon);
            });
            if(youMarker){
                youMarker.setIcon(youDarkIcon);
            };
            darkTheme.addTo(map);
            break;
        case "satellite":
            map.removeLayer(darkTheme);
            map.removeLayer(lightTheme);
            mapOpts.setTheme("satellite");
            boundaryLayer.setStyle({color: "rgb(251,251,251)"});
            capitalMarker.setIcon(capitalIcon);
            sightsGroup.eachLayer(layer=>{
                layer.setIcon(sightsIcon);
            });
            parksGroup.eachLayer(layer => {
                layer.setIcon(parksIcon);
            });
            foodGroup.eachLayer(layer => {
                layer.setIcon(foodIcon);
            });
            barsGroup.eachLayer(layer => {
                layer.setIcon(barsIcon);
            });
            eqGroup.eachLayer(layer => {
                layer.setIcon(eqIcon);
            });
            if(youMarker){
                youMarker.setIcon(youIcon);
            };
            satelliteTheme.addTo(map);
            break;
    }
});
$("#convertAmount").on("input",(e)=>{
    let unit = $("#currencyTo").val();
    let poundrate = 1 / data.info.exchange.pound.rates[data.info.currencies[0].code];
    let poundamount = poundrate * e.target.value;
    let amount = poundamount * data.info.exchange.pound.rates[unit];
    amount = Number.parseFloat(amount).toFixed(2);
    $("#convertedVal").html(amount);
    $("#convertedUnit").html(unit);
});
$("#currencyTo").on("change",(e)=>{
    if($("#convertAmount").val()){
    let unit = $("#currencyTo").val();
    let poundrate = 1 / data.info.exchange.pound.rates[data.info.currencies[0].code];
    let poundamount = poundrate * $("#convertAmount").val();
    let amount = data.info.exchange.pound.rates[unit] * poundamount;
    //let amount = poundamount * data.info.exchange.pound.rates[data.info.currencies[0].code];
    amount = Number.parseFloat(amount).toFixed(2);
    $("#convertedVal").html(amount);
    $("#convertedUnit").html(unit);
    }
});
