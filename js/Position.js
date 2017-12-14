function Position(config){
  this.latitude=undefined;
  this.longitude=undefined;
  this.initialize(config);
}

Position.prototype.initialize=function(config){
  this.latitude=config.latitude;
  this.longitude=config.longitude;
    
}

Position.prototype.correctPosition=function(){
  return (this.latitude && this.longitude);
}

Position.prototype.setLatitude=function(latitude){
  if(!latitude)
    return;

  this.latitude=latitude;
}

Position.prototype.setLongitude=function(longitude){
  if(!longitude)
    return;

  this.longitude=longitude;
}

Position.prototype.getLatitude=function(){
  return this.latitude;
}

Position.prototype.getLongitude=function(){
  return this.longitude;
}

Position.prototype.getLiteralPosition=function(){
  if(!this.correctPosition())
    return undefined;

  return new google.maps.LatLng(this.latitude,this.longitude);
}

Position.prototype.getStruct=function(){
  return{
      lat: this.latitude, 
      lng: this.longitude
  }
}

Position.prototype.setFromMarker=function(marker){
  this.latitude=parseFloat(marker.getPosition().lat());
  this.longitude=parseFloat(marker.getPosition().lng());
}

Position.prototype.equalTo=function(position){
  if(!(position instanceof Position)){
    return false;
  }

  return (parseFloat(this.latitude) == parseFloat(position.latitude) && 
    parseFloat(this.longitude) == parseFloat(position.longitude));
}

Position.prototype.setPositionByLiteral=function(literal){
  if(literal)
  this.latitude=literal.lat();
  this.longitude=literal.long();
}

Position.prototype.getMarker=function(){
  if(!this.correctPosition())
    return undefined;

  var position = this.getLiteralPosition();
  return new google.maps.Marker({position});
}