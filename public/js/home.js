// Funzione generica per gestire la risposta fetch (Slide 24, 25)
function onResponse(response) {
    // Verifichiamo se lo stato è ok
    if (!response.ok) {
        console.log('Risposta non valida');
        return null; // Restituisce una promise che risolverà a null nel prossimo then
    }
    return response.json(); // Restituisce la promise del JSON [cite: 1774]
}

// Funzione generica per errori di rete (Slide 13)
function onError(error) {
    console.log('Error: ' + error);
}

// --- 1. Ricerca Hamburger Menu (Mobile) ---
const hamburgerSearchForm = document.querySelector('#hamburger-search-form'); // 

if (hamburgerSearchForm) {
    const hamburgerSearchInput = hamburgerSearchForm.querySelector('input[name="nome"]');

    function onHamburgerJson(data) {
        // Rimuovi eventuale messaggio precedente
        const oldError = document.querySelector('#hamburger-search-error');
        if (oldError) {
            oldError.remove(); // [cite: 1443]
        }

        // Gestione dati null (errore fetch)
        if (!data) {
             const errorDiv = document.createElement('div'); // 
             errorDiv.id = 'hamburger-search-error';
             errorDiv.textContent = 'Errore durante la ricerca.'; // [cite: 1422]
             hamburgerSearchForm.appendChild(errorDiv); // [cite: 1436]
             return;
        }

        // Verifica logica dei dati ricevuti
        if (data.success && data.product && data.product.id) {
            // Reindirizzamento (window.location standard JS)
            window.location.href = window.location.origin + '/prodotto/' + data.product.id;
        } else {
            const errorDiv = document.createElement('div');
            errorDiv.id = 'hamburger-search-error';
            errorDiv.textContent = data.message; 
            // Fallback se il messaggio è vuoto
            if (!errorDiv.textContent) errorDiv.textContent = 'Prodotto non trovato';
            hamburgerSearchForm.appendChild(errorDiv);
        }
    }

    function handleHamburgerSubmit(e) {
        e.preventDefault(); // [cite: 604]
        const name = hamburgerSearchInput.value;
        
        // URL inserito direttamente nella fetch
        fetch('http://127.0.0.1:8000/prodotti/search?nome=' + encodeURIComponent(name)) // [cite: 1527]
            .then(onResponse, onError) // [cite: 1644]
            .then(onHamburgerJson);    // [cite: 1655]
    }

    hamburgerSearchForm.addEventListener('submit', handleHamburgerSubmit); // [cite: 1250]
}


// --- 2. Hamburger Menu Toggle ---
const hamburgerBtn = document.querySelector('#hamburger-btn');
const navLinks = document.querySelector('#nav-links');

if (hamburgerBtn && navLinks) {
    const hamburgerIcon = hamburgerBtn.querySelector('.hamburger-icon');

    function toggleMenu() {
        // Toggle della classe CSS
        navLinks.classList.toggle('open'); // [cite: 1372] (implicito toggle, slide mostra add/remove)
        
        const isOpen = navLinks.classList.contains('open');
        hamburgerBtn.setAttribute('aria-expanded', isOpen);
        
        if (hamburgerIcon) {
            // innerHTML per entità HTML (Slide 76 menziona innerHTML)
            if (isOpen) {
                hamburgerIcon.innerHTML = '&#10005;'; 
            } else {
                hamburgerIcon.innerHTML = '&#9776;';
            }
        }
    }

    hamburgerBtn.addEventListener('click', toggleMenu);

    // Chiudi se clicchi fuori
    document.addEventListener('click', function(e) {
        if (!hamburgerBtn.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('open'); // [cite: 1375]
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            if (hamburgerIcon) hamburgerIcon.innerHTML = '&#9776;';
        }
    });
}


// --- 3. Profilo Utente ---
const accountBtn = document.querySelector('#account-btn');
const accountDropdown = document.querySelector('#account-dropdown');

if (accountBtn && accountDropdown) {
    accountBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Modifica stile direttamente per valori dinamici/toggle (Slide 29)
        if (accountDropdown.style.display === 'block') { // [cite: 739]
            accountDropdown.style.display = 'none';
        } else {
            accountDropdown.style.display = 'block';
        }
    });

    document.addEventListener('click', function(e) {
        if (!accountBtn.contains(e.target) && !accountDropdown.contains(e.target)) {
            accountDropdown.style.display = 'none';
        }
    });
}


// --- 4. Barra di ricerca e Dropdown ---
const searchBtn = document.querySelector('#search-btn');
const searchDropdown = document.querySelector('#search-dropdown');
const searchInput = document.querySelector('#search-input');

if (searchBtn && searchDropdown && searchInput) {
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (searchDropdown.style.display === 'block') {
            searchDropdown.style.display = 'none';
        } else {
            searchDropdown.style.display = 'block';
            searchInput.focus();
        }
    });

    document.addEventListener('click', function(e) {
        if (!searchBtn.contains(e.target) && !searchDropdown.contains(e.target)) {
            searchDropdown.style.display = 'none';
        }
    });
}


// --- 5. Submit Ricerca Prodotto (Desktop) ---
const searchForm = document.querySelector('#search-form');

if (searchForm && searchInput) {
    const resultDiv = document.querySelector('#result');
    // Nascondi div risultato all'avvio usando lo stile
    if (resultDiv) resultDiv.style.display = 'none'; // [cite: 1465]

    function onSearchJson(data) {
        if (!data) { 
            if (resultDiv) {
                resultDiv.style.display = 'block';
                resultDiv.innerHTML = ''; 
                const p = document.createElement('p');
                p.style.color = 'red';
                p.textContent = 'Errore durante la ricerca.';
                resultDiv.appendChild(p);
            }
            return;
        }

        if (data.success && data.product && data.product.id) {
            window.location.href = window.location.origin + '/prodotto/' + data.product.id;
        } else {
            if (resultDiv) {
                resultDiv.style.display = 'block';
                resultDiv.innerHTML = '';
                const p = document.createElement('p');
                p.style.color = 'red';
                p.textContent = data.message;
                if(!p.textContent) p.textContent = 'Prodotto non trovato';
                resultDiv.appendChild(p);
            }
        }
    }

    function handleSearchSubmit(e) {
        e.preventDefault();
        const name = searchInput.value;
        
        // URL inserito direttamente nella fetch
        fetch('http://127.0.0.1:8000/prodotti/search?nome=' + encodeURIComponent(name)) // [cite: 1527]
            .then(onResponse, onError) // [cite: 1546]
            .then(onSearchJson);       // [cite: 1655]
    }

    searchForm.addEventListener('submit', handleSearchSubmit);
}


// --- 6. Footer Hamburger Toggle ---
const footerHamburger = document.querySelector('#footer-hamburger');
const footerApiMenu = document.querySelector('#footer-api-menu');

if (footerHamburger && footerApiMenu) {
    footerHamburger.addEventListener('click', function() {
        footerApiMenu.classList.toggle('open');
    });

    document.addEventListener('click', function(e) {
        if (!footerHamburger.contains(e.target) && !footerApiMenu.contains(e.target)) {
            footerApiMenu.classList.remove('open');
        }
    });
}


// --- 7. Extra Buttons Mobile Visibility ---
const hamburgerExtras = document.querySelector('#hamburger-extra-buttons');

if (hamburgerBtn && hamburgerExtras) {
    function updateHamburgerExtras() {
        const isMobile = window.innerWidth < 1024;
        const isOpen = navLinks.classList.contains('open'); // [cite: 1369] (concetto di verificare classi)
        
        if (isMobile && isOpen) {
            hamburgerExtras.style.display = 'block';
        } else {
            hamburgerExtras.style.display = 'none';
        }
    }

    hamburgerBtn.addEventListener('click', updateHamburgerExtras);
    window.addEventListener('resize', updateHamburgerExtras);
    
    document.addEventListener('click', function(e) {
        if (!hamburgerBtn.contains(e.target) && !navLinks.contains(e.target)) {
            hamburgerExtras.style.display = 'none';
        }
    });
}