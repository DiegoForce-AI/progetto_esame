@extends('layout')

@section('head')
    <title>Dettaglio Prodotto</title>
@endsection

@section('scripts')
    <script src="{{ url('js/prodotti.js') }}" defer></script>
@endsection

@section('content')
    <div id="dettaglio-prodotto" data-id="{{ $prodotto->id }}"></div>
    <br>
    <a href="{{ url('prodotti') }}">&larr; Torna alla lista prodotti</a>
@endsection
