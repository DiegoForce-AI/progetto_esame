//SISTEMATO

// Selettori (Slide 50)
const form = document.querySelector('form');
const msgElem = document.querySelector('#msg');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const confermaInput = document.querySelector('#conferma');

const REGISTER_URL = 'http://127.0.0.1:8000/register';
const LOGIN_URL = 'http://127.0.0.1:8000/login';

// --- Funzioni di pulizia ---
function clearMessage() {
    if (msgElem.textContent) {
        msgElem.textContent = '';
    }
}

usernameInput.addEventListener('input', clearMessage);
passwordInput.addEventListener('input', clearMessage);
confermaInput.addEventListener('input', clearMessage);

// --- GESTIONE RISPOSTA (MODIFICATA PER GESTIRE IL REDIRECT 302) ---
function onResponse(response) {
    // 1. Controllo se la fetch ha seguito un redirect automatico del server
    // (La proprietà 'redirected' è standard nell'oggetto Response della Fetch API)
    if (response.redirected) {
        // Se il server ci ha reindirizzato (es. alla home o login), seguiamo col browser
        window.location.href = response.url;
        return null; // Interrompiamo la catena delle promise qui
    }

    // 2. Controllo se la risposta è valida JSON (Slide 60-63)
    // Se response.ok è false (es. errore 422 validazione), leggiamo comunque il JSON degli errori
    return response.json();
}

function onError(error) {
    console.log('Error: ' + error);
    msgElem.textContent = 'Errore di connessione.';
    msgElem.style.color = 'red';
}

function onRegisterJson(data) {
    // Se data è null, significa che onResponse ha gestito un redirect 
    // o c'è stato un errore. Non facciamo nulla.
    if (!data) {
        return;
    }

    // Se siamo qui, abbiamo ricevuto un JSON (probabilmente errori di validazione)
    
    // Controllo successo esplicito (Slide 223-242 struttura JSON)
    if (data.success || data.id) {
        // Caso raro in cui il server risponde JSON 200 OK invece di redirect
        window.location.href = LOGIN_URL;
    } else {
        // Gestione Errori (es. username occupato)
        let messaggio = data.message || 'Errore durante la registrazione';
        
        // Se ci sono errori dettagliati (formato standard Laravel/Frameworks)
        if (data.errors) {
            const keys = Object.keys(data.errors); // Prende le chiavi dell'oggetto (Slide 1131)
            if (keys.length > 0) {
                // Prende il primo messaggio del primo errore
                messaggio = data.errors[keys[0]][0];
            }
        }
        
        msgElem.textContent = messaggio;
        
    }
}

// --- GESTIONE SUBMIT ---
function onSubmit(e) {
    e.preventDefault(); // Slide 173
    
    let valid = true;
    let msg = '';

    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const conferma = confermaInput.value;

    // Regex
    const regexLower = /[a-z]/;
    const regexUpper = /[A-Z]/;
    const regexNumber = /[0-9]/;
    const regexSpecial = /[\W_]/;

    if (!username || !password || !conferma) {
        valid = false;
        msg = 'Compilare tutti i campi';
    } else if (password !== conferma) {
        valid = false;
        msg = 'Le password non corrispondono';
    } else if (
        password.length < 8 ||
        !regexLower.test(password) ||
        !regexUpper.test(password) ||
        !regexNumber.test(password) ||
        !regexSpecial.test(password)
    ) {
        valid = false;
        msg = 'La password non rispetta i requisiti di sicurezza';
    }

    if (!valid) {
        msgElem.textContent = msg;
        msgElem.style.color = 'red';
    } else {
        const formData = new FormData(form);
        // Recupero token CSRF (Slide 1190 uso di querySelector)
        const tokenInput = document.querySelector('input[name="_token"]');
        const csrfToken = tokenInput ? tokenInput.value : '';

        fetch(REGISTER_URL, {
            method: 'POST',
            headers: {
                // Lasciamo Accept JSON per provare a ottenere JSON,
                // ma il codice ora gestisce anche se il server lo ignora.
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': csrfToken
            },
            body: formData
        })
        .then(onResponse, onError) // Slide 139-141
        .then(onRegisterJson);
    }
}

form.addEventListener('submit', onSubmit); // Slide 1206