
function MapObject(config){
  this.container=undefined;
  this.position=undefined;
  this.map=undefined;
  this.markers=[]; //Array of Structs width markers and infowindows
  this.locations=[];

  this.initialize(config);
}

/* Carga Localizaciones Cacheadas */
MapObject.prototype.loadLocations=function(){
  if(load("locations"))
    this.locations=load("locations");
}

/* Guarda Localizaciones Cacheadas */
MapObject.prototype.saveLocations=function(){
  save(this.locations,"locations");
}

/* Inicialización */
MapObject.prototype.initialize=function(config){
  //Map Container and size
  this.container = document.getElementById('map');
  var containerWidth = this.container.offsetWidth;
  var containerHeight = this.container.offsetWidth;

  //Center position
  this.position=new Position (
      {
        latitude: config.latitude || DEFAULT_LATITUDE, 
        longitude: config.longitude || DEFAULT_LONGITUDE
      });

  //Map declaration
  this.map = new google.maps.Map(this.container, {
        center: this.position.getStruct(),
        zoom: config.zoom || DEFAULT_ZOOM
      });

  //Zoom calculation
  this.setZoom(getDefaultZoomFor(containerWidth,containerHeight));
  this.loadLocations();
}

/* Centra la cámara entre todos los marcadores */
MapObject.prototype.centerAtMarkers=function(){
  if(this.markers.length==0)
    return;

  //Region initialize
  var position= new google.maps.LatLngBounds(
      this.markers[0].marker.position
    );

  //Set region limits
  this.markers.forEach(
      (markerStruct)=>{
        position.extend(markerStruct.marker.position);
      }
    );

  //Adjust map to region
  this.map.fitBounds(position);
}

//Si la localizacíón no existe, la añade
MapObject.prototype.addLocation=function(address, position){
  if(this.tryGetLocation(address)) //Si ya existe no la añade
    return;

  var location={
    address:address,
    position:{
      latitude:position.getLatitude(),
      longitude:position.getLongitude()
    }
  };

  this.locations.push(location);
  this.saveLocations();
}

//Intenta cargar la localización de la caché si ya existe
MapObject.prototype.tryGetLocation=function(address){
  var regExp= new RegExp(address,"i");

  var position = this.locations.find(
      (location)=>regExp.test(location.address)
    );

  if(position)
    return new Position(position.position);
  else
    return undefined;
}

/*Método interno: Añade un marcador con una dirección en forma de string */
MapObject.prototype.addMarkerByAddress=function(address, content){
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode( {address:address}, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK){
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
        var position = new Position({latitude, longitude});

        this.addLocation(address,position);//Add location to cache

        this.addMarkerByPosition(position, content);
      } else {
        console.error('MapObject geocodePosition(location) was not success because: ' + status);
      }
    });
  
}


/*Método interno: Añade un marcado con una posición exacta*/
MapObject.prototype.addMarkerByPosition=function(position,content){

  var infoWindow = new google.maps.InfoWindow({
    content: content
  });
  marker = new google.maps.Marker(
          {
              map: this.map,
              position: position.getLiteralPosition(),
              infoWindow
          });


  marker.addListener('click', function() {
          infoWindow.open(this.map, marker);
        });

  var markerStruct={
    marker,
    infoWindow
  }

  this.markers.push(markerStruct);
}

/* Añade un marcador */
MapObject.prototype.addMarker=function(position,content){
  if(typeof position == "string"){//Si la posicion es una direccion
    var positionLoad=this.tryGetLocation(position); //pregunta a la caché
    if(positionLoad){ //si existe
      this.addMarkerByPosition(positionLoad,content); //la usa
    }else{//si no
      this.addMarkerByAddress(position, content);//la consulta a google
    }
  }else{//si la posición es exacta
    this.addMarkerByPosition(position,content); //la usa
  }


}

MapObject.prototype.removeMarkers=function(){
  this.markers.forEach(
      (markerStruct) => markerStruct.marker.setMap(null)
    );
  this.markers=[];
}

MapObject.prototype.setCenter=function(position){
  if(!this.map || !position || !position.getLiteralPosition)
    return;
  this.position.setPositionByLiteral(position);

  var center = position.getLiteralPosition();
  if(center)
    this.map.setCenter(center)
}

MapObject.prototype.setZoom=function(zoom){
  if(parseFloat(zoom)==NaN){
    return;
  }

  if(this.map)
    if(zoom)
      this.map.setZoom(zoom);
}

MapObject.prototype.getZoom=function(){
  if(map)
    return this.map.zoom;
}

//var map = new MapObject({});