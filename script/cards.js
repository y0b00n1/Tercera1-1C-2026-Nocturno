console.log('Cards cargado correctamente');

const dataCards = [
{
  "title": "Canales en Vivo 24/7",
  "url_image": "https://images.unsplash.com/photo-1593784991095-a205069470b6",
  "desc": "Disfruta de cientos de canales nacionales e internacionales con transmisión estable y de alta calidad.",
  "cta": "Ver más",
  "link": "FLUJO_TV.php"
},
{
  "title": "Películas On Demand",
  "url_image": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
  "desc": "Accede a un amplio catálogo de películas actualizadas para disfrutar cuando quieras.",
  "cta": "Ver más",
  "link": "FLUJO_TV.php"
},
{
  "title": "Series Actualizadas",
  "url_image": "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85",
  "desc": "Las mejores series en un solo lugar con temporadas completas y estrenos constantes.",
  "cta": "Ver más",
  "link": "FLUJO_TV.php"
},
{
  "title": "Eventos Deportivos",
  "url_image": "https://images.unsplash.com/photo-1547347298-4074fc3086f0",
  "desc": "Fútbol, UFC, NBA, Fórmula 1 y mucho más en vivo desde cualquier dispositivo.",
  "cta": "Ver más",
  "link": "FLUJO_TV.php"
},
{
  "title": "Compatible con Todos tus Dispositivos",
  "url_image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "desc": "Disfruta Flujo TV en Smart TV, Android TV, TV Box, celular, tablet y computadora.",
  "cta": "Ver más",
  "link": "FLUJO_TV.php"
},
{
  "title": "Calidad HD y Full HD",
  "url_image": "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
  "desc": "Experimenta una imagen nítida y sonido de alta calidad para una mejor experiencia.",
  "cta": "Ver más",
  "link": "FLUJO_TV.php"
}
];

(function () {
  const contenedor = document.querySelector('.cards-list');
  if (!contenedor) return;

  dataCards.forEach(function (item, index) {
    contenedor.insertAdjacentHTML('beforeend', `<div class='cards-item' id="card-number-${index}">
      <img src="${item.url_image}" alt="${item.title}"/>
      <div class="cards-info">
        <p class='cards-title'>${item.title}</p>
        <p class='cards-desc'>${item.desc}</p>
        <div class="boton-cta">
          <a class='cards-cta' href="${item.link}">${item.cta}</a>
        </div>
      </div>
    </div>`);
  });
})();
