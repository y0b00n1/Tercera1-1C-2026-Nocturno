(function () {
    const precios = [
        { tv: '1 TV', precio: '₡1.500' },
        { tv: '2 TV', precio: '₡2.500' },
        { tv: '3 TV', precio: '₡3.500' }
    ];

    const informacion = [
        {
            titulo: 'Antes de instalar',
            texto: 'Verifica que tu internet esté estable y que el dispositivo tenga espacio disponible para instalar la app.'
        },
        {
            titulo: 'Activación del servicio',
            texto: 'Después de instalar, contacta por WhatsApp para activar tu usuario y revisar el plan correcto.'
        },
        {
            titulo: 'Soporte y recomendaciones',
            texto: 'Si un canal no abre, reinicia la app, limpia caché o cambia la fuente del canal antes de reportarlo.'
        }
    ];

    function crearBurbujaPrecios() {
        if (document.querySelector('.burbuja-precios')) return;

        const burbuja = document.createElement('div');
        burbuja.className = 'burbuja-precios';
        burbuja.innerHTML = `
            <button class="burbuja-precios-btn" type="button" aria-label="Ver precios" aria-expanded="false">
                <span>₡</span>
                <strong>Precios</strong>
            </button>
            <div class="burbuja-precios-panel" aria-hidden="true">
                <div class="burbuja-precios-titulo">Planes Flujo TV</div>
                ${precios.map(item => `
                    <div class="precio-fila">
                        <span>${item.tv}</span>
                        <strong>${item.precio}</strong>
                    </div>
                `).join('')}
            </div>
        `;

        document.body.appendChild(burbuja);

        const boton = burbuja.querySelector('.burbuja-precios-btn');
        const panel = burbuja.querySelector('.burbuja-precios-panel');

        function cerrar() {
            burbuja.classList.remove('activa');
            boton.setAttribute('aria-expanded', 'false');
            panel.setAttribute('aria-hidden', 'true');
        }

        boton.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            document.querySelector('.burbuja-info')?.classList.remove('activa');
            const activa = burbuja.classList.toggle('activa');
            boton.setAttribute('aria-expanded', activa ? 'true' : 'false');
            panel.setAttribute('aria-hidden', activa ? 'false' : 'true');
        });

        document.addEventListener('click', function (event) {
            if (!burbuja.contains(event.target)) cerrar();
        });

        window.addEventListener('resize', cerrar, { passive: true });
        window.addEventListener('orientationchange', cerrar, { passive: true });
    }

    function crearBurbujaInfo() {
        if (document.querySelector('.burbuja-info')) return;

        const burbuja = document.createElement('div');
        burbuja.className = 'burbuja-info';
        burbuja.innerHTML = `
            <button class="burbuja-info-btn" type="button" aria-label="Ver información importante" aria-expanded="false">
                <span>i</span>
                <strong>Info</strong>
            </button>
            <div class="burbuja-info-panel" aria-hidden="true">
                <div class="burbuja-info-titulo">Información importante</div>
                <div class="info-acordeon">
                    ${informacion.map((item, index) => `
                        <div class="info-item">
                            <button class="info-pregunta" type="button" aria-expanded="false">
                                <span>${item.titulo}</span>
                                <b>+</b>
                            </button>
                            <div class="info-respuesta" aria-hidden="true">
                                <p>${item.texto}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        document.body.appendChild(burbuja);

        const boton = burbuja.querySelector('.burbuja-info-btn');
        const panel = burbuja.querySelector('.burbuja-info-panel');
        const preguntas = burbuja.querySelectorAll('.info-pregunta');

        function cerrar() {
            burbuja.classList.remove('activa');
            boton.setAttribute('aria-expanded', 'false');
            panel.setAttribute('aria-hidden', 'true');
        }

        boton.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            document.querySelector('.burbuja-precios')?.classList.remove('activa');
            const activa = burbuja.classList.toggle('activa');
            boton.setAttribute('aria-expanded', activa ? 'true' : 'false');
            panel.setAttribute('aria-hidden', activa ? 'false' : 'true');
        });

        preguntas.forEach(function (pregunta) {
            pregunta.addEventListener('click', function (event) {
                event.stopPropagation();
                const item = pregunta.closest('.info-item');
                const respuesta = item.querySelector('.info-respuesta');
                const icono = pregunta.querySelector('b');
                const abierta = item.classList.toggle('abierta');

                pregunta.setAttribute('aria-expanded', abierta ? 'true' : 'false');
                respuesta.setAttribute('aria-hidden', abierta ? 'false' : 'true');
                icono.textContent = abierta ? '−' : '+';
            });
        });

        document.addEventListener('click', function (event) {
            if (!burbuja.contains(event.target)) cerrar();
        });

        window.addEventListener('resize', cerrar, { passive: true });
        window.addEventListener('orientationchange', cerrar, { passive: true });
    }

    function iniciarBurbujas() {
        crearBurbujaPrecios();
        crearBurbujaInfo();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciarBurbujas);
    } else {
        iniciarBurbujas();
    }
})();
