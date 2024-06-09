const cartas = document.querySelectorAll(".carta");

let matched = 0;
let cartaOne, cartaTwo;
let disableDeck = false;

// function abrirVentanaCentrada() {
//     // Tamaño de la ventana y centrarla
//     var width = 500;
//     var height = 500;
//     var left = (screen.width / 2) - (width / 2);
//     var top = (screen.height / 2) - (height / 2);

//     // Características de la ventana
//     var features = "width=" + width + ",height=" + height + ",top=" + top + ",left=" + left + ",resizable=no";

//     // Abrir la ventana centrada
//     window.open("acertijo1.html", "popupWindow", features);
// }

// // Ejecutar la función cuando la ventana se cargue
// window.onload = abrirVentanaCentrada;


function flipCarta({ target: clickedCarta }) {
    if (cartaOne !== clickedCarta && !disableDeck) {
        clickedCarta.classList.add("flip");
        if (!cartaOne) {
            return cartaOne = clickedCarta;
        }
        cartaTwo = clickedCarta;
        disableDeck = true;
        let cartaOneImg = cartaOne.querySelector(".back-vista img").src,
            cartaTwoImg = cartaTwo.querySelector(".back-vista img").src;
        matchCartas(cartaOneImg, cartaTwoImg);
    }
}

function matchCartas(img1, img2) {
    if (img1 === img2) {
        matched++;
        if (matched == 8) {
            setTimeout(() => {
                window.alert("¡Felicidades, lo has conseguido!");
                window.location.href = 'N:/2º DAW/Proyecto/Pokemon/Cristales_Durmientes/index.html';
                sessionStorage.setItem('puzzle1Completed', 'true');

            }, 1000);
        }
        cartaOne.removeEventListener("click", flipCarta);
        cartaTwo.removeEventListener("click", flipCarta);
        cartaOne = cartaTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cartaOne.classList.add("shake");
        cartaTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cartaOne.classList.remove("shake", "flip");
        cartaTwo.classList.remove("shake", "flip");
        cartaOne = cartaTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCarta() {
    matched = 0;
    disableDeck = false;
    cartaOne = cartaTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cartas.forEach((carta, i) => {
        carta.classList.remove("flip");
        let imgTag = carta.querySelector(".back-vista img");
        imgTag.src = `imagenes1/img-${arr[i]}.png`;
        carta.addEventListener("click", flipCarta);
    });
}

shuffleCarta();

cartas.forEach(carta => {
    carta.addEventListener("click", flipCarta);
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