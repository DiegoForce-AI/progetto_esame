
window.BASE_URL = window.BASE_URL || 'http://localhost/progetto_esame/public';
// Usa sempre window.BASE_URL nel codice
const IMG_BASE = '/progetto_esame/public/';

document.addEventListener('DOMContentLoaded', function () {
    // LISTA PRODOTTI
    const listaContainer = document.getElementById('prodotti-container');
    if (listaContainer) {
        fetch(window.BASE_URL + '/prodotti/json')
            .then(response => response.json())
            .then(prodotti => {
                // Filtra per categoria se richiesto
                let filtered = prodotti;
                if (window.PRODOTTI_FILTER) {
                    let filterId = null;
                    if (window.PRODOTTI_FILTER === 'mac') filterId = 1;
                    if (window.PRODOTTI_FILTER === 'iphone') filterId = 2;
                    if (window.PRODOTTI_FILTER === 'ipad') filterId = 3;
                    if (window.PRODOTTI_FILTER === 'airpods') filterId = 4;
                    if (window.PRODOTTI_FILTER === 'mac-ipad-airpods') {
                        filtered = prodotti.filter(p => [1,3,4].includes(p.categoria_id));
                    } else if (filterId !== null) {
                        filtered = prodotti.filter(p => p.categoria_id == filterId);
                    }
                }
                let row;
                filtered.forEach((prodotto, index) => {
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
                        <a href="${window.BASE_URL}/prodotto/${prodotto.id}" class="dettaglio-link"">
                            ${immaginiHtml}
                            <div class="prodotto-nome">${prodotto.nome}</div>
                            <div class="prodotto-prezzo">${prodotto.prezzo} €</div>
                            <div class="prodotto-desc">${prodotto.descrizione || ''}</div>
                        </a>
                        <button class="prodotto-btn add-to-cart-btn" data-id="${prodotto.id}">Aggiungi al carrello</button>
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
        fetch(window.BASE_URL + '/prodotto/' + id + '/json')
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
                    <div class="prodotto-card prodotto-card-center">
                        <img src="${window.BASE_URL}/${prodotto.immagine_url}" alt="${prodotto.nome}" class="prodotto-img">
                        <div class="prodotto-nome prodotto-nome-big">${prodotto.nome}</div>
                        <div class="prodotto-prezzo prodotto-prezzo-big">${prodotto.prezzo} €</div>
                        <div class="prodotto-desc">${prodotto.descrizione || ''}</div>
                        <button class="prodotto-btn add-to-cart-btn" data-id="${prodotto.id}">Aggiungi al carrello</button>
                    </div>
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
    fetch(window.BASE_URL + '/shopping/add', {
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
