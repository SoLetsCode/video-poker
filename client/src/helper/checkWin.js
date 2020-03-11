//checkWin checks if the hand is a winner or not

//helper functions/objects
let sequence = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
];

const sameSuit = (card, index, hand) => {
  if (index === 0) {
    return true;
  } else {
    return card.suit === hand[index - 1].suit;
  }
};

const sortHand = (hand = []) => {
  let sortedHand = [];
  //run through sequence and place cards.
  for (let each of sequence) {
    if (hand.some(card => card.value === each)) {
      //one of my favorite functions, how to sort a deck of cards
      sortedHand.push(...hand.filter(card => card.value === each));
    }
  }
  return sortedHand;
};

//actually checking whether hands are winners

const royalFlush = (hand = []) => {
  let royalStraight = true;
  let counter = 0;

  for (let i = 0; i < sequence.length; i++) {
    if (hand[counter].value !== sequence[i]) {
      royalStraight = false;
    }
    if (i === 0) {
      i = i + 8; //after ace jump to checking for 10
    }
    counter++; //check the next card in hand
  }

  if (hand.every(sameSuit) && royalStraight) {
    return "royalflush";
  }
};

const flush = (hand = []) => {
  return hand.every(sameSuit);
};

const straight = (hand = []) => {
  let handCounter = 0;
  let startIndex = sequence.indexOf(hand[0].value);
  for (let i = startIndex; i < startIndex + hand.length; i++) {
    if (i >= sequence.length) {
      //this is to prevent us from accessing a value that doesn't exist. ie. our lowest card is a Jack
      return false;
    }
    if (hand[handCounter].value !== sequence[i]) {
      return false;
    }
    handCounter++;
  }

  return true;
};

const fourOfAKind = (hand = []) => {
  //we know if there aren't 4 of a kind in the 1st and 2nd slot it can't exist in the array. Ignore checking others.

  return (
    hand.filter(card => card.value === hand[0].value).length === 4 ||
    hand.filter(card => card.value === hand[1].value).length === 4
  );
};

const checkWin = (hand = []) => {
  //sorted hand is to assist checking for straights later
  let sortedHand = sortHand(hand);
  if (royalFlush(sortedHand)) {
    return "ROYAL FLUSH";
  } else if (fourOfAKind(sortedHand)) {
    return "4 OF A KIND";
  } else if (flush(sortedHand)) {
    return "FLUSH";
  } else if (straight(sortedHand)) {
    return "Straight";
  } else {
    return "LOSER";
  }
};

export default checkWin;
