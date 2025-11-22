<?php

namespace App\Http\Controllers;
use Illuminate\Routing\Controller as BaseController;



class SpotifyController extends BaseController
{
    public function getToken()
    {
        $clientId = '20e85ef50f67458696d40b008bb02b26';
        $clientSecret = 'd0e7d5a0c0f94acba817393e0d241557';

        $url = 'https://accounts.spotify.com/api/token'; 

        $curl = curl_init();

        
        curl_setopt($curl, CURLOPT_URL, $url);
        
        curl_setopt($curl, CURLOPT_POST, 1);

       
        curl_setopt($curl, CURLOPT_POSTFIELDS, "grant_type=client_credentials");

       
        $headers = array(
            "Authorization: Basic " . base64_encode($clientId . ":" . $clientSecret),
            "Content-Type: application/x-www-form-urlencoded"
        );
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

       
        curl_setopt( $curl, CURLOPT_RETURNTRANSFER, 1);

        $result = curl_exec($curl);
        
        curl_close($curl);

    
        $jsonResponse = json_decode($result, true);

        return response()->json($jsonResponse);
    }
}