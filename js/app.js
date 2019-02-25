'use strict'

function init(){
  console.log('Aplicación cargada');

  var city = getCity();

  //obtenemos las propiedades por primera vez con los parámetros por defecto
  getProperties(city).then(properties => {
    console.log(properties);

    if(properties.length > 0){

      //almacenamos las propiedades en local para su posterior uso
      saveLocal(properties);

      //pintamos las fichas de cada propiedad
      var html = htmlCards(properties);
      document.getElementById('content').innerHTML = html;
      loader('hidden')
    }
  })

}



function filter(type){
  
  loader()

  var order = document.getElementById('sort_by').value;
  var city = getCity();

  //obtenemos las propiedades por filtro
  getProperties(city, type, order).then(properties => {

    if(properties.length > 0){

      //almacenamos las propiedades en local para su posterior uso
      saveLocal(properties);

      //pintamos las fichas de cada propiedad
      var html = htmlCards(properties);
      document.getElementById('content').innerHTML = html;
      loader('hidden')
    }
  })
}

function sort(order){

  loader()

  var orderParams = order.split(':');
  var orderDir = orderParams[1];
  var orderBy = orderParams[0];

  //obtenemos las propiedades del localStorage
  var properties = getLocal();
  //ordenamos las propiedades según el nuevo criterio
  orderProperties(properties, orderDir, orderBy)
  
  //almacenamos las propiedades en local para su posterior uso
  saveLocal(properties);

  //pintamos las fichas de cada propiedad
  var html = htmlCards(properties);
  document.getElementById('content').innerHTML = html;
  loader('hidden')

}


