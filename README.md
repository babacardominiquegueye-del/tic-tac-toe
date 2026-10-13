# Tic-Tac-Toe

A React Native / Expo implementation of the tic-tac-toe game, adapted from the
[React tutorial](https://react.dev/learn/tutorial-tic-tac-toe) for mobile.
The whole game lives in a single screen: `src/app/index.tsx`.

## Features

- 3 × 3 board of `Square` components
- Full game: alternating `X` / `O` turns, no overwriting an already played square
- Winner detection
- **Draw** message when no one can win anymore
- Move history with time travel (jump back to any move)
- Location of each move shown as `(column, row)`
- Current move highlighted in bold
- Winning squares highlighted
- Button to sort the move list ascending / descending

## Prerequisites

- [Node.js](https://nodejs.org) (LTS)
- The [Expo Go](https://expo.dev/go) app on your phone, or an Android emulator / iOS simulator

## Getting started

```bash
npm install
npx expo start
```

Then scan the QR code with Expo Go, or press `a` (Android), `i` (iOS) or `w` (web) in the terminal.

To clear the Metro cache:

```bash
npx expo start -c
```

## Checks

```bash
npx tsc --noEmit   # typecheck
npx expo lint      # lint
```

## Structure

```
src/
  app/
    _layout.tsx    # Expo Router navigator (Stack)
    index.tsx      # single screen: Square, Board and Game
```

> The `example/` folder is an unused Expo template, left aside.

## Stack

- [Expo](https://docs.expo.dev/) (SDK 57)
- [Expo Router](https://docs.expo.dev/router/introduction/) for navigation
- TypeScript with `type SquareValue = "X" | "O" | null`