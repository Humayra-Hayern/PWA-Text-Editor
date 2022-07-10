const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  // Store the triggered events
  window.deferredPrompt = event;

  // Removes the hidden class from the button.
  butInstall.classList.toggle("hidden", false);
});

// a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  // Show prompt
  promptEvent.prompt();

  // Resets the deferred prompt variable
  window.deferredPrompt = null;

  // Adds the hidden class to the button
  butInstall.classList.toggle("hidden", true);
});

// handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  // Clear the prompt
  window.deferredPrompt = null;
});
