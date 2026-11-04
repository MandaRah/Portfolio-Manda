# CLAUDE.md

Portfolio statique de Ramandimbisoa Manda (intégrateur & webmaster WordPress).

## Stack
- HTML, CSS et JavaScript purs. Pas de framework, pas de build, pas de npm : rien ne doit nécessiter une installation.
- Polices chargées depuis Google Fonts : Space Grotesk (titres), Geist (texte), Geist Mono (étiquettes).

## Règles
- Le français est écrit dans `index.html`. L'anglais est dans `assets/js/i18n.js`.
- Tout texte visible ajouté au HTML doit avoir un attribut `data-i18n` (ou `data-i18n-html` s'il contient du balisage, ou `data-i18n-attr="attribut:cle"` pour un attribut) **et** sa clé dans `i18n.js`.
- Couleurs, polices et espacements : utiliser les variables CSS de la section « Tokens » de `styles.css`, jamais de valeurs en dur.
- Classes au format BEM simple : `bloc`, `bloc__element`, `bloc--variante`.
- Direction artistique : moderne et tech, thème sombre bleu marine, beaucoup d'espace, filets fins plutôt que cartes, un seul accent (turquoise `--color-accent`). Pas de dégradés colorés, pas d'italique (Space Grotesk n'en a pas : la mise en valeur se fait par la couleur), pas de coins arrondis décoratifs, animations discrètes uniquement.
- Les couleurs sont nommées par leur rôle (`--color-bg`, `--color-text`, `--color-accent`…), jamais par leur apparence.
- Accessibilité : HTML sémantique, focus visible, `prefers-reduced-motion` respecté.
- Contenu fidèle au CV : ne jamais inventer de chiffres, de résultats ni d'expériences.
