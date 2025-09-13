<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProdottoController;


// Route di test per verificare il funzionamento delle API
Route::get('/test-api', function() {
      return response()->json(['message' => 'API OK']);
});

Route::controller(ProdottoController::class)->prefix('product')->group(function () {
        Route::get('index', 'index');
        Route::get('show/{id}', 'show');
});
