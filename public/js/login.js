//SISTEMATO


const form = document.querySelector('#login-form');
const msg = document.querySelector('#msg');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const submitBtn = document.querySelector('#submit');

// --- Funzioni di supporto (come da slide) ---

function checkInputs() {
  if (username.value && password.value) {
    submitBtn.disabled = false;
    submitBtn.classList.add('enabled');
  } else {
    submitBtn.disabled = true;
    submitBtn.classList.remove('enabled');
  }
}

function onResponse(response) {
  if (!response.ok) {
    console.log('Risposta non valida');
    return null;
  }
  return response.json();
}

function onError(error) {
  console.log('Error: ' + error);
  msg.textContent = 'Errore di connessione.';
  msg.classList.remove('success-msg');
  msg.classList.add('error-msg');
}

// --- Gestione JSON con Redirect (window.location) ---

function onJson(data) {
  // Gestione caso errore di rete precedente (onResponse ha restituito null)
  if (!data) {
    msg.textContent = 'Errore di comunicazione col server.';
    msg.classList.remove('success-msg');
    msg.classList.add('error-msg');
    return;
  }

  if (data.success) {
    // Mostriamo un messaggio temporaneo (opzionale, il redirect è quasi istantaneo)
    msg.textContent = 'Login riuscito! Reindirizzamento...';
    msg.classList.remove('error-msg');
    msg.classList.add('success-msg');
    
    // --- QUI LA MODIFICA: REDIRECT AUTOMATICO ---
    // window.location.href dice al browser di caricare un nuovo URL.
    // Usiamo data.redirect se il server lo fornisce, altrimenti '/' (home).
    window.location.href = data.redirect || '/'; 
    
  } else {
    msg.textContent = data.error;
     msg.classList.remove('success-msg');
    msg.style.classList.add('error-msg')
  }
}

function onSubmit(e) {
  e.preventDefault();
  msg.textContent = '';

  msg.classList.remove('success-msg', 'error-msg');

  const formData = new FormData(form);
  const tokenInput = form.querySelector('input[name=_token]');

  // Fetch standard
  fetch(form.action, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': tokenInput ? tokenInput.value : ''
      },
      body: formData
    })
    .then(onResponse, onError)
    .then(onJson);
}

// --- Event Listeners ---
username.addEventListener('input', checkInputs);
password.addEventListener('input', checkInputs);
form.addEventListener('submit', onSubmit);

// Controllo iniziale
checkInputs();