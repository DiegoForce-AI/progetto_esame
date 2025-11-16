<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Models\Carrello;
use App\Models\CarrelloProdotti;

class CartController extends BaseController
{
    // Mostra la shopping bag
    public function index(Request $request)
    {
        $utenteId = \Session::get('user_id');
        if (!$utenteId) {
            return response()->json(['error' => 'Utente non autenticato'], 401);
        }
        $carrello = Carrello::where('utente_id', $utenteId)->first();
        if (!$carrello) {
            $carrello = Carrello::create(['utente_id' => $utenteId]);
        }
        $prodotti = $carrello->prodotti()->with(relations: ['immagini'])->get()
            ->map(function ($prodotto) {
                $foto = null;
                if ($prodotto->immagini && $prodotto->immagini->count() > 0) {
                    $foto = $prodotto->immagini->first()->url;
                } else if (!empty($prodotto->immagine_url)) {
                    $foto = $prodotto->immagine_url;
                }
                $prezzo = $prodotto->prezzo;
                $quantita = $prodotto->pivot->quantita;
                $subtotale = $prezzo * $quantita;
                return [
                    'id' => $prodotto->id,
                    'nome' => $prodotto->nome,
                    'quantita' => $quantita,
                    'foto' => $foto,
                    'prezzo' => $prezzo,
                    'subtotale' => $subtotale,
                ];
            });
        $totale = $prodotti->sum('subtotale');
        if ($request->ajax() || $request->wantsJson()) {
            return response()->json(['cart' => $prodotti, 'totale' => $totale]);
        }
        $track = [
            'title' => 'Blinding Lights',
            'artist' => 'The Weeknd',
            'image' => 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
            'url' => 'spotify'
        ];
        return view('shopping', ['cart' => $prodotti, 'totale' => $totale, 'track' => $track]);
    }



    // Aggiungi prodotto
    public function add(Request $request)
    {
        $utenteId = \Session::get('user_id');
        if (!$utenteId) {
            return response()->json(['error' => 'Utente non autenticato'], 401);
        }
        $carrello = Carrello::firstOrCreate(['utente_id' => $utenteId]);
        $nome = $request->input('nome');
        $prodotto = null;
        if ($nome) {
            $prodotto = \App\Models\Prodotto::where('nome', 'LIKE', "%$nome%")
                ->orderBy('id')
                ->first();
        } else {
            $prodottoId = $request->input('prodotto_id');
            if ($prodottoId) {
                $prodotto = \App\Models\Prodotto::find($prodottoId);
            }
        }
        if (!$prodotto) {
            return response()->json(['error' => 'Prodotto non trovato'], 404);
        }
        $esistente = CarrelloProdotti::where('carrello_id', $carrello->id)
            ->where('prodotto_id', $prodotto->id)
            ->first();
        if ($esistente) {
            $nuovaQuantita = $esistente->quantita + $request->input('quantita', 1);
            CarrelloProdotti::where('carrello_id', $carrello->id)
                ->where('prodotto_id', $prodotto->id)
                ->update(['quantita' => $nuovaQuantita]);
        } else {
            CarrelloProdotti::create([
                'carrello_id' => $carrello->id,
                'prodotto_id' => $prodotto->id,
                'quantita' => $request->input('quantita', 1),
            ]);
        }
        return $this->index($request);
    }

    // Rimuovi prodotto
    public function remove(Request $request)
    {
        $utenteId = \Session::get('user_id');
        if (!$utenteId) {
            return response()->json(['error' => 'Utente non autenticato'], 401);
        }
        $carrello = Carrello::where('utente_id', $utenteId)->first();
        $prodottoId = $request->input('prodotto_id', $request->query('prodotto_id'));
        if ($carrello && $prodottoId) {
            CarrelloProdotti::where('carrello_id', $carrello->id)
                ->where('prodotto_id', $prodottoId)
                ->delete();
        }
        return $this->index($request);
    }

    // Modifica quantità
    public function update(Request $request)
    {
        $utenteId = \Session::get('user_id');
        if (!$utenteId) {
            return response()->json(['error' => 'Utente non autenticato'], 401);
        }
        $carrello = Carrello::where('utente_id', $utenteId)->first();
        if ($carrello) {
            $carrelloId = $carrello->id;
            $prodottoId = $request->input('prodotto_id');
            $quantita = $request->input('quantita');
            $riga = CarrelloProdotti::where('carrello_id', $carrelloId)
                ->where('prodotto_id', $prodottoId)
                ->first();
            if ($riga) {
                $nuovaQuantita = (int) $request->input('quantita');
                if ($nuovaQuantita > 0) {
                    CarrelloProdotti::where('carrello_id', $carrelloId)
                        ->where('prodotto_id', $prodottoId)
                        ->update(['quantita' => $nuovaQuantita]);
                } else {
                    CarrelloProdotti::where('carrello_id', $carrelloId)
                        ->where('prodotto_id', $prodottoId)
                        ->delete();
                }
            }
        }
        return $this->index($request);
    }
}