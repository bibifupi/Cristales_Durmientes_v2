const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

/*  COLISIONES */
/*  Colisiones elementos del Mapa */

const boundaries = []
const offset = {
    //x: -900, y: -580
    x: -570, y: -300

}

const collisionMap = []
for (let i = 0; i < collisions.length; i += 70) {
    collisionMap.push(collisions.slice(i, 70 + i))
}
collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
})


/*  Colisiones zonas de Acertijos */
const puzzleZonesMap1 = []
for (let i = 0; i < puzzleZonesData1.length; i += 70) {
    puzzleZonesMap1.push(puzzleZonesData1.slice(i, 70 + i))
}
const puzzleZones1 = []
puzzleZonesMap1.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            puzzleZones1.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
})
const puzzleZonesMap2 = []
for (let i = 0; i < puzzleZonesData2.length; i += 70) {
    puzzleZonesMap2.push(puzzleZonesData2.slice(i, 70 + i))
}
const puzzleZones2 = []
puzzleZonesMap2.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            puzzleZones2.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
})
const puzzleZonesMap3 = [];
for (let i = 0; i < puzzleZonesData3.length; i += 70) {
    puzzleZonesMap3.push(puzzleZonesData3.slice(i, 70 + i));
}
const puzzleZones3 = [];
puzzleZonesMap3.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            puzzleZones3.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            );
        }
    });
});
const tetrisZonesMap = []
for (let i = 0; i < tetrisZonesData.length; i += 70) {
    tetrisZonesMap.push(tetrisZonesData.slice(i, 70 + i))
}
const tetrisZones = [];
tetrisZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            tetrisZones.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            );
        }
    });
});

/*  FUNCIÓN DE COLISIÓN */
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x
        && rectangle1.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.position.y <= rectangle2.position.y + rectangle2.height
        && rectangle1.position.y + rectangle2.height >= rectangle2.position.y
    )
}

/*  IMAGENES  */
/*  Mapa */
const image = new Image()
image.src = './img/Pellet_Town.png'
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})
const foregroundImage = new Image()
foregroundImage.src = './img/foregroundObjects.png'
const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
})

/*  Personaje */
const playerDownImage = new Image()
playerDownImage.src = "./img/playerDown.png"
const playerUpImage = new Image()
playerUpImage.src = "./img/playerUp.png"
const playerLeftImage = new Image()
playerLeftImage.src = "./img/playerLeft.png"
const playerRightImage = new Image()
playerRightImage.src = "./img/playerRight.png"

const player = new Sprite({
    position: {
        //x: canvas.width /3 - 192 /4 /2.5,  y: canvas.height /1.7 - 68 /2,
        x: canvas.width / 3 - 192 / 4 / 2.5, y: canvas.height / 1.6 - 68 / 2,
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage,
    }


})


/*  Variables control Personaje */
const movables = [background, ...boundaries, foreground, ...puzzleZones1, ...puzzleZones2, ...puzzleZones3, ...tetrisZones]
const keys = {
    ArrowUp: { pressed: false },
    ArrowLeft: { pressed: false },
    ArrowDown: { pressed: false },
    ArrowRight: { pressed: false }
}
const $superado1 = document.getElementById('superado1');
const $superado2 = document.getElementById('superado2');
const $superado3 = document.getElementById('superado3');

const puzzle1Completado = checkPuzzle1Status();
const puzzle2Completado = checkPuzzle2Status();
const puzzle3Completado = checkPuzzle3Status();

const puzzle1 = { initiated: false }
function checkPuzzle1Status() {
    return sessionStorage.getItem('puzzle1Completed') === 'true';
}
const puzzle2 = { initiated: false }
function checkPuzzle2Status() {
    return sessionStorage.getItem('puzzle2Completed') === 'true';
}
const puzzle3 = { initiated: false }
function checkPuzzle3Status() {
    return sessionStorage.getItem('puzzle3Completed') === 'true';
}
const tetris = { initiated: false }
function checkTetriStatus() {
    return sessionStorage.getItem('tetrisCompleted') === 'true';
}

// function checkPuzzle3Status() {
//     return sessionStorage.getItem('acertijo3Completo') === 'true';
// }

/*  ANIMACIONES */
function animate() {

    /* Capas del Mapa y Personaje */
    const animationId = window.requestAnimationFrame(animate);
    background.draw();
    player.draw();
    foreground.draw();
    boundaries.forEach((boundary) => {
        boundary.draw();
    });
    let moving = true;
    player.moving = false;


    if(puzzle1Completado)$superado1.hidden=false;
    if(puzzle2Completado)$superado2.hidden=false;
    if(puzzle3Completado)$superado3.hidden=false;

    /*  Animación de Acertijos */
    /*  ACERTIJO 1 */
    puzzleZones1.forEach((puzzleZone1) => {
        puzzleZone1.draw();
    });

    if (puzzle1.initiated) return;

    if (keys.ArrowUp.pressed || keys.ArrowLeft.pressed || keys.ArrowDown.pressed || keys.ArrowRight.pressed) {
        for (let i = 0; i < puzzleZones1.length; i++) {
            const puzzleZone1 = puzzleZones1[i];
            const overlappingArea =
                (Math.min(player.position.x + player.width, puzzleZone1.position.x + puzzleZone1.width) -
                    Math.max(player.position.x, puzzleZone1.position.x)) *
                (Math.min(player.position.y + player.height, puzzleZone1.position.y + puzzleZone1.height) -
                    Math.max(player.position.y, puzzleZone1.position.y));

            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: puzzleZone1
                })
                && overlappingArea > (player.width * player.height) / 2 && Math.random() < 0.01
            ) {
                //Comprobar si ya se ha realizado el acertijo
                if (checkPuzzle1Status()) {
                    alert("Ya superaste la prueba");
                    return;
                }

                // Inicializar acertijo1
                window.cancelAnimationFrame(animationId);
                puzzle1.initiated = true;
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete() {
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            duration: 0.4,
                            onComplete() {
                                animatePuzzle1();
                            }
                        });
                    }
                });
                break;
            }
        }
    }

    /*  ACERIJO 2 */
    puzzleZones2.forEach((puzzleZone2) => {
        puzzleZone2.draw();
    });

    if (puzzle2.initiated) return;

    if (keys.ArrowUp.pressed || keys.ArrowLeft.pressed || keys.ArrowDown.pressed || keys.ArrowRight.pressed) {
        for (let i = 0; i < puzzleZones2.length; i++) {
            const puzzleZone2 = puzzleZones2[i];
            const overlappingArea2 =
                (Math.min(player.position.x + player.width, puzzleZone2.position.x + puzzleZone2.width) -
                    Math.max(player.position.x, puzzleZone2.position.x)) *
                (Math.min(player.position.y + player.height, puzzleZone2.position.y + puzzleZone2.height) -
                    Math.max(player.position.y, puzzleZone2.position.y));

            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: puzzleZone2
                })
                && overlappingArea2 > (player.width * player.height) / 2 && Math.random() < 0.01
            ) {
                //Comprobar si ya se ha realizado el acertijo
                if (checkPuzzle2Status()) {
                    alert("Ya superaste la prueba");
                    return;
                }

                // Inicializar acertijo2
                window.cancelAnimationFrame(animationId);
                puzzle2.initiated = true;
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete() {
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            duration: 0.4,
                            onComplete() {
                                animatePuzzle2();
                            }
                        });
                    }
                });
                break;
            }
        }
    }

    /*  ACERTIJO 3 */
    puzzleZones3.forEach((puzzleZone3) => {
        puzzleZone3.draw();
    });

    if (puzzle3.initiated) return;

    if (keys.ArrowUp.pressed || keys.ArrowLeft.pressed || keys.ArrowDown.pressed || keys.ArrowRight.pressed) {
        for (let i = 0; i < puzzleZones3.length; i++) {
            const puzzleZone3 = puzzleZones3[i];
            const overlappingArea3 =
                (Math.min(player.position.x + player.width, puzzleZone3.position.x + puzzleZone3.width) -
                    Math.max(player.position.x, puzzleZone3.position.x)) *
                (Math.min(player.position.y + player.height, puzzleZone3.position.y + puzzleZone3.height) -
                    Math.max(player.position.y, puzzleZone3.position.y));

            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: puzzleZone3
                })
                && overlappingArea3 > (player.width * player.height) / 2 && Math.random() < 0.01
            ) {

                //Comprobar si ya se ha realizado el acertijo
                if (checkPuzzle3Status()) {
                    alert("Ya superaste la prueba");
                    return;
                }

                // Inicializar acertijo3
                window.cancelAnimationFrame(animationId);
                puzzle3.initiated = true;
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete() {
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            duration: 0.4,
                            onComplete() {
                                animatePuzzle3();
                            }
                        });
                    }
                });
                break;
            }
        }
    }

    /*  TETRIS */
    tetrisZones.forEach((tetrisZone) => {
        tetrisZone.draw();
    });

    if (tetris.initiated) return;

    if (keys.ArrowUp.pressed || keys.ArrowLeft.pressed || keys.ArrowDown.pressed || keys.ArrowRight.pressed) {
        for (let i = 0; i < tetrisZones.length; i++) {
            const tetrisZone = tetrisZones[i];
            const overlappingAreaTetris =
                (Math.min(player.position.x + player.width, tetrisZone.position.x + tetrisZone.width) -
                    Math.max(player.position.x, tetrisZone.position.x)) *
                (Math.min(player.position.y + player.height, tetrisZone.position.y + tetrisZone.height) -
                    Math.max(player.position.y, tetrisZone.position.y));

            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: tetrisZone
                })
                && overlappingAreaTetris > (player.width * player.height) / 2 && Math.random() < 0.01
            ) {
                console.log('Tetris');
                alert("Debes demostrar antes tu intelecto");


                // Inicializar Tetris
                /* window.cancelAnimationFrame(animationId);
                tetris.initiated = true;
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete() {
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            duration: 0.4,
                            onComplete() {
                                animateTetris();
                            }
                        });
                    }
                });
                break; */
            }
        }
    }


    /* Animación del Personaje */
    /* Arriba */
    if (keys.ArrowUp.pressed && lastKey === 'ArrowUp') {
        player.moving = true
        player.image = player.sprites.up
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }
                }
            })
            ) {
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach((movable) => {
                movable.position.y += 3
            })
        /* Izquierda */
    } else if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') {
        player.moving = true
        player.image = player.sprites.left
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }
                }
            })
            ) {
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach((movable) => {
                movable.position.x += 3
            })
        /* Abajo */
    } else if (keys.ArrowDown.pressed && lastKey === 'ArrowDown') {
        player.moving = true
        player.image = player.sprites.down
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }
                }
            })
            ) {
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach((movable) => {
                movable.position.y -= 3
            })
        /* Derecha */
    } else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') {
        player.moving = true
        player.image = player.sprites.right
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }
                }
            })
            ) {
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach((movable) => {
                movable.position.x -= 3
            })
    }
}
animate()

/*  FUNCIONES AL ENTRAR A ZONAS DE ACERTIJOS */
function animatePuzzle1() {
    window.requestAnimationFrame(animatePuzzle1);
    window.location.href = 'acertijos/acertijo1/acertijo1.html';
}
function animatePuzzle2() {
    window.requestAnimationFrame(animatePuzzle2);
    window.location.href = 'acertijos/acertijo2/acertijo2.html';
}
function animatePuzzle3() {

    window.requestAnimationFrame(animatePuzzle3);
    window.location.href = 'acertijos/acertijo3/acertijo3.html';

}
function animateTetris() {
    window.requestAnimationFrame(animateTetris);
    //window.location.href = 'ubicacion_tetris';
}

/* TECLAS DE ACCIÓN-MOVIMIENTO */
let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp': keys.ArrowUp.pressed = true;
            lastKey = 'ArrowUp';
            break;
        case 'ArrowLeft': keys.ArrowLeft.pressed = true;
            lastKey = 'ArrowLeft';
            break;
        case 'ArrowDown': keys.ArrowDown.pressed = true;
            lastKey = 'ArrowDown';
            break;
        case 'ArrowRight': keys.ArrowRight.pressed = true;
            lastKey = 'ArrowRight';
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowUp': keys.ArrowUp.pressed = false;
            break;
        case 'ArrowLeft': keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowDown': keys.ArrowDown.pressed = false;
            break;
        case 'ArrowRight': keys.ArrowRight.pressed = false;
            break;
    }
});

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


