import { requestToken } from './spotifyToken.js';

async function fetchTrackData(trackId) {
    const token = await requestToken();
    try {
        const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
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
    const container = document.getElementById('song-container');
    // Crea form di ricerca
    const searchForm = document.createElement('form');
    searchForm.innerHTML = `
        <input type="text" id="song-name-input" placeholder="Cerca canzone" required>
        <button type="submit">Cerca</button>
    `;
    container.parentNode.insertBefore(searchForm, container);

    searchForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const query = document.getElementById('song-name-input').value.trim();
        if (!query) return;
        container.innerHTML = '<p>Caricamento...</p>';
        const tracks = await searchTracks(query);
        if (tracks && tracks.length > 0) {
            // Mostra lista canzoni trovate
            let listHtml = '<h3>Risultati:</h3><ul>';
            tracks.forEach(track => {
                listHtml += `<li style="margin-bottom:10px;cursor:pointer;" data-track-id="${track.id}">
                    <img src="${track.album.images[0]?.url}" alt="${track.name}" style="width:50px;vertical-align:middle;"> 
                    <strong>${track.name}</strong> - ${track.artists.map(a=>a.name).join(', ')} (${track.album.name})
                </li>`;
            });
            listHtml += '</ul>';
            container.innerHTML = listHtml;

            // Aggiungi click per mostrare dettagli canzone
            container.querySelectorAll('li[data-track-id]').forEach(li => {
                li.addEventListener('click', async function () {
                    const trackId = li.getAttribute('data-track-id');
                    container.innerHTML = '<p>Caricamento canzone...</p>';
                    const trackData = await fetchTrackData(trackId);
                    if (trackData) {
                        container.innerHTML = `
                            <h2>${trackData.name}</h2>
                            <p>Artista: ${trackData.artists.map(artist => artist.name).join(', ')}</p>
                            <p>Album: ${trackData.album.name}</p>
                            <img src="${trackData.album.images[0]?.url}" alt="${trackData.name}" style="width:200px;">
                            <p>Durata: ${Math.floor(trackData.duration_ms / 60000)}:${String(Math.floor((trackData.duration_ms % 60000) / 1000)).padStart(2, '0')}</p>
                            <button id="backBtn">Torna ai risultati</button>
                        `;
                        document.getElementById('backBtn').onclick = () => {
                            showTrackResults();
                        };
function showTrackResults() {
    const container = document.getElementById('song-container');
    const query = document.getElementById('song-name-input').value.trim();
    if (!query) {
        container.innerHTML = '';
        return;
    }
    container.innerHTML = '<p>Caricamento...</p>';
    searchTracks(query).then(tracks => {
        if (tracks && tracks.length > 0) {
            let listHtml = '<h3>Risultati:</h3><ul>';
            tracks.forEach(track => {
                listHtml += `<li style="margin-bottom:10px;cursor:pointer;" data-track-id="${track.id}">
                    <img src="${track.album.images[0]?.url}" alt="${track.name}" style="width:50px;vertical-align:middle;"> 
                    <strong>${track.name}</strong> - ${track.artists.map(a=>a.name).join(', ')} (${track.album.name})
                </li>`;
            });
            listHtml += '</ul>';
            container.innerHTML = listHtml;
            container.querySelectorAll('li[data-track-id]').forEach(li => {
                li.addEventListener('click', async function () {
                    const trackId = li.getAttribute('data-track-id');
                    container.innerHTML = '<p>Caricamento canzone...</p>';
                    const trackData = await fetchTrackData(trackId);
                    if (trackData) {
                        container.innerHTML = `
                            <h2>${trackData.name}</h2>
                            <p>Artista: ${trackData.artists.map(artist => artist.name).join(', ')}</p>
                            <p>Album: ${trackData.album.name}</p>
                            <img src="${trackData.album.images[0]?.url}" alt="${trackData.name}" style="width:200px;">
                            <p>Durata: ${Math.floor(trackData.duration_ms / 60000)}:${String(Math.floor((trackData.duration_ms % 60000) / 1000)).padStart(2, '0')}</p>
                            <button id="backBtn">Torna ai risultati</button>
                        `;
                        document.getElementById('backBtn').onclick = () => {
                            showTrackResults();
                        };
                    } else {
                        container.innerHTML = '<p>Canzone non trovata.</p>';
                    }
                });
            });
        } else {
            container.innerHTML = '<p>Nessuna canzone trovata.</p>';
        }
    });
}
                    } else {
                        container.innerHTML = '<p>Canzone non trovata.</p>';
                    }
                });
            });
        } else {
            container.innerHTML = '<p>Nessuna canzone trovata.</p>';
        }
    });
});

async function searchTracks(query) {
    const token = await requestToken();
    try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.tracks.items;
    } catch (error) {
        console.error('Error:', error);
    }
}
