# Simple Mobile App (Educase Assignment)

A React Native (CLI) + TypeScript app built for the fresher assignment.

## What The App Does

- Shows a large product list from a public API (`dummyjson.com`)
- Supports search with debounced input
- Supports infinite scrolling pagination
- Uses Redux Toolkit for centralized state management
- Persists fetched data and list state in local storage (AsyncStorage)
- Restores previous content after app restart
- Handles app lifecycle transitions (`active`, `background`, `inactive`)

## Screens

- `Catalog` (main list + search + infinite scroll)
- `Product Detail` (selected item details)
- `App Insights` (state snapshot and lifecycle info)

## Tech Stack

- React Native CLI (`0.74.5`)
- TypeScript
- React Hooks + Functional Components
- Redux Toolkit + React Redux
- React Navigation (Native Stack)
- AsyncStorage for persistence

## Run Locally

Prerequisite: React Native environment setup for Android/iOS.

```bash
npm install
```

Start Metro:

```bash
npm start
```

Run Android:

```bash
npm run android
```

Run iOS:

```bash
npm run ios
```

## Project Structure

```text
src/
   api/                # API requests
   components/         # Reusable UI blocks
   hooks/              # Typed redux hooks
   navigation/         # Stack navigator and nav types
   screens/            # App screens
   storage/            # AsyncStorage cache helpers
   store/              # Redux store + slice
   types/              # Shared TypeScript types
```

## Key Technical Decisions

- `FlatList` with tuned props (`initialNumToRender`, `windowSize`, `removeClippedSubviews`) for smoother performance.
- API pagination done with `skip` + `limit` and appended results.
- Search handled with local input state and debounce to avoid API spam.
- Redux slice keeps UI-friendly state (`loading`, `refreshing`, `hasMore`, `error`, `lastUpdated`, `appState`).
- Cache saves list state (`items`, `page`, `query`, `hasMore`, `lastUpdated`) and hydrates on app launch.

## Improvements With More Time

- Add unit/integration tests for slice logic and critical UI flows.
- Add retry strategy and offline banner for weak network scenarios.
- Add image placeholders and graceful loading states for slow connections.
- Add E2E tests (Detox) for search + pagination + restore flow.
- Add analytics events for lifecycle and list interactions.
