// Declaración de variables globales
let numeroSecreto = 0; // Almacena el número secreto generado aleatoriamente
let intentos = 0; // Contador de intentos del usuario
let listaNumerosSorteados = []; // Lista para almacenar los números secretos ya sorteados
let numeroMaximo = 10; // Número máximo hasta el cual se puede generar el número secreto (exclusivo)

// Función para asignar texto a un elemento HTML
function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
}

// Función para verificar el intento del usuario
function verificarIntento() {
  let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value); // Obtener el número ingresado por el usuario como entero
 
  // Verificar si los intentos del usuario no han alcanzado el límite máximo (4 intentos)
  if (intentos < 4) {
    // Si el usuario adivinó el número secreto
    if (numeroDeUsuario === numeroSecreto) {
      asignarTextoElemento(
        "p",
        "Acertaste el numero en " +
          intentos +
          (intentos === 1 ? " vez." : " veces.")
      );
      // Habilitar el botón para reiniciar el juego
      document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
      // Si el número ingresado por el usuario es menor que el número secreto
      if (numeroDeUsuario < numeroSecreto) {
        asignarTextoElemento("p", `El numero Secreto es Mayor, llevas: ${intentos} ${intentos == 1 ? 'intento.' : 'intentos.'}`);
      } else {
        // Si el número ingresado por el usuario es mayor que el número secreto
        asignarTextoElemento("p", `El numero Secreto es Menor, llevas: ${intentos} ${intentos == 1 ? 'intento.' : 'intentos.'}`);
      }
      intentos++; // Incrementar el contador de intentos
      limpiarCaja(); // Limpiar el campo de entrada del usuario
    }
  } else {
    // Si el usuario alcanzó el límite de intentos
    asignarTextoElemento("p",'Llegaste al limite de Intentos.');
  }
}

// Función para limpiar el campo de entrada del usuario
function limpiarCaja() {
  document.querySelector("#valorUsuario").value = "";
}

// Función para establecer las condiciones iniciales del juego
function condicionesIniciales() {
  asignarTextoElemento("h1", "Juego del Numero Secreto"); // Establecer el título del juego
  asignarTextoElemento("p", `Indica un numero del 1 al ${numeroMaximo}`); // Indicar el rango de números posibles
  numeroSecreto = generarNumeroSecreto(); // Generar un nuevo número secreto
  intentos = 1; // Inicializar el contador de intentos
}

// Función para reiniciar el juego
function reiniciarJuego() {
  limpiarCaja(); // Limpiar el campo de entrada del usuario
  condicionesIniciales(); // Restablecer las condiciones iniciales del juego
  document.getElementById("reiniciar").setAttribute("disabled", "true"); // Deshabilitar el botón de reiniciar juego
}

// Función para generar un número secreto aleatorio
function generarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1; // Generar un número aleatorio entre 1 y numeroMaximo (exclusivo)

  // Verificar si el número generado ya ha sido sorteado
  if (listaNumerosSorteados.length == numeroMaximo) {
    asignarTextoElemento("p", `Ya se sortearon todos los numeros posibles.`);
  } else {
    // Si el número generado está en la lista de números sorteados, generar otro número
    if (listaNumerosSorteados.includes(numeroGenerado)) {
      return generarNumeroSecreto();
    } else {
      listaNumerosSorteados.push(numeroGenerado); // Agregar el número generado a la lista de números sorteados
      return numeroGenerado; // Devolver el número generado como número secreto
    }
  }
}

condicionesIniciales(); // Llamar a la función condicionesIniciales para iniciar el juego







