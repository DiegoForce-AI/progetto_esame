import { requestToken } from './spotifyToken.js';

const container = document.querySelector('#album-container');

// --- 1. Creazione Form di Ricerca (DOM) ---
const searchForm = document.createElement('form');
searchForm.classList.add('spotify-search-form-centered');

const input = document.createElement('input');
input.type = 'text';
input.id = 'album-id-input';
input.classList.add('spotify-search-input');
input.placeholder = 'Cerca album...';
input.required = true;

const button = document.createElement('button');
button.type = 'submit';
button.classList.add('spotify-search-btn');
button.textContent = 'Cerca';

searchForm.appendChild(input);
searchForm.appendChild(button);

if (container && container.parentNode) {
    container.parentNode.insertBefore(searchForm, container);
    container.style.display = 'none';
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
        container.innerHTML = '';
        const p = document.createElement('p');
        p.textContent = 'Errore di connessione: ' + error;
        p.style.color = 'red';
        container.appendChild(p);
    }
}

// --- 3. Logica Ricerca Album ---

function onSearchJson(data) {
    container.innerHTML = ''; 
    container.style.display = 'block';

    if (!data || !data.albums || !data.albums.items.length) {
        const p = document.createElement('p');
        p.textContent = 'Nessun album trovato.';
        container.appendChild(p);
        return;
    }

    const h3 = document.createElement('h3');
    h3.textContent = 'Risultati:';
    container.appendChild(h3);

    const listDiv = document.createElement('div');
    listDiv.classList.add('spotify-result-list');

    const albums = data.albums.items;
    // Iterazione (Slide 34 file 05)
    for (const album of albums) {
        const card = document.createElement('div');
        card.classList.add('spotify-result-card');
        // Salviamo ID nel dataset (Slide 34 file 06)
        card.dataset.albumId = album.id; 

        // Immagine
        const img = document.createElement('img');
        if (album.images && album.images.length > 0) {
            img.src = album.images[0].url;
        }
        img.alt = album.name;
        img.classList.add('spotify-result-img');
        card.appendChild(img);

        // Info Container
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('spotify-result-info');

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('spotify-result-title');
        titleDiv.textContent = album.name;
        infoDiv.appendChild(titleDiv);

        const artistDiv = document.createElement('div');
        artistDiv.classList.add('spotify-result-artist');
        let artistNames = [];
        for (const artist of album.artists) {
            artistNames.push(artist.name);
        }
        artistDiv.textContent = artistNames.join(', ');
        infoDiv.appendChild(artistDiv);

        const dateDiv = document.createElement('div');
        dateDiv.classList.add('spotify-result-meta');
        dateDiv.textContent = album.release_date;
        infoDiv.appendChild(dateDiv);

        card.appendChild(infoDiv);
        
        // Event Listener Click (Slide 53 file 05)
        card.addEventListener('click', onCardClick);
        
        listDiv.appendChild(card);
    }
    container.appendChild(listDiv);
}

function searchAlbums(query) {
    requestToken().then(function(token) {
        // URL UFFICIALE SPOTIFY (Sostituisce il proxy numerico)
        // Slide 43 file 09: Esempio ricerca album
        const url = 'https://api.spotify.com/v1/search?type=album&q=' + encodeURIComponent(query);
        
        fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(onResponse, onError)
        .then(onSearchJson);
    });
}

function onSubmit(e) {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'block';
    container.textContent = 'Caricamento...';
    
    searchAlbums(query);
}

searchForm.addEventListener('submit', onSubmit);


// --- 4. Logica Dettaglio Album ---

function onAlbumDetailsJson(data) {
    // FIX CRITICO: Se data è null (errore fetch), mostriamo errore invece di bloccarci
    if (!data) {
        container.innerHTML = '';
        const p = document.createElement('p');
        p.textContent = 'Impossibile caricare i dettagli dell\'album.';
        container.appendChild(p);
        return;
    }

    container.innerHTML = ''; // Pulizia

    // Tasto Indietro
    const backBtn = document.createElement('a');
    backBtn.href = '#';
    backBtn.classList.add('spotify-back-btn');
    backBtn.textContent = 'Torna ai risultati';
    backBtn.addEventListener('click', function(e) {
        e.preventDefault();
        searchForm.dispatchEvent(new Event('submit')); // Ricarica ricerca
    });
    container.appendChild(backBtn);

    // Card Dettaglio
    const albumCard = document.createElement('div');
    albumCard.classList.add('spotify-album-card');

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('spotify-album-info');

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('spotify-album-title');
    titleDiv.textContent = data.name;
    infoDiv.appendChild(titleDiv);

    const metaArtist = document.createElement('div');
    metaArtist.classList.add('spotify-album-meta');
    let artists = [];
    if (data.artists) {
        for(const art of data.artists) artists.push(art.name);
    }
    metaArtist.textContent = 'Artista: ' + artists.join(', ');
    infoDiv.appendChild(metaArtist);

    const metaDate = document.createElement('div');
    metaDate.classList.add('spotify-album-meta');
    metaDate.textContent = 'Data di rilascio: ' + data.release_date;
    infoDiv.appendChild(metaDate);

    albumCard.appendChild(infoDiv);

    // Cover
    if (data.images && data.images.length > 0) {
        const cover = document.createElement('img');
        cover.src = data.images[0].url;
        cover.alt = data.name;
        cover.classList.add('spotify-album-cover');
        albumCard.appendChild(cover);
    }
    container.appendChild(albumCard);

    // Lista Tracce
    const tracksContainer = document.createElement('div');
    tracksContainer.classList.add('spotify-album-tracks');

    const tracksTitle = document.createElement('div');
    tracksTitle.classList.add('spotify-album-tracks-title');
    tracksTitle.textContent = 'Tracce:';
    tracksContainer.appendChild(tracksTitle);

    const ul = document.createElement('ul');
    ul.classList.add('spotify-album-tracks-list');

    if (data.tracks && data.tracks.items) {
        for (const track of data.tracks.items) {
            const li = document.createElement('li');
            
            const minutes = Math.floor(track.duration_ms / 60000);
            let seconds = Math.floor((track.duration_ms % 60000) / 1000);
            const secondsStr = seconds < 10 ? '0' + seconds : seconds;

            li.textContent = track.track_number + '. ' + track.name + ' (' + minutes + ':' + secondsStr + ')';
            ul.appendChild(li);
        }
    }
    tracksContainer.appendChild(ul);
    container.appendChild(tracksContainer);
}

function onCardClick(event) {
    const card = event.currentTarget; 
    const albumId = card.dataset.albumId;

    container.innerHTML = '';
    const p = document.createElement('p');
    p.textContent = 'Caricamento album...';
    container.appendChild(p);

    requestToken().then(function(token) {
        // URL UFFICIALE SPOTIFY per Dettaglio Album
        // Sostituisce il proxy ".../0" che probabilmente dava problemi
        const url = 'https://api.spotify.com/v1/albums/' + albumId;

        fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(onResponse, onError)
        .then(onAlbumDetailsJson);
    });
}