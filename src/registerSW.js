export function registerSW() {
  window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then(function () {
          console.log("Service worker registrado!");
        })
        .catch((error) => {
          console.warn("Erro ao registrar o service workers" + error);
        });

      navigator.serviceWorker.ready.then(function (registration) {
        console.log("Service worker pronto!");
        registration.update();
      });
    }
  });
}
