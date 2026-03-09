// Uhrzeit aktualisieren
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('de-DE');
    document.getElementById('clock').textContent = timeString;
}

// QR-Code generieren
function generateQRCode() {
    const currentUrl = window.location.href;
    new QRCode(document.getElementById("qrcode"), {
        text: currentUrl,
        width: 128,
        height: 128,
    });
}

// Initialisierung
window.onload = function() {
    updateClock();
    setInterval(updateClock, 1000);
    generateQRCode();
};
