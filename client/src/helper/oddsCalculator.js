import Deck from "./Deck";

const waysToChoose5 = 1533939;
const waysToChoose4 = 178365;
const waysToChoose3 = 16215;
const waysToChoose2 = 1081;
const waysToChoose1 = 47;

//given a hand, it should ideally return the cards to hold and the best chance of winning.
/**is it possible to get a royal flush? If so, what's the probability?
 * is is possible to get a straight flush? if so, what is the probability?
 * is it possible to get four of a kind? if so, what is the probilitity?
 * is it possible to get a full house? if so, what is the probability?
 * is it possible to get a two pair? if so, what is the probability?
 * is it possible to get jack high pair? if so, what is the probability?
 * I know there are 32 unique ways to hold a hand how do I go through all the combinations?
 * EV = probability of hitting a card that produces a winning hand * payout
 */

//need a way to generate each hand
//one loop for how many cards to hold
//one loop to go through the ways to hold one card
let myArray = [1, 2, 3, 4, 5];

function waysToHold(array) {
  //holding nothing
  console.log([]);
  //holding one card
  for (let each in array) {
    console.log(each);
  }
  //holding two cards
  for (let each in array) {
    for (let i = Number(each) + 1; i < array.length; i++) {
      console.log(each, i);
    }
  }

  //holding three cards
  for (let one = 0; one < array.length; one++) {
    for (let two = one + 1; two < array.length; two++) {
      for (let three = two + 1; three < array.length; three++) {
        console.log(one, two, three);
      }
    }
  }

  //holding four cards
  for (let one = 0; one < array.length; one++) {
    for (let two = one + 1; two < array.length; two++) {
      for (let three = two + 1; three < array.length; three++) {
        for (let four = three + 1; four < array.length; four++) {
          console.log(one, two, three, four);
        }
      }
    }
  }

  //holding 5 cards
  console.log(...array);
}

const chanceRF = (hand = []) => {
  let royalSeq = ["A", "10", "J", "Q", "K"];
  //cards must be all the same suit and consist of 10, J, Q, K, A
  if (!hand.every(sameSuit)) {
    return 0;
  }
};

const evCalculation = handArray => {
  chanceRF();
};

const sameSuit = (card, index, hand) => {
  if (index === 0) {
    return true;
  } else {
    return card.suit === hand[index - 1].suit;
  }
};

export default function oddsCalculator(handArray) {
  //takes hand and remaining cards in deck and returns the combination with highest EV
  //run a function that goes through all combinations of holding hards (32)
  waysToHold(handArray);
}
