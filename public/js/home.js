//SISTEMATO


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
            oldError.remove(); // Rimuovere elementi [cite: 1399]
        }

        const errorDiv = document.createElement('div'); // Creazione elemento [cite: 1391]
        errorDiv.id = 'hamburger-search-error';

        // Logica errore/successo
        if (!data) {
             errorDiv.textContent = 'Errore durante la ricerca.'; // Imposta contenuto testuale [cite: 1378]
        } else if (data.success && data.product && data.product.id) {
            // Reindirizzamento in caso di successo
            location.href = location.origin + '/prodotto/' + data.product.id;
            return; // Esci dopo il reindirizzamento
        } else {
            errorDiv.textContent = data.message; 
            if (!errorDiv.textContent) errorDiv.textContent = 'Prodotto non trovato';
        }
        
        // --- LA MODIFICA CHIAVE BASATA SULLE SLIDE ---
        const parent = hamburgerSearchForm.parentNode; // Trova il genitore 
        
        // Inserisce l'elemento errorDiv come fratello, subito DOPO hamburgerSearchForm
        // Inserisci l'errore PRIMA del prossimo elemento (nextSibling), che in pratica è DOPO l'elemento di riferimento.
        if (parent) {
             parent.insertBefore(errorDiv, hamburgerSearchForm.nextSibling); 
        }
        // ---------------------------------------------
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
        accountDropdown.classList.toggle('show');
    });

    document.addEventListener('click', function(e) {
        if (!accountBtn.contains(e.target) && !accountDropdown.contains(e.target)) {
            accountDropdown.classList.remove('show');
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
        
        searchDropdown.classList.toggle('show');
        
if (searchDropdown.classList.contains('show')){
    searchInput.focus();
}
    });

    document.addEventListener('click', function(e) {
        if (!searchBtn.contains(e.target) && !searchDropdown.contains(e.target)) {
            searchDropdown.classList.remove('show');
        }
    });
}


// --- 5. Submit Ricerca Prodotto (Desktop) ---
const searchForm = document.querySelector('#search-form');

if (searchForm && searchInput) {
    const resultDiv = document.querySelector('#result');
    // Nascondi div risultato all'avvio usando lo stile
    if (resultDiv) resultDiv.classList.add('hidden'); // [cite: 1465]

    function onSearchJson(data) {
        // Puliamo sempre all'inizio
        if (resultDiv) {
            resultDiv.innerHTML = ''; 
            resultDiv.classList.remove('search-result-error');
        }

        if (!data) { 
            if (resultDiv) {
                resultDiv.classList.remove('hidden');
                // Usiamo un singolo elemento <p> per il testo
                const p = document.createElement('p'); 
                p.textContent = 'Errore durante la ricerca.';
                
                // 💡 Aggiungiamo la classe CSS per lo stile e lo z-index
                resultDiv.classList.add('search-result-error'); 
                resultDiv.appendChild(p);
            }
            return;
        }

        if (data.success && data.product && data.product.id) {
            location.href = location.origin + '/prodotto/' + data.product.id;
        } else {
            if (resultDiv) {
                resultDiv.classList.remove('hidden');
                const p = document.createElement('p');
                p.textContent = data.message;
                if(!p.textContent) p.textContent = 'Prodotto non trovato';
                
                // 💡 Aggiungiamo la classe CSS per lo stile e lo z-index
                resultDiv.classList.add('search-result-error'); 
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
        
        const isOpen = navLinks.classList.contains('open'); // [cite: 1369] (concetto di verificare classi)
        
        if (isMobile && isOpen) {
            hamburgerExtras.classList.add('show')
        } else {
            hamburgerExtras.classList.remove('show');
        }
    }

    hamburgerBtn.addEventListener('click', updateHamburgerExtras);
    window.addEventListener('resize', updateHamburgerExtras);
    
    document.addEventListener('click', function(e) {
        if (!hamburgerBtn.contains(e.target) && !navLinks.contains(e.target)) {
            hamburgerExtras.classList.remove('show');
        }
    });
}