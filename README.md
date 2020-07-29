# Game Standards

## Specifications

Each game:
- Is responsible of authenticating users. This will usually be done before the game is launched.
- Is responsible for fetching its own data using a token generated using the `nzk-oauth-server`

## Project organisation

**Development:**
```
|- src/
   |- classes/
   |- constants/
   |- data/
   |- classes/
   |- constants/
   |- data/ 
   |- utils/
```

`classes/` contains classes not related to a specific scene but that can be extended by any part of the application.

`constants/` contains all the constants that need to be stored. For example all the image keys would be stored under `constants/images.ts`

`data/` contains all static data / content.

`scenes/` contains all the game scenes and each game scene needs to be referenced in `scenes/index.ts` for it to be loaded in the game.

`utils/` contains utility functions that can be used everywhere.
