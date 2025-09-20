//Validazione lato client della registrazione dell'utente
const BASE_URL = 'http://localhost/progetto_esame/public';

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('form').addEventListener('submit', function (e) {
    let valid = true;
    let msg = '';
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const conferma = document.getElementById('conferma').value;
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
      msg = 'La password deve essere più lunga di 8 caratteri e contenere almeno una lettera minuscola, una maiuscola, un numero e un carattere speciale';
    }
    if (!valid) {
      e.preventDefault();
      document.getElementById('msg').textContent = msg;
    }
  });

  document.getElementById('login').addEventListener('click', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    if (!username || !password) {
      document.getElementById('msg').textContent = 'Compilare tutti i campi';
      return;
    }
    const params = { username: username, password: password };
    login(params);
  });

  async function login(params) {
    try {
      const response = await fetch(BASE_URL + '/do_login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': window.csrfToken
        },
        body: JSON.stringify(params)
      });
      if (!response.ok) {
        const errorData = await response.json();
        document.getElementById('msg').textContent = errorData.error || 'Errore durante il login';
        return;
      }
      const data = await response.json();
      if (data.token) {
        const token = data.token;
        localStorage.setItem('auth_token', token);
      }

      window.location.href = '/home';
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('msg').textContent = 'Errore durante il login';
    }
  }
});
