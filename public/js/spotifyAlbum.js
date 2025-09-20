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
    const albumId = '1ATL5GLyefJaxhQzSPVrLX'; // Esempio di ID album

    const albumData = await fetchAlbumData(albumId);
    if (albumData) {
        const container = document.getElementById('album-container');
        const searchAlbum = document.createElement('input');
        searchAlbum.type = 'text';
        searchAlbum.id = 'searchAlbum';
        searchAlbum.placeholder = 'Cerca un album...';

        const buttonSearch = document.createElement('button');
        buttonSearch.id = 'buttonSearch';
        buttonSearch.textContent = 'Cerca';

        buttonSearch.addEventListener('click', async function () {
            const query = searchAlbum.value;
            const results = await searchAlbums(query);
            displaySearchResults(results);
        });

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
        `;

        container.appendChild(searchAlbum);
        container.appendChild(buttonSearch);
    }
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
