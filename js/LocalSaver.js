const SECONDMS=1000;
const MINUTEMS=SECONDMS*60;
const HOURMS=MINUTEMS*60;
const DAYMS=HOURMS*24;
const SAVETIMEMS=DAYMS*7;

//Guardar Cookie
function setCookie(nombre,value,milliseconds) {
  var expdate = new Date();
  expdate.setTime(expdate.getTime() + milliseconds);
  document.cookie = nombre+"="+encodeURIComponent (value)+"; expires=" + expdate.toUTCString();
}

//ObtenerCookie
function getCookie(nombre) {
  var index = document.cookie.indexOf(nombre+"=");
  if (index == -1)
    return null;
  index = document.cookie.indexOf("=", index) + 1;
  var endstr = document.cookie.indexOf(";", index);
  if (endstr == -1) 
    endstr = document.cookie.length;
  return decodeURIComponent(document.cookie.substring(index, endstr));
}

//Guardar Cookie (simplificación)
function saveCookie(object, id){
	setCookie(id, JSON.stringify(object),SAVETIMEMS);
}

//ObtenerCookie (simplificación)
function loadCookie(id){
	var object=null;
	var stringObject = getCookie(id);
	if(stringObject!="undefined" && stringObject!=null)
		object=JSON.parse(stringObject);
	return object;
}

//Si existe LocalStorage
function existLocalStorage(){
	var exists=undefined;
	try{
		window.localStorage;
		exists=true;
	}catch(e){
		exists=false;
	}
	return exists;
}


//Guardado
function saveObjectLocalSotrage(object, id){
	var saveItem = JSON.stringify(object);
	localStorage.setItem(id,saveItem);
}

//Carga
function loadObjectLocalStorage(id){
	var object=null;
	var stringObject = localStorage[id];
	if(stringObject!="undefined" && stringObject!=null)
		object=JSON.parse(stringObject);
	return object;
}

//Guarda un dato en Local Storage o Cookies dependiendo d 
function save(object, id){
	if(existLocalStorage()){
		saveObjectLocalSotrage(object,id);
	}else{
		saveCookie(object,id);
	}
}

//carga un dato
function load(id){
	if(existLocalStorage()){
		return loadObjectLocalStorage(id);
	}else{
		return loadCookie(id);
	}
}