/* =========================================================
   JACQUES LOGOH COUTURE — français (par défaut) / English
   Langue choisie par ?lang=en dans l'adresse ; le français est la langue par défaut.
   ========================================================= */
(function () {
  'use strict';
  var params = new URLSearchParams(location.search);
  var LANG = params.get('lang') === 'en' ? 'en' : 'fr';
  window.JLC_LANG = LANG;
  document.documentElement.setAttribute('lang', LANG);

  var EN = {
    /* — en-tête, menu, ouverture — */
    'Jacques Logoh Couture — Maison de couture togolaise · Lomé — Paris': 'Jacques Logoh Couture — Togolese couture house · Lomé — Paris',
    'Élégance · Raffinement · Excellence. Maison togolaise de haute couture — Lomé · Paris.': 'Elegance · Refinement · Excellence. Togolese haute couture house — Lomé · Paris.',
    "Jacques Logoh Couture, maison de mode contemporaine fondée en 2017 par le créateur togolais Jacques Kodjo Egnonam Logoh. Là où l'identité rencontre l'élégance contemporaine.": 'Jacques Logoh Couture, a contemporary fashion house founded in 2017 by Togolese designer Jacques Kodjo Egnonam Logoh. Where identity meets contemporary elegance.',
    'Entrer dans la Maison': 'Enter the House',
    'Expérience sonore · le son peut être coupé à tout moment': 'Sound experience · you can mute it at any time',
    'Entrer sans le son': 'Enter without sound',
    'Maison fondée en 2017': 'House founded in 2017',
    'Menu': 'Menu', 'Fermer': 'Close',
    'Devise': 'Currency',
    'Activer la musique': 'Turn music on', 'Couper la musique': 'Turn music off',
    'Son': 'Sound',
    'Ouvrir le panier': 'Open the bag', 'Panier': 'Bag',
    'La Maison': 'The House', 'Lignes Sacrées': 'Lignes Sacrées', 'Visite immersive': 'Immersive tour',
    'Collections': 'Collections', 'Actualités': 'News', "L'univers FIMO228": 'The FIMO228 world', 'Contact': 'Contact',
    'Découvrir': 'Discover',
    'Jacques Logoh Couture — Maison de couture togolaise': 'Jacques Logoh Couture — Togolese couture house',
    'Maison de couture': 'Couture house', 'togolaise': 'from Togo',
    'Élégance · Raffinement · Excellence': 'Elegance · Refinement · Excellence',
    'Défiler': 'Scroll',
    'Langue': 'Language',

    /* — manifeste — */
    'Le manifeste': 'The manifesto',
    '« La mode dépasse l’esthétique : elle est un langage, une mémoire vivante et un puissant moyen de raconter nos identités tout en façonnant le futur. »': '“Fashion goes beyond aesthetics: it is a language, a living memory and a powerful way of telling our identities while shaping the future.”',
    'Jacques Kodjo Egnonam Logoh, fondateur': 'Jacques Kodjo Egnonam Logoh, founder',

    /* — la Maison — */
    'Jacques Logoh, fondateur de la Maison Jacques Logoh Couture': 'Jacques Logoh, founder of the House of Jacques Logoh Couture',
    'Designer de mode et acteur engagé de l’entrepreneuriat culturel': 'Fashion designer and committed cultural entrepreneur',
    '01 — La Maison': '01 — The House',
    'Là où l’identité': 'Where identity', 'rencontre': 'meets', 'l’élégance': 'contemporary', 'contemporaine.': 'elegance.',
    'Jacques Logoh Couture est une maison de mode contemporaine qui incarne avec force l’élégance africaine dans toute sa modernité. Fondée en 2017 par le créateur togolais Jacques Kodjo Egnonam Logoh, la marque s’affirme comme une signature singulière, portée par une vision authentique d’un héritage culturel subtilement réinterprété à travers des lignes sobres, raffinées et intemporelles.': 'Jacques Logoh Couture is a contemporary fashion house that powerfully embodies African elegance in all its modernity. Founded in 2017 by Togolese designer Jacques Kodjo Egnonam Logoh, the brand stands out as a singular signature, driven by an authentic vision of a cultural heritage subtly reinterpreted through sober, refined and timeless lines.',
    'À la croisée de la tradition et de la création contemporaine, la Maison développe une mode épurée, accessible et profondément identitaire. Chaque création raconte une histoire : celle des savoir-faire artisanaux africains, sublimés par une approche résolument moderne, avec une attention particulière accordée aux matières, aux finitions et à la précision des coupes.': 'At the crossroads of tradition and contemporary design, the House creates refined, accessible fashion with a strong sense of identity. Each creation tells a story: that of African craftsmanship, elevated by a resolutely modern approach, with special attention paid to fabrics, finishes and precise tailoring.',
    'Plus qu’une marque, Jacques Logoh Couture se positionne comme une véritable plateforme d’expression artistique et culturelle, au service du rayonnement de la mode africaine à l’échelle locale et internationale.': 'More than a brand, Jacques Logoh Couture is a true platform for artistic and cultural expression, dedicated to promoting African fashion locally and internationally.',
    'Le parcours': 'The journey',
    'De mannequin à serveur de bar, puis entrepreneur culturel — un parcours aussi riche qu’atypique, reflet d’une résilience remarquable.': 'From model to bartender, then cultural entrepreneur — a journey as rich as it is unusual, reflecting remarkable resilience.',
    'Il pose les bases de son engagement dans l’industrie en fondant son agence de mannequinat.': 'He lays the foundations of his commitment to the industry by founding his modelling agency.',
    'Défilé FIMO228': 'FIMO228 runway show',
    'Création du Festival International de la Mode au Togo, plateforme qui révèle et connecte les talents africains et ceux de la diaspora.': 'Creation of the International Fashion Festival in Togo, a platform that reveals and connects talents from Africa and the diaspora.',
    'Naissance de la Maison : une esthétique épurée, élégante et accessible, où se rencontrent savoir-faire artisanal, innovation et identité africaine affirmée.': 'Birth of the House: a refined, elegant and accessible aesthetic where craftsmanship, innovation and a strong African identity meet.',
    'FIMO228 La Boutique à Lomé': 'FIMO228 La Boutique in Lomé',
    'Lancement de la Lomé Men’s Fashion Week, puis inauguration à Lomé d’un espace hybride de création, de diffusion et de dialogue.': 'Launch of Lomé Men’s Fashion Week, then the opening in Lomé of a hybrid space for creation, retail and dialogue.',
    'Le déploiement international : trois éditions en France depuis 2024.': 'International expansion: three editions in France since 2024.',
    'Jacques Logoh Couture à Paris': 'Jacques Logoh Couture in Paris',
    'La Maison s’implante officiellement à Paris. La 13ᵉ édition du FIMO228 se tient du 24 au 28 février.': 'The House officially settles in Paris. The 13th edition of FIMO228 takes place from 24 to 28 February.',
    'À venir': 'Coming soon',
    'Une expansion vers de nouvelles scènes, notamment aux États-Unis.': 'Expansion onto new stages, notably in the United States.',

    /* — Lignes Sacrées — */
    '02 — La collection signature': '02 — The signature collection',
    'Lignes': 'Lignes', 'Sacrées': 'Sacrées',
    'Lignes Sacrées est bien plus qu’une collection : c’est la signature de la Maison Jacques Logoh Couture. Elle incarne l’ADN même de la marque en mettant à l’honneur son symbole le plus précieux : son logo.': 'Lignes Sacrées is much more than a collection: it is the signature of the House of Jacques Logoh Couture. It embodies the very DNA of the brand by celebrating its most precious symbol: its logo.',
    'À travers cette collection, le logo ne se limite plus à une simple identité visuelle ; il devient un langage, un motif et une empreinte artistique qui raconte l’histoire de la Maison.': 'Through this collection, the logo is no longer just a visual identity; it becomes a language, a pattern and an artistic imprint that tells the story of the House.',
    'Voir': 'View',
    'Robe Bintou — bleu': 'Bintou dress — blue', 'Robe Bintou — vert': 'Bintou dress — green', 'Robe Bintou — violet': 'Bintou dress — purple',
    'Robe Bintou — noir': 'Bintou dress — black', 'Robe Bintou — rouge': 'Bintou dress — red',
    'Robe Solaïa — bleu': 'Solaïa dress — blue', 'Robe Solaïa — vert': 'Solaïa dress — green', 'Robe Solaïa — violet': 'Solaïa dress — purple',
    'Chemise JLNML — noir': 'JLNML shirt — black', 'Robe Solaïa — rouge': 'Solaïa dress — red',
    'L’atelier des couleurs': 'The colour atelier',
    'La collection se décline dans une palette de couleurs profondes et élégantes — bleu, violet, noir, rouge et vert — à travers une diversité de modèles pensés pour sublimer chaque silhouette.': 'The collection comes in a palette of deep, elegant colours — blue, purple, black, red and green — across a variety of designs created to enhance every silhouette.',
    'Choisir une couleur': 'Choose a colour',
    'Bleu royal': 'Royal blue', 'Vert émeraude': 'Emerald green', 'Violet': 'Purple', 'Noir': 'Black', 'Rouge': 'Red', 'Bleu': 'Blue', 'Vert': 'Green',
    'Rose': 'Pink', 'Marron': 'Brown', 'Beige': 'Beige',
    'Découvrir la Robe Bintou': 'Discover the Bintou dress',
    'Tissus Lignes Sacrées : bleu royal, vert émeraude, bordeaux — fait main au Togo par des artisans d’exception': 'Lignes Sacrées fabrics: royal blue, emerald green, burgundy — handmade in Togo by exceptional artisans',
    'Fait main au Togo': 'Handmade in Togo',
    'Les tissus sont entièrement réalisés à la main par des artisans togolais,': 'The fabrics are entirely handmade by Togolese artisans,',
    'gardiens de techniques ancestrales': 'guardians of ancestral techniques',
    'transmises de génération en génération.': 'passed down from generation to generation.',
    'Chaque pièce porte ainsi l’empreinte du geste humain, de la patience et de l’authenticité. Lignes Sacrées est la rencontre entre la création contemporaine et le patrimoine africain.': 'Each piece thus bears the mark of the human hand, of patience and authenticity. Lignes Sacrées is where contemporary design meets African heritage.',
    'Force · Noblesse · Intemporel': 'Strength · Nobility · Timeless',
    'Harmonie · Élégance · Raffinement': 'Harmony · Elegance · Refinement',
    'Bordeaux': 'Burgundy',
    'Passion · Héritage · Prestige': 'Passion · Heritage · Prestige',
    'Détail du batik signature Jacques Logoh Couture': 'Detail of the Jacques Logoh Couture signature batik',
    'Le défilé': 'The runway',
    'Porter Lignes Sacrées, c’est porter une histoire, un héritage et une vision de l’élégance africaine tournée vers le monde.': 'To wear Lignes Sacrées is to wear a story, a heritage and a vision of African elegance open to the world.',
    'Look': 'Look',

    /* — visite immersive — */
    '03 — La visite immersive': '03 — The immersive tour',
    'Entrez': 'Step', 'dans la': 'into the', 'Maison': 'House',
    'Un voyage en images, de l’héritage des artisans togolais jusqu’aux trottoirs de Paris. Regardez le film, puis avancez à travers les salles de la Maison.': 'A journey in images, from the heritage of Togolese artisans to the streets of Paris. Watch the film, then walk through the rooms of the House.',
    'Vivre la visite en musique': 'Experience the tour with music',
    '« La Visite » — thème original de la Maison': '“La Visite” — the House’s original theme',
    'Lecture': 'Play',
    'Le Film de la Maison': 'The House Film',
    'Regarder le film en plein écran': 'Watch the film in full screen',
    'Salle I': 'Room I', 'Salle II': 'Room II', 'Salle III': 'Room III', 'Salle IV': 'Room IV', 'Salle V': 'Room V',
    'L’Héritage': 'Heritage', 'Homme': 'Men', 'Femme': 'Women', 'Paris': 'Paris',
    'Faites défiler pour avancer · Cliquez une œuvre pour la découvrir': 'Scroll to move forward · Click a piece to discover it',
    'Tissus': 'Fabrics', 'Le batik signature': 'The signature batik', 'Détail': 'Detail', 'La Visite': 'The Tour', 'Film': 'Film',
    'Le monogramme': 'The monogram', 'Pièce signature': 'Signature piece',
    'Le salon': 'The salon',
    'Pièces signatures, salon, tissus et Paris :': 'Signature pieces, salon, fabrics and Paris:',
    'une minute pour ressentir l’univers': 'one minute to feel the world',
    'de la Maison.': 'of the House.',
    'Notre pop-up à Brazzaville a été une véritable réussite. Nous y avons rencontré un public ambitieux, passionné et profondément réceptif à notre univers créatif.': 'Our pop-up in Brazzaville was a real success. We met an ambitious, passionate audience, deeply receptive to our creative world.',
    'Prendre rendez-vous': 'Book an appointment',

    /* — collections — */
    '04 — Créations haut de gamme': '04 — High-end creations',
    'Les': 'The',
    'Filtrer les collections': 'Filter the collections',
    'Tout': 'All',
    'Satisfait ou remboursé': 'Satisfied or refunded',
    'Politique de retour claire et simple.': 'A clear and simple return policy.',
    'Livraison express': 'Express delivery',
    'Vos pièces, partout dans le monde.': 'Your pieces, anywhere in the world.',
    'Support 24/7': '24/7 support',
    'Une écoute attentive, à chaque instant.': 'Attentive care, at every moment.',
    'Collection signature': 'Signature collection',
    'Notre plus grand succès': 'Our greatest success',
    'Aperçu rapide': 'Quick view',
    'coloris': 'colours',

    /* — fidélité — */
    'Élégance': 'Elegance', 'Raffinement': 'Refinement', 'Excellence': 'Excellence', 'Pièces signatures': 'Signature pieces', 'Élégance intemporelle': 'Timeless elegance',
    'La fidélité': 'Loyalty',
    'Chez Jacques Logoh Couture, la fidélité est bien plus qu’une valeur :': 'At Jacques Logoh Couture, loyalty is much more than a value:',
    'c’est un engagement profond envers chaque client.': 'it is a deep commitment to every client.',
    'Depuis nos débuts, nous avons fait le choix de rester constants dans la qualité de nos créations, le respect des délais et l’attention portée aux moindres détails. Chaque tenue réalisée reflète notre loyauté envers l’élégance, le savoir-faire artisanal et l’exigence du travail bien fait.': 'Since our beginnings, we have chosen to remain consistent in the quality of our creations, in meeting deadlines and in our attention to the smallest details. Every outfit we make reflects our loyalty to elegance, craftsmanship and the pursuit of work well done.',

    /* — actualités — */
    '05 — Actualités': '05 — News',
    'Suivez nos': 'Follow our', 'actualités': 'news',
    'Pour être au parfum de nos évènements.': 'To stay up to date with our events.',
    'Lire': 'Read',
    '13 juin 2026': '13 June 2026', '14 janvier 2026': '14 January 2026',
    'Story telling de la collection Lignes Sacrées': 'The story of the Lignes Sacrées collection',
    'Lignes Sacrées est bien plus qu’une collection : c’est la signature de la Maison…': 'Lignes Sacrées is much more than a collection: it is the signature of the House…',
    'Présentation vente et cocktail à Brazzaville': 'Sale presentation and cocktail in Brazzaville',
    'Présentation cocktail': 'Cocktail presentation',
    'Notre pop-up à Brazzaville a été une véritable réussite…': 'Our pop-up in Brazzaville was a real success…',
    'Vente privée Jacques Logoh Couture': 'Jacques Logoh Couture private sale',
    'Vente privée': 'Private sale',
    'Nous organisons régulièrement des ventes privées dans plusieurs pays…': 'We regularly hold private sales in several countries…',

    /* — univers — */
    '06 — Un écosystème de la mode': '06 — A fashion ecosystem',
    'Entrepreneur visionnaire,': 'Visionary entrepreneur,',
    'bâtisseur engagé.': 'committed builder.',
    'Festival International de la Mode au Togo · 13ᵉ édition du 24 au 28 février 2026': 'International Fashion Festival in Togo · 13th edition from 24 to 28 February 2026',
    'Un espace hybride de création, de diffusion et de dialogue entre designers africains et internationaux': 'A hybrid space for creation, retail and dialogue between African and international designers',
    'Depuis 2021': 'Since 2021', 'Depuis 2024': 'Since 2024',
    'La 6ᵉ édition est attendue cette année': 'The 6th edition is expected this year',
    'Trois éditions déjà': 'Three editions already',
    'Projet': 'Project',
    'Une expansion vers de nouvelles scènes, aux États-Unis': 'Expansion onto new stages, in the United States',
    'Une ambition claire : positionner durablement la mode africaine sur la scène internationale tout en en faisant un vecteur d’expression identitaire, de dialogue interculturel et de transformation sociale.': 'A clear ambition: to establish African fashion durably on the international stage, while making it a vehicle for identity, intercultural dialogue and social transformation.',

    /* — contact / pied de page — */
    '07 — Contact': '07 — Contact',
    'Écrire': 'Write',
    'Écrivez': 'Write', 'à la Maison': 'to the House',
    'Adresse': 'Address', 'Mobile :': 'Mobile:', 'WhatsApp :': 'WhatsApp:',
    'Suivre la Maison': 'Follow the House',
    'Inscrivez-vous pour recevoir nos nouvelles.': 'Sign up to receive our news.',
    'Adresse e-mail': 'Email address', 'Votre adresse e-mail': 'Your email address', "S'inscrire": 'Subscribe',
    'Merci. Bienvenue dans l’univers de la Maison.': 'Thank you. Welcome to the world of the House.',
    '© Jacques Logoh. Tous droits réservés': '© Jacques Logoh. All rights reserved',
    'Politique de retour': 'Return policy', 'Conditions générales de vente': 'Terms and conditions of sale',
    'Retour en haut ↑': 'Back to top ↑',

    /* — fenêtres, panier, son, mode — */
    'Fermer ✕': 'Close ✕',
    'Taille': 'Size', 'Couleur': 'Colour',
    'Ajouter au panier': 'Add to bag',
    'Commander sur WhatsApp': 'Order on WhatsApp',
    'Satisfait ou remboursé · Livraison express · Support 24/7': 'Satisfied or refunded · Express delivery · 24/7 support',
    'Votre panier': 'Your bag', 'Fermer le panier': 'Close the bag',
    'Votre panier est vide.': 'Your bag is empty.',
    'Total': 'Total',
    'Valider la commande sur WhatsApp': 'Place the order on WhatsApp',
    'Retirer': 'Remove', 'Vue': 'View',
    'Ajouté au panier': 'Added to bag',
    'Expérience sonore': 'Sound experience',
    'La musique de la Maison vous accompagne dans la visite.': 'The House’s music accompanies you through the tour.',
    'Vous pouvez la couper à tout moment.': 'You can turn it off at any time.',
    'Continuer en musique': 'Keep the music',
    'Couper le son': 'Turn sound off',
    'Pour vivre pleinement la visite,': 'To fully experience the tour,',
    'laissez-vous porter par la musique.': 'let the music carry you.',
    'Activer le son': 'Turn sound on',
    'Plus tard': 'Later',
    'Choisir le mode d’affichage': 'Choose the display mode',
    'Mode': 'Mode', 'Clair': 'Light', 'Sombre': 'Dark',
    'Choisir la langue': 'Choose the language'
  };

  var DESC_EN = {
    'israel': 'A chocolate-brown menswear set with a clean, contemporary design, enhanced by entirely hand-made embroidery. Its soft, pleasant fabric and elegant cut strike the perfect balance between comfort and refinement.',
    'robe-dip': 'Our batik dresses stand out for their fluidity, lightness and comfort. Each fabric is entirely handmade by artisans, showcasing authentic and unique craftsmanship.',
    'chemise-yvri': 'Navy blue shirt with subtle geometric patterns, elegant tailored fit, classic collar, long sleeves and a careful finish for a chic, contemporary style.',
    'barbara-dress': 'Blouse and trouser set with double short sleeves, round neck and an overlay design at the front and back.',
    'robe-solaia': 'The Solaïa dress is available in several sizes and comes in green, blue, purple, red and black.',
    'ensemble-jln': 'Flowing set made of a short-sleeved shirt and matching trousers, in a light fabric printed with the Jacques Logoh Couture logo. A modern, elegant and comfortable silhouette.',
    'waris-paspoil': 'A signature textile, bold cuts, an elegance that transcends cultures. Designed in Africa, worn around the world.',
    'formose': 'Set in lightweight tweed.',
    'chemise-batik-en-logo-de-la-maison': 'Batik shirt adorned with the signature pattern inspired by the House logo. Modern cut, careful finish.',
    'veste-haute-couture': 'Haute couture jacket in light brocade, enhanced by precious patterns and an architectural cut. An exceptional, elegant and daring piece for a refined, contemporary look.',
    'robe-dos-o': 'Combining contemporary elegance and subtle sensuality, this long dress by Jacques Logoh Couture flatters the silhouette with a flowing, refined allure. Its structured open back adds a daring touch while remaining delicately sophisticated.',
    'jamy': 'This collection is undoubtedly our greatest success among all our previous creations. It fully embodies the history and essence of the House.',
    'robe-solaia-2': 'Our batik dresses stand out for their fluidity, lightness and comfort. Each fabric is entirely handmade by artisans, showcasing authentic and unique craftsmanship.',
    'red-corine': 'Our women’s batik sets stand out for their fluidity, lightness and comfort. Each fabric is entirely handmade by artisans, showcasing authentic and unique craftsmanship.',
    'sable': 'Long dress in sand linen, elegant cut, with side buttons.',
    'lignes-sacrees': 'The House’s signature collection, Lignes Sacrées, comes in a palette of deep, elegant colours — blue, purple, black, red and green — across a variety of designs created to enhance every silhouette.',
    'veste-chemisier': 'Shirt-jacket with vibrant patterns, a signature piece of the House of Jacques Logoh Couture.',
    'ensemble-2-pieces': 'Two-piece set in plain gold brocade: a structured top with puffed sleeves and wide, flowing trousers. An elegant, refined look, ideal for chic occasions and ceremonies.',
    'adelita': 'Our unisex batik sets stand out for their fluidity, lightness and comfort. Each fabric is entirely handmade by artisans, showcasing authentic and unique craftsmanship.',
    'topray': 'TOPRAY, the corporate blouse designed for the modern woman.',
    'israelite': 'A chic, timeless menswear set made from soft, supple fabrics that are particularly pleasant to wear. Elegant, clean cuts combining comfort, modernity and everyday refinement.',
    'barbara-dress-2': 'Blouse and trouser set with double short sleeves, round neck and an overlay design at the front and back.',
    'jlnr': 'Flowing short-sleeved shirt in a light fabric printed with the Jacques Logoh Couture logo. A modern, elegant and comfortable silhouette.',
    'roger': 'Our unisex batik sets stand out for their fluidity, lightness and comfort. Each fabric is entirely handmade by artisans, showcasing authentic and unique craftsmanship.',
    'chemise-jlnml': 'Flowing long-sleeved shirt in a light fabric printed with the Jacques Logoh Couture logo. A modern, elegant and comfortable silhouette.',
    'chemise': 'Red shirt with a signature pattern inspired by the House logo. Modern cut, batik fabric with a careful finish.',
    'denim-jl': 'Structured denim set combining modernity and timeless elegance. The fitted sleeveless jacket, highlighted by contrasting topstitching, is paired with trousers for a bold, chic and contemporary silhouette. A statement piece for a confident, daring woman.',
    'robe-bintou': 'Elegant long dress in hand-printed crêpe, enhanced by a cord delicately integrated at the waist to define the silhouette and add a touch of natural elegance.',
    'red-corine-2': 'Two-piece set in signature batik adorned with the House logo pattern: a structured blouse with a mandarin collar and matching high-waisted wide trousers. A modern, assertive silhouette.',
    'robe-solaia-3': 'Long flowing dress in an exclusive print, a House signature. Elegant silhouette, V-neckline and ruffled sleeves for a feminine, sophisticated look.',
    'denim-n-jl': 'High-quality denim, signed JL. Slightly flared cut (bell-bottom).',
    'rayete': 'A stylish shirt.'
  };

  var POSTS_EN = {
    lignes: { date: '13 June 2026', title: 'The story of the Lignes Sacrées collection', text: [
      'Lignes Sacrées is much more than a collection: it is the signature of the House of Jacques Logoh Couture. It embodies the very DNA of the brand by celebrating its most precious symbol: its logo.',
      'Through this collection, the logo is no longer just a visual identity; it becomes a language, a pattern and an artistic imprint that tells the story of the House. Every line, every detail and every silhouette expresses the values of refinement, heritage and excellence that define Jacques Logoh Couture.',
      'What makes Lignes Sacrées even more exceptional is the craftsmanship that brings it to life. The fabrics are entirely handmade by Togolese artisans, guardians of ancestral techniques passed down from generation to generation. Each piece thus bears the mark of the human hand, of patience and authenticity.',
      'Lignes Sacrées is where contemporary design meets African heritage. A collection that celebrates the nobility of craftsmanship, the cultural richness of Togo and the House’s ambition to turn its identity into wearable art.',
      'To wear Lignes Sacrées is to wear a story, a heritage and a vision of African elegance open to the world.' ] },
    cocktail: { date: '14 January 2026', title: 'Cocktail presentation', text: [
      'Our pop-up in Brazzaville was a real success. We met an ambitious, passionate audience, deeply receptive to our creative world.',
      'A powerful experience, rich in exchanges and positive energy, confirming the impact and appeal of our vision.' ] },
    vente: { date: '14 January 2026', title: 'Private sale', text: [
      'We regularly hold private sales in several countries. This year, Jacques Logoh Couture is rolling out an ambitious international programme through an exclusive Pop-Up Tour.',
      'Follow our Instagram pages to keep up with all the news about our collections, private sales and upcoming events.',
      'Our pop-up experience in Conakry in December was simply exceptional, marked by wonderful encounters and high-quality exchanges. Thank you warmly.' ] }
  };

  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }
  function T(s) { if (LANG !== 'en') return s; var k = norm(s); return EN[k] !== undefined ? EN[k] : s; }
  window.JLC_T = T;
  window.JLC_DESC = function (p) { return LANG === 'en' && DESC_EN[p.id] ? DESC_EN[p.id] : p.desc; };
  window.JLC_POSTS_EN = LANG === 'en' ? POSTS_EN : null;

  /* traduction de la page au chargement (avant les découpes de texte animées) */
  if (LANG === 'en') {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) { var p = n.parentNode && n.parentNode.nodeName; return (p === 'SCRIPT' || p === 'STYLE') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; }
    });
    var nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (n) {
      var raw = n.nodeValue, k = norm(raw);
      if (!k || EN[k] === undefined) return;
      var lead = raw.match(/^\s*/)[0], trail = raw.match(/\s*$/)[0];
      n.nodeValue = lead + EN[k] + trail;
    });
    ['alt', 'aria-label', 'placeholder', 'title', 'data-cursor'].forEach(function (a) {
      document.querySelectorAll('[' + a + ']').forEach(function (el) { var v = el.getAttribute(a); var k = norm(v); if (EN[k] !== undefined) el.setAttribute(a, EN[k]); });
    });
    document.title = T(document.title);
    var md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute('content', T(md.getAttribute('content')));
  }

  /* sélecteur de langue */
  document.querySelectorAll('[data-lang-set]').forEach(function (b) {
    var on = b.getAttribute('data-lang-set') === LANG;
    b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', String(on));
    b.addEventListener('click', function () {
      var l = b.getAttribute('data-lang-set'); if (l === LANG) return;
      var u = new URL(location.href);
      if (l === 'en') u.searchParams.set('lang', 'en'); else u.searchParams.delete('lang');
      location.href = u.toString();
    });
  });
})();
