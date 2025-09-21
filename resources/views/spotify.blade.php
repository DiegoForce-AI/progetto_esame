<script type="module" src="js/spotifyAlbum.js" defer></script>
<script type="module" src="js/spotifySong.js" defer></script>
@extends('layout')
@section('head')
    <title>Spotify</title>
@endsection
@section('content')
    <h1>Ricerca Canzoni</h1>
    <div id="album-container" class="album-list">
        <!-- Gli album verranno inseriti dinamicamente da spotifyAlbum.js -->
    </div>
    <div id="song-container"></div>

@endsection