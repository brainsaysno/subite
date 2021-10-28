import React from "react";
import { ScrollView, Text } from "react-native";

function AboutUs() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 32, fontWeight: "500" }}>Subite</Text>

      <Text style={{ textAlign: "justify" }}>
        Subite es un proyecto desarrollado bajo el marco de la Olimpiada de
        Programación de Ceibal del año 2021 por el equipo Sobrinos de Voronoi
        integrado por los alumnos Candelaria Paulo, Nicolás Russo y el tutor
        Mathías Tejera
      </Text>
      <Text style={{ fontSize: 24, fontWeight: "500" }}>
        Descripción del problema
      </Text>
      <Text style={{ textAlign: "justify" }}>
        Después de una análisis de las problemáticas más comunes relacionadas al
        transporte y la comunicación en nuestro entorno detectamos que existe
        una gran dificultad relacionada al translado hacia las instituciones
        educativas. Debido a las horas comunes de ingreso entre generaciones se
        crean horarios pico, en los que los alrededores de las instituciones
        educativas presentan un problema de embotellamiento grave que genera
        grandes retrasos para los estudiantes y sus familias. Hay padres y
        madres que llevan a sus hijos en sus autos a veces hasta con tres
        espacios libres mientras que otros no pueden llevarlos y tienen que
        recurrir a contratar transporte. Reducir la cantidad de autos
        significaría que todos llegaran a destino de forma más eficiente.
      </Text>
      <Text style={{ fontSize: 24, fontWeight: "500" }}>
        Descripción de la solución
      </Text>
      <Text style={{ textAlign: "justify" }}>
        Nuestro proyecto consiste en una aplicación movil "Subite" que conecta a
        las personas que viajan con lugares libres en sus vehículos hacia cada
        institución educativa con aquellas que no tienen transporte o no pueden
        llevar a sus hijos y de otra forma tendrían que contratar transporte
        escolar. La aplicación se encarga de entregarle las opciones de
        transporte y rutas al usuario que lo recibirá, acorde a dónde se
        encuentra al momento de su partida y la hora de llegada deseada. Luego
        de elegir una de las rutas, se le entrega el contacto del conductor que
        la toma con un mensaje automatizado para que luego puedan definir el
        lugar específico de comienzo, la hora de recogida, entre otras cosas. El
        sistema tiene un enfoque especial en la seguridad tanto del usuario que
        ofrece el transporte como del usuario que lo usa, esto es debido a un
        riguroso registro que se efectua mediante un tramite con las
        instituciones educativas que llenan un formulario habilitando el uso de
        las cuentas de sus estudiantes de una forma similar a como funciona el
        tramite de habilitación de las tarjetas STM y una verificación por SMS.
        Además de solucionar los problemas planteados anteriormente, nuestro
        proyecto trae consigo algunos beneficios colaterales, como el fomento
        del sentido de la comunidad y un beneficio ecológico por la reducción de
        la huella de carbono de los vehículos no usados. El proyecto en si se
        desarrollará con las siguientes tecnologías: Expo y React Native para
        Front-End, Firebase para Back-End, consumirá la API de Google Maps para
        los mapas. Además de esto se usarán recursos como Figma para UI/UX y
        Github para el control de versiones. Para la fecha de entrega del
        proyecto se espera tener un primer release en el Play Store de Android
        completo, testeado e integramente funcional. Aprovechando las altas
        capacidades de portabilidad que ofrece React Native, la versión para iOS
        también estará testeada y podrá ser publicada en la App Store en un
        siguiente release. En principio esta solución está planteada para
        instituciones de educación media pero en un futuro podría ser extendida
        a instituciones deportivas, de educación terciaria, entre otras.
      </Text>
    </ScrollView>
  );
}

export default AboutUs;
