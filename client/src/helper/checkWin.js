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
  //hard check for 10 J Q K A straight if first card is an Ace
  let royalStraight = ["A", "10", "J", "Q", "K"];
  if (hand[0].value === "A") {
    if (hand.every((card, index) => card.value === royalStraight[index])) {
      return true;
    }
  }

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

const fullHouse = (hand = []) => {
  //since hand is sorted, either first 3 are triplets with pair or last 3 are triplets with a pair
  return (
    (hand.filter(card => card.value === hand[0].value).length === 3 &&
      hand.filter(card => card.value === hand[3].value).length === 2) ||
    (hand.filter(card => card.value === hand[0].value).length === 2 &&
      hand.filter(card => card.value === hand[2].value).length === 3)
  );
};

const threeOfAKind = (hand = []) => {
  for (let i = 0; i < hand.length - 2; i++) {
    if (
      hand[i].value === hand[i + 1].value &&
      hand[i].value === hand[i + 2].value
    ) {
      return true;
    }
  }

  return false;
};

const twoPair = (hand = []) => {
  let pairs = 0;
  for (let i = 0; i < hand.length - 1; i++) {
    if (hand[i].value === hand[i + 1].value) {
      pairs++;
      i++;
    }
  }

  return pairs === 2;
};

const checkWin = (hand = []) => {
  //sorted hand is to assist checking for straights later
  let sortedHand = sortHand(hand);
  if (royalFlush(sortedHand)) {
    return "ROYAL FLUSH";
  } else if (fourOfAKind(sortedHand)) {
    return "4 OF A KIND";
  } else if (fullHouse(sortedHand)) {
    return "FULL HOUSE!";
  } else if (flush(sortedHand)) {
    return "FLUSH";
  } else if (straight(sortedHand)) {
    return "Straight";
  } else if (threeOfAKind(sortedHand)) {
    return "3 of a kind";
  } else if (twoPair(sortedHand)) {
    return "2 pair";
  } else {
    return "LOSER";
  }
};

export default checkWin;
