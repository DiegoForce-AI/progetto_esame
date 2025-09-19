
document.addEventListener('DOMContentLoaded', function () {
    const shoppingItemsDiv = document.getElementById('shopping-items');
    const addProductBtn = document.getElementById('add-product-btn');


    let shoppingBag = [];




    // Base URL dinamico
    const BASE_URL = window.location.origin + '/progetto_esame/public';


    // Carica la shopping bag dal server
    async function fetchBag() {
        const res = await fetch(BASE_URL + '/shopping',
        );
        if (res.ok) {
            const json = await res.json();
            shoppingBag = json.cart || [];
            renderBag();
        }
    }


    function renderBag() {
        if (!shoppingItemsDiv) return;
        if (shoppingBag.length === 0) {
            shoppingItemsDiv.innerHTML = '<p>La shopping bag è vuota.</p>';
            return;
        }
        shoppingItemsDiv.innerHTML = shoppingBag.map((item) => `
            <div style="margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:8px; display:flex; align-items:center;">
                ${item.foto ? `<img src="${item.foto}" alt="${item.nome}" style="width:50px; height:50px; object-fit:cover; margin-right:10px;">` : ''}
                <div>
                    <strong>${item.nome}</strong> <br>
                    Quantita: ${item.quantita}
                    <button data-id="${item.id}" class="remove-btn">Rimuovi</button>
                    <input type="number" class="qta-input" data-id="${item.id}" value="${item.quantita}" min="1" style="width:50px;">
                </div>
            </div>
        `).join('');
    }


    // Usa il CSRF token dal meta
    const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');

    if (addProductBtn) {
        addProductBtn.addEventListener('click', async function () {
            const nome = prompt('Nome prodotto da aggiungere:');
            const quantita = parseInt(prompt('Quantità:', '1'));
            if (nome && quantita > 0) {
                const res = await fetch(BASE_URL + '/shopping/add', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
                    body: JSON.stringify({ nome, quantita })
                });
                if (res.ok) fetchBag();
            }
        });
    }


    if (shoppingItemsDiv) {
        shoppingItemsDiv.addEventListener('click', async function (e) {
            if (e.target.classList.contains('remove-btn')) {
                const prodottoId = e.target.getAttribute('data-id');
                const res = await fetch(BASE_URL + '/shopping/remove', {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
                    body: JSON.stringify({ prodotto_id: prodottoId })
                });
                if (res.ok) fetchBag();
            }
        });
        shoppingItemsDiv.addEventListener('input', async function (e) {
            if (e.target.classList.contains('qta-input')) {
                const prodottoId = e.target.getAttribute('data-id');
                const quantita = parseInt(e.target.value);
                if (quantita > 0) {
                    const res = await fetch(BASE_URL + '/shopping/update', {
                        method: 'PATCH',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
                        body: JSON.stringify({ prodotto_id: prodottoId, quantita })
                    });
                    if (res.ok) fetchBag();
                }
            }
        });
    }

    fetchBag();
});
