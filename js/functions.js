'use strict'

/**
 * 
 * orderProperties
 * Función encargada de ordenar el listado de las propiedades
 * @param {arry} list Array de propiedades a ordenar 
 * @param {string} orderBy Criterio de ordenación
 * @param {string} orderDir Dirección de la ordenación
 */

function orderProperties(properties, orderDir = 'ASC', orderBy = 'price') {
  
  //orden por precio
  if(orderBy === 'price' && orderDir === 'ASC'){
    properties.sort((a,b) => (a.pricePerMonth > b.pricePerMonth) ? 1 : ((b.pricePerMonth > a.pricePerMonth) ? -1 : 0)); 
  }else if(orderBy === 'price' && orderDir === 'DESC'){
    properties.sort((a,b) => (a.pricePerMonth < b.pricePerMonth) ? 1 : ((b.pricePerMonth < a.pricePerMonth) ? -1 : 0)); 
  }

  //orden por relevancia
  if(orderBy === 'relevance' && orderDir === 'ASC'){
    properties.sort((a,b) => (a.relevance > b.relevance) ? 1 : ((b.relevance > a.relevance) ? -1 : 0)); 
  }else if(orderBy === 'relevance' && orderDir === 'DESC'){
    properties.sort((a,b) => (a.relevance < b.relevance) ? 1 : ((b.relevance < a.relevance) ? -1 : 0)); 
  }

  return properties;
}


function htmlCards(properties) {
  var cards = "";  
  properties.forEach(property => {

    var btnInstant = (property.instantBooking.isEnabled ? '<a href="#" class="btn btn-secondary">Book now</a>' : '');

    var card = `
    <div class="homecard m20 p15 ">
      <div class="imgMask w25">
        <a href="https://staging.spotahome.com${property.url}">
          <img src="${property.mainPhotoUrl}" alt="${property.mainPhotoUrl}" class="w100"/>
        </a>
      </div>
      <div class="info container w75">
        <h2 class="title font-secondary m0"><a href="https://staging.spotahome.com${property.url}">${property.title}</a></h2>
        <span class="price font-primary">${property.pricePerMonth} ${property.currencySymbol}</span>
      </div>
      <div class="actions">
          <a href="https://staging.spotahome.com${property.url}" class="btn btn-primary">View details</a>
          ${btnInstant}
        </div>
    </div>`;

    cards += card;
  })

  return cards;
}


function saveLocal(properties) {
  
  if (window.localStorage) {
    localStorage.setItem('properties', JSON.stringify(properties))
  } else {
      console.warn('Su navegador no soporta localStorage');
  }
}

function getLocal() {
  
  if (window.localStorage) {
    var propertiesStr = localStorage.getItem('properties');
    return JSON.parse(propertiesStr);
  } else {
      console.warn('Su navegador no soporta localStorage');
  }
}

function downloadJson() {

  var data = getLocal();
  var json = JSON.stringify(data);
  var blob = new Blob([json], {type: "application/json"});
  var url  = URL.createObjectURL(blob);
  var downloadJsonElem = document.getElementById('downloadJson');
  downloadJsonElem.setAttribute("href",     url     );
  downloadJsonElem.setAttribute("download", "properties.json");
}

function loader(action = '') {
  
  var loader = document.getElementById('loading');

  if(action == 'hidden'){
    loader.classList.add('hidden')
  }else{
    loader.classList.remove('hidden')
  }
}

function getCity(){

  //ciudades permitidas
  var cities = ['/madrid', '/barcelona', '/london'];

  //recuperamos la ciudad definida por URL
  var city = window.location.pathname;
  if(city == '' || city == '/' || cities.includes(city) === false ){
    city = '/madrid';
    window.location.pathname = city;
  }

  return city;
}