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
}

// --- 2. Funzioni Supporto Fetch (Slide 25 file 08) ---

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
        container.innerHTML = ''; // Pulisce "Caricamento..."
        const p = document.createElement('p');
        p.textContent = 'Errore di connessione: ' + error;
        p.style.color = 'red'; // Opzionale per evidenziare l'errore
        container.appendChild(p);
    }
}

// --- 3. Logica Risultati Ricerca ---

function onSearchJson(data) {
    container.innerHTML = ''; 

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
        card.dataset.trackId = track.id; // Slide 34 file 06

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

        // Evento Click per Dettaglio
        card.addEventListener('click', onTrackClick);

        listDiv.appendChild(card);
    }
    container.appendChild(listDiv);
}

function searchTracks(query) {
    requestToken().then(function(token) {
        // URL Ufficiale Spotify per la ricerca
        // Il proxy ".../1" spesso equivale a questo, ma l'ufficiale è più sicuro
        const url = 'https://api.spotify.com/v1/search?q=' + encodeURIComponent(query) + '&type=track';
        
        fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + token // Slide 43 file 09
            }
        })
        .then(onResponse, onError)
        .then(onSearchJson);
    });
}

function onSubmit(e) {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    container.innerHTML = '';
    const p = document.createElement('p');
    p.textContent = 'Caricamento...';
    container.appendChild(p);

    searchTracks(query);
}

searchForm.addEventListener('submit', onSubmit);


// --- 4. Logica Dettaglio Canzone ---

function onTrackDetailJson(data) {
    // FIX: Se data è null (errore precedente), puliamo la vista e mostriamo errore
    if (!data) {
        container.innerHTML = '';
        const p = document.createElement('p');
        p.textContent = 'Impossibile caricare i dettagli della canzone.';
        container.appendChild(p);
        return;
    }

    container.innerHTML = '';

    // Card Dettaglio
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

function onTrackClick(event) {
    // Usa currentTarget per prendere il div corretto anche se clicchi sull'immagine interna
    const card = event.currentTarget;
    const trackId = card.dataset.trackId;

    container.innerHTML = '';
    const p = document.createElement('p');
    p.textContent = 'Caricamento canzone...';
    container.appendChild(p);

    requestToken().then(function(token) {
        // FIX: URL Ufficiale per i dettagli della traccia
        // Il proxy ".../10" probabilmente non funzionava
        const url = 'https://api.spotify.com/v1/tracks/' + trackId;
        
        fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(onResponse, onError)
        .then(onTrackDetailJson);
    });
}