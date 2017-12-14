#Breve resumen de Estructura
+Script de Configuración
 -Config.js
  -Contiene constantes y métodos de inicialización
+Script de Guardado
 -LocalSaver
  -Contiene métodos save y load para guardar/cargar en webStorage
+Objeto posicion
 -Simula una posición, Además es capaz de establecerse mediante marcadores o
  posiciones literales.

+Objeto MapObject
 -Objeto que contiene el mapa, las localizaciones, clusterers e info windows.
 -Mediante addMarker(address,content) permite agregar marcadores.
  -Proceso de agregado:
   -llamada a addMarker(address,content) (address es la dirección completa en string)
    -Comprueba si está cacheada la dirección (se ha encontrado antes)
     -Si es así llama al método addMarkerByPosition(posiciónCargada, contenido, dirección)
      -Este método añade el marcador
    -Si no está cacheada la dirección llama al método addMarkerByAdress(dirección,contenido)
     -Este método resuelve la dirección por geolocalización y la envía al método
      addMarkerByPosition(posiciónCargada, contenido, dirección) junto con la dirección
       -Con esta última llamada el marcador se añade
	
+Objeto MapApp
 -Objeto que lleva a cabo la carga del JSON
 -Contiene varios métodos que filtran los estudiantes según los criterios especificados

