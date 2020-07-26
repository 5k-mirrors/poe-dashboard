export default function register() {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      const swUrl = "service-worker.js";
      navigator.serviceWorker.register(swUrl).then(registration => {
        const registrationCopy = registration;
        registrationCopy.onupdatefound = () => {
          const installingWorker = registration.installing;
          installingWorker.onstatechange = () => {
            if (installingWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                const event = new Event("newContentAvailable");
                window.dispatchEvent(event);
              }
            }
          };
        };
      });
    });
  }
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
