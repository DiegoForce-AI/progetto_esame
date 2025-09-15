@extends('layout')

@section('head')
    <title>Dettaglio Prodotto</title>
@endsection

@section('content')
    <div class="prodotto-dettaglio">
        <h1>{{ $prodotto->nome }}</h1>
        <p>{{ $prodotto->descrizione }}</p>
        <p>Prezzo: {{ $prodotto->prezzo }} €</p>
        @if($prodotto->immagine_url)
            <img src="{{ url($prodotto->immagine_url) }}" alt="{{ $prodotto->nome }}" style="max-width:300px;">
        @endif
        <br>
        <a href="{{ url('prodotti') }}">&larr; Torna alla lista prodotti</a>
    </div>
@endsection
