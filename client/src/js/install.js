const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Update UI to notify the user they can add to home screen
    butInstall.removeAttribute('hidden');
});


// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Show the install prompt
    const promptEvent = window.deferredPrompt;
    
    if(!promptEvent) {
        return;
    }
    
    promptEvent.prompt();
    // We've used the prompt, and can't use it again, throw it away
    window.deferredPrompt = null;
    // Hide the app provided install promotion
    butInstall.setAttribute('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Hide the app-provided install promotion
    butInstall.setAttribute('hidden', true);
    // Clear the deferredPrompt so it can be garbage collected
    window.deferredPrompt = null;
    // Optionally, send analytics event to indicate successful install
    console.log('PWA was installed');
});
