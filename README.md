# Tic-Tac-Toe (Morpion)

Une implémentation du jeu de morpion en **React Native / Expo**, adaptée du
[tutoriel React](https://react.dev/learn/tutorial-tic-tac-toe) vers le mobile.
Tout le jeu tient dans un seul écran : `src/app/index.tsx`.

## Fonctionnalités

- Plateau 3 × 3 de composants `Square`
- Partie complète : tours alternés `X` / `O`, impossible d'écraser une case déjà jouée
- Détection du gagnant
- Message d'égalité (**Draw**) quand plus personne ne peut gagner
- Historique des coups avec voyage dans le temps (revenir à n'importe quel coup)
- Position de chaque coup affichée au format `(colonne, ligne)`
- Coup courant en gras dans l'historique
- Surlignage des trois cases gagnantes
- Bouton pour trier la liste des coups en ordre croissant / décroissant

## Prérequis

- [Node.js](https://nodejs.org) (LTS)
- L'application [Expo Go](https://expo.dev/go) sur ton téléphone, ou un
  émulateur Android / simulateur iOS

## Lancer le projet

```bash
npm install
npx expo start
```

Scanne ensuite le QR code avec Expo Go, ou appuie sur `a` (Android), `i` (iOS)
ou `w` (web) dans le terminal.

Pour vider le cache Metro :

```bash
npx expo start -c
```

## Vérifications

```bash
npx tsc --noEmit   # typecheck
npx expo lint      # lint
```

## Structure

```
src/
  app/
    _layout.tsx    # navigateur Expo Router (Stack)
    index.tsx      # écran unique : Square, Board et Game
```

> Le dossier `example/` est un template Expo inutilisé, laissé de côté.

## Stack

- [Expo](https://docs.expo.dev/) (SDK 57)
- [Expo Router](https://docs.expo.dev/router/introduction/) pour la navigation
- TypeScript avec `type SquareValue = "X" | "O" | null`
