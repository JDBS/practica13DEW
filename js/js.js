//https://maps.googleapis.com/maps/api/place/textsearch/json?query=Madrid+Barcelona&key=AIzaSyDrnaPp3lllsMvbuwahUFG6q3hrjSfR4aU
//https://maps.googleapis.com/maps/api/place/textsearch/json?query=Madrid+Barcelona&key=AIzaSyDrnaPp3lllsMvbuwahUFG6q3hrjSfR4aU&callback=myDisplayFunction
/*
function myAsyncFunction(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url,true);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}

async function query(url){
	await myAsyncFunction(url);
}


function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

var json_obj = JSON.parse(Get("https://maps.googleapis.com/maps/api/place/textsearch/json?query=\"Madrid Barcelona\"&key=AIzaSyDrnaPp3lllsMvbuwahUFG6q3hrjSfR4aU"));
console.log("this is the author name: "+json_obj.author_name);
*/
/*
var JSONData = undefined;

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

getJSON('https://www3.gobiernodecanarias.org/medusa/evagd/stacruztf/pluginfile.php/328413/mod_assign/intro/EstructMovilidadesErasmusJSON.json&callback',
function(err, data) {
  if (err !== null) {
    alert('Something went wrong: ' + err);
  } else {
    JSONData=data;
  }
});
*/

/*
var myWindow=window.open("https://maps.googleapis.com/maps/api/place/textsearch/json?query=Madrid+Barcelona&key=AIzaSyDrnaPp3lllsMvbuwahUFG6q3hrjSfR4aU");

var myJSON = JSON.parse(myWindow.document.body.innerText);
*/

/*function myDisplayFunction(object){
	console.log(object);
}*/

//###########################################################################################





