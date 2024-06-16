/* CONSTANTES DEL JUEGO */
const BLOCK_SPRITE_SIZE = 18;
const BLOCK_SIZE = 18;
const BLOCK_COLUMN = 14;
const BLOCK_ROW = 30;
const BLOCK_NEXT_SIZE = 5;

const $bloques = document.querySelector("#bloques");
const $score = document.getElementById("score");

// Elementos táctiles de la pantalla
const $startgame = document.getElementById("start_game");
const $pausegame = document.getElementById("pause_game");
const $gameover = document.getElementById("game_over");

// const $key_left = document.querySelector(".key.left");
// const $key_right = document.querySelector(".key.right");
// const $key_up = document.querySelector(".key.up");
// const $key_down = document.querySelector(".key.down");
// const $key_fast_drop = document.querySelector(".key.fast_drop");
// const $key_pause = document.querySelector(".key.pause");

// Configuración de los canvas
const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

canvas.width = BLOCK_COLUMN * BLOCK_SIZE;
canvas.height = BLOCK_ROW * BLOCK_SIZE;
context.scale(BLOCK_SIZE, BLOCK_SIZE);

const canvas_next = document.getElementById("pieza_next");
const context_next = canvas_next.getContext("2d");

canvas_next.width = BLOCK_NEXT_SIZE * BLOCK_SIZE;
canvas_next.height = BLOCK_NEXT_SIZE * BLOCK_SIZE;
context_next.scale(BLOCK_SIZE, BLOCK_SIZE);

// Diferentes piezas posibles
const pieza_vacia = {
  posicion: { x: null, y: null },
  forma: null,
  width: null,
  height: null,
};

const FORMA_PIEZAS = {
  J: [
    [0, "J"],
    [0, "J"],
    ["J", "J"],
  ],
  T: [
    ["T", "T", "T"],
    [0, "T", 0],
  ],
  Z: [
    ["Z", "Z", 0],
    [0, "Z", "Z"],
  ],
  S: [
    [0, "S", "S"],
    ["S", "S", 0],
  ],
  O: [
    ["O", "O"],
    ["O", "O"],
  ],
  I: [["I", "I", "I", "I"]],
  L: [
    ["L", 0],
    ["L", 0],
    ["L", "L"],
  ],
};

///////////////////////////////////////////////////////////////////////////////////////////////////


/* VARIABLES DEL JUEGO */
let x = 0;
let y = 0;

let puntuacion = 15;
let game_active = false;
let dy = 0;

let pieza = pieza_vacia;
let pieza_sombra = pieza_vacia;
let pieza_next = pieza_vacia;
let bolsa_piezas = [];

let board = crearBoard(BLOCK_ROW, BLOCK_COLUMN);
let board_prev = crearBoard(BLOCK_NEXT_SIZE, BLOCK_NEXT_SIZE);

// Velocidad del juego
let time_step = 500;
let dropCounter = 0;
let lastTime = 0;

/* FUNCIONES DEL JUEGO */

// Creamos el tablero
function crearBoard(width, height) {
  return Array(width)
    .fill()
    .map(() => Array(height).fill(0));
}

// Llenamos el pool de piezas
function llenarBolsaPiezas() {
  let piezas = Object.keys(FORMA_PIEZAS);
  piezas.sort(() => Math.random() - 0.5);
  return piezas;
}

// Creamos la pieza nueva: en el canvas #tetris o en canvas_next
function crearPiezaNueva(tipo_pieza, next) {
  const forma_pieza = next ? FORMA_PIEZAS[tipo_pieza] : FORMA_PIEZAS[bolsa_piezas.pop()];

  if (!bolsa_piezas.length) bolsa_piezas = llenarBolsaPiezas();

  if (!next) {
    x = Math.floor(Math.random() * (BLOCK_COLUMN - forma_pieza[0].length + 1));
    y = 0;
  }

  let pieza_nueva = {
    posicion: {
      x: next ? 0 : x,
      y: next ? 0 : y,
    },
    forma: forma_pieza,
    width: forma_pieza[0].length,
    height: forma_pieza.length,
  };

  return pieza_nueva;
}

// Limpiamos el tablero
function cleanCanvas() {
  // Limpiamos todo el Canvas
  context.clearRect(0, 0, BLOCK_COLUMN, BLOCK_ROW);
  // Limpiamos todo el Canvas
  context_next.clearRect(0, 0, BLOCK_NEXT_SIZE, BLOCK_NEXT_SIZE);
}

// Dibujamos el tablero y las piezas
function draw() {
  // Pintamos todo el tablero
  board.forEach((row, board_y) =>
    row.forEach((value, board_x) => {
      pintarBoard(value, board_x, board_y, context);
    })
  );

  // Pintamos todo el tablero
  board_prev.forEach((row, board_y) =>
    row.forEach((col, board_x) => {
      pintarBoard(col, board_x, board_y, context_next);
    })
  );

  if (game_active) {
    dy = 0;
    while (!comprobarColision(0, dy)) dy++;
    pieza_sombra = pieza;
    dy--;
    // Pintamos la sombra de la pieza en movimiento
    pieza_sombra.forma?.forEach((row, pieza_y) =>
      row.forEach((value, pieza_x) => {
        if (value != 0)
          pintarBoard(value, pieza_x + x, pieza_y + y + dy, context, true);
      })
    );
  }

  // Pintamos la pieza en movimiento
  pieza.forma?.forEach((row, pieza_y) =>
    row.forEach((value, pieza_x) => {
      if (value != 0) pintarBoard(value, pieza_x + x, pieza_y + y, context);
    })
  );

  // Pintamos la pieza siguiente
  pieza_next.forma?.forEach((row, pieza_y) =>
    row.forEach((value, pieza_x) => {
      if (value != 0)
        pintarBoard(
          value,
          pieza_x + BLOCK_NEXT_SIZE / 2 - pieza_next.width / 2,
          pieza_y + BLOCK_NEXT_SIZE / 2 - pieza_next.height / 2,
          context_next
        );
    })
  );
}

// Comenzar la partida
function startGame() {
  game_active = true;
  puntuacion = 15;
  $score.innerHTML = puntuacion;
  bolsa_piezas = llenarBolsaPiezas();
  pieza = crearPiezaNueva();
  pieza_next = crearPiezaNueva(bolsa_piezas[bolsa_piezas.length - 1], true);
  board = crearBoard(BLOCK_ROW, BLOCK_COLUMN);
  loop_game();
  $startgame.hidden = true;
  $gameover.hidden = true;
}

// Pausar la partida
function pauseGame() {
  game_active = !game_active;
  loop_game();
  $pausegame.hidden = !$pausegame.hidden;
}

// Comprobamos la colisión con los bordes y las piezas
function comprobarColision(dx, dy) {
  return pieza.forma.find((row, pieza_y) => {
    return row.find((value, pieza_x) => {
      return value != 0 && board[y + pieza_y + dy]?.[x + pieza_x + dx] != 0;
    });
  });
}

// Rotamos la pieza si no colisiona.
function rotarPieza() {
  let forma_nueva = [];
  let forma_original = pieza.forma;
  let dx = 0;

  for (let i = 0; i < pieza.width; i++) {
    let row_new = [];
    for (let j = pieza.height - 1; j >= 0; j--) {
      row_new.push(pieza.forma[j][i]);
    }
    forma_nueva.push(row_new);
  }

  pieza.forma = forma_nueva;

  dx = forma_nueva[0].length - forma_original[0].length;

  if (comprobarColision(0, 0))
    if (!comprobarColision(-dx, 0)) x -= dx;
    else pieza.forma = forma_original;

  pieza.width = pieza.forma[0].length;
  pieza.height = pieza.forma.length;
}

// Lleva la pieza al fondo (sombra de la pieza) y la solidifica
function llevarAlFondo() {
  while (!comprobarColision(0, +1)) y++;
  solidificarPieza();
}

// Solidificamos la imagen y comprobamos el estado del juego
function solidificarPieza(letra) {
  // Comprobamos si el juego se ha finalizado
  if (y == 0) {
    game_active = false;
    $gameover.hidden = false;
  } else {
    // Fijamos la pieza en el board
    pieza.forma.forEach((row, pieza_y) =>
      row.forEach((value, pieza_x) => {
        if (value != 0) board[y + pieza_y][x + pieza_x] = value;
      })
    );

    // Recorremos todo el tablero y eliminamos las filas completas
    board.forEach((row, index) => {
      if (row.find((element) => element == 0) == undefined) {
        board.splice(index, 1);
        board.unshift(Array(BLOCK_COLUMN).fill(0));
        puntuacion--;
        $score.innerHTML = puntuacion;

        time_step = time_step * 0.9;

        if (puntuacion == 0) {
          puntuacion = 0;
          $score.innerHTML = puntuacion;
          lanzarConfetti(10);
          setTimeout(() => {
            window.alert("¡Felicidades, has conseguido el Cristal!");
            window.location.href = '/creditos';
            sessionStorage.setItem('tetrisCompleted', 'true');
          }, 1000);
        }
      }
    });

    // Creamos una nueva pieza
    pieza = crearPiezaNueva(letra);
    pieza_next = crearPiezaNueva(bolsa_piezas[bolsa_piezas.length - 1], true);
  }
}

// Pintamos un bloque del juego
function pintarBloque(color, pieza_x, pieza_y, ctx) {
  try {
    ctx.drawImage(
      $bloques,
      color * BLOCK_SPRITE_SIZE,
      0,
      BLOCK_SPRITE_SIZE,
      BLOCK_SPRITE_SIZE,
      pieza_x,
      pieza_y,
      1,
      1
    );
  } catch (error) {
    //console.error(error.message);
  }
}

// Pintamos el tablero
function pintarBoard(key, board_x, board_y, ctx, sombra) {
  let color = 0;
  switch (key) {
    case 0: // Black
      color = -1;
      ctx.fillStyle = "black";
      break;
    case "J": // Blue
      color = 0;
      ctx.fillStyle = "blue";
      break;
    case "T": // Purple
      color = 1;
      ctx.fillStyle = "purple";
      break;
    case "Z": // Red
      color = 2;
      ctx.fillStyle = "red";
      break;
    case "S": // Lime
      color = 3;
      ctx.fillStyle = "lime";
      break;
    case "O": // Yellow
      color = 4;
      ctx.fillStyle = "yellow";
      break;
    case "I": // White
      color = 5;
      ctx.fillStyle = "white";
      break;
    case "L": // Orange
      color = 6;
      ctx.fillStyle = "orange";
      break;
    default: // Default
      color = -2;
      ctx.fillStyle = "gray";
      break;
  }

  ctx.fillRect(board_x, board_y, 1, 1);

  // Pintamos los bloques
  if (color >= 0 && !sombra) pintarBloque(color, board_x, board_y, ctx);
}

// Caida de la pieza
function dropPieza(time, speed) {
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;

  if (dropCounter > speed) {
    dropCounter = 0;
    if (!comprobarColision(0, +1)) y++;
    else solidificarPieza();
  }
}

// Lanzamos confeti de manera aleatoria
function lanzarConfetti(num_confetti) {
  for (let i = 0; i < num_confetti; i++)
    confetti({
      particleCount: 200,
      startVelocity: 40,
      spread: 360,
      origin: { x: Math.random(), y: Math.random() - 0.2 },
    });
}

// Esperamos que presione algún botón o haga click en la pantalla
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
    case "A":
    case "a":
      if (!comprobarColision(-1, 0)) x--;
      break;
    case "ArrowRight":
    case "D":
    case "d":
      if (!comprobarColision(+1, 0)) x++;
      break;
    case "ArrowUp":
    case "W":
    case "w":
      rotarPieza();
      break;
    case "ArrowDown":
    case "S":
    case "s":
      if (!comprobarColision(0, +1)) y++;
      else solidificarPieza();
      break;
    case " ":
      llevarAlFondo();
      break;
    case "Enter":
      if (game_active || !$pausegame.hidden) pauseGame();
      break;
    default:
      break;
  }
});

$startgame.addEventListener("click", () => startGame());
$pausegame.addEventListener("click", () => pauseGame());
$gameover.addEventListener("click", () => startGame());
// $win.addEventListener("click", () => lanzarConfetti(5));

// $key_left.addEventListener("click", () =>
//   !comprobarColision(-1, 0) ? x-- : null
// );

// $key_right.addEventListener("click", () =>
//   !comprobarColision(+1, 0) ? x++ : null
// );

// $key_down.addEventListener("click", () =>
//   !comprobarColision(0, +1) ? y++ : solidificarPieza()
// );

// $key_fast_drop.addEventListener("click", () => llevarAlFondo());
// $key_up.addEventListener("click", () => rotarPieza());
// $key_pause.addEventListener("click", () => pauseGame());

// Actualizamos el LOOP del juego
function loop_game(time = 0) {
  dropPieza(time, time_step);
  cleanCanvas();
  draw();
  if (game_active) requestAnimationFrame(loop_game);
}

loop_game();

//Mostrar instrucciones

function pista() {
  document.getElementById('alert-box').style.display = 'flex';
  document.getElementById('alert-box').style.flexDirection = 'column';
  document.getElementById('alert-box').style.alignItems = 'center';
  document.getElementById('alert-box').style.justifyContent = 'center';

  const dialog = document.querySelector('dialog');
  const alertBox = document.getElementById('alert-box');
  const dialogRect = dialog.getBoundingClientRect();
  const alertWidth = alertBox.offsetWidth;
  const alertHeight = alertBox.offsetHeight;

  alertBox.style.position = 'absolute';
  alertBox.style.top = `${(dialogRect.height - alertHeight) / 2}px`;
  alertBox.style.left = `${(dialogRect.width - alertWidth) / 2}px`;
}

function hideAlert() {
  document.getElementById('alert-box').style.display = 'none';
}
