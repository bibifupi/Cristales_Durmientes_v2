const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

//Creación de una submatriz para las colisiones
const collisionMap = []
for (let i = 0; i < collisions.length; i+= 70){
    collisionMap.push(collisions.slice(i, 70 + i))
}

    //PUZZLES Colisiones

const puzzleZonesMap1 = []
for (let i = 0; i < puzzleZonesData1.length; i+= 70){
    puzzleZonesMap1.push(puzzleZonesData1.slice(i, 70 + i))
}
const puzzleZonesMap2 = []
for (let i = 0; i < puzzleZonesData2.length; i+= 70){
    puzzleZonesMap2.push(puzzleZonesData2.slice(i, 70 + i))
}
const puzzleZonesMap3 = [];
for (let i = 0; i < puzzleZonesData3.length; i += 70){
    puzzleZonesMap3.push(puzzleZonesData3.slice(i, 70 + i));
}
const tetrisZonesMap = []
for (let i = 0; i < tetrisZonesData.length; i+= 70){
    tetrisZonesMap.push(tetrisZonesData.slice(i, 70 + i))
}

const boundaries = []
const offset = {
    x: -900,
    y: -580
}

collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025){
            boundaries.push (
                new Boundary ({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
})

const puzzleZones1 = []
puzzleZonesMap1.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025){
            puzzleZones1.push (
                new Boundary ({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
})
const puzzleZones2 = []
puzzleZonesMap2.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025){
            puzzleZones2.push (
                new Boundary ({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
})
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



//importar la imagen de nuestro mapa
const image = new Image()
image.src = './img/Pellet_Town.png'

const foregroundImage = new Image()                                      
foregroundImage.src = './img/foregroundObjects.png'


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
        x: canvas.width /3 - 192 /4 /2.5, 
        y: canvas.height /1.7 - 68 /2,
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage
    }


})


const background = new Sprite( {
    position: {
        x: offset.x, 
        y: offset.y
    },
    image: image
}) 

 const foreground = new Sprite( {             
    position: {
        x: offset.x, 
        y: offset.y 
    },
    image: foregroundImage
}) 


//Variables de control
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}


const movables =[background, ...boundaries, foreground, ...puzzleZones1, ...puzzleZones2, ...puzzleZones3, ...tetrisZones]

function rectangularCollision({rectangle1, rectangle2}){
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x 
        && rectangle1.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.position.y <= rectangle2.position.y + rectangle2.height 
        && rectangle1.position.y + rectangle2.height >= rectangle2.position.y
    )
}


const puzzle1 = { initiated: false}
const puzzle2 = { initiated: false }
const puzzle3 = { initiated: false }
const tetris = { initiated: false }


//CONTROL DEL PERSONAJE
function animate() {
    const animationId = window.requestAnimationFrame(animate); 
    background.draw();
    boundaries.forEach((boundary) => {
        boundary.draw();
    });

    puzzleZones1.forEach((puzzleZone1) => {
        puzzleZone1.draw();
    });

    puzzleZones2.forEach((puzzleZone2) => {
        puzzleZone2.draw();
    });
    
    puzzleZones3.forEach((puzzleZone3) => {
        puzzleZone3.draw();
    });

    tetrisZones.forEach((tetrisZones) => {
        tetrisZones.draw();
    });
    

    player.draw();
    foreground.draw();  

    let moving = true;
    player.moving = false;

    //ENTRAR A LOS ACERTIJOS
    if (puzzle1.initiated) return;
    if (puzzle2.initiated) return;
    if (puzzle3.initiated) return;
    if (tetris.initiated) return;
    
    
    //ACERTIJO 1
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
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
                console.log('Puzzle Zone 1');

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

    //ACERTIJO 2
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
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
                console.log('Puzzle Zone 2');

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

    //ACERTIJO 3
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
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
                console.log('Puzzle Zone 3');

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

    //TETRIS
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
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

                // Inicializar Tetris
                window.cancelAnimationFrame(animationId);
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
                break;
            }
        }
    }



    //MOVIMIENTO DEL PERSONAJE
    if (keys.w.pressed && lastKey === 'w'){
        player.moving = true
        player.image = player.sprites.up
        //COLISIóN CON LOS OBJETOS
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
              rectangularCollision({
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
            
    } else if (keys.a.pressed && lastKey === 'a'){
        player.moving = true
        player.image = player.sprites.left
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
              rectangularCollision({
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
            
    } else if (keys.s.pressed && lastKey === 's'){
        player.moving = true
        player.image = player.sprites.down
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
              rectangularCollision({
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
           
    } else if (keys.d.pressed && lastKey === 'd'){
        player.moving = true
        player.image = player.sprites.right
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
              rectangularCollision({
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

//PUZZLE1
function animatePuzzle1() {
    window.requestAnimationFrame(animatePuzzle1);
    window.location.href = 'acertijos/acertijo1/acertijo1.html';
    /* Si consigue pasarlo, no puede volver a jugar */
}

//PUZZLE2
function animatePuzzle2() {
    window.requestAnimationFrame(animatePuzzle2);
    window.location.href = 'acertijos/acertijo2/acertijo2.html';
}

//PUZZLE3
function animatePuzzle3() {
    window.requestAnimationFrame(animatePuzzle3);
    window.location.href = 'acertijos/acertijo3/acertijo3.html';
}

//TETRIS
function animateTetris() {
    window.requestAnimationFrame(animateTetris);
    //window.location.href = 'acertijos/acertijo3/acertijo3.html';
}




//Espera de las teclas pulsadas
let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
    
})


