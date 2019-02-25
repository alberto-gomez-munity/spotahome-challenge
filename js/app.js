'use strict'

function init(){
  console.log('Aplicación cargada');

  var city = getCity();

  //obtenemos las propiedades por primera vez con los parámetros por defecto
  getProperties(city).then(properties => {

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


var selectType = document.getElementById('filter_property_type');
var selectOrder = document.getElementById('sort_by');

selectType.addEventListener('change', (element) => {
  
  loader()

  var type = element.target.value;
  var order = selectOrder.value;
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
})

selectOrder.addEventListener('change', (element) => {

  loader()

  var order = element.target.value;
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

})


