import items from "./items.json";
import priceFormatter from "./utils/priceFormatter.js";
import addGlobalEventListener from "./utils/addGolbalEventListener.js";
import { addToCart } from "./shoppingCart";

const itemsContainer = document.querySelector('[data-items-container]');    //container where items will be added
const storeItemTemplate = document.querySelector("[data-store-item-template]");     //getting template from html
const IMAGE_LINK = "https://dummyimage.com/420x260";


//main function which will setup the store
export default function setupStore() {
    //populating items from json file
    if (storeItemTemplate == null) return;
    itemsContainer.innerHTML = "";
    items.forEach(renderItems);
    //addtocart functionality
    addGlobalEventListener('click', '[data-addtocart-btn]', e => {
        const id = e.target.closest('[data-item-id]').dataset.itemId;
        addToCart(parseInt(id));
    })
}

//this is responsible for actually creating items from json file and rendering them to html
function renderItems(item) {
    const storeItem = storeItemTemplate.content.cloneNode(true);        //cloning templates for individual items
    const itemWrapper = storeItem.querySelector('[data-item-id]');
    itemWrapper.dataset.itemId = item.id;
    const itemName = storeItem.querySelector('[data-item-name]');
    itemName.innerHTML = item.name;
    const itemCategory = storeItem.querySelector('[data-item-category]');
    itemCategory.innerHTML = item.category;
    const itemPrice = storeItem.querySelector('[data-item-price]');
    itemPrice.innerHTML = priceFormatter(item.priceCents);
    const itemImg = storeItem.querySelector('[data-item-img]');
    itemImg.src=`${IMAGE_LINK}/${item.imageColor}/${item.imageColor}`;
    itemsContainer.appendChild(storeItem);
}