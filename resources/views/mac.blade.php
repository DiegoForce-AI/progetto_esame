@extends('layout')
@section('head')
    <title>Mac - Store</title>
    <link rel="stylesheet" href="{{ url('css/prodotti.css') }}">
@endsection
@section('scripts')
    <script src="{{ url('js/prodotti.js') }}" defer></script>
    <script>
        window.PRODOTTI_FILTER = 'mac';
    </script>
@endsection

@section('content')
    <div class="prodotti-hero">
        <div class="prodotti-title">Mac</div>
        <div class="prodotti-desc">Scopri tutti i Mac disponibili nello store.</div>
    </div>
    <div id="prodotti-container" class="prodotti-list">
        <!-- I prodotti Mac verranno inseriti dinamicamente da prodotti.js -->
    </div>
@endsection
