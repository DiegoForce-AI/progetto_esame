// Gestione errori form login con div .msg
const BASE_URL = 'http://localhost/progetto_esame/public';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const msgElem = document.getElementById('msg');

  // Nascondi il messaggio di errore all'avvio
  if (msgElem) msgElem.style.display = 'none';

  form.addEventListener('submit', function (e) {
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
    } else {
      msgElem.textContent = '';
      msgElem.style.display = 'none';

    }
  });
});
