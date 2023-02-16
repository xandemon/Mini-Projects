import items from "./items.json";
import priceFormatter from "./utils/priceFormatter.js";

const itemsContainer = document.querySelector('[data-items-container]');    //container where items will be added
const storeItemTemplate = document.querySelector("[data-store-item-template]");     //getting template from html
const IMAGE_LINK = "https://dummyimage.com/420x260";

//main function which will setup the store
export default function setupStore() {
    if (storeItemTemplate == null) return;
    console.log("This is running.");
    itemsContainer.innerHTML = "";
    items.forEach(renderItems);
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