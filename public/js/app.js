

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("prodotti");

  fetch("/api/product/index")
    .then(res => {
      if (!res.ok) throw new Error("Errore nella chiamata API");
      return res.json();
    })
    .then(prodotti => {
      container.innerHTML = ""; // rimuove il messaggio di caricamento

      prodotti.forEach(p => {
        const div = document.createElement("div");
        div.classList.add("prodotto");
        div.innerHTML = `
          <h3>${p.nome}</h3>
          <p>${p.descrizione}</p>
          <strong>${p.prezzo} €</strong>
        `;
        container.appendChild(div);
      });
    })
    .catch(err => {
      container.innerHTML = "<p>Errore nel caricamento dei prodotti.</p>";
      console.error(err);
    });
});