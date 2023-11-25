/** Basic definitions and utilities for working with five-card poker hands. */

import { Card, compareRanks, compareCards, orderCards, RANKS } from "./cards";
import type { Rank } from "./cards";
import { assert, assertNever } from "./assert";

/** Five cards makes a poker hand. */
export type Hand = [Card, Card, Card, Card, Card];

/** The possible ranks of 5-card poker hands. */
export type RankedHandType =
  | "high-card"
  | "pair"
  | "two-pair"
  | "three-of-a-kind"
  | "straight"
  | "flush"
  | "full-house"
  | "four-of-a-kind"
  | "straight-flush";

/** An array of all ranked hand types, from least to most valuable. */
export const RANKED_HAND_TYPES: RankedHandType[] = [
  "high-card",
  "pair",
  "two-pair",
  "three-of-a-kind",
  "straight",
  "flush",
  "full-house",
  "four-of-a-kind",
  "straight-flush",
];

/** A straight flush. */
export interface StraightFlush {
  type: "straight-flush";
  highCard: Card;
}

/** A four of a kind. */
export interface FourOfAKind {
  type: "four-of-a-kind";
  rank: Rank;
  kicker: Card;
}

/** A full house. */
export interface FullHouse {
  type: "full-house";
  threeOfAKindRank: Rank;
  pairRank: Rank;
}

/** A flush. */
export interface Flush {
  type: "flush";
  kickers: [Card, Card, Card, Card, Card]; // sorted from high to low
}

/** A straight. */
export interface Straight {
  type: "straight";
  highCard: Card;
}

/** A three of a kind. */
export interface ThreeOfAKind {
  type: "three-of-a-kind";
  rank: Rank;
  kickers: [Card, Card]; // sorted from high to low
}

/** A two pair. */
export interface TwoPair {
  type: "two-pair";
  highPairRank: Rank;
  lowPairRank: Rank;
  kicker: Card;
}

/** A pair. */
export interface Pair {
  type: "pair";
  rank: Rank;
  kickers: [Card, Card, Card]; // sorted from high to low
}

/** A high card. */
export interface HighCard {
  type: "high-card";
  kickers: [Card, Card, Card, Card, Card]; // sorted from high to low
}

/** A ranked poker hand. */
export type RankedHand =
  | HighCard
  | Pair
  | TwoPair
  | ThreeOfAKind
  | Straight
  | Flush
  | FullHouse
  | FourOfAKind
  | StraightFlush;

/** Compare two straight flushes. */
function compareStraightFlushes(a: StraightFlush, b: StraightFlush): number {
  return compareCards(a.highCard, b.highCard);
}

/** Compare two four of a kinds. */
function compareFourOfAKinds(a: FourOfAKind, b: FourOfAKind): number {
  return compareRanks(a.rank, b.rank) || compareCards(a.kicker, b.kicker);
}

/** Compare two full houses. */
function compareFullHouses(a: FullHouse, b: FullHouse): number {
  return (
    compareRanks(a.threeOfAKindRank, b.threeOfAKindRank) ||
    compareRanks(a.pairRank, b.pairRank)
  );
}

/** Compare two flushes. */
function compareFlushes(a: Flush, b: Flush): number {
  for (let i = 0; i < 5; i++) {
    const cmp = compareCards(a.kickers[i], b.kickers[i]);
    if (cmp !== 0) {
      return cmp;
    }
  }
  return 0;
}

/** Compare two straights. */
function compareStraights(a: Straight, b: Straight): number {
  return compareCards(a.highCard, b.highCard);
}

/** Compare two three of a kinds. */
function compareThreeOfAKinds(a: ThreeOfAKind, b: ThreeOfAKind): number {
  return (
    compareRanks(a.rank, b.rank) ||
    compareCards(a.kickers[0], b.kickers[0]) ||
    compareCards(a.kickers[1], b.kickers[1])
  );
}

/** Compare two two pairs. */
function compareTwoPairs(a: TwoPair, b: TwoPair): number {
  return (
    compareRanks(a.highPairRank, b.highPairRank) ||
    compareRanks(a.lowPairRank, b.lowPairRank) ||
    compareCards(a.kicker, b.kicker)
  );
}

/** Compare two pairs. */
function comparePairs(a: Pair, b: Pair): number {
  return (
    compareRanks(a.rank, b.rank) ||
    compareCards(a.kickers[0], b.kickers[0]) ||
    compareCards(a.kickers[1], b.kickers[1]) ||
    compareCards(a.kickers[2], b.kickers[2])
  );
}

/** Compare two high cards. */
function compareHighCards(a: HighCard, b: HighCard): number {
  for (let i = 0; i < 5; i++) {
    const cmp = compareCards(a.kickers[i], b.kickers[i]);
    if (cmp !== 0) {
      return cmp;
    }
  }
  return 0;
}

/**
 * Compare two poker hands.
 *
 * Return a negative number if the first hand has a *lower* value than the second hand
 * Return 0 if the two hands are equal
 * Return a positive number if the first hand has a *higher* value than the second hand
 */
export function compareRankedHands(a: RankedHand, b: RankedHand): number {
  // First, compare the ranked hand types.
  const rankedHandTypeComparison =
    RANKED_HAND_TYPES.indexOf(a.type) - RANKED_HAND_TYPES.indexOf(b.type);

  // If the hand types are different, then the comparison is easy.
  if (rankedHandTypeComparison !== 0) {
    return rankedHandTypeComparison;
  }

  // Otherwise, the hand types are the same, so we need to compare the hands
  // in more detail.
  switch (a.type) {
    case "straight-flush":
      assert(b.type === "straight-flush");
      return compareStraightFlushes(a, b);
    case "four-of-a-kind":
      assert(b.type === "four-of-a-kind");
      return compareFourOfAKinds(a, b);
    case "full-house":
      assert(b.type === "full-house");
      return compareFullHouses(a, b);
    case "flush":
      assert(b.type === "flush");
      return compareFlushes(a, b);
    case "straight":
      assert(b.type === "straight");
      return compareStraights(a, b);
    case "three-of-a-kind":
      assert(b.type === "three-of-a-kind");
      return compareThreeOfAKinds(a, b);
    case "two-pair":
      assert(b.type === "two-pair");
      return compareTwoPairs(a, b);
    case "pair":
      assert(b.type === "pair");
      return comparePairs(a, b);
    case "high-card":
      assert(b.type === "high-card");
      return compareHighCards(a, b);
    default:
      assertNever(a);
  }
}

/** Given five cards, return a StraightFlush if there is one; otherwise, null. */
function findStraightFlush(sorted: Hand): StraightFlush | null {
  // A straight flush is a straight and a flush.
  const straight = findStraight(sorted);
  const flush = findFlush(sorted);
  if (straight && flush) {
    return { type: "straight-flush", highCard: straight.highCard };
  } else {
    return null;
  }
}

/** Given five cards, return a FourOfAKind if there is one; otherwise, null. */
function findFourOfAKind(sorted: Hand): FourOfAKind | null {
  // A four of a kind is four cards of the same rank.
  for (let i = 0; i < 2; i++) {
    if (
      sorted[i].rank === sorted[i + 1].rank &&
      sorted[i].rank === sorted[i + 2].rank &&
      sorted[i].rank === sorted[i + 3].rank
    ) {
      return {
        type: "four-of-a-kind",
        rank: sorted[i].rank,
        kicker: sorted[4],
      };
    }
  }
  return null;
}

/** Given five cards, return a FullHouse if there is one; otherwise, null. */
function findFullHouse(sorted: Hand): FullHouse | null {
  // A full house is a three of a kind and a pair.
  const threeOfAKind = findThreeOfAKind(sorted);
  const pair = findPair(sorted);
  if (threeOfAKind && pair) {
    return {
      type: "full-house",
      threeOfAKindRank: threeOfAKind.rank,
      pairRank: pair.rank,
    };
  } else {
    return null;
  }
}

/** Given five cards, return a Flush if there is one; otherwise, null. */
function findFlush(sorted: Hand): Flush | null {
  // A flush is five cards of the same suit.
  for (let i = 0; i < 4; i++) {
    if (sorted[i].suit !== sorted[i + 1].suit) {
      return null;
    }
  }
  return {
    type: "flush",
    kickers: [sorted[4], sorted[3], sorted[2], sorted[1], sorted[0]],
  };
}

/** Given five cards, return a Straight if there is one; otherwise, null. */
function findStraight(sorted: Hand): Straight | null {
  // A straight is five cards of consecutive rank.
  for (let i = 0; i < 4; i++) {
    if (
      RANKS.indexOf(sorted[i].rank) !==
      RANKS.indexOf(sorted[i + 1].rank) - 1
    ) {
      return null;
    }
  }
  return { type: "straight", highCard: sorted[4] };
}

/** Given five cards, return a ThreeOfAKind if there is one; otherwise, null. */
function findThreeOfAKind(sorted: Hand): ThreeOfAKind | null {
  // A three of a kind is three cards of the same rank.
  for (let i = 0; i < 3; i++) {
    if (
      sorted[i].rank === sorted[i + 1].rank &&
      sorted[i].rank === sorted[i + 2].rank
    ) {
      return {
        type: "three-of-a-kind",
        rank: sorted[i].rank,
        kickers: [sorted[4], sorted[3]],
      };
    }
  }
  return null;
}

/** Given five cards, return a TwoPair if there is one; otherwise, null. */
function findTwoPair(sorted: Hand): TwoPair | null {
  // A two pair is two pairs of cards of the same rank.
  for (let i = 0; i < 3; i++) {
    if (
      sorted[i].rank === sorted[i + 1].rank &&
      sorted[i + 2].rank === sorted[i + 3].rank
    ) {
      return {
        type: "two-pair",
        highPairRank: sorted[i + 2].rank,
        lowPairRank: sorted[i].rank,
        kicker: sorted[4],
      };
    }
  }
  return null;
}

/** Given five cards, return a Pair if there is one; otherwise, null. */
function findPair(sorted: Hand): Pair | null {
  // A pair is two cards of the same rank.
  for (let i = 0; i < 4; i++) {
    if (sorted[i].rank === sorted[i + 1].rank) {
      return {
        type: "pair",
        rank: sorted[i].rank,
        kickers: [sorted[4], sorted[3], sorted[2]],
      };
    }
  }
  return null;
}

/** Given five cards, return a HighCard. */
function findHighCard(sorted: Hand): HighCard {
  return {
    type: "high-card",
    kickers: [sorted[4], sorted[3], sorted[2], sorted[1], sorted[0]],
  };
}

/** Given five cards, return the best ranked hand that can be made with those cards. */
export function rankHand(cards: Hand): RankedHand {
  // First, sort the cards from least to most valuable.
  const sorted = orderCards(cards) as Hand;

  // Next, check for a straight flush.
  const straightFlush = findStraightFlush(sorted);
  if (straightFlush) {
    return straightFlush;
  }

  // Next, check for a four of a kind.
  const fourOfAKind = findFourOfAKind(sorted);
  if (fourOfAKind) {
    return fourOfAKind;
  }

  // Next, check for a full house.
  const fullHouse = findFullHouse(sorted);
  if (fullHouse) {
    return fullHouse;
  }

  // Next, check for a flush.
  const flush = findFlush(sorted);
  if (flush) {
    return flush;
  }

  // Next, check for a straight.
  const straight = findStraight(sorted);
  if (straight) {
    return straight;
  }

  // Next, check for a three of a kind.
  const threeOfAKind = findThreeOfAKind(sorted);
  if (threeOfAKind) {
    return threeOfAKind;
  }

  // Next, check for a two pair.
  const twoPair = findTwoPair(sorted);
  if (twoPair) {
    return twoPair;
  }

  // Next, check for a pair.
  const pair = findPair(sorted);
  if (pair) {
    return pair;
  }

  // Finally, return a high card.
  return findHighCard(sorted);
}

/** Given an arbitrary number of cards, return all possible FiveCard hands. */
export function allHands(cards: Card[]): Hand[] {
  assert(cards.length >= 5);
  const hands: Hand[] = [];
  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      for (let k = j + 1; k < cards.length; k++) {
        for (let l = k + 1; l < cards.length; l++) {
          for (let m = l + 1; m < cards.length; m++) {
            hands.push([cards[i], cards[j], cards[k], cards[l], cards[m]]);
          }
        }
      }
    }
  }
  return hands;
}

/**
 * Given an arbitrary number of cards, return both the best five-card hand and
 * the ranking of that hand.
 */
export function bestHand(cards: Card[]): [Hand, RankedHand] {
  assert(cards.length >= 5);
  const hands = allHands(cards);
  let bestHand = hands[0];
  let bestRankedHand = rankHand(bestHand);
  for (const hand of hands) {
    const rankedHand = rankHand(hand);
    if (compareRankedHands(bestRankedHand, rankedHand) < 0) {
      bestHand = hand;
      bestRankedHand = rankedHand;
    }
  }
  return [bestHand, bestRankedHand];
}
