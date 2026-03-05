# ÚRÚ – Metodická podpora

Webová sekce **Metodická podpora** pro Úřad rozvoje území České republiky (ÚRÚ).

## Struktura projektu

```
├── index.html              # Landing page Metodické podpory
├── css/
│   └── style.css           # Hlavní stylesheet (JVS České republiky)
├── js/
│   ├── main.js             # Hlavní JavaScript (interakce)
│   └── components.js       # Sdílené komponenty (header, footer, chatbot)
├── images/
│   └── logo.svg            # Placeholder loga (nahradit skutečným PNG)
├── pages/
│   ├── document.html       # Šablona detailu dokumentu
│   ├── video.html          # Šablona video výkladu
│   └── faq.html            # Stránka FAQ
├── documents/              # Složka pro PDF soubory
├── data/
│   ├── documents.json      # Databáze metodických dokumentů
│   ├── faq.json            # Databáze FAQ
│   └── media.json          # Databáze video/podcast
└── README.md
```

## Jak přidávat obsah

### Dokumenty
1. Vložte PDF do složky `documents/`
2. Přidejte záznam do `data/documents.json`
3. Aktualizujte odkaz v `index.html` (doc-card)

### FAQ
1. Přidejte otázku/odpověď do `data/faq.json`
2. Přidejte HTML do `index.html` (sekce FAQ) a `pages/faq.html`

### Videa / Podcasty
1. Nahrajte na YouTube/Vimeo
2. Přidejte záznam do `data/media.json`
3. Aktualizujte `pages/video.html` s embed URL

### Logo
Nahraďte `images/logo.svg` skutečným obrázkem loga (PNG nebo SVG).
Aktualizujte příponu v `js/components.js` pokud použijete jiný formát.

## Vizuální styl

Jednotný vizuální styl České republiky (JVS) dle Studio Najbrt:
- Červená: `#d80c13` (Pantone 485 C)
- Modrá: `#08437f` (Pantone Reflex Blue C)
- Font: Inter (aproximace Czechia Sans™)
- Hranatý design (border-radius: 0)

## Deployment

Statický web – GitHub Pages: `aleskrupa109.github.io/Metodika`
