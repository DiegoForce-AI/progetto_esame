@extends('layout')
<link rel="stylesheet" href="{{ url('css/checkout.css') }}">

<script src="{{ url('js/home.js') }}"></script>
@section('content')
    <h2 class="checkout-title">Checkout</h2>
    @if(session('error'))
        <div class="alert alert-danger">{{ session('error') }}</div>
    @endif
    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif
    <div id="checkout-cart">
        <h4>Riepilogo carrello</h4>
        <ul>
            @forelse($cart as $prodotto)
                <li>
                    @php
                        $img = null;
                        if (isset($prodotto->immagini) && count($prodotto->immagini) > 0) {
                            $img = $prodotto->immagini[0]->url;
                        } elseif (isset($prodotto->immagine_url)) {
                            $img = $prodotto->immagine_url;
                        }
                    @endphp
                    @if($img)
                        <img src="{{ url($img) }}" alt="{{ $prodotto->nome }}" class="checkout-thumb">
                    @endif
                    <strong>{{ $prodotto->nome }}</strong> x {{ $prodotto->pivot->quantita }} - {{ $prodotto->prezzo }} €
                </li>
            @empty
                <li>Carrello vuoto</li>
            @endforelse
        </ul>
    </div>
    <form id="checkout-form" action="{{ url('checkout') }}" method="POST">
        @csrf
        <button type="submit" class="btn btn-success">Conferma ordine</button>
    </form>
    <script src="{{ url('js/checkout.js') }}"></script>
@endsection