// Base URL dinamico
if (!window.BASE_URL) {
    window.BASE_URL = 'http://127.0.0.1:8000';
}
window.BASE_URL = 'http://127.0.0.1:8000';
const shoppingItemsDiv = document.getElementById('shopping-items');

    // Funzione per caricare i prodotti del carrello tramite index del CartController
    async function index() {
        try {
            const res = await fetch(BASE_URL + '/shopping', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            if (res.ok) {
                const json = await res.json();
                const prodotti = json.cart || [];
                if (!shoppingItemsDiv) return;
                if (prodotti.length === 0) {
                    shoppingItemsDiv.innerHTML = '<p>La shopping bag è vuota.</p>';
                    return;
                }
                shoppingItemsDiv.innerHTML = prodotti.map((item) => `
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
            } else {
                shoppingItemsDiv.innerHTML = '<p>Errore nel caricamento del carrello.</p>';
            }
        } catch (err) {
            shoppingItemsDiv.innerHTML = '<p>Errore di rete.</p>';
        }
    }

    // Usa il CSRF token dal meta
    const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');

    if (shoppingItemsDiv) {
        shoppingItemsDiv.addEventListener('click', async function (e) {
            if (e.target.classList.contains('remove-btn')) {
                const prodottoId = e.target.getAttribute('data-id');
                const res = await fetch(BASE_URL + '/shopping/remove?prodotto_id=' + prodottoId, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
                });
                if (res.ok) index();
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
                    if (res.ok) {
                        setTimeout(() => {
                            index();
                        }, 500);
                    }
                }
            }
        });
    }

    // Chiamala all'avvio per mostrare il carrello
    index();
