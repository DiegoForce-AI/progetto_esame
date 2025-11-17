const BASE_URL = 'http://127.0.0.1:8000';

// Selettore del form (Slide 50 file 05)
const checkoutForm = document.querySelector('#checkout-form');

// --- Funzioni di supporto Fetch (Slide 24-25 file 08) ---

function onResponse(response) {
    // Gestione redirect del server (Slide 1188 concetto generale HTTP)
    if (response.redirected) {
        window.location.href = response.url;
        return null; // Interrompe la catena
    }
    
    // Controllo stato HTTP
    if (!response.ok) {
        console.log('Risposta non valida');
        // Lanciamo un errore per finire nel blocco onError
        throw new Error('Network response was not ok');
    }
    
    // Il server restituisce HTML (text), non JSON
    return response.text(); 
}

function onError(error) {
    console.log('Error: ' + error);
    alert('Errore di rete.');
    
    // Riabilita il bottone in caso di errore
    if (checkoutForm) {
        const submitBtn = checkoutForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = false;
    }
}

// --- Gestione dell'HTML ricevuto ---

function onHtml(html) {
    // Se onResponse ha restituito null (redirect), ci fermiamo
    if (!html) return;

    // Sostituzione del contenuto della pagina
    document.body.innerHTML = html;

    // Ricreazione script di redirect (Slide 75 file 05 - createElement)
    // Nota: gli script inseriti via innerHTML non vengono eseguiti automaticamente dal browser
    const redirectScript = document.createElement('script');
    redirectScript.textContent = "setTimeout(function(){window.location.href='" + BASE_URL + "/home';},2000);";
    document.body.appendChild(redirectScript); // Slide 76 file 05
}

// --- Gestione Submit ---

function onCheckoutSubmit(e) {
    e.preventDefault(); // Slide 517 file 09

    const submitBtn = checkoutForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    // Recupero CSRF Token
    const metaToken = document.querySelector('meta[name="csrf-token"]');
    const csrfToken = metaToken ? metaToken.getAttribute('content') : '';

    // Preparazione dati (Slide 39 file 09)
    // Usiamo URLSearchParams per inviare formato application/x-www-form-urlencoded
    const formData = new FormData(checkoutForm);
    const bodyData = new URLSearchParams(formData);

    fetch(BASE_URL + '/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Slide 37 file 09
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': csrfToken
        },
        body: bodyData
    })
    .then(onResponse, onError) // Slide 12 file 08
    .then(onHtml);
}

// Assegnazione Event Listener
if (checkoutForm) {
    checkoutForm.addEventListener('submit', onCheckoutSubmit);
}