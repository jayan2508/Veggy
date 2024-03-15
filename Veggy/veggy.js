var openModalButton = document.querySelector(".img-shop");
var allItemsModal = document.getElementById("allItemsModal");
var allItemsContent = document.getElementById("allItemsContent");
var closeAllItemsModalBtn = document.getElementById("closeAllItemsModalBtn");

openModalButton.addEventListener("click", function () {
    displayAllItemsModal();
});

closeAllItemsModalBtn.addEventListener("click", function () {
    allItemsModal.style.display = "none";
});

function displayAllItemsModal() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    allItemsContent.innerHTML = '';

    if (cartItems.length === 0) {
        allItemsContent.innerHTML = '<p class="model-center">Your bag is empty.</p>';

        const closeButton = document.createElement("button");
        closeButton.textContent = "Continue shopping";
        closeButton.classList.add("close-button");

        closeButton.addEventListener("click", function () {
            allItemsModal.style.display = "none";
        });

        const centerDiv = document.createElement("div");
        centerDiv.classList.add("model-center");
        centerDiv.appendChild(closeButton);
        allItemsContent.appendChild(centerDiv);
    } else {
        cartItems.forEach(function (item, index) {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");

            itemElement.innerHTML = `
                <div class="model-container">
                    <div class="item-details model-shopping">
                    <img src="${item.image}" alt="${item.name}" class="modal-img">
                        <div class="model-item">
                            <span class="item-name"><strong>${item.name}</strong></span>
                            <span class="item-price">Rs. ${item.price.toFixed(2)}</spam>
                        </div>
                            <div class="">
                                <button class="minus border-card">-</button>
                                <input type="text" class="quantity-input input-card" value="${item.quantity}" readonly>
                                <button class="plus border-card">+</button>
                            </div>
                        <button class="delete-item" data-index="${index}">Delete</button>
                    </div>
                </div>
            `;

            allItemsContent.appendChild(itemElement);

            const deleteButton = itemElement.querySelector(".delete-item");
            deleteButton.addEventListener("click", function () {
                const itemIndex = parseInt(deleteButton.getAttribute("data-index"));

                cartItems.splice(itemIndex, 1);

                localStorage.setItem('cartItems', JSON.stringify(cartItems));

                displayAllItemsModal();
            });

            const plusButton = itemElement.querySelector(".plus");
            const minusButton = itemElement.querySelector(".minus");

            plusButton.addEventListener("click", function () {
                item.quantity++;
                updateLocalStorageAndDisplay();
            });

            minusButton.addEventListener("click", function () {
                if (item.quantity > 1) {
                    item.quantity--;
                    updateLocalStorageAndDisplay();
                }
            });

            function updateLocalStorageAndDisplay() {
                const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                const updatedCartItems = cartItems.map((cartItem) => {
                    if (cartItem.name === item.name) {
                        cartItem.quantity = item.quantity;
                        cartItem.total = item.price * item.quantity;
                    }
                    return cartItem;
                });

                localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

                displayAllItemsModal();
                updateCartSummary();
            }
        });
    }
    allItemsModal.style.display = "block";
}

const products = [
    { id: 1, name: "Carrot - 1 Kg", price: 56, image: "carrot.png" },
    { id: 2, name: "Tomato - 1 Kg", price: 16, image: "tomato.png" },
    { id: 3, name: "Beans - 1 Kg", price: 82, image: "beans.png" },
    { id: 4, name: "Brinjal - 1 Kg", price: 35, image: "brinjal.png" },
    { id: 5, name: "Capsicum - 1 Kg", price: 60, image: "capsicum.png" },
    { id: 6, name: "Mushroom - 1 Kg", price: 75, image: "mushroom.png" },
    { id: 7, name: "Potato - 1 Kg", price: 22, image: "potato.png" },
    { id: 8, name: "Pumpkin - 1 Kg", price: 48, image: "pumpkin.png" },
    { id: 9, name: "Apple - 1 Kg", price: 100, image: "apple.png" },
    { id: 10, name: "Graps - 1 Kg", price: 70, image: "graps.png" },
    { id: 11, name: "Banana - 1 Kg", price: 50, image: "banana.png" },
    { id: 12, name: "Dragan - 1 Kg", price: 200, image: "dragan-f.png" },
    { id: 13, name: "Orange - 1 Kg", price: 80, image: "orange.png" },
    { id: 14, name: "Gauva - 1 Kg", price: 60, image: "gauva.png" },
    { id: 15, name: "Mango - 1 Kg", price: 150, image: "    " },
    { id: 16, name: "Watermelan - 1 Kg", price: 90, image: "watermelan.png" },
    { id: 17, name: "Kiwi - 1 Kg", price: 110, image: "kiwi.png" },
    { id: 18, name: "Litchi - 1 Kg", price: 120, image: "litchi.png" },
    { id: 19, name: "Strawberry - 1 Kg", price: 75, image: "strawberry.png" },
    { id: 20, name: "Pineapple - 1 Kg", price: 140, image: "pineapple.png" },
    { id: 21, name: "Chikoo - 1 Kg", price: 65, image: "chikoo-1.png" },
    { id: 22, name: "Cherry - 1 Kg", price: 75, image: "cherry.png" },
    { id: 23, name: "Papaya - 1 Kg", price: 75, image: "papaya.png" },
    { id: 24, name: "Blackberry - 1 Kg", price: 75, image: "blackberry-1.png" },
];
const cardContainer = document.getElementById("cardContainer");

for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <img src="${product.image}" class="card-img-top open-modal-btn" alt="${product.name}" data-modal="myModal${i + 1}">
        <div class="card-body">
            <span class="card-text">${product.name}</span>
            <h5 class="card-title">Rs. ${product.price}</h5>
            <div class="quantity">
                <button class="minus border-card">-</button>
                <input type="text" class="quantity-input input-card" value="1" readonly>
                <button class="plus border-card">+</button>
            </div>
            <button class="add-to-cart btn btn-success btn-card" data-product="${product.name}" data-price="${product.price}">Add to Cart</button>
        </div>
    `;

    cardContainer.appendChild(card);

    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.id = `myModal${i + 1}`;

    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" id="closeModalBtn">&times;</span>
            <img src="${product.image}" alt="${product.name}">
            <div class="model-center">
                <p class="model-ls"><strong>${product.name}</strong></p>
                <p class="model-ls"><strong>Price:</strong> Rs. ${product.price}</p>
            </div>
        </div>
    `;
    cardContainer.appendChild(modal);
}

var openModalButtons = document.querySelectorAll(".open-modal-btn");
openModalButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        var modalId = button.getAttribute("data-modal");
        var modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "block";
        }
    });
});

var closeModalButtons = document.querySelectorAll(".close");
closeModalButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        var modal = button.closest(".modal");
        if (modal) {
            modal.style.display = "none";
        }
    });
});

const plusButtons = document.querySelectorAll(".plus");
const minusButtons = document.querySelectorAll(".minus");
const quantityInputs = document.querySelectorAll(".quantity-input");

plusButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        let quantity = parseInt(quantityInputs[index].value);
        quantity++;
        quantityInputs[index].value = quantity;
    });
});

minusButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        let quantity = parseInt(quantityInputs[index].value);
        if (quantity > 1) {
            quantity--;
            quantityInputs[index].value = quantity;
        }
    });
});

function addToCartClicked(event) {
    const button = event.target;
    const productName = button.getAttribute('data-product');
    const productPrice = parseFloat(button.getAttribute('data-price'));
    const productImage = button.parentElement.parentElement.querySelector('.card-img-top').src;
    const quantity = parseInt(button.parentElement.querySelector('.quantity-input').value);

    const product = {
        name: productName,
        price: productPrice,
        quantity: quantity,
        total: productPrice * quantity,
        image: productImage
    };

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let productExistsInCart = false;
    cartItems.forEach((item) => {
        if (item.name === product.name) {
            item.quantity += quantity;
            item.total += productPrice * quantity;
            productExistsInCart = true;
        }
    });

    if (!productExistsInCart) {
        cartItems.push(product);
    }

    alert(`${productName} has been added to the cart.`);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartSummary();
}

const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach((button) => {
    button.addEventListener('click', addToCartClicked);
});

function updateCartSummary() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalItems = cartItems.length;
    const subtotal = cartItems.reduce((total, item) => total + item.total, 0);

    document.getElementById('itemsCount').textContent = `No. of items: ${totalItems}`;
    document.getElementById('subtotal').textContent = `Sub Total: Rs.${subtotal.toFixed(2)}`;

}
updateCartSummary();

const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");
const searchInput = document.getElementById("searchInput");
const noMatchMessage = document.getElementById("noMatchMessage");
const cardsPerPage = 12;
let currentPage = 1;

function displayCards() {
    const cards = cardContainer.querySelectorAll(".card");
    const startIndex = (currentPage - 1) * cardsPerPage;

    cards.forEach((card, index) => {
        if (index >= startIndex && index < startIndex + cardsPerPage) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

function updatePaginationButtons() {
    const totalCards = cardContainer.querySelectorAll(".card").length;
    const totalPages = Math.ceil(totalCards / cardsPerPage);

    if (totalPages > 1) {
        prevPageBtn.style.display = "block";
        nextPageBtn.style.display = "block";

        prevPageBtn.disabled = currentPage === 1 ? true : false;
        nextPageBtn.disabled = currentPage === totalPages ? true : false;

    } else {
        prevPageBtn.style.display = "none";
        nextPageBtn.style.display = "none";
    }
}

prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayCards();
        updatePaginationButtons();
    }
});

nextPageBtn.addEventListener("click", () => {
    const totalCards = cardContainer.querySelectorAll(".card").length;
    const totalPages = Math.ceil(totalCards / cardsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        displayCards();
        updatePaginationButtons();
    }
});

searchInput.addEventListener("input", () => {
    const searchQuery = searchInput.value.toLowerCase();
    const cards = cardContainer.querySelectorAll(".card");
    let matchFound = false;
    let nameCount = 0;

    cards.forEach((card) => {
        const cardName = card.querySelector(".card-text").textContent.toLowerCase();
        if (cardName.includes(searchQuery)) {
            if (nameCount < cardsPerPage) {
                card.style.display = "block";
                matchFound = true;
                nameCount++;
            } else {
                card.style.display = "none";
            }
        } else {
            card.style.display = "none";
        }
    });

    noMatchMessage.style.display = matchFound ? "none" : "block";

    const visibleCards = cardContainer.querySelectorAll(".card[style='display: block;']").length;
    if (visibleCards <= cardsPerPage) {
        prevPageBtn.style.display = "none";
        nextPageBtn.style.display = "none";
    } else {
        updatePaginationButtons();
    }
    currentPage = 1;

    if (!searchQuery) {
        displayCards();
        updatePaginationButtons();
    }
});
displayCards();
updatePaginationButtons();