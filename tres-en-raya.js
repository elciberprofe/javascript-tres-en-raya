/*
Título: Juego del Tres en Raya.
Nivel Educativo: Ciclo Formativo de Grado Superior
Curso: DAM, DAW o ASIR
Conocimientos del alumnado I: Tipos de Datos, Constantes y Variables 
Conocimientos del alumnado II: Operaciones Aritméticas, Lógicas y Relacionales
Conocomientos del alumnado III: Instrucciones de Control Condicional
Conocomientos del alumnado IV: Instrucciones de Control Iterativa
Conocomientos del alumnado V: Estructuras de datos (Vectores)
Fecha: 05 / 06 / 2023
Autor: Xavi Garcia (ElCiberProfe)
Web: https://www.elciberprofe.com
Lenguaje: JavaScript 
*/

//VARIABLES PARA EL CONTROL DE LA EVOLUCIÓN DE LA PARTIDA
let ganador = 0; //Determinar si hay un ganador de la partida.
let turnoJugador = 1; //Controlar el jugador que dispone del turno para tirar. (Valores 1 y 2)
const vectorTiradas = [0, 0, 0, 0, 0, 0, 0, 0, 0]; //Controlar el contenido de casa casilla con el vector de tiradas (Vacía = 0, "X" = 1, "O" = 2)
const vectorSoluciones = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]; //Comprobar si un jugador ha realizado un tres en raya disponiendo de todas las combinaciones de soluciones.

//CONSTANTES CON LOS ELEMENTOS HTML DONDE SE DEBE OBTENER, MOSTRAR o MODIFICAR INFORMACIÓN
const elementoGanador = document.querySelector("#ganadorPartida"); //Elemento HTML para mostrar el jugador ganador de la partida.
const imagenesX = []; //Vector para almacenar todos los elementos HTML de imágenes de la cruz "X"
const imagenesO = []; //Vector para almacenar todos los elementos HTML de imágenes del círculo "O"

//imagenX.src = "./cruz.png";
//imagenO.src = "./circulo.png";

//LÓGICA DEL JUEGO PIEDRA, PAPEL o TIJERAS
function realizarTirada(posicion) {
  if (ganador != 0) {
    alert(`Ya no se puede jugar mas. ¡El jugador ${ganador} ha vencido!`);
    return;
  } else {
    const indice = posicion.id; //Obtener el id del elemento HTML que equivaldrá al indice (0-9) del vector de tiradas
    //Comprobar si la casilla seleccionada está disponible
    if (vectorTiradas[indice] != 0) {
      //El jugador que tiraba ha perdido el turno.
      console.log(`El jugador ${turnoJugador} ha perdido el turno :(`);
      //Cambiar el turno del jugador actual por el contrario
      if (turnoJugador == 1) {
        turnoJugador = 2;
      } else {
        turnoJugador = 1;
      }
      return;
    } else {
      //Almacenar en la posición del vector de tiradas el jugador del turno actual
      vectorTiradas[indice] = turnoJugador;
      //Mostrar la imagen en la casilla dependiendo del jugador
      const imagen = document.createElement("img");
      if (turnoJugador == 1) {
        imagen.src = "./cruz.png";
        posicion.appendChild(imagen);
      } else {
        imagen.src = "./circulo.png";
        posicion.appendChild(imagen);
      }
      //Comprobar si existe un tres en raya para la tirada del jugador actual
      //Recorrer el vector multidimensional de combinaciones ganadoras
      for (let i = 0; i < vectorSoluciones.length; i++) {
        const vectorSolucion = vectorSoluciones[i]; //Obtener el "subvector" (vector unidimensional) de cada posición de la matriz
        //Recorrer el vector unidimensional de la combinación ganadora
        let coincidencias = 0; //Acumulador de coincidencias: Contabilizar las veces que coincide el valor de la posición ganadora con el jugador actual
        for (let j = 0; j < vectorSolucion.length; j++) {
          //Obtener el índice de la posición ganadora
          const posGanadora = vectorSolucion[j];
          //Comparar si el valor del jugador actual coincide con el valor del vector de tiradas para la posición ganadora
          if (vectorTiradas[posGanadora] == turnoJugador) {
            //Incrementar la variable que confirma que el jugador actual coincide con la posición ganadora
            coincidencias++;
          }
        }
        //Si existen 3 coincidencias el jugador ha conseguido un tres en raya
        if (coincidencias == 3) {
          ganador = turnoJugador;
          elementoGanador.innerHTML = `El Ganador es el Jugador: ${ganador}`;
          //(EXTRA) - Modificar el fondo de los elementos en tres en raya "versión compacta"
          for (let j = 0; j < vectorSolucion.length; j++) {
            document.querySelectorAll("td")[
              vectorSolucion[j]
            ].style.background = "rgba(255,255,255,0.5)";
          }
          return;
        }
        //Devolver el acumulador de coincidencias a su estado inicial para volver a comprobar de nuevo en la siguiente iteración.
        coincidencias = 0;
      }
      //Cambiar el turno del jugador al finalizar las comprobaciones
      if (turnoJugador == 1) {
        turnoJugador = 2;
      } else {
        turnoJugador = 1;
      }
    }
  }
}
