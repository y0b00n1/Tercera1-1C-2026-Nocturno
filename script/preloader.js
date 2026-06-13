// PRELOADER SOLO PARA LA PÁGINA DE INICIO
const body = document.body;
const loader = document.getElementById("loader");
const contador = document.getElementById("countdown");
const contenido = document.getElementById("contenido");

// Si no estamos en inicio, no hace nada y deja la página visible.
if (!body.classList.contains("con-preloader") || !loader || !contador || !contenido) {
    if (contenido) {
        contenido.style.display = "block";
    }
} else {
    let numero = 3;
    contador.textContent = numero;

    const cerrarPreloader = () => {
        contenido.style.display = "block";
        loader.classList.add("ocultar");

        window.dispatchEvent(new Event("preloader:terminado"));

        setTimeout(() => {
            loader.remove();
        }, 800);
    };

    const intervalo = setInterval(() => {
        numero--;
        contador.textContent = numero;

        // Anima solo el 3 y el 2. El 1 queda fijo para que no parpadee.
        if (numero > 1) {
            contador.style.animation = "none";
            contador.offsetHeight;
            contador.style.animation = "cine 1s ease";
        }

        if (numero === 1) {
            clearInterval(intervalo);
            contador.style.animation = "none";

            // Muestra el 1 una sola vez y luego entra a la página.
            setTimeout(cerrarPreloader, 700);
        }
    }, 1000);
}
