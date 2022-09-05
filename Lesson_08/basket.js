'use strict';

/*С функциями счетчиков не понял ничего в видео (т.к. мы этого не проходили). 
Поэтому для упрощения убрал функции getTotalBasketCount и getTotalBasketPrice и 
просто считаю кол-во добавлений + общую цену в функции addToCart*/

let counterOfAddedItems = 0;
let finalPrice = 0;

const basketCount = document.querySelector('.cartIconWrap span');
const basketWindow = document.querySelector('.basket');
const basketTotalItems = document.querySelector('.basketTotal');
const basketFinalPriceAmount = document.querySelector('.basketTotalValue');

document.querySelector('.cartIconWrap').addEventListener('click', () => {
    basketWindow.classList.toggle('hidden');
});

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.closest('.addToCart')) {
        return;
    }
    const featuredItemEl = event.target.closest('.featuredItem');
    const id = +featuredItemEl.dataset.id;
    const name = featuredItemEl.dataset.name;
    const price = +featuredItemEl.dataset.price;
    addToCart(id, name, price);
});

function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = { id: id, name: name, price: price, count: 0 };
    }
    basket[id].count++;
    counterOfAddedItems++;
    basketCount.textContent = counterOfAddedItems.toString();
    finalPrice += price;
    basketFinalPriceAmount.textContent = finalPrice.toFixed(2);
    renderProductInBasket(id);
}


function renderProductInBasket(productId) {
    const basketRowEl = basketWindow
        .querySelector(`.basketRow[data-id="${productId}"]`);
    if (!basketRowEl) {
        renderNewProductInBasket(productId);
        return;
    }
    const product = basket[productId];
    basketRowEl.querySelector('.productCount').textContent = product.count;
    basketRowEl
        .querySelector('.productTotalRow')
        .textContent = (product.price * product.count).toFixed(2);
}

function renderNewProductInBasket(productId) {
    const productRow = `
      <div class="basketRow" data-id="${productId}">
        <div>${basket[productId].name}</div>
        <div>
          <span class="productCount">${basket[productId].count}</span> шт.
        </div>
        <div>$${basket[productId].price}</div>
        <div>
          $<span class="productTotalRow">${(basket[productId]
            .price * basket[productId].count).toFixed(2)}</span>
        </div>
      </div>
      `;
    basketTotalItems.insertAdjacentHTML("beforebegin", productRow);
}