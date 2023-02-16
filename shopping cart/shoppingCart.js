import items from "./items.json";
import addGlobalEventListener from "./utils/addGolbalEventListener";
import priceFormatter from "./utils/priceFormatter.js";

const cartButton = document.querySelector('[data-cart-button]');
const shoppingCart = document.querySelector('[data-shopping-cart]');
const cartItemsWrapper = document.querySelector('[data-cart-items-wrapper]');
const cartTemplate = document.querySelector('[data-cart-items]');
const cartTotal = document.querySelector('[data-cart-total]');
const IMAGE_URL = "https://dummyimage.com/210x130";
let cartItemsList = [];

export default function setupShoppingCart() {
    //click to show or hide cart items
    cartButton.addEventListener('click', (e) => {
        shoppingCart.classList.toggle('invisible')
    });
    removeFromCart();
}

export function addToCart(id) {
    //checking if that item is already in the cart
    const existingElement = cartItemsList.find(entry => entry.id === id);
    if (existingElement) {
        existingElement.quantity++;
    } else {
        cartItemsList.push({ id: id, quantity: 1});
    }
    //renders the cart items according to the cartItemsList array
    renderCartItems();
}

function removeFromCart() {
    addGlobalEventListener('click', '[data-remove-from-cart-btn]', e => {
        const id = parseInt(e.target.closest('[data-cart-item-id]').dataset.cartItemId);
        cartItemsList = cartItemsList.filter(entry => entry.id !== id);
        renderCartItems();
    })
}

function renderCartItems() {
    hideShowCart();
    let totalPrice = 0;
    cartItemsWrapper.innerHTML = "";
    cartItemsList.forEach(entry => {
        const jsonItem = items.find( item => {
            return item.id === entry.id;
        });
        const cartItem = cartTemplate.content.cloneNode(true);
        const cartItemObject = cartItem.querySelector('[data-cart-item-id]');
        cartItemObject.dataset.cartItemId = jsonItem.id;
        const cartItemName = cartItem.querySelector('[data-cart-item-name]');
        cartItemName.innerHTML = jsonItem.name;
        const cartItemQuantity = cartItem.querySelector('[data-cart-item-quantity]');
        cartItemQuantity.innerHTML = `x${entry.quantity}`;
        const cartItemPrice = cartItem.querySelector('[data-cart-item-price]');
        cartItemPrice.innerHTML = priceFormatter(jsonItem.priceCents * entry.quantity);
        totalPrice += jsonItem.priceCents * entry.quantity;
        const cartItemImage = cartItem.querySelector('[data-cart-item-img]');
        cartItemImage.src = `${IMAGE_URL}/${jsonItem.imageColor}/${jsonItem.imageColor}`;
        cartItemsWrapper.appendChild(cartItem);
    })
    cartTotal.innerHTML = priceFormatter(totalPrice);
}

function hideShowCart() {
    if (cartItemsList.length ===  0) {
        shoppingCart.classList.add('invisible');
    }
    else {
        shoppingCart.classList.remove('invisible');
    }
}

//stick to every page