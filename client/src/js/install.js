const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Added an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    
    // stash the event to be triggered later
    window.deferredPrompt = event;

    // shows the install button 
    butInstall.classList.toggle('hidden', false);
});

// Implemented a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    console.log('👍', 'butInstall-clicked');
    
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }
    // show install prompt
    promptEvent.prompt();

    // this resets the prompt variable
    window.deferredPrompt = null;
    
    // hides the install button after it has been clicked 
    butInstall.classList.toggle('hidden', true);
});

// Added an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);
    window.deferredPrompt = null;
});