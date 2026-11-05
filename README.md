# Jacques Logoh Couture — refonte immersive du site

Proposition de refonte du site [jacqueslogohcouture.com](https://jacqueslogohcouture.com) : une expérience digne d'une grande maison de couture, avec une visite immersive en vidéo et une galerie 3D.

Tout le contenu vient du site actuel : textes, biographie, catalogue de 32 pièces (noms, prix, descriptions, tailles, coloris), actualités, coordonnées et photos.

## Une seule adresse, deux ambiances

Le site s'ouvre toujours en **mode clair** : fonds blancs et ivoire, pour que les modèles et les tissus ressortent au maximum.

Le bouton **Clair / Sombre**, en bas de l'écran, fait passer toute la page en **mode sombre** (noir profond, ivoire et or) sans la recharger. Les vidéos changent aussi de version.

L'ancienne adresse `clair.html` renvoie automatiquement vers la page principale.

## Ouvrir le site

Ouvrez `index.html` dans Chrome, Safari ou Edge. Tout fonctionne hors-ligne, sans serveur : polices, bibliothèques et vidéos sont incluses.

En ligne : https://gavoekoffi2.github.io/site-demo/

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

## La musique — « La Visite »

Un thème musical original de 96 secondes, composé pour la Maison dans un style afro-house élégant, entre l'Afrique et l'international :

- une kalimba, des congas, un shaker ;
- une basse « log drum » façon amapiano ;
- des accords chauds en ré dorien ;
- une pulsation à 120 BPM.

La musique est entièrement synthétisée (aucun échantillon externe, aucun droit tiers) : `assets/audio/la-visite.mp3`.

- **Activation** : un bouton **Son** dans l'en-tête, et une invitation qui apparaît quand on entre dans la visite immersive. Les navigateurs interdisent le son sans clic du visiteur.
- **Volume** : la musique reste discrète sur le reste du site et monte quand on entre dans la Maison (film, galerie 3D, salon).
- **Les films** : la même bande-son est intégrée aux films. Quand on ouvre le film en plein écran, la musique d'ambiance s'efface.

## À propos des vidéos

Les vidéos dans `assets/video/` sont des montages cinématographiques réalisés uniquement à partir des photos officielles de la Maison. Pour mettre de vraies vidéos tournées dans la boutique ou l'atelier, il suffit de remplacer les fichiers en gardant les mêmes noms :

- `hero-maison.mp4` : boucle verticale 4:5 ;
- `film-maison.mp4` : film 16:9 ;
- `visite-maison.mp4` : reel vertical 9:16 ;
- les versions `-clair` pour le mode clair.

## Structure

```
index.html            le site (mode clair par défaut, bouton Clair / Sombre)
clair.html            ancienne adresse, redirige vers index.html
assets/css/           styles (le mode clair est dans style.css, section « MODÈLE B »)
assets/js/data.js     catalogue repris du site actuel
assets/js/main.js     interactions : défilement fluide, galerie 3D, panier, devises
assets/img/           photos optimisées (WebP) et logo vectorisé
assets/video/         films de la visite immersive
assets/vendor/        GSAP, ScrollTrigger, Lenis (copies locales)
```

