/**
 * ÚRÚ – Reusable Components (Header, Footer)
 * =============================================
 * Shared across all pages via JS includes.
 * Usage: <div id="site-header"></div> / <div id="site-footer"></div>
 */

// Determine base path based on page location
const basePath = (function() {
    const path = window.location.pathname;
    // If we're in a subdirectory (e.g. /pages/), go up one level
    if (path.includes('/pages/')) return '../';
    return '';
})();

// ===== HEADER COMPONENT =====
function renderHeader() {
    const el = document.getElementById('site-header');
    if (!el) return;
    el.innerHTML = `
<!-- TOP BAR -->
<div class="top-bar">
    <div class="container">
        <div class="gov-label">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect width="16" height="5.3" fill="#fff"/><rect y="5.3" width="16" height="5.3" fill="#d80c13"/><rect y="10.7" width="16" height="5.3" fill="#08437f"/></svg>
            Státní správa České republiky
        </div>
        <div class="top-bar-left">
            <a href="#">Úřední deska</a>
            <a href="#">Kontakty</a>
            <a href="#">EN</a>
        </div>
    </div>
</div>

<!-- HEADER -->
<header>
    <div class="container">
        <div class="header-inner">
            <a href="${basePath}index.html" class="logo">
                <div class="logo-mark">
                    <img src="${basePath}images/logo.svg" alt="Úřad rozvoje území České republiky – logo">
                </div>
            </a>
            <nav>
                <ul>
                    <li><a href="#">Vyhrazené stavby</a></li>
                    <li><a href="${basePath}index.html" class="active">Metodická podpora</a></li>
                    <li><a href="#">Agenda ÚÚR</a></li>
                    <li><a href="#">Kariéra</a></li>
                    <li><a href="#">O úřadu</a></li>
                </ul>
            </nav>
        </div>
    </div>
</header>
`;
}

// ===== FOOTER COMPONENT =====
function renderFooter() {
    const el = document.getElementById('site-footer');
    if (!el) return;
    el.innerHTML = `
<footer>
    <div class="container">
        <div class="footer-grid">
            <div class="footer-col">
                <div class="footer-logo">
                    <img src="${basePath}images/logo-mark.svg" alt="ÚRÚ">
                    <span>Úřad rozvoje území</span>
                </div>
                <p>Zelený pruh 1294/52<br>147 00 Praha 4</p>
                <p style="margin-top: 10px;">IČO: 12345678<br>Datová schránka: abc1234</p>
            </div>
            <div class="footer-col">
                <h4>Sekce webu</h4>
                <a href="#">Vyhrazené stavby</a>
                <a href="${basePath}index.html">Metodická podpora</a>
                <a href="#">Agenda ÚÚR</a>
                <a href="#">Kariéra</a>
                <a href="#">O úřadu</a>
            </div>
            <div class="footer-col">
                <h4>Důležité odkazy</h4>
                <a href="#">Úřední deska</a>
                <a href="#">Portál stavebníka</a>
                <a href="#">ISSŘ</a>
                <a href="#">Kontakty</a>
            </div>
            <div class="footer-col">
                <h4>Povinné informace</h4>
                <a href="#">Prohlášení o přístupnosti</a>
                <a href="#">Ochrana osobních údajů</a>
                <a href="#">Povinné informace dle z. 106/1999</a>
                <a href="#">Oznámení protiprávního jednání</a>
            </div>
        </div>
        <div class="footer-bottom">
            <span>&copy; 2026 Úřad rozvoje území České republiky</span>
            <div class="footer-links">
                <a href="#">Financováno Evropskou unií</a>
                <a href="#">Národní plán obnovy</a>
            </div>
        </div>
    </div>
</footer>
`;
}

// ===== CHATBOT COMPONENT =====
function renderChatbot() {
    const el = document.getElementById('site-chatbot');
    if (!el) return;
    el.innerHTML = `
<div class="chatbot-trigger">
    <div class="chatbot-label">Zeptejte se nás</div>
    <button class="chatbot-btn" onclick="toggleChat()">&#128172;</button>
</div>

<div class="chatbot-window" id="chatWindow">
    <div class="chat-header">
        <h4>Metodický asistent ÚRÚ</h4>
        <button class="chat-close" onclick="toggleChat()">&times;</button>
    </div>
    <div class="chat-body">
        <div class="chat-message bot">
            Dobrý den! Jsem metodický asistent ÚRÚ. Mohu vám pomoci s orientací v metodických dokumentech, výklady stavebního zákona a otázkami k přechodnému období. Na co se chcete zeptat?
        </div>
        <div class="chat-suggestions">
            <button class="chat-suggestion" onclick="askQuestion(this)">Jak se mění stavební řízení po 1. 7. 2026?</button>
            <button class="chat-suggestion" onclick="askQuestion(this)">Spadá můj záměr pod kompetenci ÚRÚ?</button>
            <button class="chat-suggestion" onclick="askQuestion(this)">Co se stane s mým rozdělaným řízením?</button>
            <button class="chat-suggestion" onclick="askQuestion(this)">Kde najdu kontakt na metodika?</button>
            <button class="chat-suggestion" onclick="askQuestion(this)">Jaké dokumenty potřebuji k žádosti?</button>
        </div>
    </div>
    <div class="chat-input-area">
        <input type="text" class="chat-input" placeholder="Napište svůj dotaz...">
        <button class="chat-send">&#10148;</button>
    </div>
</div>
`;
}

// Auto-render on load
document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
    renderChatbot();
});
