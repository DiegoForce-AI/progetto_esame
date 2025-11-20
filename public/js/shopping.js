const BASE_URL = 'http://127.0.0.1:8000';
const shoppingItemsDiv = document.querySelector('#shopping-items');

const metaToken = document.querySelector('meta[name="csrf-token"]');
const csrfToken = metaToken ? metaToken.getAttribute('content') : '';



function onResponse(response) {
    if (!response.ok) {
        console.log('Risposta non valida');
        return null;
    }
    return response.json();
}

function onError(error) {
    console.log('Error: ' + error);
    if (shoppingItemsDiv) {
        shoppingItemsDiv.innerHTML = '';
        const errorMsg = document.createElement('p');
        errorMsg.textContent = 'Errore di caricamento. Riprova più tardi.';
        errorMsg.classList.add('error-msg');
        shoppingItemsDiv.appendChild(errorMsg);
    }
}

function onRemoveSuccess(data) {
    if (data) {
        loadCart();
    }
}

function onUpdateSuccess(data) {
    if (data) {
        setTimeout(loadCart, 500);
    }
}



function onCartJson(json) {
    if (!shoppingItemsDiv) return;
    shoppingItemsDiv.innerHTML = '';
    if (!json || !json.cart || json.cart.length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.textContent = 'La shopping bag è vuota.';
        emptyMsg.classList.add('empty-cart-msg');
        shoppingItemsDiv.appendChild(emptyMsg);
        return;
    }
    const prodotti = json.cart;
    for (const item of prodotti) {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        if (item.foto) {
            const img = document.createElement('img');
            img.src = item.foto;
            img.alt = item.nome;
            img.classList.add('cart-item-img');
            itemDiv.appendChild(img);
        }
        const detailsDiv = document.createElement('div');
        const nameStrong = document.createElement('strong');
        nameStrong.textContent = item.nome;
        detailsDiv.appendChild(nameStrong);
        detailsDiv.appendChild(document.createElement('br'));
        const qtaLabel = document.createTextNode('Quantità: ');
        detailsDiv.appendChild(qtaLabel);
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Rimuovi';
        removeBtn.classList.add('remove-btn');
        removeBtn.dataset.id = item.id;
        detailsDiv.appendChild(removeBtn);
        const inputQta = document.createElement('input');
        inputQta.type = 'number';
        inputQta.classList.add('qta-input');
        inputQta.dataset.id = item.id;
        inputQta.value = item.quantita;
        inputQta.min = '1';
        detailsDiv.appendChild(inputQta);
        itemDiv.appendChild(detailsDiv);
        shoppingItemsDiv.appendChild(itemDiv);
    }
}

function loadCart() {
    fetch(BASE_URL + '/shopping', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    .then(onResponse, onError)
    .then(onCartJson);
}



if (shoppingItemsDiv) {
    shoppingItemsDiv.addEventListener('click', function(e) {
        const target = e.target;
        if (target.classList.contains('remove-btn')) {
            const prodottoId = target.dataset.id;
            fetch(BASE_URL + '/shopping/remove?prodotto_id=' + prodottoId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            })
            .then(onResponse, onError)
            .then(onRemoveSuccess);
        }
    });

    shoppingItemsDiv.addEventListener('input', function(e) {
        const target = e.target;
        if (target.classList.contains('qta-input')) {
            const prodottoId = target.dataset.id;
            const quantita = parseInt(target.value);
            if (quantita > 0) {
                const bodyData = JSON.stringify({ 
                    prodotto_id: prodottoId, 
                    quantita: quantita 
                });
                fetch(BASE_URL + '/shopping/update', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    body: bodyData
                })
                .then(onResponse, onError)
                .then(onUpdateSuccess);
            }
        }
    });
}

loadCart();