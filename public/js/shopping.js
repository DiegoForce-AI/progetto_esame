// Configurazione URL e Selettori (Slide 50 file 05)
const BASE_URL = 'http://127.0.0.1:8000';
const shoppingItemsDiv = document.querySelector('#shopping-items');

// Recupero CSRF Token per le richieste POST/DELETE/PATCH
const metaToken = document.querySelector('meta[name="csrf-token"]');
const csrfToken = metaToken ? metaToken.getAttribute('content') : '';


// --- 1. Funzioni di supporto Fetch (Slide 24, 25 file 08) ---

function onResponse(response) {
    // Verifica se la risposta HTTP è valida (200-299)
    if (!response.ok) {
        console.log('Risposta non valida'); 
        return null; // Ritorna null per interrompere la catena logica
    }
    return response.json(); // Restituisce la Promise del JSON
}

function onError(error) {
    console.log('Error: ' + error);
    if (shoppingItemsDiv) {
        // Creazione messaggio errore nel DOM
        shoppingItemsDiv.innerHTML = '';
        const errorMsg = document.createElement('p');
        errorMsg.textContent = 'Errore di caricamento. Riprova più tardi.';
        errorMsg.classList.add('error-msg'); // Opzionale: classe CSS per errori
        shoppingItemsDiv.appendChild(errorMsg);
    }
}


// --- 2. Costruzione del DOM (Senza stili inline) ---

function onCartJson(json) {
    // Controllo di sicurezza se il div esiste
    if (!shoppingItemsDiv) return;

    // Pulizia del contenitore (Slide 76 file 05)
    shoppingItemsDiv.innerHTML = '';

    // Controllo se il carrello è vuoto o i dati sono null
    if (!json || !json.cart || json.cart.length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.textContent = 'La shopping bag è vuota.';
        emptyMsg.classList.add('empty-cart-msg'); // Classe per stile (opzionale)
        shoppingItemsDiv.appendChild(emptyMsg);
        return;
    }

    const prodotti = json.cart;

    // Iterazione dei prodotti (Slide 34 file 05)
    for (const item of prodotti) {
        // A. Contenitore principale riga (sostituisce il div con style display:flex)
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item'); // CLASSE CSS definita prima

        // B. Immagine (se presente)
        if (item.foto) {
            const img = document.createElement('img');
            img.src = item.foto;
            img.alt = item.nome;
            img.classList.add('cart-item-img'); // CLASSE CSS
            itemDiv.appendChild(img);
        }

        // C. Contenitore Dettagli (Testo, Input, Bottoni)
        const detailsDiv = document.createElement('div');
        // Se serve stile specifico per questo contenitore, aggiungi classe qui:
        // detailsDiv.classList.add('cart-item-details');

        // Nome Prodotto
        const nameStrong = document.createElement('strong');
        nameStrong.textContent = item.nome;
        detailsDiv.appendChild(nameStrong);
        
        // A capo
        detailsDiv.appendChild(document.createElement('br'));

        // Etichetta Quantità
        const qtaLabel = document.createTextNode('Quantità: ');
        detailsDiv.appendChild(qtaLabel);

        // Bottone Rimuovi
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Rimuovi';
        removeBtn.classList.add('remove-btn'); // CLASSE CSS
        // Salviamo l'ID nel dataset (Slide 34 file 06) per recuperarlo al click
        removeBtn.dataset.id = item.id; 
        detailsDiv.appendChild(removeBtn);

        // Input Quantità
        const inputQta = document.createElement('input');
        inputQta.type = 'number';
        inputQta.classList.add('qta-input'); // CLASSE CSS
        inputQta.dataset.id = item.id;
        inputQta.value = item.quantita;
        inputQta.min = '1';
        detailsDiv.appendChild(inputQta);

        // Assemblaggio finale
        itemDiv.appendChild(detailsDiv);
        shoppingItemsDiv.appendChild(itemDiv);
    }
}

function loadCart() {
    // Fetch GET standard (Slide 460 file 08)
    fetch(BASE_URL + '/shopping', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    .then(onResponse, onError) // Gestione successo/errore
    .then(onCartJson);         // Gestione dati JSON
}


// --- 3. Gestione Eventi (Event Delegation) ---

if (shoppingItemsDiv) {
    
    // Listener unico per i click (Slide 69 file 05)
    shoppingItemsDiv.addEventListener('click', function(e) {
        const target = e.target;
        
        // Verifica se è stato cliccato un bottone con classe 'remove-btn'
        if (target.classList.contains('remove-btn')) {
            const prodottoId = target.dataset.id; // Recupero ID dal dataset
            
            // Chiamata DELETE
            fetch(BASE_URL + '/shopping/remove?prodotto_id=' + prodottoId, {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json', 
                    'X-CSRF-TOKEN': csrfToken 
                }
            })
            .then(onResponse, onError)
            .then(function(data) {
                // Se l'operazione è andata a buon fine, ricarichiamo il carrello
                if (data) {
                    loadCart();
                }
            });
        }
    });

    // Listener unico per la modifica input (Aggiornamento Quantità)
    shoppingItemsDiv.addEventListener('input', function(e) {
        const target = e.target;

        // Verifica se è l'input della quantità
        if (target.classList.contains('qta-input')) {
            const prodottoId = target.dataset.id;
            const quantita = parseInt(target.value); // Slide 335 file 06

            if (quantita > 0) {
                // Preparazione dati JSON (Slide 30 file 08)
                const bodyData = JSON.stringify({ 
                    prodotto_id: prodottoId, 
                    quantita: quantita 
                });

                // Chiamata PATCH
                fetch(BASE_URL + '/shopping/update', {
                    method: 'PATCH',
                    headers: { 
                        'Content-Type': 'application/json', 
                        'X-CSRF-TOKEN': csrfToken 
                    },
                    body: bodyData
                })
                .then(onResponse, onError)
                .then(function(data) {
                    if (data) {
                        // Debounce: ricarichiamo dopo 500ms per evitare "salti" mentre si scrive
                        setTimeout(loadCart, 500);
                    }
                });
            }
        }
    });
}

// Caricamento iniziale all'avvio della pagina
loadCart();