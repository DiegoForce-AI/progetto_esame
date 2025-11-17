const CLIENT_ID = '20e85ef50f67458696d40b008bb02b26';
const CLIENT_SECRET = 'd0e7d5a0c0f94acba817393e0d241557';

// --- Funzioni di supporto (Slide 25 - File 08) ---

function onResponse(response) {
    if (!response.ok) {
        console.log('Risposta non valida');
        return null;
    }
    return response.json();
}

function onError(error) {
    console.log('Error: ' + error);
}

// Funzione specifica per estrarre il token dal JSON (Slide 41 - File 09)
function onTokenJson(data) {
    if (!data) return null;
    return data.access_token;
}

// --- Richiesta Token ---

export function requestToken() {
    // Fetch POST configurata come da Slide 41 (File 09)
    return fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: 'grant_type=client_credentials', // Slide 2178: body come stringa
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // Slide 2183: Basic Auth con btoa
            'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
        }
    })
    .then(onResponse, onError) // Slide 150 (File 08)
    .then(onTokenJson);        // Restituisce il token alla catena successiva
}