const preloadImages = () => {
  // массив с путями к изображениям, которые нужно предзагрузить
  const imagesPath = [
    './img/box-1.png',
    './img/box-2.png',
    './img/box-3.png',
    './img/box-4.png',
    './img/box-5.png',
    './img/box-6.png',
    './img/box-7.png',
    './img/box-8.png',
    './img/box-9.png',
  ];

  // функция для предзагрузки изображений
  const preloadImg = () => {
    for (let i = 0; i < imagesPath.length; i++) {
      const img = new Image();
      img.src = imagesPath[i];
    }
  }

  // Вызывается функция предзагрузки изображений после загрузки страницы
  window.onload = preloadImg;
}

export default preloadImages