//SISTEMATO

// Selettori (Slide 50 file 05)
const productsDiv = document.querySelector('#fakestore-products');
const cartDiv = document.querySelector('#fakestore-cart');

// Stato del carrello
let cart = [];

// --- Funzioni di Supporto Fetch (Slide 25 file 08) ---

function onResponse(response) {
    if (!response.ok) {
        console.log('Risposta non valida');
        return null;
    }
    return response.json();
}

function onError(error) {
    console.log('Error: ' + error);
}

// --- Gestione Caricamento Prodotti ---

function onProductsJson(products) {
    // Pulizia contenitore (Slide 76 file 05)
    productsDiv.innerHTML = '';

    // Iterazione sui prodotti (Slide 34 file 05)
    for (const product of products) {
        // 1. Creazione Card Prodotto
        const card = document.createElement('div');
        card.classList.add('product-card'); // Classe CSS invece di style inline

        // 2. Immagine
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.title;
        img.classList.add('product-img'); // Classe CSS
        card.appendChild(img);

        // 3. Titolo
        const h4 = document.createElement('h4');
        h4.textContent = product.title;
        card.appendChild(h4);

        // 4. Prezzo
        const p = document.createElement('p');
        p.textContent = product.price + ' €'; // Concatenazione (Slide 27 file 05)
        card.appendChild(p);

        // 5. Div Bottone
        const btnDiv = document.createElement('div');
        btnDiv.classList.add('fakestore-add-btn');

        // 6. Bottone Aggiungi
        const btn = document.createElement('button');
        btn.textContent = 'Aggiungi al carrello';
        // Salviamo l'ID nel dataset (Slide 34 file 06)
        btn.dataset.id = product.id; 
        btnDiv.appendChild(btn);

        card.appendChild(btnDiv);
        productsDiv.appendChild(card);
    }
}

function loadProducts() {
    // Fetch standard senza async/await
    fetch('https://fakestoreapi.com/products')
        .then(onResponse, onError)
        .then(onProductsJson);
}

// --- Gestione Aggiunta al Carrello ---

function onAddToCartJson(product) {
    cart.push(product); // Aggiunge all'array (Slide 2 file 06)
    renderCart();       // Aggiorna la vista
}

function onProductClick(e) {
    // Event Delegation: controlliamo se è un bottone (Slide 69 file 05)
    const target = e.target;
    
    if (target.tagName === 'BUTTON') {
        const id = target.dataset.id; // Accesso tramite dataset

        // Fetch del singolo prodotto
        fetch('https://fakestoreapi.com/products/' + id)
            .then(onResponse, onError)
            .then(onAddToCartJson);
    }
}

// Listener sul container prodotti
productsDiv.addEventListener('click', onProductClick);


// --- Gestione Rendering Carrello ---

function renderCart() {
    cartDiv.classList.remove('hidden');
    // 1. Pulisci tutto il contenuto precedente del div carrello
    cartDiv.innerHTML = '';

    // 2. Se il carrello è vuoto
    if (cart.length === 0) {
        const emptyMsg = document.createElement('div');
        // Riutilizziamo la classe del titolo per avere il testo arancione e grande
       
        emptyMsg.classList.add('fakestore-cart-title'); 
        emptyMsg.classList.add('cart-empty-msg'); 

        emptyMsg.textContent = 'Carrello vuoto';
        
        // Tocco estetico: togliamo il margine sotto per centrarlo meglio nel box giallo
        
        cartDiv.appendChild(emptyMsg);
        return; // Esce dalla funzione
    }

    // 3. Se il carrello ha prodotti
    // Titolo "Carrello"
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('fakestore-cart-title');
    titleDiv.textContent = 'Carrello';
    cartDiv.appendChild(titleDiv);

    // Contenitore della lista (flex column gap)
    const listDiv = document.createElement('div');
    listDiv.classList.add('fakestore-cart-list');

    // Ciclo sui prodotti nel carrello
    for (const item of cart) {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('fakestore-cart-item');

        // Nome Prodotto
        const spanName = document.createElement('span');
        spanName.textContent = item.title;
        // Opzionale: accorciare il nome se troppo lungo
        // if(item.title.length > 20) spanName.textContent = item.title.substring(0, 20) + '...';
        itemDiv.appendChild(spanName);

        // Prezzo
        const spanPrice = document.createElement('span');
        spanPrice.textContent = item.price + ' €';
        itemDiv.appendChild(spanPrice);

        // Bottone Rimuovi
        const btnRemove = document.createElement('button');
        btnRemove.textContent = 'Rimuovi';
        btnRemove.classList.add('fakestore-cart-remove');
        btnRemove.dataset.id = item.id; // Salviamo l'ID per poterlo rimuovere dopo
        itemDiv.appendChild(btnRemove);

        // Aggiungi la riga alla lista
        listDiv.appendChild(itemDiv);
    }

    // Aggiungi la lista completa al contenitore principale
    cartDiv.appendChild(listDiv);
}

// --- Gestione Rimozione dal Carrello ---

function onCartClick(e) {
    const target = e.target;
    
    // Verifica classe (Slide 67 file 05)
    if (target.classList.contains('fakestore-cart-remove')) {
        const id = target.dataset.id;
        
        // Filtriamo l'array (concetto standard JS)
        // Nota: filter rimuove tutte le istanze con quell'ID
        cart = cart.filter(function(item) {
            return item.id != id;
        });
        
        renderCart();
    }
}

cartDiv.addEventListener('click', onCartClick);

// Avvio
loadProducts();
