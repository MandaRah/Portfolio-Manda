# Portfolio — Ramandimbisoa Manda

Portfolio d'intégrateur & webmaster WordPress, en HTML, CSS et JavaScript, sans outil de build ni dépendance à installer.

## Voir le site

Double-cliquer sur `index.html` : il s'ouvre dans le navigateur.

## Structure

```
portfolio/
├── index.html              Structure et contenu en français
├── assets/
│   ├── css/styles.css      Design : tokens (couleurs, polices) puis sections
│   ├── js/i18n.js          Traductions anglaises
│   ├── js/main.js          Langue, menu mobile, animations
│   ├── img/                favicon.svg, portrait.jpg
│   └── cv/                 cv-ramandimbisoa-manda.pdf
├── CLAUDE.md               Règles du projet pour Claude Code
└── README.md
```

## Modifier le contenu

- **Texte français** : directement dans `index.html`.
- **Texte anglais** : dans `assets/js/i18n.js`, avec la même clé que l'attribut `data-i18n` du HTML.
- **Couleurs et polices** : variables en haut de `assets/css/styles.css` (section « Tokens »).

## Fichiers à ajouter

- `assets/img/portrait.jpg` : photo au format portrait (idéalement 800 × 1000 px). Sans photo, les initiales « RM » s'affichent.
- `assets/cv/cv-ramandimbisoa-manda.pdf` : le CV proposé au téléchargement.

## Mise en ligne

Site statique : il peut être publié gratuitement sur GitHub Pages, Netlify ou Vercel en envoyant simplement le dossier.
