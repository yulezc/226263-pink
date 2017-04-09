var navMain = document.querySelector(".main-nav");
var navToggle = document.querySelector(".main-nav__btn");

navMain.classList.remove("main-nav--nojs");

navToggle.addEventListener("click", function() {
  if (navMain.classList.contains("main-nav--closed")) {
    navMain.classList.remove("main-nav--closed");
    navMain.classList.add("main-nav--opened");
  } else {
    navMain.classList.add("main-nav--closed");
    navMain.classList.remove("main-nav--opened");
  }
});

ymaps.ready(function () {
  var myMap = new ymaps.Map("map", {
          center: [59.9389231, 30.323055],
          zoom: 15
      }, {
          searchControlProvider: "yandex#search"
      }),
      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: "Собственный значок метки",
          balloonContent: "метка Pink"
      }, {

          iconLayout: "default#image",

          iconImageHref: "img/icon-map-marker.svg",

          iconImageSize: [36, 36],

          iconImageOffset: [-5, -38]
      });

  myMap.geoObjects.add(myPlacemark);
});
