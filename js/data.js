'use strict'

/**
 * 
 * GetListProperties
 * Método para obtener el listado de todas las propiedades.
 * @param {string} type OPCIONAL. Define el tipo de propiedad que queremos recibir. Si no se especifica se reciben todas
 */

async function getListProperties(type = null, city = '/madrid'){
  
  //Validamos el tipo de propiedad a retornar
  var validTypes = ['apartments', 'rooms', 'studios', 'residences'];
  var typeParam = (validTypes.includes(type) ? '?type[]='+type : '');
  
  //construimos la url de llamada al API
  const url = `https://staging.spotahome.com/api/public/listings/search/markers${city}${typeParam}`;
  
  //realizamos la llamada a la API
  return await fetch(url)
  .then(response => response.json())
  .then(resContent => {
    if (resContent.ok) {
      return resContent.data;
    }
  })
  .catch(function(error) {
    console.log(error)
  }); 

}

/**
 * 
 * GetDataProperties
 * @param {array} list 
 * @param {number} paginationStart 
 * @param {number} paginationEnd 
 */

async function getDataProperties(list, paginationStart = 0, paginationEnd = 30) {

  //partimos el listado en función de los parámetros de una posibe paginación
  //por defect los 30 primeros elementos
  var data = list.slice(paginationStart, paginationEnd );
  
  //obtendo los IDs de las propiedades para concatenarlos a la petición de la API
  var idsQuery = '';
  var relevances = [];
  for (let i = 0; i < data.length; i++) {
    const property = data[i];
    (i == 0 ? idsQuery += `?ids[]=${property.id}` : idsQuery +=`&ids[]=${property.id}`);
    relevances[property.id] = property.relevance;
  }

  //construimos la url y lanzamos la petición
  let url = `https://staging.spotahome.com/api/public/listings/search/homecards_ids${idsQuery}`;

  //realizamos la llamada a la API
  return await fetch(url)
    .then(response => response.json())
    .then(resContent => {
      if (resContent.ok) {
        var homecards = resContent.data.homecards
        //recupero el parámetro de relevancia
        for (let i = 0; i < homecards.length; i++) {
          homecards[i].relevance = relevances[homecards[i].id];
        }
        return homecards;
      }
    })
    .catch(function(error) {
      console.log(error)
    }); 
  
}


function getProperties(city = '/madrid', type = null, order = 'price:ASC'){

  var orderParams = order.split(':');
  var orderDir = orderParams[1];
  var orderBy = orderParams[0];

  return new Promise((resolve, rejected) => {

    getListProperties(type, city)
    .then(data => {
      
      return getDataProperties(data)
      .then(properties => properties)
      .catch(e => rejected(e))
      
    }).then(properties => {

      orderProperties(properties, orderDir, orderBy)
      resolve(properties);

    }).catch(e => rejected(e))
  })
}
