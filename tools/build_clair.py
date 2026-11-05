"""Génère clair.html (Modèle B « Lumière ») à partir d'index.html (Modèle A « Nuit »).
Usage : python3 tools/build_clair.py   — à relancer après chaque modification d'index.html."""
import pathlib
root = pathlib.Path(__file__).resolve().parent.parent
h = (root / 'index.html').read_text(encoding='utf-8')
h = h.replace('<html lang="fr">', '<html lang="fr" data-theme="clair">', 1)
h = h.replace('<meta name="theme-color" content="#0c0b0a">', '<meta name="theme-color" content="#fbf9f6">')
for v in ('hero-maison', 'film-maison', 'visite-maison'):
    h = h.replace(f'assets/video/{v}.mp4', f'assets/video/{v}-clair.mp4').replace(f'assets/video/{v}.jpg', f'assets/video/{v}-clair.jpg')
h = h.replace('<a href="index.html" data-model="nuit" class="is-on" aria-current="page">Nuit</a>', '<a href="index.html" data-model="nuit">Nuit</a>')
h = h.replace('<a href="clair.html" data-model="clair">Lumière</a>', '<a href="clair.html" data-model="clair" class="is-on" aria-current="page">Lumière</a>')
(root / 'clair.html').write_text(h, encoding='utf-8')
print('clair.html généré')
