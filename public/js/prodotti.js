// public/js/prodotti.js
const BASE_URL = window.BASE_URL || 'http://localhost/progetto_esame/public';
const IMG_BASE = '/progetto_esame/public/';

document.addEventListener('DOMContentLoaded', function () {
    // LISTA PRODOTTI
    const listaContainer = document.getElementById('prodotti-container');
    if (listaContainer) {
        fetch(BASE_URL + '/prodotti/json')
            .then(response => response.json())
            .then(prodotti => {
                let row;
                prodotti.forEach((prodotto, index) => {
                    console.log(prodotto);
                    if (index % 3 === 0) {
                        row = document.createElement('div');
                        row.className = 'prodotti-row';
                        listaContainer.appendChild(row);
                    }

                    const card = document.createElement('div');
                    card.className = 'prodotto-card';

                    let immaginiHtml = '';
                    if (prodotto.immagini && prodotto.immagini.length > 0) {
                        prodotto.immagini.forEach(img => {
                            immaginiHtml += `<img src="${IMG_BASE}${img.url}" alt="${prodotto.nome}" class="prodotto-img">`;
                        });
                    } else if (prodotto.immagine_url) {
                        immaginiHtml = `<img src="${IMG_BASE}${prodotto.immagine_url}" alt="${prodotto.nome}" class="prodotto-img">`;
                    }

                    card.innerHTML = `
                        <a href="${BASE_URL}/prodotto/${prodotto.id}" class="dettaglio-link">
                            ${immaginiHtml}
                            <h3>${prodotto.nome}</h3>
                            <p>${prodotto.descrizione}</p>
                            <strong>${prodotto.prezzo} €</strong>
                        </a>
                        <br>
                        <button class="add-to-cart-btn" data-id="${prodotto.id}">Aggiungi al carrello</button>
                    `;
                    row.appendChild(card);
                });
            });

        // Listener unico per "Aggiungi al carrello"
        listaContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('add-to-cart-btn')) {
                let prodottoId = e.target.getAttribute('data-id');
                aggiungiAlCarrello(prodottoId);
            }
        });
    }

    // DETTAGLIO PRODOTTO
    const dettaglioContainer = document.getElementById('dettaglio-prodotto');
    if (dettaglioContainer) {
        const id = dettaglioContainer.getAttribute('data-id');
        fetch(BASE_URL + '/prodotto/' + id + '/json')
            .then(response => response.json())
            .then(prodotto => {
                let immaginiHtml = '';
                if (prodotto.immagini && prodotto.immagini.length > 0) {
                    prodotto.immagini.forEach(img => {
                        immaginiHtml += `<img src="${IMG_BASE}${img.url}" alt="${prodotto.nome}" class="prodotto-img">`;
                    });
                } else if (prodotto.immagine_url) {
                    immaginiHtml = `<img src="${IMG_BASE}${prodotto.immagine_url}" alt="${prodotto.nome}" class="prodotto-img">`;
                }

                dettaglioContainer.innerHTML = `
                    <img src="${BASE_URL}/${prodotto.immagine_url}" alt="${prodotto.nome}" class="prodotto-img">
                    <h2>${prodotto.nome}</h2>
                    <p>${prodotto.descrizione}</p>
                    <strong>${prodotto.prezzo} €</strong>
                    <br>
                    <button class="add-to-cart-btn" data-id="${prodotto.id}">Aggiungi al carrello</button>
                `;

                const addBtn = dettaglioContainer.querySelector('.add-to-cart-btn');
                addBtn.addEventListener('click', function () {
                    aggiungiAlCarrello(prodotto.id);
                });
            });
    }
});

// FUNZIONE COMUNE
function aggiungiAlCarrello(prodottoId) {
    fetch(BASE_URL + '/shopping/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
        },
        body: JSON.stringify({ prodotto_id: prodottoId, quantita: 1 })
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Errore: ' + data.error);
            } else {
                alert('Prodotto aggiunto al carrello!');
            }
        })
        .catch(() => alert('Errore di rete.'));
}
