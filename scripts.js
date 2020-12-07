const mapId = 'map'; //map es el Id del mapa
const initialCoordinates = [40.4169473, -3.7057172]; // Plaza Sol en Madrid [lat, lng]

const mymap = L.map(mapId).setView(initialCoordinates, 13);

//const mymap = L.map('mapid').setView([51.505, -0.09], 13);

//para lanzar la función de la pagina de Leaflet que nos dibuja el mapa utilizamos las variables que nos piden:
//la url de la api de mapas en este caso mapbox
//necesitamos el token que nos provee mapbox
//L.tileLayer('aqui la url', {
/*  attribution: 'esto tb lo da Leaflet',
 maxZoom: el que queramos (por ejemplo 13 o 18),
 id: 'mapbox/streets-v11',
 tileSize: 512,
 zoomOffset: -1,
 accessToken: 'el token individual que te dan cuando te registras'
}).addTo(el nombre de la const de nuestro mapa, en este es mymap); */

//en este caso el profe ha decidio crear unas const independientes para rellenar el L.tileLayer

const MAPBOX_API = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'


const ATTRIBUTION =
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

const ACCESS_TOKEN =
    'pk.eyJ1IjoiemluZ2l0LWRldiIsImEiOiJja2k0ZHV2NjEyZnplMnptcGMxa2JoZmp3In0.DF8-X_GwEWZC7pOUsndbog';

L.tileLayer(MAPBOX_API, {
    attribution: ATTRIBUTION,
    maxZoom: 13,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: ACCESS_TOKEN
}).addTo(mymap);

// Añadimos el marcador a nuestra posición inicial
L.marker(initialCoordinates).addTo(mymap);

// Ejemplo añadiendo otras coordenadas:

/* const plazaMayorCoordinates = [40.4168898,-3.7020553] */

/* L.marker(plazaMayorCoordinates).addTo(mymap); */


// Añadimos el marcador a nuestra posición inicial

L.marker(initialCoordinates).bindPopup("<b>Plaza Sol</b><br>Posición inicial del mapa").addTo(mymap);

// Ejemplo añadiendo otras coordenadas:
// const plazaMayorCoordinates = [40.415511, -3.7095896];
// L.marker(plazaMayorCoordinates).bindPopup("<b>Plaza Mayor</b><br>Posición adicional").addTo(mymap);

const MAPBOX_PLACES_API = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const REST_PLACES_URL = `.json?types=place&access_token=pk.eyJ1IjoiemluZ2l0LWRldiIsImEiOiJja2k0ZHV2NjEyZnplMnptcGMxa2JoZmp3In0.DF8-X_GwEWZC7pOUsndbog`;

const FETCH_HEADERS = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}



function getCoordinates(placesContent) {
    const { center, place_name } = placesContent.features[0];
    return {
        coordinates: center.reverse(),
        name: place_name,
    };
}

// Esta función centrará el mapa cuando pulsemos el botón
function changeMapCenter(searchLocation) {

    fetch(
        `${MAPBOX_PLACES_API}${searchLocation}${REST_PLACES_URL}`,
        FETCH_HEADERS
    )
        .then((res) => res.json())
        .then((apiData) => {
            // Obtenemos las coordenadas y el nombre usando apiData
            const { coordinates, name } = getCoordinates(apiData);

            // Centramos el mapa en el nuevo lugar
            mymap.flyTo(coordinates);
            // Añadimos un marker con el nombre del sitio
            L.marker(coordinates).bindPopup(`<b>${name}</b>`).addTo(mymap);
        });
}

const city = document.getElementById("cityName").value; 


 console.log("valor de city=>", city)



//  function getMap(){

//     const city = document.getElementById("cityName").value; 

//     console.log("valor de city=>", city)

//     return changeMapCenter(city) 

//  } 

 const showMap = document.getElementById("submitId");

 console.log("este es el submitId=>", showMap)

  showMap.addEventListener("Submit",changeMapCenter(city) )

// const formGetCity = document.querySelector("#buttonId")
//   formGetCity.addEventListener("click", getMap) 