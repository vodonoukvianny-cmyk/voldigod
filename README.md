# OTAKUJEUX — Renaissance

RPG fantasy 3D conçu pour **Android / Google Play**, avec une direction inspirée des RPG console mais une architecture web/mobile adaptée aux smartphones.

## État actuel
- Monde 3D explorable : village, forêt, rivière, ruines, montagnes, cité et donjon.
- Déplacement clavier + joystick tactile 360°.
- Combat en temps réel contre plusieurs familles de créatures.
- Progression par niveaux, XP, or, réputation et rang de guilde.
- Points de technique attribués avec les niveaux.
- Amélioration progressive des armes et armures.
- Coups critiques et défense évolutive.
- Quêtes avec Lyra, coffres, potions et sauvegarde locale.
- PWA installable et préparation Android avec Capacitor 8.
- Fallback procédural pour les personnages si les modèles 3D externes ne sont pas disponibles.

## Structure
```
.
├── index.html
├── game.js
├── sw.js
├── manifest.webmanifest
├── privacy-policy.html
├── icon.svg
├── capacitor.config.json
├── package.json
├── .github/workflows/android.yml
└── vendor/
    ├── three.min.js
    └── GLTFLoader.js
```

## Android
Capacitor 8 est utilisé pour préparer l'application native Android. La cible technique doit rester compatible avec les exigences Android/Google Play actuelles.

Commandes locales :
```bash
npm install
npx cap add android
npx cap sync android
npx cap open android
```

Le workflow GitHub Actions peut générer un APK debug pour les tests. La signature release/AAB sera ajoutée avant publication sur Google Play.

## Sauvegarde
La progression utilise une sauvegarde locale versionnée. Les anciennes sauvegardes sont migrées par défaut sans demander au joueur de recommencer.

## Confidentialité
La politique actuelle est disponible dans `privacy-policy.html`.
