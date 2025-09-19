// public/js/prodotti.js

document.addEventListener('DOMContentLoaded', function () {
    fetch('prodotti/json')
        .then(response => response.json())
        .then(prodotti => {
            const container = document.getElementById('prodotti-container');
            let row;
            prodotti.forEach((prodotto, index) => {
                if (index % 3 === 0) {
                    row = document.createElement('div');
                    row.className = 'prodotti-row';
                    container.appendChild(row);
                }
                const card = document.createElement('div');
                card.className = 'prodotto-card';
                let immaginiHtml = '';
                if (prodotto.immagini && prodotto.immagini.length > 0) {
                    prodotto.immagini.forEach(img => {
                        immaginiHtml += `<img src="${img.url}" alt="${prodotto.nome}" class="prodotto-img">`;
                    });
                } else if (prodotto.immagine_url) {
                    immaginiHtml = `<img src="${prodotto.immagine_url}" alt="${prodotto.nome}" class="prodotto-img">`;
                }
                card.innerHTML = `
                    ${immaginiHtml}
                    <h3>${prodotto.nome}</h3>
                    <p>${prodotto.descrizione}</p>
                    <strong>${prodotto.prezzo} €</strong>
                    <a href="prodotto/${prodotto.id}" class="dettaglio-link">Dettagli</a>
                    <button class="add-to-cart-btn" data-id="${prodotto.id}">Aggiungi al carrello</button>
                `;
                row.appendChild(card);
            });

            // Gestione click su "Aggiungi al carrello" 
            container.addEventListener('click', function (e) {
                if (e.target.classList.contains('add-to-cart-btn')) {
                    let prodottoId = e.target.getAttribute('data-id');
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
            });
        });
});

document.addEventListener('DOMContentLoaded', function () {
    fetch(`prodotto/${id}`) //Backtick (``) per la concatenazione delle stringhe 
        .then(response => response.json())
        .then(prodotto => {
            const container = document.getElementById('dettaglio-prodotto');
            let immaginiHtml = '';
            if (prodotto.immagini && prodotto.immagini.length > 0) {
                prodotto.immagini.forEach(img => {
                    immaginiHtml += `<img src="${img.url}" alt="${prodotto.nome}" class="prodotto-img">`;
                });
            } else if (prodotto.immagine_url) {
                immaginiHtml = `<img src="${prodotto.immagine_url}" alt="${prodotto.nome}" class="prodotto-img">`;
            }
            container.innerHTML = `
                ${immaginiHtml}
                <h2>${prodotto.nome}</h2>
                <p>${prodotto.descrizione}</p>
                <strong>${prodotto.prezzo} €</strong>
            `;
        });
});
