

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\ProdottoController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\SpotifyController;

Route::get('/', function () {
    return redirect('login');
});

Route::get('login', [LoginController::class, 'login_form']);
Route::post('login', [LoginController::class, 'do_login']);
Route::get('register', [LoginController::class, 'register_form']);
Route::post('register', [LoginController::class, 'do_register']);
Route::get('logout', [LoginController::class, 'logout']);


Route::get('home', [CollectionController::class, 'home']);
Route::get('prodotti', [ProdottoController::class, 'index']);

// Restituisce tutti i prodotti in formato JSON
Route::get('prodotti/json', function () {
    $prodotti = App\Models\Prodotto::with('immagini')->get();
    return response()->json($prodotti);
});

// Dettagli prodotto
Route::get('prodotto/{id}', [ProdottoController::class, 'show']);
Route::get('prodotto/{id}/json', [ProdottoController::class, 'showJson']);
Route::get('/prodotti/search', [ProdottoController::class, 'search']);

// Rotte per la shopping bag
Route::get('/shopping', [CartController::class, 'index']);
Route::post('/shopping/add', [CartController::class, 'add']);
Route::delete('/shopping/remove', [CartController::class, 'remove']);
Route::patch('/shopping/update', [CartController::class, 'update']);

/* API SPOTIFY */

Route::get('/spotify', function() {
    return view('spotify');
});

Route::get('/spotify/token', [SpotifyController::class, 'getToken']);

Route::get('/spotify-canzoni', function() {
    return view('spotify-canzoni');
});


// Rotte per il checkout
Route::get('/checkout', [App\Http\Controllers\CheckoutController::class, 'showForm']);
Route::post('/checkout', [App\Http\Controllers\CheckoutController::class, 'processOrder']);

/* API FAKESTORE */
Route::get('/fakestore', function() {
    return view('fakestore');
});



//Filtro prodotti
Route::get(uri: '/prodotti/json', action: [ProdottoController::class, 'getProdotti']);