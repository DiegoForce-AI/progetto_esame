<html>
<head>
    <title>Lista Prodotti</title>
    <style>
        .prodotti-row {
            display: flex;
            justify-content: flex-start;
            gap: 32px;
            margin-bottom: 32px;
        }
        .prodotto-card {
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 16px;
            width: 250px;
            box-shadow: 0 2px 8px #eee;
            text-align: center;
            background: #fff;
        }
        .prodotto-img {
            width: 100%;
            height: 180px;
            object-fit: cover;
            border-radius: 6px;
            margin-bottom: 12px;
        }
    </style>
    <script src="{{ url('js/prodotti.js') }}" defer></script>
</head>
<body>
    <h1>Prodotti disponibili</h1>
    <div id="prodotti-container"></div>
</body>
</html>
