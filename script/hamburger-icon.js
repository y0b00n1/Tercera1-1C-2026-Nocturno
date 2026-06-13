(function() {
    const icono = document.querySelector('.hamburger-icon');
    const menu = document.querySelector('.menu-derecha');
    const mediaMovil = window.matchMedia('(max-width: 768px)');

    if (!icono || !menu) return;

    function esMovil() {
        return mediaMovil.matches;
    }

    function cerrarMenu() {
        menu.classList.remove('menu-derecha-open');
        icono.classList.remove('activo');
        icono.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-bloqueado');
    }

    function abrirCerrarMenu(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (!esMovil()) {
            cerrarMenu();
            return;
        }

        const abierto = !menu.classList.contains('menu-derecha-open');
        menu.classList.toggle('menu-derecha-open', abierto);
        icono.classList.toggle('activo', abierto);
        icono.setAttribute('aria-expanded', abierto ? 'true' : 'false');
        document.body.classList.toggle('menu-bloqueado', abierto);
    }

    function recalcularMenu() {
        // Cierra al cambiar tamaño/orientación para que no quede fuera de parámetros.
        cerrarMenu();

        // Fuerza al navegador a recalcular medidas inmediatamente.
        menu.style.transition = 'none';
        menu.offsetHeight;
        menu.style.transition = '';
    }

    icono.setAttribute('role', 'button');
    icono.setAttribute('aria-label', 'Abrir menú');
    icono.setAttribute('aria-expanded', 'false');
    icono.setAttribute('tabindex', '0');

    icono.addEventListener('click', abrirCerrarMenu);

    icono.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            abrirCerrarMenu(event);
        }
    });

    menu.addEventListener('click', function(event) {
        if (event.target === menu) {
            cerrarMenu();
        }
    });

    menu.querySelectorAll('a').forEach(function(link) {
        const actual = window.location.pathname.split('/').pop() || 'index.php';
        const destino = (link.getAttribute('href') || '').split('/').pop();

        if (destino === actual) {
            link.classList.add('menu-activo');
        }

        link.addEventListener('touchstart', function() {
            menu.querySelectorAll('a').forEach(function(a) { a.classList.remove('menu-activo'); });
            link.classList.add('menu-activo');
        }, { passive:true });

        link.addEventListener('click', cerrarMenu);
    });

    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !icono.contains(event.target)) {
            cerrarMenu();
        }
    });

    let resizeTimer;
    function reajustarSuave() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(recalcularMenu, 60);
    }

    window.addEventListener('resize', reajustarSuave, { passive:true });
    window.addEventListener('orientationchange', recalcularMenu, { passive:true });
    window.addEventListener('pageshow', recalcularMenu, { passive:true });

    if (mediaMovil.addEventListener) {
        mediaMovil.addEventListener('change', recalcularMenu);
    } else if (mediaMovil.addListener) {
        mediaMovil.addListener(recalcularMenu);
    }

    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', reajustarSuave, { passive:true });
    }

    recalcularMenu();
})();
