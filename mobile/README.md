# App Studio Marco Canova (iOS / Android)

App nativa (Expo) che apre il sito dello studio:
https://studio-psicoanalista-marco-canova.vercel.app

## Build cloud (senza Xcode locale)

1. Crea account gratis su https://expo.dev (con GitHub)
2. `npm i -g eas-cli` e `eas login`
3. `eas build:configure`
4. `eas build --platform ios --profile production`
5. `eas build --platform android --profile production`
6. `eas submit` verso App Store Connect e Google Play

Bundle ID / package: `it.marcocanova.studio`
