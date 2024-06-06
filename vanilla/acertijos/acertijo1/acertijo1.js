const cartas = document.querySelectorAll(".carta");

let matched = 0;
let cartaOne, cartaTwo;
let disableDeck = false;
var solucionado = false;

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
                solucionado=true;
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