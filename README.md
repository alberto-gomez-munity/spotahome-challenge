# SpotaRoom Challenge

El ejercicio consiste en la creación de un pequeño dashboard que permita al usuario la consulta de las viviendas disponibles para su alquiler, según el wireframe proporcionado y la guía de estilos propuesta.

![enter image description here](https://raw.githubusercontent.com/alberto-gomez-munity/spotahome-challenge/master/assets/captura.png)

El reto tanto a nivel de Javascript como de HTML/CSS consiste en realizar un código limpio, entendible y reutilizable no tanto el realizar todos los requisitos de la prueba.

###	Mi propuesta:
En mi caso he optado por desarrollar la prueba en un entorno sin framworks como React/Angular o similar ya que he considerado que serán mucho más valorables mis conocimientos desde el core del lenguaje. Aunque soy consciente de que en un contexto de desarrollo real se trabajan con estos frameworks.

Dado que he podido realizar casi todas las características y bolas extra propuestas he decidido realizar varias versiones del mismo ejercicio, diferenciadas cada una de ellas en una rama diferente del repositorio.

 - Versión básica de HTML/CSS/JS 
 - Versión básica + server NodeJS (proxy)
 - Versión producción con webpack

**CORS** 

La calve del ejercicio estaba en resolver el **problema de CORS** que me iba a encontrar, de ahí que para poder trabajar en la primera versión, la básica, haya tenido que usar un **plugin de Chrome** para poder llevar a cabo las peticiones a la API. También he resuelto el problema de CORS montando un **proxy en NodeJS** para estas peticiones con Express.

**HTML/CSS**

La maquetación html y css es común en todas las versiones del ejercicio.
He optado por no utilizar ningún framework tipo Bootstrap o similar sino generar mis propios estilos, más allá de usar *normalize.css* para la unificación de estilos en los diferentes navegadores.

**Live Server**

Todas las ramas cuentan con un lite server en NodeJS para no tener que ejecutar la aplicaicón desde el FileSystem

Para ejecutar todas las versiones basta con instalar los paquetes de Node y ejecutar el comando
     npm start

**PD:** El PDF con la descripción de la prueba contiene una pequeña trampa que no se si está puesta adrede o por error. Los ENDPOINT de la API que aparecen como texto en el documento están referidos a *https://www.spotahome.com/api/...* sin embargo si clicas sobre dicho enlace te dirige a la url *https://staging.spotahome.com/api/...* por lo que si no te das cuenta de la diferencia en la url puedes tirarte horas haciendo llamadas a dos APIs diferentes y que por tanto te dan resultados diferentes.
Nada un detalle ;)

