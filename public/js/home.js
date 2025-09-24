window.BASE_URL = window.BASE_URL || 'http://localhost/progetto_esame/public';
const BASE_URL = window.BASE_URL;

document.addEventListener('DOMContentLoaded', function () {
    // Profilo utente
    const btn = document.getElementById('account-btn');
    const dropdown = document.getElementById('account-dropdown');
    if (btn && dropdown) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
        document.addEventListener('click', function (e) {
            if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });
    }

    // Barra di ricerca prodotti
    const searchBtn = document.getElementById('search-btn');
    const searchDropdown = document.getElementById('search-dropdown');
    const searchInput = document.getElementById('search-input');
    if (searchBtn && searchDropdown && searchInput) {
        searchBtn.addEventListener('click', function (e) {
            e.preventDefault();
            searchDropdown.style.display = searchDropdown.style.display === 'block' ? 'none' : 'block';
            if (searchDropdown.style.display === 'block') {
                searchInput.focus();
            }
        });
        document.addEventListener('click', function (e) {
            if (!searchBtn.contains(e.target) && !searchDropdown.contains(e.target)) {
                searchDropdown.style.display = 'none';
            }
        });
    }

    // Submit ricerca prodotto
    const searchForm = document.getElementById('search-form');
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const name = searchInput.value;
            try {
                const response = await fetch(`${BASE_URL}/prodotti/search?nome=${encodeURIComponent(name)}`);
                const data = await response.json();
                if (data.success && data.product && data.product.id) {
                    window.location.href = window.location.origin + '/progetto_esame/public/prodotto/' + data.product.id;
                } else {
                    const resultDiv = document.getElementById('result');
                    if (resultDiv) {
                        resultDiv.style.display = 'block';
                        resultDiv.innerHTML = `<p style="color:red">${data.message || 'Prodotto non trovato'}</p>`;
                    }
                }
            } catch (err) {
                const resultDiv = document.getElementById('result');
                if (resultDiv) {
                    resultDiv.style.display = 'block';
                    resultDiv.innerHTML = `<p style="color:red">Errore durante la ricerca.</p>`;
                }
            }
        });
        // Nascondi il div result all'avvio
        const resultDiv = document.getElementById('result');
        if (resultDiv) resultDiv.style.display = 'none';
    }
});