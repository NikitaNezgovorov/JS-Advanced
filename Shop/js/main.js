const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров
        this.allProducts = [];//массив объектов
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }

    // _fetchProducts() {
    //     this.goods = [
    //         {id: 1, title: 'Notebook', price: 2000},
    //         {id: 2, title: 'Mouse', price: 20},
    //         {id: 3, title: 'Keyboard', price: 200},
    //         {id: 4, title: 'Gamepad', price: 50},
    //     ];
    // }


    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });

    }

    calcSum() {
        //reduce используется для последовательной обработки каждого элемента массива с сохранением промежуточного результата.
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }


    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="">
                <div class="desc">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>
        </div>`
    }
}

let list = new ProductList();

class Basket {
    constructor(container = '.cart-block') {
        this.container = container;
        this.goods = [];//массив товаров

        this._clickBasket();
        this._getBasketItem()
            .then(data => { //data - объект js
                this.goods = [...data.contents];
                this.render()
            });
    }

    _getBasketItem() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new BasketItem();

            block.insertAdjacentHTML('beforeend', productObj.render(product));
        }

    }

    _clickBasket() {
        document.querySelector(".btn-cart").addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
    }
}


class BasketItem {
    render(product) {
        return `<div class="cart-item" data-id="${product.id_product}">
                <div class="product-bio">
                <img src="${product.img}" alt="Some image">
                <div class="product-desc">
                <p class="product-title">${product.product_name}</p>
                <p class="product-quantity">Quantity: ${product.quantity}</p>
            <p class="product-single-price">$${product.price} each</p>
            </div>
            </div>
            <div class="right-block">
                <p class="product-price">$${product.quantity * product.price}</p>
                <button class="del-btn" data-id="${product.id_product}">&times;</button>
            </div>
            </div>`
    }
}

let bask = new Basket();
// 'use strict';
// const products = [
//     {id: 1, title: 'Notebook', price: 2000},
//     {id: 2, title: 'Mouse', price: 20},
//     {id: 3, title: 'Keyboard', price: 200},
//     {id: 4, title: 'Gamepad', price: 50},
// ];
// //Функция для формирования верстки каждого товара
// //Добавить в выводе изображение
// const renderProduct = (item, img = 'https://picsum.photos/200') => {
//     return `<div class="product-item">
//                 <img class="" src="${img}" alt="image">
//                 <h3>${item.title}</h3>
//                 <p class="price">${item.price}</p>
//                 <button class="buy-button">Купить</button>
//             </div>`
// };
// const renderPage = list => {
//     document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(item=>renderProduct(item, item.img)).join(''));
//
// };
//
// renderPage(products);