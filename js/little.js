function displayProduct(product,containerName) {
  const container = document.getElementById(containerName);
  const main = document.getElementById('main')
  main.innerHTML = ''
  main.appendChild(container)
  container.innerHTML = `
   <div class='container'>
        <section id="item" class="item">
                <img src="${product.image}" alt="" class="item-img">
                <div class="item-right">
                    <h2 class="item-title">${product.name}</h2>
                    <h2 class="item-size">${product.size}</h2>
                    <span class="best-item__id ffr">ID:${product.id}</span> 
                    <h3 class="item-subtitle">Описание</h3>
                    <p class="item-about">Откройте для себя уникальную красоту ручной работы — плетеную корзинку из бумажной лозы, созданную с любовью бабушкой. Легкая, прочная и экологичная, она идеально подойдет для хранения фруктов, овощей или как стильный декор. Добавьте уют и тепло в ваш дом с этой уникальной корзинкой!</p>
                    <span class="item-price">₽ ${product.price},00</span>
                    <a href="form-done.html" class="item-order">Заказать</a>
                    <a href="catalog.html" class="item-back">В каталог</a>
                </div>
            </section>
  </div>
  `;
  
  
}

// Функция для отображения списка товаров
function displayProductList(products,containerName) {
  const container = document.getElementById(containerName);
  let html = `
  <ul class="best-list">`;
  products.forEach(p => {
    html += `<li class="best-item"><a class="best-link" href="?product=${p.id}">
                <img src="${p.image}" alt="" class="best-img">
                                <h3 class="best-item__title ffr">${p.name}</h3>
                                <div class="best-item__bottom">
                                    <span class="best-item__price ffr">₽ ${p.price},00</span>   
                                    <span class="best-item__id ffr">ID:${p.id}</span>   
                                </div>
        </a></li>`;
  });
  html += '</ul>';
  container.innerHTML = html;
}


fetch('db/littleProducts.json')
    .then(response => response.json())
    .then(products => {
      // Получаем параметр из URL
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('product');
      if (productId) {
        // Ищем товар по ID
        const product = products.find(p => p.id === productId);
        if (product) {
          displayProduct(product,'product-container__little');
        } else {
          document.getElementById('product-container__little').innerHTML = '<p>Товар не найден.</p>';
        }
      } else {
        // Если параметр не указан, показываем список товаров
        displayProductList(products,'product-container__little');
      }
})
//     .catch(error => {
//       console.error('Ошибка загрузки данных:', error);
//       document.getElementById('product-container').innerHTML = '<p>Ошибка загрузки данных.</p>';
// });