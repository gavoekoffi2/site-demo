# Jacques Logoh Couture — refonte immersive du site

Proposition de refonte du site [jacqueslogohcouture.com](https://jacqueslogohcouture.com) : une expérience digne d'une grande maison de couture, avec une visite immersive en vidéo et une galerie 3D.

Tout le contenu vient du site actuel : textes, biographie, catalogue de 32 pièces (noms, prix, descriptions, tailles, coloris), actualités, coordonnées et photos.

## Deux modèles à présenter

| Modèle | Fichier | Ambiance |
|---|---|---|
| **A — Nuit** | `index.html` | Fonds noir profond, ivoire et or : un écrin dramatique, comme un défilé de nuit. |
| **B — Lumière** | `clair.html` | Fonds blancs et ivoire : les photos, les modèles et les tissus ressortent au maximum. |

Un sélecteur **Nuit / Lumière**, en bas de l'écran, permet de passer d'un modèle à l'autre pendant la présentation.

## Ouvrir le site

Ouvrez `index.html` ou `clair.html` dans Chrome, Safari ou Edge. Tout fonctionne hors-ligne, sans serveur : polices, bibliothèques et vidéos sont incluses.

## L'expérience

1. **Ouverture** : le monogramme de la Maison se remplit, puis un rideau se lève sur l'arche vidéo.
2. **Hero** : « JACQUES Logoh » en très grand, avec un film en boucle dans une arche inspirée de la forme du logo.
3. **Manifeste** : la citation de Jacques Logoh apparaît mot à mot pendant le défilement.
4. **La Maison** : la biographie et une frise horizontale de 2011 à Atlanta.
5. **Lignes Sacrées** : la collection signature, avec un atelier des couleurs interactif, le savoir-faire et un défilé horizontal.
6. **Visite immersive** :
   - *Le Film de la Maison* (51 s), qui s'ouvre en plein écran pendant le défilement ;
   - *La Galerie 3D* : on avance dans 5 salles (L'Héritage, Lignes Sacrées, Homme, Femme, Paris), et chaque œuvre ouvre sa fiche produit ;
   - *Le Salon* : un reel vertical au format téléphone.
7. **Collections** : 32 pièces filtrables (Femme, Homme), aperçu rapide, choix de la taille et de la couleur, panier.
8. **Commande** : le panier envoie la commande pré-remplie sur le WhatsApp de la Maison (+33 7 82 53 31 70).
9. **Prix** : en EUR ou en FCFA.
10. **Fidélité, Actualités, Univers FIMO228, Contact.**

## À propos des vidéos

Les vidéos dans `assets/video/` sont des montages cinématographiques réalisés uniquement à partir des photos officielles de la Maison. Pour mettre de vraies vidéos tournées dans la boutique ou l'atelier, il suffit de remplacer les fichiers en gardant les mêmes noms :

- `hero-maison.mp4` : boucle verticale 4:5 ;
- `film-maison.mp4` : film 16:9 ;
- `visite-maison.mp4` : reel vertical 9:16 ;
- les versions `-clair` pour le modèle Lumière.

## Structure

```
index.html            Modèle A — Nuit
clair.html            Modèle B — Lumière (généré : python3 tools/build_clair.py)
assets/css/           styles (le thème clair est dans style.css, section « MODÈLE B »)
assets/js/data.js     catalogue repris du site actuel
assets/js/main.js     interactions : défilement fluide, galerie 3D, panier, devises
assets/img/           photos optimisées (WebP) et logo vectorisé
assets/video/         films de la visite immersive
assets/vendor/        GSAP, ScrollTrigger, Lenis (copies locales)
```

Après toute modification d'`index.html`, relancez `python3 tools/build_clair.py` pour mettre à jour `clair.html`.
