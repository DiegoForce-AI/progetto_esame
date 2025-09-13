// public/js/prodotti.js

document.addEventListener('DOMContentLoaded', function() {
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
                `;
                row.appendChild(card);
            });
        });
});
