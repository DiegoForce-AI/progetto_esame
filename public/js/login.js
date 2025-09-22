// Gestione errori e login AJAX

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const msgElem = document.getElementById('msg');

  // Nascondi il messaggio di errore all'avvio
  if (msgElem) msgElem.style.display = 'none';

  form.addEventListener('submit', async function (e) {
    let valid = true;
    let errorMsg = '';
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    if (!username || !password) {
      valid = false;
      errorMsg = 'Compilare tutti i campi';
    }
    if (!valid) {
      e.preventDefault();
      msgElem.textContent = errorMsg;
      msgElem.style.display = 'block';
      return;
    }
    // Gestione login AJAX
    e.preventDefault();
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      const response = await fetch('/do_login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (!response.ok) {
        msgElem.textContent = data.error || 'Errore durante il login';
        msgElem.style.display = 'block';
        return;
      }
      if (data.success && data.redirect) {
        window.location.href = data.redirect;
      }
    } catch (err) {
      msgElem.textContent = 'Errore durante il login';
      msgElem.style.display = 'block';
    }
  });

  // Nascondi il messaggio di errore quando l'utente inizia a scrivere
  document.getElementById('username').addEventListener('input', function () {
    if (msgElem.textContent) {
      msgElem.textContent = '';
      msgElem.style.display = 'none';
    }
  });
  document.getElementById('password').addEventListener('input', function () {
    if (msgElem.textContent) {
      msgElem.textContent = '';
      msgElem.style.display = 'none';
    }
  });
});
