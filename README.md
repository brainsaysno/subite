<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<div align="center">
  <a href="https://github.com/brainsaysno/subite">
    <img src="assets/icon.png" alt="Logo" width="200" height="200">
  </a>

<h1 align="center">Subite</h1>

  <p align="center">
    Descripción del proyecto
    <br />
    <a href="https://github.com/brainsaysno/subite"><strong>Explorar la documentación »</strong></a>
    <br />
    <br />
    <a href="https://github.com/brainsaysno/subite">Descargar Demo</a>
    ·
    <a href="https://github.com/brainsaysno/subite/issues">Reportar un bug</a>
    ·
    <a href="https://github.com/brainsaysno/subite/issues">Solicitar función</a>
  </p>
</div>

<details>
  <summary>Tabla de contenidos</summary>
  <ol>
    <li>
      <a href="#sobre-el-proyecto">Sobre el proyecto</a>
      <ul>
        <li><a href="#el-problema">El problema</a></li>
        <li><a href="#subite">Subite</a></li>
        <li><a href="#tecnologías">Tecnologías</a></li>
      </ul>
    </li>
    <li>
      <a href="#construir-localmente">Construir localmente</a>
      <ul>
        <li><a href="#requisitos">Requisitos</a></li>
        <li><a href="#instalación">Instalación</a></li>
      </ul>
    </li>
    <li><a href="#uso">Uso</a>
      <ul>
      <li><a href="#conductor">Conductor</a></li>
      <li><a href="#pasajero">Pasajero</a></li>
      </ul>
    </li>
    <li><a href="#vision-del-producto">Visión del producto</a></li>
    <li><a href="#contribuir">Contribuir</a></li>
    <li><a href="#licencia">Licencia</a></li>
    <li><a href="#contacto">Contacto</a></li>
    <li><a href="#agradecimientos">Agradecimientos</a></li>
  </ol>
</details>

## Sobre el proyecto

<iframe width="560" height="315" src="https://www.youtube.com/embed/C1Ov9Djh6Bw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### El problema

Después de una análisis de las problemáticas más comunes relacionadas al transporte y la comunicación en nuestro entorno detectamos que existe una gran dificultad relacionada al translado hacia las instituciones educativas. Debido a las horas comunes de ingreso entre generaciones se crean horarios pico, en los que los alrededores de las instituciones educativas presentan un problema de embotellamiento grave que genera grandes retrasos para los estudiantes y sus familias. Hay padres y madres que llevan a sus hijos en sus autos a veces hasta con tres espacios libres mientras que otros no pueden llevarlos y tienen que recurrir a contratar transporte. Reducir la cantidad de autos significaría que todos llegaran a destino de forma más eficiente.

### Subite

Subite es una aplicación móvil que conecta a las personas que viajan con lugares libres en sus vehículos hacia cada institución educativa con aquellas que no tienen transporte o no pueden llevar a sus hijos y de otra forma tendrían que contratar transporte escolar. La aplicación se encarga de entregarle las opciones de transporte y rutas al usuario que lo recibirá, acorde a su lugar de partida y la hora de salida deseada. Luego de elegir una de las rutas, se le entrega el contacto del conductor que la toma con un mensaje automatizado para que luego puedan definir el lugar específico de comienzo, la hora de recogida, entre otras cosas.
El sistema tiene un enfoque especial en la seguridad tanto del usuario que ofrece el transporte como del usuario que lo usa, esto es debido a un riguroso registro que se efectua mediante un tramite con las instituciones educativas que llenan un formulario habilitando el uso de las cuentas de sus estudiantes de una forma similar a como funciona el tramite de habilitación de las tarjetas STM.
Además de solucionar los problemas planteados anteriormente, nuestro proyecto trae consigo algunos beneficios colaterales, como el fomento del sentido de la comunidad y un beneficio ecológico por la reducción de la huella de carbono de los vehículos no usados. En principio esta solución está planteada para instituciones de educación media pero en un futuro podría ser extendida a instituciones deportivas, de educación terciaria, entre otras.

### Tecnologías

- [Javascript](https://reactnative.dev)
- [Node.js](https://nodejs.org/)
- [React Native](https://reactjs.org/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Expo](https://expo.dev)
- [Firebase](https://firebase.google.com)
- [Google Maps API](https://developers.google.com/maps/documentation/javascript/overview?_gl=1*9dtta9*_ga*MTAyNDM4NzMyNS4xNjM1NTI3Nzg1*_ga_NRWSTWS78N*MTYzNTUyNzc4NC4xLjAuMTYzNTUyNzc4Ny4w)
- [Google Maps Directions API](https://developers.google.com/maps/documentation/javascript/directions?_gl=1*18fw8eu*_ga*MTAyNDM4NzMyNS4xNjM1NTI3Nzg1*_ga_NRWSTWS78N*MTYzNTUyNzc4NC4xLjEuMTYzNTUyNzgwMi4w)
- [Figma](https://www.figma.com)

## Construir localmente

### Requisitos

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Instalación

1. [Contactanos](#contacto) para pedir una clave de prueba de las APIs
2. Clonar el repositorio
   ```sh
   git clone https://github.com/brainsaysno/subite.git
   ```
3. Instalar los paquetes de NPM
   ```sh
   cd subite
   npm install
   ```
4. Crea un archivo ".env" con tu clave de api
   ```sh
    echo "API_KEY=\"TU-CLAVE-DE-API\"" > .env
   ```

## Uso

Después del login la aplicación tiene dos modos con interfaces distintas, el modo del conductor y el del pasajero. Cualquier usuario puede cambiar entre los modos entrando al menu de preferencias.

### Conductor

Como conductor, el usuario tiene la capacidad de crear viajes nuevos hacia su institución con distintas fechas de partida, consultar el estado de sus viajes activos así como contactar a los pasajeros de cada uno o cancelarlos.

### Pasajero

Como pasajero, el usuario tiene la capacidad de unirse a viajes hacia su institución que son filtrados según la proximidad a su zona, consultar el estado de sus próximos viajes y revisar sus viajes recientes así como contactar al conductor de cada uno o cancelarlos. También tiene la posibilidad de aumentar o reducir su radio de búsqueda segun su preferencia.

## Visión del producto

- [x] Ajustar el radio de busqueda
- [ ] Barra de busqueda de direcciones
- [ ] Sistema de puntuaciones
- [ ] Chat integrado en la aplicación
- [ ] Versión de iOS

## Capturas de pantalla

|                                                 Pantalla de carga                                                 |                                                      Login                                                      |                                                      Crear viaje                                                      |                                                    Confirmar viaje                                                     |
| :---------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------: |
| ![loading](https://user-images.githubusercontent.com/48187554/139491370-12c74974-6564-4608-9ea4-681095bf81e6.png) | ![login](https://user-images.githubusercontent.com/48187554/139482639-8937cb67-19e7-4679-b6c4-4bee40eb9d5a.png) | ![create-trip](https://user-images.githubusercontent.com/48187554/139491735-9ff72cc5-e573-435b-828b-ac7c339d58c8.png) | ![create-trip2](https://user-images.githubusercontent.com/48187554/139482624-2af0f261-1f42-49b0-b253-325eb8d621f6.png) |

|                                                  Unirse a un viaje                                                  |                                                  Resumen del viaje                                                   |                                                   Detalle del viaje                                                   |                                                     Preferencias                                                      |
| :-----------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: |
| ![join-trip](https://user-images.githubusercontent.com/48187554/139482627-aef795c9-d746-4cd6-b74d-6b638ec20b27.png) | ![join-trip2](https://user-images.githubusercontent.com/48187554/139491984-879ac927-72e8-4471-9861-b8b9e4acf28f.png) | ![trip-detail](https://user-images.githubusercontent.com/48187554/139482644-20715e65-7cdb-4c13-9c32-c2c608375c7f.png) | ![preferences](https://user-images.githubusercontent.com/48187554/139482641-a4254d47-f468-46c4-80e0-d52c830304ba.png) |

## Contribuir

Las contribuciones son lo que hace a la comunidad de codigo abierto tan buena para aprender, inspirarse y crear. Cualquier contribución que hagas será **enormemente apreciada**.

Si tienes una sugerencia que haría a Subite un mejor proyecto puedes hacer un _fork_ y crear una nueva _pull request_. También puedes simplemente abrir un _issue_ con la etiqueta "mejora". No te olvides de darle una estrella al proyecto ¡Muchas gracias!

1. Haz un _fork_ del proyecto
2. Clona el proyecto a tu computadora (`git clone https://www.github.com/TU-USUARIO/subite.git`)
3. Crea una rama para tu propuesta (`git checkout -b propuesta/NOMBRE-DE-LA-PROPUESTA`)
4. Haz cambios en el código
5. Haz _commit_ de tu cambios (`git commit -m 'Agregar NOMBRE-DE-LA-PROPUESTA'`)
6. Haz _push_ a tu rama (`git push origin propuesta/NOMBRE-DE-LA-PROPUESTA`)
7. Abre una nueva _pull request_ explicando tu propuesta

Si deseas apoyar económicamente a los desarrolladores de Subite puedes hacerlo a través de [PayPal](https://paypal.me/brainsaysno).

## Licencia

Distribuido bajo la licencia de MIT. Ver [licencia](LICENSE) para más información.

## Contacto

Candelaria Paulo - candepaulomoreno@gmail.com

Nicolás Russo - [@brainsaysno](https://twitter.com/brainsaysno) - nicolas.russo.ortiz@gmail.com

Mathías Tejera - [@Matutejera](https://twitter.com/Matutejera) - matutejera@gmail.com

Link del proyecto: [https://github.com/brainsaysno/subite](https://github.com/brainsaysno/subite)

## Agradecimientos

- Jerónimo Méndez

[contributors-shield]: https://img.shields.io/github/contributors/brainsaysno/subite.svg?style=for-the-badge
[contributors-url]: https://github.com/brainsaysno/subite/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/brainsaysno/subite.svg?style=for-the-badge
[forks-url]: https://github.com/brainsaysno/subite/network/members
[stars-shield]: https://img.shields.io/github/stars/brainsaysno/subite.svg?style=for-the-badge
[stars-url]: https://github.com/brainsaysno/subite/stargazers
[issues-shield]: https://img.shields.io/github/issues/brainsaysno/subite.svg?style=for-the-badge
[issues-url]: https://github.com/brainsaysno/subite/issues
[license-shield]: https://img.shields.io/github/license/brainsaysno/subite.svg?style=for-the-badge
[license-url]: https://github.com/brainsaysno/subite/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
