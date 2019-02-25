'use strict'

import getProperties from './data.js';
import * as lib from './functions.js';

function init(){
  console.log('Aplicación cargada');

  var city = lib.getCity();

  //obtenemos las propiedades por primera vez con los parámetros por defecto
  getProperties(city).then(properties => {
    console.log(properties);

    if(properties.length > 0){

      //almacenamos las propiedades en local para su posterior uso
      lib.saveLocal(properties);

      //pintamos las fichas de cada propiedad
      var html = lib.htmlCards(properties);
      document.getElementById('content').innerHTML = html;
      lib.loader('hidden')
    }
  })
}



function filter(type){
  
  lib.loader()

  var order = document.getElementById('sort_by').value;
  var city = lib.getCity();

  //obtenemos las propiedades por filtro
  getProperties(city, type, order).then(properties => {

    if(properties.length > 0){

      //almacenamos las propiedades en local para su posterior uso
      lib.saveLocal(properties);

      //pintamos las fichas de cada propiedad
      var html = lib.htmlCards(properties);
      document.getElementById('content').innerHTML = html;
      lib.loader('hidden')
    }
  })
}

function sort(order){

  lib.loader()

  var orderParams = order.split(':');
  var orderDir = orderParams[1];
  var orderBy = orderParams[0];

  //obtenemos las propiedades del localStorage
  var properties = lib.getLocal();
  //ordenamos las propiedades según el nuevo criterio
  lib.orderProperties(properties, orderDir, orderBy)
  
  //almacenamos las propiedades en local para su posterior uso
  lib.saveLocal(properties);

  //pintamos las fichas de cada propiedad
  var html = lib.htmlCards(properties);
  document.getElementById('content').innerHTML = html;
  lib.loader('hidden')

}

/**
 * Iniciamos la aplicación
*/
init();

var selectType = document.getElementById('filter_property_type');
var selectOrder = document.getElementById('sort_by');
var downloadJson = document.getElementById('downloadJson');

selectType.addEventListener('change', (element) => {
  filter(element.target.value)
});

selectOrder.addEventListener('change', (element) => {
  sort(element.target.value)
});

downloadJson.addEventListener('click', () => {
  lib.downloadJson()
});
