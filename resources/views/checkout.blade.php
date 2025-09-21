@extends('layout')
<link rel="stylesheet" href="{{ url('css/shopping.css') }}">
@section('content')
    <h2>Checkout</h2>
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
