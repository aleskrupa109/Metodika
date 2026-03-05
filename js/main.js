/**
 * ÚRÚ Metodická podpora – hlavní JavaScript
 * ============================================
 */

// ===== GLOBAL STATE =====
let allDocuments = [];
let currentAudience = null; // null = show all

// ===== AUDIENCE SELECTION =====
function selectAudience(card) {
    document.querySelectorAll('.audience-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    currentAudience = card.dataset.audience || null;
    renderDocuments();

    // Scroll to documents
    const section = document.querySelector('.content-section');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== CONTENT TABS =====
function switchTab(tab, content) {
    document.querySelectorAll('.content-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    // TODO: Implement content switching for FAQ/video/podcast tabs
}

// ===== FAQ ACCORDION =====
function toggleFaq(question) {
    const item = question.parentElement;
    item.classList.toggle('open');
}

// ===== CHATBOT =====
function toggleChat() {
    document.getElementById('chatWindow').classList.toggle('open');
}

function askQuestion(btn) {
    const chatBody = document.querySelector('.chat-body');
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    userMsg.textContent = btn.textContent;
    chatBody.appendChild(userMsg);

    const suggestions = chatBody.querySelector('.chat-suggestions');
    if (suggestions) suggestions.style.display = 'none';

    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-message bot';
        botMsg.textContent = 'Děkuji za dotaz. Připravuji odpověď na základě aktuálních metodických dokumentů...';
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 800);

    chatBody.scrollTop = chatBody.scrollHeight;
}

// ===== DOCUMENT RENDERING =====
function formatDate(isoDate) {
    if (!isoDate) return '';
    const d = new Date(isoDate);
    return d.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric', year: 'numeric' });
}

function statusLabel(status) {
    const map = {
        'platne': 'Platné',
        'nahrazene': 'Nahrazeno',
        'zrusene': 'Zrušené'
    };
    return map[status] || status;
}

function audienceLabel(key) {
    const map = {
        'stavebni-urady': 'Stavební úřady',
        'uzemni-planovani': 'Územní plánování',
        'dotcene-organy': 'Dotčené orgány'
    };
    return map[key] || key;
}

function renderDocuments() {
    const container = document.getElementById('content-documents');
    const summary = document.getElementById('results-summary');
    if (!container) return;

    // Filter by audience
    let docs = allDocuments;
    if (currentAudience) {
        docs = docs.filter(d => d.audience && d.audience.includes(currentAudience));
    }

    // Sort – pinned documents always first
    const sortSelect = document.getElementById('sort-select');
    const sortDir = sortSelect ? sortSelect.value : 'newest';
    docs.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        const da = new Date(a.dateUpdated || a.date);
        const db = new Date(b.dateUpdated || b.date);
        return sortDir === 'newest' ? db - da : da - db;
    });

    // Update badge count
    const docBadge = document.querySelector('.content-tab.active .badge');
    if (docBadge) docBadge.textContent = docs.length;

    // Update results summary
    if (summary) {
        const areaName = currentAudience ? audienceLabel(currentAudience) : 'Všechny oblasti';
        summary.innerHTML = `Zobrazeno <strong>${docs.length} dokumentů</strong> pro oblast: <strong>${areaName}</strong>`;
    }

    // Render cards
    if (docs.length === 0) {
        container.innerHTML = '<p class="no-results">Pro zvolenou oblast zatím nejsou k dispozici žádné dokumenty.</p>';
        return;
    }

    container.innerHTML = docs.map(doc => {
        const dateStr = formatDate(doc.dateUpdated || doc.date);
        const tags = (doc.tags || []).map(t => `<span class="doc-tag">${t}</span>`).join('');

        // Build format links
        let formats = '';
        if (doc.pdfFile) {
            const sizeStr = doc.pdfSize ? ` (${doc.pdfSize})` : '';
            formats += `<a href="${doc.pdfFile}" class="format-btn pdf" target="_blank">PDF${sizeStr}</a>`;
        }
        if (doc.infographic) {
            formats += `<a href="${doc.infographic}" class="format-btn infographic" target="_blank">Infografika</a>`;
        }
        if (doc.videoFile) {
            formats += `<a href="${doc.videoFile}" class="format-btn video" target="_blank">Video (MP4)</a>`;
        } else if (doc.videoId) {
            formats += `<a href="pages/video.html?id=${doc.videoId}" class="format-btn video">Video výklad</a>`;
        }
        if (!doc.pdfFile && doc.sourceUrl) {
            formats += `<a href="${doc.sourceUrl}" class="format-btn" target="_blank">Zdroj – ÚÚR</a>`;
        }

        return `
            <div class="doc-card">
                <div class="doc-card-header">
                    <div>
                        <h4><a href="pages/document.html?id=${doc.id}">${doc.title}</a></h4>
                        <div class="doc-meta">
                            <span>${dateStr}</span>
                            <span>${doc.type || ''}</span>
                            <span>${doc.author || ''}</span>
                        </div>
                    </div>
                    <span class="doc-status ${doc.status}">${statusLabel(doc.status)}</span>
                </div>
                <p class="doc-excerpt">${doc.excerpt || ''}</p>
                <div class="doc-tags">${tags}</div>
                ${formats ? `<div class="doc-format">${formats}</div>` : ''}
            </div>`;
    }).join('');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    // Load documents from JSON
    fetch('data/documents.json')
        .then(r => r.json())
        .then(data => {
            allDocuments = data.documents || [];
            // Set initial audience from active card
            const activeCard = document.querySelector('.audience-card.active');
            if (activeCard) currentAudience = activeCard.dataset.audience || null;
            renderDocuments();
        })
        .catch(err => {
            console.error('Chyba při načítání dokumentů:', err);
            const container = document.getElementById('content-documents');
            if (container) container.innerHTML = '<p class="no-results">Nepodařilo se načíst dokumenty.</p>';
        });

    // Sort change
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => renderDocuments());
    }

    // Filter tag toggle
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            tag.parentElement.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
        });
    });

    // Hero tags → search
    document.querySelectorAll('.hero-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            document.querySelector('.search-bar input').value = tag.textContent;
        });
    });

    // Chat send button
    const chatSend = document.querySelector('.chat-send');
    const chatInput = document.querySelector('.chat-input');
    if (chatSend && chatInput) {
        chatSend.addEventListener('click', () => {
            const text = chatInput.value.trim();
            if (!text) return;
            const chatBody = document.querySelector('.chat-body');
            const userMsg = document.createElement('div');
            userMsg.className = 'chat-message user';
            userMsg.textContent = text;
            chatBody.appendChild(userMsg);
            chatInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;

            setTimeout(() => {
                const botMsg = document.createElement('div');
                botMsg.className = 'chat-message bot';
                botMsg.textContent = 'Děkuji za dotaz. Připravuji odpověď na základě aktuálních metodických dokumentů...';
                chatBody.appendChild(botMsg);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 800);
        });

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') chatSend.click();
        });
    }
});
