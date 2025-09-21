document.addEventListener('DOMContentLoaded', async function () {
    const productsDiv = document.getElementById('fakestore-products');
    const cartDiv = document.getElementById('fakestore-cart');
    let cart = [];

    // Carica prodotti
    async function loadProducts() {
        const res = await fetch('https://fakestoreapi.com/products');
        const products = await res.json();
        productsDiv.innerHTML = products.map(product => `
            <div style="border:1px solid #ccc; margin:10px; padding:10px;">
                <img src="${product.image}" alt="${product.title}" style="width:80px;">
                <h4>${product.title}</h4>
                <p>${product.price} €</p>
                <button data-id="${product.id}">Aggiungi al carrello</button>
            </div>
        `).join('');
    }

    // Mostra carrello
    function renderCart() {
        if (cart.length === 0) {
            cartDiv.innerHTML = '<p>Carrello vuoto.</p>';
            return;
        }
        cartDiv.innerHTML = cart.map(item => `
            <div>
                <strong>${item.title}</strong> - ${item.price} €
                <button data-id="${item.id}" class="remove-btn">Rimuovi</button>
            </div>
        `).join('');
    }

    // Listener aggiunta al carrello
    productsDiv.addEventListener('click', function (e) {
        if (e.target.tagName === 'BUTTON') {
            const id = e.target.getAttribute('data-id');
            fetch(`https://fakestoreapi.com/products/${id}`)
                .then(res => res.json())
                .then(product => {
                    cart.push(product);
                    renderCart();
                });
        }
        
    });

    // Listener rimozione dal carrello
    cartDiv.addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-btn')) {
            const id = e.target.getAttribute('data-id');
            cart = cart.filter(item => item.id != id);
            renderCart();
        }
    });

    await loadProducts();
    renderCart();
});