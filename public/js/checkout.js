const BASE_URL = 'http://127.0.0.1:8000';

const checkoutForm = document.querySelector('#checkout-form');

function onResponse(response) {
    if (response.redirected) {
        location.href = response.url;
        return null;
    }
    if (!response.ok) {
        console.log('Risposta non valida');
        return null;
    }
    return response.text();
}

function onError(error) {
    console.log('Error: ' + error);
    alert('Errore di rete.');
    if (checkoutForm) {
        const submitBtn = checkoutForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = false;
    }
}

function onHtml(html) {
    if (!html) return;
    document.body.innerHTML = html;
    const redirectScript = document.createElement('script');
    redirectScript.textContent = "setTimeout(function(){location.href='" + BASE_URL + "/home';},2000);";
    document.body.appendChild(redirectScript);
}

function onCheckoutSubmit(e) {
    e.preventDefault();
    const submitBtn = checkoutForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    const metaToken = document.querySelector('meta[name="csrf-token"]');
    const csrfToken = metaToken ? metaToken.getAttribute('content') : '';
    const formData = new FormData(checkoutForm);
    const bodyData = new URLSearchParams(formData);
    fetch(BASE_URL + '/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': csrfToken
        },
        body: bodyData
    })
    .then(onResponse, onError)
    .then(onHtml);
}

if (checkoutForm) {
    checkoutForm.addEventListener('submit', onCheckoutSubmit);
}