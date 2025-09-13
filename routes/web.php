<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\ProdottoController;

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
Route::get('prodotti/json', function() {
    $prodotti = App\Models\Prodotto::with('immagini')->get();
    return response()->json($prodotti);
});

