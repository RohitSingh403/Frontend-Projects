document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Target the operational DOM interactive variables
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookiesBtn = document.getElementById('acceptCookiesBtn');
    const closeBannerBtn = document.getElementById('closeBannerBtn');



    // 2. Build checking mechanism evaluation loops
    function checkCookieConsent() {
        // Query the local storage system for existing consent keys
        const hasConsented = localStorage.getItem('cookieConsentGranted');

        // If the key does not exist yet, strip the hidden visibility class away
        if (!hasConsented) {
            cookieBanner.classList.remove('hidden');
        }
    }
});