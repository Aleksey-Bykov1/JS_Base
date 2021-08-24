'use strict';

/*
Потратил два дня на решение задания самостоятельно, но не смог.
Еще день потратил на решение на основе уже готового примера из ДЗ.
Отсматривал дополнительно все моменты что не понятны, поменял некоторые элементы для
отслеживания нюансов.
Теперь стало гораздо понятнее, уже можно и самостоятельно сделать.

Вам большое спасибо за курс!
 */

let btn = document.querySelectorAll('button[data-product]');
const openBasketBtn = document.querySelector('.cartIconWrap');
const basketEL = document.querySelector('.basket');
const basketCounterEl = document.querySelector('.cartIconWrap span');
const basketTotalEl = document.querySelector('.basketTotal');
const basketTotalValueEL = document.querySelector('.basketTotal');

openBasketBtn.addEventListener('click', function () {
  basketEL.classList.toggle('hidden');
});


btn.forEach(function (add) {
  add.addEventListener('click', function (event) {
    let product = event.currentTarget.getAttribute('data-product');
    addProductIntoBasket(product);
  });
})

let basket = {};

function  addProductToObject(product) {
  if (!(product in basket)) {
    basket[product] = 1;
  } else {
    basket[product]++;
  }
}

function renderProductInBasket(product) {
  let productExist = document.querySelector(`.productCount[data-product="${product}"]`);
  if (productExist) {
    increaseProductCount(product);
    recalculateSumForProduct(product);
  } else {
    renderNewProductInBasket(product);
  }
}

function renderNewProductInBasket(product) {
  let productRow = `
        <div class="basketRow">
            <div>${products[product].name}</div>
            <div>
                <span class="productCount" data-product="${product}">1</span> шт.
            </div>
            <div>$${products[product].price}</div>
            <div>
                $<span class="productTotalRow" data-product="${product}">${products[product].price}</span>
            </div>
        </div>
    `;
  basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}

function increaseProductCount(product) {
    const productCountEl = document.querySelector(`.productCount[data-product="${product}"]`);
    productCountEl.textContent++;
}

function calculateAndRenderTotalBasketSum() {
    let totalSum = 0;
    for (let product in basket) {
      totalSum += basket[product] * products[product].price;
    }
    basketTotalValueEL.textContent = totalSum.toFixed(2);
}

function increaseProductsCount() {
    basketCounterEl.textContent++;
}

function addProductIntoBasket(product) {
    increaseProductsCount();
    addProductToObject(product);
    renderProductInBasket(product);
    calculateAndRenderTotalBasketSum();
}


