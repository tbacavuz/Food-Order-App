import { menuArray } from "./data.js";
const paymentForm = document.getElementById("payment-form");
const paymentModal =  document.getElementById("modal") 
let cart = [];

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddClick(+e.target.dataset.add)
    }
    if(e.target.dataset.remove){
        handleRemoveClick(+e.target.dataset.remove)
    }
    if(e.target.dataset.order){
        paymentModal.classList.remove("hidden")
    }
})

function handleAddClick(itemId){
        const targetItemId = menuArray.find(function(item){
        return item.id === itemId;
    }).id
    cart.push(targetItemId)
    renderCart()
}

// FIND INDEX AND REMOVE THE ELEMENT
function handleRemoveClick(itemId){
    const index = cart.indexOf(itemId);
    cart.splice(index,1);    
    renderCart()
}

function getMenuHtml(){
    let menuHtml = ``;

    menuArray.forEach(function(item){
        menuHtml += `   <!-- MENU ITEM -->
                        <div class="item-container">
                            <p class="icon">${item.emoji}</p>
                            <div class="item">
                                <div class="item-details">
                                    <div>
                                        <p class="item-name">${item.name}</p>
                                    </div>
                                    <div>
                                        <p class="ingredients">${item.ingredients}</p>
                                    </div>
                                    <div>
                                        <p class="price">$${item.price}</p>
                                    </div>
                                </div>
                                <div>
                                    <button class="add-btn" data-add=${item.id}>+</button>
                                </div>
                            </div>
                        </div>`;
    })
    return menuHtml;
}

// IF CART IS EMPTY RETURN EMPTY ELSE POPULATE
function getCartHtml(){
    if(!cart.length) return ``;

    let cartHtml = `<p>Your Order</p>`;

    cart.forEach(function(cartitem){
        cartHtml += `<!-- CART ELEMENT -->
                    <div class="cart-element">
                        <div class="element-name">
                        <span>${menuArray[cartitem].name}</span>
                        <button class="remove-btn" data-remove=${cartitem}>remove</button>
                        </div>
                        <p>$${menuArray[cartitem].price}</p>
                    </div>`
    })

    cartHtml += `<div class="total-display">
                     <p class="inline">Total Price:</p>
                     <p class="inline">$${getTotal()}</p>
                </div>                
                <button class="confirm-btn" data-order=1>
                    Complete Order
                </button>`

    return cartHtml;
}

function getSuccessHtml(name){
    console.log(name);
    let successHtml = `<div class="success">
                            <p>Thanks, ${name}! Your order is on its way!</p>
                        </div>`
    return successHtml;
}

document.addEventListener('submit',function(e){
    e.preventDefault();
    const paymentFormData = new FormData(paymentForm);
    const userName = paymentFormData.get("name");
    renderSuccess(userName)
})
function getTotal(){
    let total = 0;
    cart.forEach(function(cartItem){
        total += menuArray[cartItem].price;
    })
    return total;
}

function reset(){
    cart = [];
    renderCart();
    paymentForm.reset();
    paymentModal.classList.add("hidden");
}

function renderMenu(){
    document.getElementById('menu').innerHTML = getMenuHtml()
}

function renderCart(){
    document.getElementById('success-container').classList.add("hidden")
    const targetContainer = document.getElementById('cart-container')
    targetContainer.innerHTML = getCartHtml()
}

function renderSuccess(name){
    const targetContainer = document.getElementById('success-container')
    reset()
    targetContainer.innerHTML = getSuccessHtml(name);
    targetContainer.classList.remove("hidden");
}

renderMenu()