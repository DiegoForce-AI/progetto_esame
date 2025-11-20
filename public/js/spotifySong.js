 import { requestToken } from './spotifyToken.js';

const container = document.querySelector('#song-container');

// --- 1. Creazione Form Ricerca ---
const searchForm = document.createElement('form');
searchForm.classList.add('spotify-search-form');

const input = document.createElement('input');
input.type = 'text';
input.id = 'song-name-input';
input.classList.add('spotify-search-input');
input.placeholder = 'Cerca canzone...';
input.required = true;

const button = document.createElement('button');
button.type = 'submit';
button.classList.add('spotify-search-btn');
button.textContent = 'Cerca';

searchForm.appendChild(input);
searchForm.appendChild(button);

if (container && container.parentNode) {
    container.parentNode.insertBefore(searchForm, container);
    // Best Practice: Nascondi il contenitore all'avvio usando le classi CSS
    container.classList.add('hidden');
}

// --- 2. Funzioni Supporto Fetch ---

function onResponse(response) {
    if (!response.ok) {
        console.log('Risposta non valida');
        return null; 
    }
    return response.json();
}

function onError(error) {
    console.log('Error: ' + error);
    if (container) {
        container.innerHTML = ''; 
        const p = document.createElement('p');
        p.textContent = 'Errore di connessione: ' + error;
        p.classList.add('error-msg'); // Uso classe CSS per coerenza
        container.appendChild(p);
    }
}

// --- 3. Logica Risultati Ricerca ---

function onSearchJson(data) {
    container.innerHTML = ''; 
    // Mostriamo il contenitore rimuovendo la classe hidden
    container.classList.remove('hidden');

    if (!data || !data.tracks || !data.tracks.items.length) {
        const p = document.createElement('p');
        p.textContent = 'Nessuna canzone trovata.';
        container.appendChild(p);
        return;
    }

    const h3 = document.createElement('h3');
    h3.textContent = 'Risultati:';
    container.appendChild(h3);

    const listDiv = document.createElement('div');
    listDiv.classList.add('spotify-result-list');

    const tracks = data.tracks.items;
    for (const track of tracks) {
        const card = document.createElement('div');
        card.classList.add('spotify-result-card');
        card.dataset.trackId = track.id; 

        // Immagine
        const img = document.createElement('img');
        if (track.album.images && track.album.images.length > 0) {
            img.src = track.album.images[0].url;
        }
        img.alt = track.name;
        img.classList.add('spotify-result-img');
        card.appendChild(img);

        // Info
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('spotify-result-info');

        const title = document.createElement('div');
        title.classList.add('spotify-result-title');
        title.textContent = track.name;
        infoDiv.appendChild(title);

        const artist = document.createElement('div');
        artist.classList.add('spotify-result-artist');
        let artists = [];
        for (const a of track.artists) artists.push(a.name);
        artist.textContent = artists.join(', ');
        infoDiv.appendChild(artist);

        card.appendChild(infoDiv);

        // Evento Click
        card.addEventListener('click', onTrackClick);

        listDiv.appendChild(card);
    }
    container.appendChild(listDiv);
}

// --- REFACTORING: Funzione nominata interna ---
function searchTracks(query) {
    // Definiamo l'handler qui per mantenere l'accesso a 'query' (Closure)
    function onTokenReceived(token) {
        // URL per la ricerca tracce (confermato proxy .../9 per search track)
        const url = 'https://api.spotify.com/v1/search?q=' + encodeURIComponent(query) + '&type=track';
        
        fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(onResponse, onError)
        .then(onSearchJson);
    }

    // Chiamata pulita
    requestToken().then(onTokenReceived);
}

function onSubmit(e) {
    e.preventDefault();
    const query = input.value.trim();
    
    if (!query) {
        container.classList.add('hidden');
        return;
    }

    container.classList.remove('hidden');
    container.innerHTML = '';
    const p = document.createElement('p');
    p.textContent = 'Caricamento...';
    container.appendChild(p);

    searchTracks(query);
}

searchForm.addEventListener('submit', onSubmit);


// --- 4. Logica Dettaglio Canzone ---

function onTrackDetailJson(data) {
    if (!data) {
        container.innerHTML = '';
        const p = document.createElement('p');
        p.textContent = 'Impossibile caricare i dettagli della canzone.';
        container.appendChild(p);
        return;
    }

    container.innerHTML = '';

    const albumCard = document.createElement('div');
    albumCard.classList.add('spotify-album-card');

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('spotify-album-info');

    // Titolo
    const title = document.createElement('div');
    title.classList.add('spotify-album-title');
    title.textContent = data.name;
    infoDiv.appendChild(title);

    // Artista
    const metaArtist = document.createElement('div');
    metaArtist.classList.add('spotify-album-meta');
    let artists = [];
    if(data.artists) {
        for(const a of data.artists) artists.push(a.name);
    }
    metaArtist.textContent = 'Artista: ' + artists.join(', ');
    infoDiv.appendChild(metaArtist);

    // Album
    const metaAlbum = document.createElement('div');
    metaAlbum.classList.add('spotify-album-meta');
    metaAlbum.textContent = 'Album: ' + (data.album ? data.album.name : 'N/A');
    infoDiv.appendChild(metaAlbum);

    // Durata
    const metaDuration = document.createElement('div');
    metaDuration.classList.add('spotify-album-meta');
    const minutes = Math.floor(data.duration_ms / 60000);
    let seconds = Math.floor((data.duration_ms % 60000) / 1000);
    const secondsStr = seconds < 10 ? '0' + seconds : seconds;
    metaDuration.textContent = 'Durata: ' + minutes + ':' + secondsStr;
    infoDiv.appendChild(metaDuration);

    albumCard.appendChild(infoDiv);

    // Immagine Grande
    if (data.album && data.album.images && data.album.images.length > 0) {
        const img = document.createElement('img');
        img.src = data.album.images[0].url;
        img.alt = data.name;
        img.classList.add('spotify-album-cover');
        albumCard.appendChild(img);
    }
    container.appendChild(albumCard);

    // Tasto Indietro
    const backBtn = document.createElement('a');
    backBtn.href = '#';
    backBtn.classList.add('spotify-back-btn');
    backBtn.textContent = 'Torna ai risultati';
    backBtn.addEventListener('click', function(e) {
        e.preventDefault();
        searchForm.dispatchEvent(new Event('submit'));
    });
    container.appendChild(backBtn);
}

// --- REFACTORING: Funzione nominata interna ---
function onTrackClick(event) {
    const card = event.currentTarget;
    const trackId = card.dataset.trackId;

    container.innerHTML = '';
    const p = document.createElement('p');
    p.textContent = 'Caricamento canzone...';
    container.appendChild(p);

    // Funzione handler per il token
    function onTokenReceived(token) {
        // URL per dettaglio traccia (confermato proxy .../10)
        const url = 'https://api.spotify.com/v1/tracks/' + trackId;
        
        fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(onResponse, onError)
        .then(onTrackDetailJson);
    }

    // Chiamata pulita
    requestToken().then(onTokenReceived);
}