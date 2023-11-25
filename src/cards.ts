/** Basic definitions for working with cards and decks of cards. */

/** A card suit. */
export type Suit = "spades" | "hearts" | "clubs" | "diamonds";

/** All card suits, as an array. */
export const SUITS: Suit[] = ["spades", "hearts", "clubs", "diamonds"];

/** A card rank. */
export type Rank =
  | "two"
  | "three"
  | "four"
  | "five"
  | "six"
  | "seven"
  | "eight"
  | "nine"
  | "ten"
  | "jack"
  | "queen"
  | "king"
  | "ace";

/** All card ranks, as an array, from least to most valuable. */
export const RANKS: Rank[] = [
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "jack",
  "queen",
  "king",
  "ace",
];

/** A card. */
export interface Card {
  suit: Suit;
  rank: Rank;
}

/** Return a fresh (ordered as if just opened) deck of cards. */
export function freshDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ suit, rank });
    }
  }
  return deck;
}

/** Return a shuffled copy of the given deck. */
export function shuffle(cards: Card[]): Card[] {
  // Use the "Knuth" aka "Fisher-Yates" shuffle algorithm.
  // See https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Compare two cards.
 *
 * Return:
 *
 * -1 if the first card has a *lower* value than the second card
 * 0 if the two cards are equal
 * 1 if the first card has a *higher* value than the second card
 */
export function compareCards(card1: Card, card2: Card): number {
  const rank1 = RANKS.indexOf(card1.rank);
  const rank2 = RANKS.indexOf(card2.rank);
  if (rank1 < rank2) {
    return -1;
  } else if (rank1 > rank2) {
    return 1;
  } else {
    return 0;
  }
}

/** Order cards from *lowest* to *highest* value. */
export function orderCards(cards: Card[]): Card[] {
  return [...cards].sort(compareCards);
}
