<?php

namespace App\Http\Controllers;
use Illuminate\Routing\Controller as BaseController;



class SpotifyController extends BaseController
{
    public function getToken()
    {
        // 1. Configurazione Credenziali
        // È buona norma non hardcodare le chiavi nel codice, ma prenderle dall'env
        $clientId = '20e85ef50f67458696d40b008bb02b26';
        $clientSecret = 'd0e7d5a0c0f94acba817393e0d241557';

        // URL per la richiesta del token come da Slide 120/121
        // (Nota: Le slide usano un URL didattico, quello reale è https://accounts.spotify.com/api/token)
        $url = 'https://accounts.spotify.com/api/token'; 

        // 2. Inizializzazione cURL [cite: 3505]
        $curl = curl_init();

        // 3. Configurazione Opzioni cURL 
        
        // Imposta l'URL di destinazione
        curl_setopt($curl, CURLOPT_URL, $url);
        
        // Imposta il metodo POST (necessario per richiedere il token)
        curl_setopt($curl, CURLOPT_POST, 1);

        // Imposta il corpo della richiesta: grant_type=client_credentials
        // [cite: 3525, 3527]
        curl_setopt($curl, CURLOPT_POSTFIELDS, "grant_type=client_credentials");

        // 4. Configurazione Header per Autenticazione 
        // L'header deve essere "Authorization: Basic " seguito dalla codifica 
        // base64 di "client_id:client_secret"
        $headers = array(
            "Authorization: Basic " . base64_encode($clientId . ":" . $clientSecret),
            "Content-Type: application/x-www-form-urlencoded"
        );
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

        // Imposta cURL per restituire il risultato come stringa invece di stamparlo direttamente
        // [cite: 3510, 3513]
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        // 5. Esecuzione della richiesta [cite: 3509]
        $result = curl_exec($curl);
        
        // Chiusura della sessione cURL
        curl_close($curl);

        // 6. Gestione della Risposta
        // Decodifica il JSON ricevuto da Spotify (contiene access_token, expires_in, ecc.)
        $jsonResponse = json_decode($result, true);

        // Restituisce il JSON al client (al tuo JavaScript)
        return response()->json($jsonResponse);
    }
}