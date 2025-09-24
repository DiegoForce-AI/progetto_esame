<script type="module" src="js/spotifyAlbum.js" defer></script>
@extends('layout')
@section('head')
    <title>Spotify</title>
    <link rel="stylesheet" href="{{ url('css/spotify.css') }}">
@endsection
@section('content')
    <div class="spotify-hero">
        <img src="{{ url('assets/common/spotify.jpg') }}" alt="Spotify" class="spotify-hero-logo">
        <h1 class="spotify-title">Spotify Music Search</h1>
        <p class="spotify-desc">Cerca album direttamente da Spotify</p>
    </div>
    <div class="spotify-search-flex">
        <div id="album-container">
            <!-- Gli album verranno inseriti dinamicamente da spotifyAlbum.js -->
        </div>
    </div>
    <div class="spotify-switch-search">
        <a href="{{ url('spotify-canzoni') }}" class="spotify-switch-btn">Cerca per canzone &rarr;</a>
    </div>
@endsection