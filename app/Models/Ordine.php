<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model; 


class Ordine extends Model
{
    protected $table = 'ordini';
    protected $fillable = ['utente_id', 'totale', 'data_ordine', 'stato', 'indirizzo_spedizione'];
    public $timestamps = false;

    public function utente()
    {
        return $this->belongsTo(User::class, 'utente_id');
    }

    public function prodotti()
    {
        return $this->belongsToMany(Prodotto::class, 'ordine_prodotti', 'ordine_id', 'prodotto_id')
                    ->withPivot('quantita', 'prezzo_unitario');
    }
}
