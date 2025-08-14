# Plan d’optimisations – Projet Nina Carducci


## Contexte de l’audit
- Outils : **Lighthouse (Desktop)**
- URL auditée : `http://127.0.0.1:5500/index.html` (en local)
- KPIs actuels (référence) : Performance **75**, Accessibilité **96**, Best Practices **96**, SEO **100**  
  - FCP **0.6 s** · **TBT 0 ms** · **CLS 0** · **LCP 7.2 s**

> Objectif de ce fichier : **lister les modifications à réaliser** (ou à conserver) avant d’implémenter quoi que ce soit.  


---

## Priorités (vision rapide)
- **P0 – Critiques SEO/Accessibilité** : fondamentaux on‑page et sémantiques
- **P1 – Performance** : Core Web Vitals (surtout **LCP**)
- **P2 – Technique/SMO** : enrichissement sémantique & partage social

---

## Détails par thème

### 1) Performance (P1)
-  **Redimensionner l’image LCP (héro/carrousel)**  
  _Lighthouse : “Properly size images”_ · **Gain estimé : ~12,8 MiB**  
  **Action** : exporter la première image du carrousel à la **taille d’affichage réelle**, puis remplacer la source.
-  **Servir les images en formats next‑gen (WebP/AVIF)**  
  _Lighthouse : “Serve images in next‑gen formats”_ · **Gain estimé : ~7,1 MiB**  
  **Action** : fournir `<picture>` avec **WebP** + fallback JPG/PNG pour héro et galerie.
-  **Encoder efficacement les images**  
  _Lighthouse : “Efficiently encode images”_ · **Gain estimé : ~1,95 MiB**  
  **Action** : compresser (Squoosh/TinyPNG) avec peu de perte perceptible.
-  **Définir `width`/`height` sur toutes les `<img>`**  
  _Diagnostic : “Image elements do not have explicit width and height”_  
  **Action** : renseigner les dimensions réelles pour **éviter le CLS**.
-  **`loading="lazy"` sur toutes les images non‑critiques**  
  **Action** : lazy sur galerie/sections (garder l’image LCP **sans lazy**).
-  **Minifier CSS** (_gain estimé : ~39 KiB_) et **JS** (_~79 KiB_)  
  **Action** : générer `.min.css` / `.min.js` et référencer‑les.
-  **Réduire le code CSS/JS non utilisé** (_unused CSS ~203 KiB · unused JS ~149 KiB_)  
  **Action** : supprimer plugins/styles non nécessaires ; scinder par page si besoin.
-  **Éliminer les ressources bloquantes** (_~340 ms_)  
  **Action** : `defer` sur scripts, inliner un **critical CSS** minimal si pertinent.
-  **Activer la compression texte (gzip/brotli)** (_~375 KiB_)  
  **Action** : config serveur (Apache/Nginx/Vercel/Netlify).
-  **Contrôler le Back/Forward Cache** (_1 failure reason_)  
  **Action** : éviter des listeners persistants non détachés / vérifier history navigation.
-  **Limiter la taille totale des payloads** (_Total size ~14,45 MiB_)  
  **Action** : vérifier toutes les images lourdes & supprimer les assets inutiles.

### 2) SEO on‑page (P0)
-  **Balise `<title>` descriptive** (mot‑clé + ville)
-  **Meta description** (150–160 car., orientée intentions)
-  **`<html lang="fr">`**
-  **URL canonique** (`<link rel="canonical" …>`)
-  **Hiérarchie des titres H1→H2→H3** (1 seul **H1**)
-  **Attributs `alt` descriptifs** sur toutes les images
-  **Ancres de liens** plus parlantes que “cliquez ici”

> **À maintenir** : cohérence mots‑clés locaux (ville + prestations) dans **H1/H2** et contenus.

### 3) Accessibilité (P0)
-  **Labels de formulaire** associés (`<label for="…">`)
-  **Noms discernables** pour les liens/icônes (`aria-label` sur Instagram)
-  **Navigation clavier** & ordre logique des titres
-  **Contrastes** : vérifier WAVE/axe DevTools et adapter si alerte

### 4) Technique & SMO (P2)
-  **Open Graph / Twitter Card** (image 1200×630 optimisée)
-  **Données structurées** `Photographer` (JSON‑LD)
-  **Sitemap.xml** + **robots.txt** (déclarer le sitemap) – à publier à la mise en ligne
-  **Polices** avec `font-display: swap` / éventuel `preload` si bénéfice mesuré
-  **Sécurité** (CSP/HSTS/COOP/COEP) si déploiement prod sous HTTPS

---

## Acceptation & Mesures (quand tu implémenteras)
- **Objectif LCP** : < **2,5 s** (desktop) sur la page d’accueil
- **Poids total images** : réduire de **>50 %** vs état actuel
- **CSS/JS** : réduction du **code non utilisé** d’au moins **50 %**
- **Compression** : GZIP/Brotli actifs pour **HTML/CSS/JS**
- **Scores cibles** : Perf **90+**, A11y **95+**, SEO **95+**, BP **95+**

---

