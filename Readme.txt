#Breve resumen de Estructura
+Script de Configuraci�n
 -Config.js
  -Contiene constantes y m�todos de inicializaci�n
+Script de Guardado
 -LocalSaver
  -Contiene m�todos save y load para guardar/cargar en webStorage
+Objeto posicion
 -Simula una posici�n, Adem�s es capaz de establecerse mediante marcadores o
  posiciones literales.

+Objeto MapObject
 -Objeto que contiene el mapa, las localizaciones, clusterers e info windows.
 -Mediante addMarker(address,content) permite agregar marcadores.
  -Proceso de agregado:
   -llamada a addMarker(address,content) (address es la direcci�n completa en string)
    -Comprueba si est� cacheada la direcci�n (se ha encontrado antes)
     -Si es as� llama al m�todo addMarkerByPosition(posici�nCargada, contenido, direcci�n)
      -Este m�todo a�ade el marcador
    -Si no est� cacheada la direcci�n llama al m�todo addMarkerByAdress(direcci�n,contenido)
     -Este m�todo resuelve la direcci�n por geolocalizaci�n y la env�a al m�todo
      addMarkerByPosition(posici�nCargada, contenido, direcci�n) junto con la direcci�n
       -Con esta �ltima llamada el marcador se a�ade
	
+Objeto MapApp
 -Objeto que lleva a cabo la carga del JSON
 -Contiene varios m�todos que filtran los estudiantes seg�n los criterios especificados

