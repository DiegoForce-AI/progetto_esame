import { requestToken } from './spotifyToken.js';

async function fetchAlbumData(albumId) {
    const token = await requestToken();
    try {
        const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    const container = document.getElementById('album-container');
    container.style.display = 'none'; // Nascondi di default
    // Crea form di ricerca
    const searchForm = document.createElement('form');
    searchForm.classList.add('spotify-search-form-centered');
    searchForm.innerHTML = `
        <input type="text" id="album-id-input" class="spotify-search-input" placeholder="Cerca album..." required>
        <button type="submit" class="spotify-search-btn">Cerca</button>
    `;
    container.parentNode.insertBefore(searchForm, container);

    // Mostra #album-container solo dopo submit valido
    const albumInput = searchForm.querySelector('#album-id-input');

    searchForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const query = albumInput.value.trim();
        if (!query) {
            container.style.display = 'none';
            return;
        }
        container.style.display = '';
        container.innerHTML = '<p>Caricamento...</p>';
        const albums = await searchAlbums(query);
        if (albums && albums.length > 0) {
            // Mostra lista album trovati
            let listHtml = '<h3>Risultati:</h3><div class="spotify-result-list">';
            albums.forEach(album => {
                listHtml += `<div class="spotify-result-card" data-album-id="${album.id}">
                    <img src="${album.images[0]?.url}" alt="${album.name}" class="spotify-result-img"> 
                    <div class="spotify-result-info">
                        <div class="spotify-result-title">${album.name}</div>
                        <div class="spotify-result-artist">${album.artists.map(a=>a.name).join(', ')}</div>
                        <div class="spotify-result-meta">${album.release_date}</div>
                    </div>
                </div>`;
            });
            listHtml += '</div>';
            container.innerHTML = listHtml;

            // Aggiungi click per mostrare dettagli album
            container.querySelectorAll('.spotify-result-card[data-album-id]').forEach(card => {
                card.addEventListener('click', async function () {
                    const albumId = card.getAttribute('data-album-id');
                    container.innerHTML = '<p>Caricamento album...</p>';
                    const albumData = await fetchAlbumData(albumId);
                    if (albumData) {
                        let tracksHtml = '';
                        albumData.tracks.items.forEach(track => {
                            tracksHtml += `<li>${track.track_number}. ${track.name} (${Math.floor(track.duration_ms / 60000)}:${String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')})</li>`;
                        });
                        container.innerHTML = `
                        <a id="backBtn" class="spotify-back-btn" href="#">Torna ai risultati</a>
                            <div class="spotify-album-card">
                                <div class="spotify-album-info">
                                    <div class="spotify-album-title">${albumData.name}</div>
                                    <div class="spotify-album-meta">Artista: ${albumData.artists.map(artist => artist.name).join(', ')}</div>
                                    <div class="spotify-album-meta">Data di rilascio: ${albumData.release_date}</div>
                                </div>
                                <img src="${albumData.images[0]?.url}" alt="${albumData.name}" class="spotify-album-cover">
                            </div>
                            <div class="spotify-album-tracks">
                                <div class="spotify-album-tracks-title">Tracce:</div>
                                <ul class="spotify-album-tracks-list">${tracksHtml}</ul>
                            </div>
                            
                        `;
                        document.getElementById('backBtn').onclick = () => {
                            searchForm.dispatchEvent(new Event('submit'));
                        };
                    } else {
                        container.innerHTML = '<p>Album non trovato.</p>';
                    }
                });
            });
        } else {
            container.innerHTML = '<p>Nessun album trovato.</p>';
        }
    });
});

async function searchAlbums(query) {
    const token = await requestToken();
    try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.albums.items;
    } catch (error) {
        console.error('Error:', error);
    }
}
