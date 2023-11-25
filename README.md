# learn-cards

Learning codebase about cards and poker.

My nephew and I were talking about how to compute poker odds, both explicitly and via simulation.

## What's here?

All the interesting code is in `src/`.

- [`src/main.tsx`](src/main.tsx) - the main entry point for the code. This is where the React app is defined. React is used to draw the user interface, cards, and the poker hands.
- [`src/App.tsx`](src/App.tsx) - the main React component for the app. This is where the user interface is defined.
- [`src/cards.ts`](src/cards.ts) - defines the `Card` type and provides basic functions for manipulating cards.
- [`src/hands.ts`](src/hands.ts) - defines the `Hand` type and provides basic functions for manipulating poker hands.

## Running the code

This codebase uses [React](https://react.dev) for drawing stuff, [Vite](https://vitejs.dev) as a development tool & server, and [TypeScript](https://www.typescriptlang.org) for type safety. We use [Vitest](https://vitest.dev/) for writing tests.

To run the code, you'll need to install [Node.js](https://nodejs.org/en/).

Then, using `npm`:

```sh
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser. (Or whatever port Vite tells you it's using, if it's not 5173. Look for the `Local: ` line in the output of `npm run dev`.)
