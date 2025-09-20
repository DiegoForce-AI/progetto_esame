<script type="module" src="js/spotifyAlbum.js" defer></script>

@extends('layout')
@section('head')
    <title>Album Spotify</title>
@endsection
@section('content')
    <h1>Album Spotify</h1>
    <div id="album-container" class="album-list">
        <!-- Gli album verranno inseriti dinamicamente da spotifyAlbum.js -->
    </div>
@endsection