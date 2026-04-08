# Simple Mobile App

This is my React Native project built with React Native CLI and TypeScript.

The app is a simple product catalog that loads data from a public API and handles common real app scenarios like search, pagination, state management, and restoring data after restart.

## Features

- Product list from a public API
- Search with debounce
- Infinite scrolling pagination
- New Arrivals section on the list screen
- Product detail screen
- App insights screen (state and lifecycle snapshot)
- Redux Toolkit for state management
- Local storage persistence with AsyncStorage
- App lifecycle handling for active, inactive, and background states
- INR price display in list and detail views

## Tech Used

- React Native CLI (no Expo)
- TypeScript
- React Hooks
- Redux Toolkit + React Redux
- React Navigation
- AsyncStorage

## How to Run

Prerequisites:

- Node.js 18+
- React Native environment setup
- For Android: Android Studio, SDK, and emulator/device
- For iOS: macOS with Xcode

Install dependencies:

   npm install

Start Metro:

   npm start

Run on Android:

   npm run android

Run on iOS:

   npm run ios

## Project Structure

   src/
     api/          API calls
     components/   reusable UI components
     hooks/        typed Redux hooks
     navigation/   navigation setup and types
     screens/      app screens
     storage/      local cache helpers
     store/        Redux store and slice
     types/        shared TypeScript types

## Notes

- UI is intentionally kept clean and simple.
- Focus is on code structure, state flow, performance basics, and reliability.

## If I Had More Time

- Add tests for reducers and screen flows
- Improve offline and retry handling
- Add stronger loading and empty states
- Add end-to-end testing
