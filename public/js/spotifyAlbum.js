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
    // Crea form di ricerca
    const searchForm = document.createElement('form');
    searchForm.innerHTML = `
        <input type="text" id="album-id-input" placeholder="Cerca album" required>
        <button type="submit">Cerca</button>
    `;
    container.parentNode.insertBefore(searchForm, container);

    searchForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const query = document.getElementById('album-id-input').value.trim();
        if (!query) return;
        container.innerHTML = '<p>Caricamento...</p>';
        const albums = await searchAlbums(query);
        if (albums && albums.length > 0) {
            // Mostra lista album trovati
            let listHtml = '<h3>Risultati:</h3><ul>';
            albums.forEach(album => {
                listHtml += `<li style="margin-bottom:10px;cursor:pointer;" data-album-id="${album.id}">
                    <img src="${album.images[0]?.url}" alt="${album.name}" style="width:50px;vertical-align:middle;"> 
                    <strong>${album.name}</strong> - ${album.artists.map(a=>a.name).join(', ')} (${album.release_date})
                </li>`;
            });
            listHtml += '</ul>';
            container.innerHTML = listHtml;

            // Aggiungi click per mostrare dettagli album
            container.querySelectorAll('li[data-album-id]').forEach(li => {
                li.addEventListener('click', async function () {
                    const albumId = li.getAttribute('data-album-id');
                    container.innerHTML = '<p>Caricamento album...</p>';
                    const albumData = await fetchAlbumData(albumId);
                    if (albumData) {
                        let tracksHtml = '';
                        albumData.tracks.items.forEach(track => {
                            tracksHtml += `<li>${track.track_number}. ${track.name} (${Math.floor(track.duration_ms / 60000)}:${String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')})</li>`;
                        });
                        container.innerHTML = `
                            <h2>${albumData.name}</h2>
                            <p>Artista: ${albumData.artists.map(artist => artist.name).join(', ')}</p>
                            <p>Data di rilascio: ${albumData.release_date}</p>
                            <img src="${albumData.images[0]?.url}" alt="${albumData.name}" style="width:200px;">
                            <h3>Tracce:</h3>
                            <ul>${tracksHtml}</ul>
                            <button id="backBtn">Torna ai risultati</button>
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
