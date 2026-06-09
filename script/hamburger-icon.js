console.log('Hamburger cargado');

(function() {
    const MAIN_OBJ = {
        init: function() {
            this.eventhandlers();
        },

        eventhandlers: function() {
            document.querySelector(".hamburger-icon").addEventListener("click", function() {
                document.querySelector(".menu-derecha").classList.toggle("menu-derecha-open");
            });
        }
    };

    MAIN_OBJ.init();
})();