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

    const container = document.getElementById('song-container');
    // Crea form di ricerca
    const searchForm = document.createElement('form');
    searchForm.innerHTML = `
        <input type="text" id="song-name-input" class="spotify-search-input" placeholder="Cerca canzone..." required>
        <button type="submit" class="spotify-search-btn">Cerca</button>
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
            let listHtml = '<h3>Risultati:</h3><div class="spotify-result-list">';
            tracks.forEach(track => {
                listHtml += `<div class="spotify-result-card" data-track-id="${track.id}">
                    <img src="${track.album.images[0]?.url}" alt="${track.name}" class="spotify-result-img"> 
                    <div class="spotify-result-info">
                        <div class="spotify-result-title">${track.name}</div>
                        <div class="spotify-result-artist">${track.artists.map(a => a.name).join(', ')}</div>
                        <div class="spotify-result-meta">${track.album.name}</div>
                    </div>
                </div>`;
            });
            listHtml += '</div>';
            container.innerHTML = listHtml;

            // Aggiungi click per mostrare dettagli canzone
            container.querySelectorAll('.spotify-result-card[data-track-id]').forEach(card => {
                card.addEventListener('click', async function () {
                    const trackId = card.getAttribute('data-track-id');
                    container.innerHTML = '<p>Caricamento canzone...</p>';
                    const trackData = await fetchTrackData(trackId);
                    if (trackData) {
                        container.innerHTML = `
                            <div class="spotify-album-card">
                                <div class="spotify-album-info">
                                    <div class="spotify-album-title">${trackData.name}</div>
                                    <div class="spotify-album-meta">Artista: ${trackData.artists.map(artist => artist.name).join(', ')}</div>
                                    <div class="spotify-album-meta">Album: ${trackData.album.name}</div>
                                    <div class="spotify-album-meta">Durata: ${Math.floor(trackData.duration_ms / 60000)}:${String(Math.floor((trackData.duration_ms % 60000) / 1000)).padStart(2, '0')}</div>
                                </div>
                                <img src="${trackData.album.images[0]?.url}" alt="${trackData.name}" class="spotify-album-cover">
                            </div>
                            <a id="backBtn" class="spotify-back-btn" href="#">Torna ai risultati</a>`;
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
                                    let listHtml = '<h3>Risultati:</h3><div class="spotify-result-list">';
                                    tracks.forEach(track => {
                                        listHtml += `<div class="spotify-result-card" data-track-id="${track.id}">
                                            <img src="${track.album.images[0]?.url}" alt="${track.name}" class="spotify-result-img"> 
                                            <div class="spotify-result-info">
                                                <div class="spotify-result-title">${track.name}</div>
                                                <div class="spotify-result-artist">${track.artists.map(a => a.name).join(', ')}</div>
                                                <div class="spotify-result-meta">${track.album.name}</div>
                                            </div>
                                        </div>`;
                                    });
                                    listHtml += '</div>';
                                    container.innerHTML = listHtml;
                                    container.querySelectorAll('.spotify-result-card[data-track-id]').forEach(card => {
                                        card.addEventListener('click', async function () {
                                            const trackId = card.getAttribute('data-track-id');
                                            container.innerHTML = '<p>Caricamento canzone...</p>';
                                            const trackData = await fetchTrackData(trackId);
                                            if (trackData) {
                                                container.innerHTML = `
                                                    <div class="spotify-album-card">
                                                        <div class="spotify-album-info">
                                                            <div class="spotify-album-title">${trackData.name}</div>
                                                            <div class="spotify-album-meta">Artista: ${trackData.artists.map(artist => artist.name).join(', ')}</div>
                                                            <div class="spotify-album-meta">Album: ${trackData.album.name}</div>
                                                            <div class="spotify-album-meta">Durata: ${Math.floor(trackData.duration_ms / 60000)}:${String(Math.floor((trackData.duration_ms % 60000) / 1000)).padStart(2, '0')}</div>
                                                        </div>
                                                        <img src="${trackData.album.images[0]?.url}" alt="${trackData.name}" class="spotify-album-cover">
                                                    </div>
                                                    <a id="backBtn" class="spotify-back-btn" href="#">Torna ai risultati</a>
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
