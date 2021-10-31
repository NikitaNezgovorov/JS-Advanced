class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchProducts();
        this.render();//вывод товаров на страницу
    }

    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render())
        }
    }

    getSum() {
        //reduce используется для последовательной обработки каждого элемента массива с сохранением промежуточного результата.
        let res = this.allProducts.reduce((s, item) => s + item.price, 0);
        alert(res);
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }

    render() {
        return `<div class="product-item">
                <img src="${this.img}" alt="">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

let list = new ProductList();

// class Basket {
//     addGoods() {
//
//     }
//     removeGoods() {
//
//     }
//     changeGoods() {
//
//     }
//
//     render(){
//
//     }
// }
//
// class ElemBasket {
//     render(){}
// }

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