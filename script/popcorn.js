(function(){
    let activo = false;
    let yaSeMostro = false;
    let flujoMostrado = false;

    function crearCapa(claseExtra){
        const clase = claseExtra || 'popcorn-layer';
        let capa = document.querySelector('.' + clase);
        if(!capa){
            capa = document.createElement('div');
            capa.className = clase;
            capa.setAttribute('aria-hidden', 'true');
            document.body.appendChild(capa);
        }
        return capa;
    }

    function rutaImagen(){
        return './img/palomita.png';
    }

    function lanzarPalomitas(cantidad = 130){
        if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if(activo || yaSeMostro) return;

        activo = true;
        yaSeMostro = true;

        const capa = crearCapa('popcorn-layer');
        const ancho = window.innerWidth || document.documentElement.clientWidth;
        const columnas = Math.max(18, Math.min(32, Math.round(ancho / 70)));
        const filas = Math.ceil(cantidad / columnas);
        const separacion = ancho / columnas;

        for(let i = 0; i < cantidad; i++){
            const pieza = document.createElement('img');
            pieza.className = 'popcorn-piece';
            pieza.src = rutaImagen();
            pieza.alt = '';
            pieza.draggable = false;

            const columna = i % columnas;
            const fila = Math.floor(i / columnas);
            const base = columna * separacion + separacion * 0.5;
            const jitter = (Math.random() - 0.5) * (separacion * 0.55);
            const izquierda = Math.max(5, Math.min(ancho - 60, base + jitter));

            // Salen bastante juntas, pero escalonadas para que se vean separadas y no como una línea.
            const retraso = fila * 170 + Math.random() * 120;
            const tiempo = 5200 + Math.random() * 2600;
            const movimiento = (Math.random() * 240 - 120).toFixed(0) + 'px';
            const rotacion = (Math.random() * 760 - 380).toFixed(0) + 'deg';
            const tamano = (44 + Math.random() * 42).toFixed(0) + 'px';
            const inicio = (-160 - Math.random() * 130).toFixed(0) + 'px';

            pieza.style.left = izquierda + 'px';
            pieza.style.width = tamano;
            pieza.style.animationDelay = retraso + 'ms';
            pieza.style.setProperty('--duracion', tiempo + 'ms');
            pieza.style.setProperty('--movimiento', movimiento);
            pieza.style.setProperty('--rotacion', rotacion);
            pieza.style.setProperty('--inicio', inicio);

            capa.appendChild(pieza);
            setTimeout(() => pieza.remove(), retraso + tiempo + 600);
        }

        setTimeout(() => {
            activo = false;
            if(capa && !capa.children.length) capa.remove();
        }, 13000);
    }

    function lanzarPalomitasFlujo(cantidad = 14){
        if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if(flujoMostrado) return;
        flujoMostrado = true;

        const capa = crearCapa('popcorn-float-layer');
        const ancho = window.innerWidth || document.documentElement.clientWidth;
        const alto = window.innerHeight || document.documentElement.clientHeight;

        for(let i = 0; i < cantidad; i++){
            const pieza = document.createElement('img');
            pieza.className = 'popcorn-float-piece';
            pieza.src = rutaImagen();
            pieza.alt = '';
            pieza.draggable = false;

            const izquierda = 40 + Math.random() * Math.max(80, ancho - 120);
            const arriba = 95 + Math.random() * Math.max(180, alto * 0.55);
            const tamano = (34 + Math.random() * 30).toFixed(0) + 'px';
            const duracion = 6500 + Math.random() * 3500;
            const retraso = Math.random() * 900;
            const floteX = (Math.random() * 70 - 35).toFixed(0) + 'px';
            const floteY = (-28 - Math.random() * 52).toFixed(0) + 'px';
            const rotacion = (Math.random() * 80 - 40).toFixed(0) + 'deg';

            pieza.style.left = izquierda + 'px';
            pieza.style.top = arriba + 'px';
            pieza.style.width = tamano;
            pieza.style.animationDelay = retraso + 'ms';
            pieza.style.setProperty('--duracion-flujo', duracion + 'ms');
            pieza.style.setProperty('--flote-x', floteX);
            pieza.style.setProperty('--flote-y', floteY);
            pieza.style.setProperty('--rotacion-flujo', rotacion);

            capa.appendChild(pieza);
            setTimeout(() => pieza.remove(), retraso + duracion + 800);
        }

        setTimeout(() => {
            if(capa && !capa.children.length) capa.remove();
        }, 12000);
    }

    window.lanzarPalomitas = lanzarPalomitas;
    window.lanzarPalomitasFlujo = lanzarPalomitasFlujo;

    window.addEventListener('preloader:terminado', function(){
        lanzarPalomitas(130);
    }, { once:true });

    document.addEventListener('DOMContentLoaded', function(){
        const archivo = (location.pathname || '').toLowerCase();
        if(archivo.indexOf('flujo_tv') !== -1 || archivo.indexOf('contacto') !== -1){
            setTimeout(() => lanzarPalomitasFlujo(14), 250);
        }
    });
})();
