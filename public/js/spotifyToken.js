// NOTA: Niente più costanti CLIENT_ID o CLIENT_SECRET qui!

// --- Funzioni di supporto (Slide 25 - File 08) ---

function onResponse(response) {
    // Verifica validità risposta (Slide 491, 494 file 08)
    if (!response.ok) {
        console.log('Risposta non valida');
        return null;
    }
    // Parsing JSON (Slide 695 file 08)
    return response.json();
}

function onError(error) {
    console.log('Error: ' + error);
}

function onTokenJson(data) {
    // Il controller PHP restituisce direttamente il JSON di Spotify
    if (!data || !data.access_token) return null;
    return data.access_token;
}

// --- Richiesta Token ---

export function requestToken() {
    // Fetch verso il TUO server, non verso Spotify
    // Non serve più il metodo POST o gli headers complessi qui,
    // se ne occupa il PHP.
    return fetch('/spotify/token') 
        .then(onResponse, onError) // Concatenazione promise (Slide 563 file 08)
        .then(onTokenJson);
}