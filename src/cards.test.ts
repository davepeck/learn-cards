import {
  freshDeck,
  shuffle,
  compareCards,
  orderCards,
  SUITS,
  RANKS,
} from "./cards";
import { expect, test, describe } from "vitest";

describe("freshDeck()", () => {
  test("returns a deck of 52 cards", () => {
    const deck = freshDeck();
    expect(deck.length).toBe(52);
  });

  test("returns a deck with 13 cards of each suit", () => {
    const deck = freshDeck();
    for (const suit of SUITS) {
      expect(deck.filter((card) => card.suit === suit).length).toBe(13);
    }
  });

  test("returns a deck with 4 cards of each rank", () => {
    const deck = freshDeck();
    for (const rank of RANKS) {
      expect(deck.filter((card) => card.rank === rank).length).toBe(4);
    }
  });
});

describe("shuffle()", () => {
  test("returns a shuffled copy of the given deck", () => {
    const deck = freshDeck();
    const shuffled = shuffle(deck);
    expect(shuffled.length).toBe(52);
    // technically, it is possible for a shuffled deck to be the same as the
    // original deck, but it's astronomically unlikely, so we'll just assume
    // that if it's not the same, it's shuffled
    expect(shuffled).not.toEqual(deck);
  });
});

describe("compareCards()", () => {
  test("returns 0 if the cards are equal", () => {
    expect(
      compareCards(
        { suit: "spades", rank: "ace" },
        { suit: "spades", rank: "ace" }
      )
    ).toBe(0);
  });

  test("returns negative if the first card is *lower value* than the second", () => {
    expect(
      compareCards(
        { suit: "spades", rank: "king" },
        { suit: "spades", rank: "ace" }
      )
    ).toBeLessThan(0);
    expect(
      compareCards(
        { suit: "spades", rank: "five" },
        { suit: "hearts", rank: "eight" }
      )
    ).toBeLessThan(0);
  });

  test("returns positive if the first card is higher than the second", () => {
    expect(
      compareCards(
        { suit: "spades", rank: "ace" },
        { suit: "spades", rank: "king" }
      )
    ).toBeGreaterThan(0);
    expect(
      compareCards(
        { suit: "hearts", rank: "ace" },
        { suit: "spades", rank: "two" }
      )
    ).toBeGreaterThan(0);
  });
});

describe("orderCards()", () => {
  test("returns an empty array if given an empty array", () => {
    expect(orderCards([])).toEqual([]);
  });

  test("returns a single card if given a single card", () => {
    expect(orderCards([{ suit: "spades", rank: "ace" }])).toEqual([
      { suit: "spades", rank: "ace" },
    ]);
  });

  test("returns a sorted array of cards", () => {
    expect(
      orderCards([
        { suit: "spades", rank: "ace" },
        { suit: "spades", rank: "king" },
        { suit: "spades", rank: "queen" },
        { suit: "spades", rank: "jack" },
        { suit: "spades", rank: "ten" },
        { suit: "spades", rank: "nine" },
        { suit: "spades", rank: "eight" },
        { suit: "spades", rank: "seven" },
        { suit: "spades", rank: "six" },
        { suit: "spades", rank: "five" },
        { suit: "spades", rank: "four" },
        { suit: "spades", rank: "three" },
        { suit: "spades", rank: "two" },
      ])
    ).toEqual([
      { suit: "spades", rank: "two" },
      { suit: "spades", rank: "three" },
      { suit: "spades", rank: "four" },
      { suit: "spades", rank: "five" },
      { suit: "spades", rank: "six" },
      { suit: "spades", rank: "seven" },
      { suit: "spades", rank: "eight" },
      { suit: "spades", rank: "nine" },
      { suit: "spades", rank: "ten" },
      { suit: "spades", rank: "jack" },
      { suit: "spades", rank: "queen" },
      { suit: "spades", rank: "king" },
      { suit: "spades", rank: "ace" },
    ]);
  });
});
