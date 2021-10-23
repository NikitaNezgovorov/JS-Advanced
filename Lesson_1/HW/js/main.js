'use strict';
const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (item, img = 'https://picsum.photos/200') => {
    return `<div class="product-item">
                <img class="" src="${img}" alt="image">
                <h3>${item.title}</h3>
                <p class="price">${item.price}</p>
                <button class="buy-button">Купить</button>
            </div>`
};
const renderPage = list => {
    document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(item=>renderProduct(item, item.img)).join(''));

};

renderPage(products);