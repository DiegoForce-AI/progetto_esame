// URL hardcoded
const API_URL = 'http://127.0.0.1:8000';
const IMG_URL = 'http://127.0.0.1:8000/';

// --- Funzioni di supporto per Fetch (Slide 25, 13 file 08) ---
function onResponse(response) {
    if (!response.ok) {
        return null; 
    }
    return response.json();
}

function onError(error) {
    console.log('Error: ' + error);
    mostraMessaggioCarrello('Errore di connessione.', true);
}

// --- Funzione per mostrare messaggi (Toast) ---
function mostraMessaggioCarrello(msg, isError) {
    let msgDiv = document.querySelector('#carrello-msg');
    
    // Creazione elemento se non esiste (Slide 76 file 05)
    if (!msgDiv) {
        msgDiv = document.createElement('div');
        msgDiv.id = 'carrello-msg';
        document.body.appendChild(msgDiv);
    }
    
    msgDiv.textContent = msg;
    
    // Reset classi (Slide 67 file 05)
    msgDiv.className = 'carrello-msg'; 
    
    if (isError) {
        msgDiv.classList.add('carrello-msg-errore');
    } else {
        msgDiv.classList.add('carrello-msg-success');
    }
    
    // Invece di style.display, usiamo una classe per la visibilità
    // Usiamo un piccolo timeout per permettere la transizione CSS se presente
    requestAnimationFrame(function() {
        msgDiv.classList.add('show');
    });
    
    // Nascondi dopo 3 secondi
    setTimeout(function() {
        msgDiv.classList.remove('show');
    }, 3000);
}


// --- Funzione Aggiungi al Carrello ---
function onCartJson(data) {
    if (!data) {
        mostraMessaggioCarrello('Errore di comunicazione col server.', true);
        return;
    }
    
    if (data.error) {
        mostraMessaggioCarrello('Errore: ' + data.error, true);
    } else {
        mostraMessaggioCarrello('Prodotto aggiunto al carrello!', false);
    }
}

function aggiungiAlCarrello(prodottoId) {
    // Recupero Token CSRF
    const metaToken = document.querySelector('meta[name="csrf-token"]');
    const token = metaToken ? metaToken.getAttribute('content') : '';

    const postData = {
        prodotto_id: prodottoId,
        quantita: 1
    };

    // Fetch POST (Slide 30 file 08)
    fetch(API_URL + '/shopping/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': token
        },
        body: JSON.stringify(postData)
    })
    .then(onResponse, onError)
    .then(onCartJson);
}


// --- 1. LISTA PRODOTTI ---
const listaContainer = document.querySelector('#prodotti-container');

if (listaContainer) {
    const filter = ''; 

    function onProductsJson(data) {
        const prodotti = data.prodotti;
        let row = null;

        // Iterazione array (Slide 34 file 05)
        for (let i = 0; i < prodotti.length; i++) {
            const prodotto = prodotti[i];

            // Creazione righe ogni 3 elementi
            if (i % 3 === 0) {
                row = document.createElement('div');
                row.classList.add('prodotti-row');
                listaContainer.appendChild(row);
            }

            // Creazione Card
            const card = document.createElement('div');
            card.classList.add('prodotto-card');

            // Creazione Link
            const link = document.createElement('a');
            link.href = API_URL + '/prodotto/' + prodotto.id;
            link.classList.add('dettaglio-link');

            // Gestione Immagini
            if (prodotto.immagini && prodotto.immagini.length > 0) {
                for (const imgObj of prodotto.immagini) {
                    const img = document.createElement('img');
                    img.src = IMG_URL + imgObj.url;
                    img.alt = prodotto.nome;
                    img.classList.add('prodotto-img');
                    link.appendChild(img);
                }
            } else if (prodotto.immagine_url) {
                const img = document.createElement('img');
                img.src = IMG_URL + prodotto.immagine_url;
                img.alt = prodotto.nome;
                img.classList.add('prodotto-img');
                link.appendChild(img);
            }

            // Nome Prodotto
            const divNome = document.createElement('div');
            divNome.classList.add('prodotto-nome');
            divNome.textContent = prodotto.nome;
            link.appendChild(divNome);

            // Prezzo
            const divPrezzo = document.createElement('div');
            divPrezzo.classList.add('prodotto-prezzo');
            divPrezzo.textContent = prodotto.prezzo + ' €';
            link.appendChild(divPrezzo);

            // Descrizione
            const divDesc = document.createElement('div');
            divDesc.classList.add('prodotto-desc');
            divDesc.textContent = prodotto.descrizione || '';
            link.appendChild(divDesc);

            card.appendChild(link);

            // Bottone Aggiungi al Carrello
            const btn = document.createElement('button');
            btn.classList.add('prodotto-btn');
            btn.classList.add('add-to-cart-btn');
            btn.textContent = 'Aggiungi al carrello';
            btn.dataset.id = prodotto.id; // Dataset (Slide 34 file 06)
            
            card.appendChild(btn);
            
            if (row) {
                row.appendChild(card);
            }
        }
    }

    // Fetch Prodotti
    fetch(API_URL + '/prodotti/json?filter=' + encodeURIComponent(filter))
        .then(onResponse, onError)
        .then(onProductsJson);

    // Event Delegation
    function onContainerClick(event) {
        const target = event.target;
        if (target.classList.contains('add-to-cart-btn')) {
            const prodottoId = target.dataset.id;
            aggiungiAlCarrello(prodottoId);
        }
    }

    listaContainer.addEventListener('click', onContainerClick);
}


// --- 2. DETTAGLIO PRODOTTO ---
const dettaglioContainer = document.querySelector('#dettaglio-prodotto');

if (dettaglioContainer) {
    const id = dettaglioContainer.dataset.id;

    function onDetailJson(prodotto) {
        if (!prodotto) return;

        dettaglioContainer.innerHTML = '';

        const card = document.createElement('div');
        // Uso classList per aggiungere più classi (Slide 67 file 05)
        card.classList.add('prodotto-card');
        card.classList.add('prodotto-card-center');

        // Immagini
        if (prodotto.immagini && prodotto.immagini.length > 0) {
            for (const imgObj of prodotto.immagini) {
                const img = document.createElement('img');
                img.src = IMG_URL + imgObj.url;
                img.alt = prodotto.nome;
                img.classList.add('prodotto-img');
                card.appendChild(img);
            }
        } else if (prodotto.immagine_url) {
            const img = document.createElement('img');
            img.src = IMG_URL + prodotto.immagine_url;
            img.alt = prodotto.nome;
            img.classList.add('prodotto-img');
            card.appendChild(img);
        }

        // Nome
        const divNome = document.createElement('div');
        divNome.classList.add('prodotto-nome');
        divNome.classList.add('prodotto-nome-big');
        divNome.textContent = prodotto.nome;
        card.appendChild(divNome);

        // Prezzo
        const divPrezzo = document.createElement('div');
        divPrezzo.classList.add('prodotto-prezzo');
        divPrezzo.classList.add('prodotto-prezzo-big');
        divPrezzo.textContent = prodotto.prezzo + ' €';
        card.appendChild(divPrezzo);

        // Descrizione
        const divDesc = document.createElement('div');
        divDesc.classList.add('prodotto-desc');
        divDesc.textContent = prodotto.descrizione || '';
        card.appendChild(divDesc);

        // Bottone
        const btn = document.createElement('button');
        btn.classList.add('prodotto-btn');
        btn.classList.add('add-to-cart-btn');
        btn.textContent = 'Aggiungi al carrello';
        
        function onBtnClick() {
            aggiungiAlCarrello(prodotto.id);
        }
        btn.addEventListener('click', onBtnClick);

        card.appendChild(btn);
        dettaglioContainer.appendChild(card);
    }

    fetch(API_URL + '/prodotto/' + id + '/json')
        .then(onResponse, onError)
        .then(onDetailJson);
}