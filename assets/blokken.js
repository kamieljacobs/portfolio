// Laadt bouwstenen uit /blokken in elke <div data-blok="naam">.
// Zo staat elke bouwsteen maar op één plek en kan elke pagina
// zijn eigen selectie en volgorde kiezen.
(function () {
  var script = document.currentScript;
  var basis = script.getAttribute("data-basis") || "";
  var plekken = document.querySelectorAll("[data-blok]");

  plekken.forEach(function (plek) {
    var naam = plek.getAttribute("data-blok");
    fetch(basis + "blokken/" + naam + ".html")
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.text();
      })
      .then(function (html) {
        // Links in een blok zijn geschreven vanaf de hoofdmap.
        plek.innerHTML = html.split('href="./').join('href="' + basis);
      })
      .catch(function () {
        plek.innerHTML = '<p>Dit onderdeel kon niet worden geladen. <a href="' + basis + '">Bekijk de hoofdpagina</a>.</p>';
      });
  });
})();
