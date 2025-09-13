<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model; 

class Ordine extends Model
{
    protected $table = 'ordini';

    public function utente()
    {
        return $this->belongsTo(Utente::class, 'utente_id');
    }

    public function prodotti()
    {
        return $this->belongsToMany(Prodotto::class, 'ordine_prodotti', 'ordine_id', 'prodotto_id')
                    ->withPivot('quantita', 'prezzo_unitario');
    }
}
