/* в этот файл добавляет скрипты*/
/* global ymaps */
const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', () => {
  if (navMain.classList.contains('main-nav--close')) {
    navMain.classList.remove('main-nav--close');
    navMain.classList.add('main-nav--open');
  } else {
    navMain.classList.add('main-nav--close');
    navMain.classList.remove('main-nav--open');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  ymaps.ready(() => {
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      return;
    }

    mapElement.style.height = '362px';

    function setMapHeight() {
      const width = window.innerWidth;
      if (width >= 320 && width < 768) {
        mapElement.style.height = '362px';
      } else if (width >= 768) {
        mapElement.style.height = '400px';
      }
    }

    setMapHeight();
    window.addEventListener('resize', setMapHeight);

    const correctCoords = [59.938679, 30.323044];
    let mapCenter = correctCoords;

    if (window.innerWidth >= 1024) {
      mapCenter = [59.938679, 30.315044];
    }

    let iconImageHref = '/images/map-pin.png';
    let iconImageSize = [57, 53];
    let iconImageOffset = [-28, -53];

    if (window.innerWidth >= 768) {
      iconImageHref = '/images/map-pin-tablet.png';
      iconImageSize = [113, 106];
      iconImageOffset = [-56, -106];
    }

    const myMap = new ymaps.Map('map', {
      center: mapCenter,
      zoom: 16,
      controls: []
    });

    const myPlacemark = new ymaps.Placemark(correctCoords, {}, {
      iconLayout: 'default#image',
      iconImageHref: iconImageHref,
      iconImageSize: iconImageSize,
      iconImageOffset: iconImageOffset,
    });

    myMap.geoObjects.add(myPlacemark);

    window.addEventListener('resize', () => {
      myMap.container.fitToViewport();
    });
  });
});

const sliderForm = document.querySelector('.slider__container');

if (sliderForm) {
  const sliderButton = document.querySelector('.slider__button');
  const sliderBefore = document.querySelector('.slider__before');
  const sliderAfter = document.querySelector('.slider__after');


  sliderButton.ondragstart = function() {
    return false;
  };

  sliderButton.onmousedown = function(e) {
    e.preventDefault();
    const shiftX = e.clientX - sliderButton.getBoundingClientRect().left;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
      let newLeft = event.clientX - shiftX - sliderForm.getBoundingClientRect().left + 20;
      if (newLeft < 0) {
        newLeft = 0;
      }

      const rightEdge = sliderForm.offsetWidth - sliderButton.offsetWidth + 40;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      sliderButton.style.left = `${newLeft}px`;
      sliderBefore.style.clipPath = `inset(0 ${sliderForm.offsetWidth - newLeft}px 0 0)`;
      sliderAfter.style.clipPath = `inset(0 0 0 ${newLeft}px)`;
    }

    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
  };

  window.addEventListener('resize', () => {
    sliderButton.style.left = '50%';
    sliderBefore.style.clipPath = 'inset(0 50% 0 0)';
    sliderAfter.style.clipPath = 'inset(0 0 0 50%)';
  });
}
