<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Models\Carrello;
use App\Models\Ordine;
use App\Models\OrdineProdotti;

class CheckoutController extends BaseController
{
    // Mostra la pagina di checkout
    public function showForm(Request $request)
    {
        $utenteId = \Session::get('user_id');
        if (!$utenteId) {
            return redirect('login');
        }
        $carrello = Carrello::where('utente_id', $utenteId)->first();
        $prodotti = $carrello ? $carrello->prodotti()->with(['immagini'])->get() : collect();
        return view('checkout', ['cart' => $prodotti]);
    }

    // Finalizza l'ordine
    public function processOrder(Request $request)
    {
        $utenteId = \Session::get('user_id');
        if (!$utenteId) {
            return redirect('login');
        }
        $carrello = Carrello::where('utente_id', $utenteId)->first();
        if (!$carrello || $carrello->prodotti()->count() == 0) {
            return redirect('checkout')->with('error', 'Carrello vuoto');
        }
        // Crea ordine
        $ordine = Ordine::create([
            'utente_id' => $utenteId,
            'totale' => $carrello->prodotti->sum(function($p) {
                return $p->prezzo * $p->pivot->quantita;
            }),
            'data_ordine' => now(),
            // 'indirizzo_spedizione' => $request->input('indirizzo_spedizione'), // opzionale
        ]);
        // Aggiungi prodotti all'ordine
        foreach ($carrello->prodotti as $prodotto) {
            OrdineProdotti::create([
                'ordine_id' => $ordine->id,
                'prodotto_id' => $prodotto->id,
                'quantita' => $prodotto->pivot->quantita,
                'prezzo_unitario' => isset($prodotto->prezzo) ? $prodotto->prezzo : 0
            ]);
        }
    // Svuota carrello
    $carrello->prodotti()->detach();
    return view('ordine_confermato');
    }
}