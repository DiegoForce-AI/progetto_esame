@extends('layout')
<link rel="stylesheet" href="{{ url('css/shopping.css') }}">
@section('content')
    @if(count($cart) === 0)
        <div class="empty-cart-message">
            <span class="empty-cart-icon">🛒</span>
            <h3>Shopping bag vuota</h3>
            <p>Che ne dici di guardare qualcosa nello store?</p>
            <a href="{{ url('prodotti') }}" class="btn btn-primary empty-cart-btn">Vai allo store</a>
        </div>
    @else
        <h2 class="shopping-title">Shopping Bag</h2>
    <table class="shopping-cart-table">
        <thead>
            <tr>
                <th></th>
                <th>Nome</th>
                <th>Prezzo</th>
                <th>Quantità</th>
                <th>Subtotale</th>
            </tr>
        </thead>
        <tbody>
        @foreach($cart as $prodotto)
            <tr>
                <td>
                    @if($prodotto['foto'])
                        <img src="{{ url( $prodotto['foto']) }}"
                             alt="{{ $prodotto['nome'] }}"
                             class="cart-product-img">
                    @endif
                </td>
                <td>{{ $prodotto['nome'] }}</td>
                <td>{{ number_format($prodotto['prezzo'], 2) }} €</td>
                <td>
                    <form action="{{ url('shopping/update') }}" method="POST" class="cart-qty-form" style="display:inline-block;">
                        @csrf
                        @method('PATCH')
                        <input type="hidden" name="prodotto_id" value="{{ $prodotto['id'] }}">
                        <input type="number" name="quantita" value="{{ $prodotto['quantita'] }}" min="1" max="99" class="cart-qty-input" onchange="this.form.submit()">
                    </form>
                    <form action="{{ url('shopping/remove') }}" method="POST" class="cart-remove-form" style="display:inline-block; margin-left:8px;">
                        @csrf
                        @method('DELETE')
                        <input type="hidden" name="prodotto_id" value="{{ $prodotto['id'] }}">
                        <button type="submit" class="cart-remove-btn" title="Rimuovi dal carrello">&times;</button>
                    </form>
                </td>
                <td>{{ number_format($prodotto['subtotale'], 2) }} €</td>
            </tr>
        @endforeach
        </tbody>
        <tfoot>
            <tr>
                <td colspan="4" class="cart-total-label"><strong>Totale:</strong></td>
                <td><strong>{{ number_format($totale, 2) }} €</strong></td>
            </tr>
        </tfoot>
    </table>
    <div class="checkout-btn-wrapper">
        <a href="{{ url('checkout') }}" class="btn btn-primary cart-checkout-btn">Checkout</a>
    </div>


    <!-- Checkout mobile -->
    <div class="checkout-summary-custom" id="checkout-mobile">
        <h3>Riepilogo ordine</h3>
        <div class="checkout-summary-list">
            @foreach($cart as $prodotto)
                <div class="checkout-summary-item">
                    <div class="checkout-summary-item-img">
                        @if($prodotto['foto'])
                            <img src="{{ url($prodotto['foto']) }}" alt="{{ $prodotto['nome'] }}">
                        @endif
                    </div>
                    <div class="checkout-summary-item-info">
                        <div class="checkout-summary-item-name">{{ $prodotto['nome'] }}</div>
                        <div class="checkout-summary-item-qty">
                            <form action="{{ url('shopping/update') }}" method="POST" class="cart-qty-form" style="display:inline-block;">
                                @csrf
                                @method('PATCH')
                                <input type="hidden" name="prodotto_id" value="{{ $prodotto['id'] }}">
                                Quantità:
                                <input type="number" name="quantita" value="{{ $prodotto['quantita'] }}" min="1" max="99" class="cart-qty-input" style="width:44px;" onchange="this.form.submit()">
                            </form>

                            <form action="{{ url('shopping/remove') }}" method="POST" class="cart-remove-form" style="display:inline-block; margin-left:8px;">
                        @csrf
                        @method('DELETE')
                        <input type="hidden" name="prodotto_id" value="{{ $prodotto['id'] }}">
                        <button type="submit" class="cart-remove-btn" title="Rimuovi dal carrello">&times;</button>
                    </form>
                        </div>
                        <div class="checkout-summary-item-price">Prezzo: <b>{{ number_format($prodotto['prezzo'], 2) }} €</b></div>
                        <div class="checkout-summary-item-sub">Subtotale: <b>{{ number_format($prodotto['subtotale'], 2) }} €</b></div>
                    </div>
                </div>
            @endforeach
        </div>
        <div class="checkout-summary-total">
            <span>Totale:</span>
            <span class="checkout-summary-total-value">{{ number_format($totale, 2) }} €</span>
        </div>
        <div class="checkout-summary-divider">
        <a href="{{ url('checkout') }}" class="btn btn-primary checkout-mobile-btn">Checkout</a>
        </div>
    </div>
       @endif
@endsection
