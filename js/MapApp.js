function MapApp(){
  this.app=undefined;
  this.map=undefined;
  this.data={};
  this.inputBox=undefined;
  this.checkboxes=[];
  this.dropdown=undefined;

  this.initialize();
}

/* Carga del JSON */
MapApp.prototype.loadData=function(){
	//From JSON
	var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'jsonData.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            this.data["students"]=JSON.parse(xobj.responseText);
  			this.toggleEvent();
          }
    }.bind(this);
    xobj.send(null);  
}

MapApp.prototype.addToggleEvent=function(){
	var toggle = document.getElementById("pais-toggle");
	toggle.addEventListener("change",this.toggleEvent.bind(this));
}

/*Evento de búsqueda para el botón */
MapApp.prototype.submitEvent=function(){
	var toggle = document.getElementById("pais-toggle");
	//remove markers
	if(toggle.checked){
		this.searchByCountry();
	}else{
		this.searchByCourses();
	}
}

/* Creación del botón de búsqueda */
MapApp.prototype.addSubmitButton=function(){
	var button = document.createElement("button");
	var buttonContainer = document.getElementById("button-container");

	button.addEventListener("click",this.submitEvent.bind(this));
	button.innerHTML="Buscar";

	buttonContainer.appendChild(button);
}

/* Inicialización  */
MapApp.prototype.initialize=function(){  
	this.loadData();
	this.app=document.getElementById("map-app");
	this.map = new MapObject({});
	this.inputBox=document.getElementById("map-selection");
	this.addToggleEvent();
	this.addSubmitButton();
}

/*Evento ejecutado al mover el toggle*/
MapApp.prototype.toggleEvent=function(){
	var toggle = document.getElementById("pais-toggle");
	if(toggle.checked){
		this.removeCheckboxes();
		this.createSelect();
	}else{
		this.removeSelect();
		this.createCheckBoxes();
	}
}

/* Crea la información para un Alumno */
MapApp.prototype.createInfoText=function(alumno){
	return "<h3>Nombre: " + alumno.key + "</h3>" +
	"<h4>Ciclo: " + alumno.ciclo + "</h4>" +
	"<h4>Tipo: " + alumno.tipo + "</h4>";
}

/* Acción de buscar alumnos por cursos */
MapApp.prototype.searchByCourses=function(){
	this.map.removeMarkers();

	//get checked courses
	var courses = this.getCheckedCourses();


	//list of students of those courses
	var students = [];
	courses.forEach(
			(course)=>students=students.concat(this.getStudentsFromCourse(course))
		);

	//draw
	students.forEach(
			(student)=>this.map.addMarker(
				student.pais + " " + student.ciudad,
				this.createInfoText(student))
		);
	
	setTimeout(this.map.centerAtMarkers.bind(this.map),500);
}

/* Acción de buscar alumnos por país */
MapApp.prototype.searchByCountry=function(){
	this.map.removeMarkers();

	var country = this.dropdown.value;

	var students = this.getStudentsFromCountry(country);

	students.forEach(
			(student)=>this.map.addMarker(
				student.pais + " " + student.ciudad,
				this.createInfoText(student))
		);
	
	setTimeout(this.map.centerAtMarkers.bind(this.map),500);
}

/* Obtiene la lista completa de países */
MapApp.prototype.getCountryList=function(){
	var students = this.getStudentsList();
	var countries = [];

	students.forEach(
		(student)=>{
			if(!countries.includes(student.pais))
				countries.push(student.pais);
		})
	return countries;
}

/* Obtiene la lista de ciclos existentes */
MapApp.prototype.getCourseList=function(){
	var students = this.getStudentsList();
	var courses = [];
	students.forEach(
		(student)=>{
			if(!courses.includes(student.ciclo) && student.ciclo!=undefined)
				courses.push(student.ciclo);
		})

	return courses;
}

/* Obtiene la lista de estudiantes de un país concreto*/
MapApp.prototype.getStudentsFromCountry=function(country){
	var allStudents = this.getStudentsList();
	var regExp = new RegExp(country,"i"); // same as /countryString/i
	return allStudents.filter(
			(student)=>regExp.test(student.pais)
		)
}

/* Obtiene la lista de estudiantes de un curso concreto */
MapApp.prototype.getStudentsFromCourse=function(course){
	var allStudents = this.getStudentsList();
	var courseExp = new RegExp(course,"i"); // same as /countryString/i
	var students = allStudents.filter(
			(student)=>courseExp.test(student.ciclo)
		)

 	return students;
}

/* Obtiene la lista de estudiantes */
MapApp.prototype.getStudentsList=function(){
	if(!this.data.students)
		return;

	var students=Object.values(this.data.students);
	var studentKeys=Object.keys(this.data.students);
	for(var i=0; i<students.length; i++){
		students[i]["key"]=studentKeys[i];
	}

	return students;
}

MapApp.prototype.getCheckedCourses=function(){
	var courses=[];
	this.checkboxes.forEach(
		(check)=>{
			var checkbox=check.getElementsByTagName("input")[0];
			if(checkbox.checked)//si el checbox está marcado
				courses.push(checkbox.value);//obtener el nombre del curso
		}
	);
	return courses;
}

/* Borra mediante recursividad y backtracking todos los subelementos */
MapApp.prototype.recursiveRemoval=function(element){
	var childs = [];

	//get all childs
	for(var i; i<element.children.length; i++){
		childs.push(element.children[i]);
	}

	//remove children of each child
	childs.forEach(
		(child)=>this.recursiveRemoval(child)
		);

	//remove all children
	while(element.children.length>0){
		element.removeChild(element.children[0]);
	}
}

/* Elminina el select */
MapApp.prototype.removeSelect=function(){
	if(!this.dropdown)
		return;

	this.recursiveRemoval(this.dropdown);
	this.inputBox.removeChild(this.dropdown)
	this.dropdown=undefined;
}

/* Crea un select (dropdown) */
MapApp.prototype.createSelect=function(){
	if(this.dropdown)
		return;

	var countries = this.getCountryList();

	this.dropdown=document.createElement("select");

	countries.forEach(
			(country)=>{
				var option = document.createElement("option");
				option.setAttribute("value", country);
				option.innerHTML=country;
				this.dropdown.appendChild(option);
			}
		)

	this.inputBox.appendChild(this.dropdown);
}

/* Elimina las checkboxes */
MapApp.prototype.removeCheckboxes=function(){
	if(this.checkboxes.length<=0)
		return;

	this.checkboxes.forEach(
		(checkbox)=>this.recursiveRemoval(checkbox)
		)

	this.checkboxes.forEach(
		(checkbox)=>this.inputBox.removeChild(checkbox)
		)

	this.checkboxes=[];
}

/* Crea una checbox con el label especificado  */
MapApp.prototype.createCheckBox=function(labelText){
	var label = document.createElement("label");
	var input = document.createElement("input");
	var span = document.createElement("span");

	input.setAttribute("type","checkbox");
	input.value=labelText;
	span.innerHTML=labelText;

	label.appendChild(input);
	label.appendChild(span);

	this.inputBox.appendChild(label);
	this.checkboxes.push(label);
}


/* Crea Checkboxes con los ciclos */
MapApp.prototype.createCheckBoxes=function(){
	if(this.checkboxes.length>0)
		return;

	var courseList=this.getCourseList();

	courseList.forEach(
		(course)=>this.createCheckBox(course)
		);
}


var mapApp= new MapApp(); //Inicio de la aplicación