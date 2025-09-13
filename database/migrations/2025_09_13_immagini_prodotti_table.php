<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('immagini_prodotti', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('prodotto_id');
            $table->string('url');
            $table->timestamps();

            $table->foreign('prodotto_id')->references('id')->on('prodotti')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('immagini_prodotti');
    }
};
