@extends('layout')
@section('scripts')
    <script src="{{ url('js/prodotti.js') }}" defer></script>
@endsection
@section('head')
    <title>Lista Prodotti</title>
    <link rel="stylesheet" href="{{ url('css/prodotti.css') }}">
@endsection

@section('content')
    <h1 class="prodotti-disponibili-title">Prodotti disponibili</h1>
    <div id="prodotti-container" class="prodotti-list">
        <!-- I prodotti verranno inseriti dinamicamente da prodotti.js -->
    </div>
@endsection

@section('scripts')
    <script src="{{ url('js/prodotti.js') }}" defer></script>
@endsection


