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

const numOfSameSuit = (hand = []) => {
  //returns highest number of same suit
  let suits = ["d", "c", "h", "s"];
  let number = 0;
  for (let each of suits) {
    let numSuits = hand.filter(card => card.suit === each).length;
    if (number < numSuits) {
      number = numSuits;
    }
  }
  console.log(`i'm in numofsamesuit ${number}`);
  return number;
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

const straightFlush = (hand = []) => {
  if (flush(hand) && straight(hand)) {
    return true;
  } else {
    return false;
  }
};

const flush = (hand = []) => {
  return hand.every(sameSuit);
};

const fourToRoyal = (hand = []) => {
  if (numOfSameSuit(hand) !== 4) {
    return false;
  }
  //how to calculate that there are at least 4 suited cards and they are 10, J, Q, K or A
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

const jackHighPair = (hand = []) => {
  for (let value of ["J", "Q", "K", "A"]) {
    if (hand.filter(card => card.value === value).length === 2) {
      return true;
    }
  }
  return false;
};

const checkWin = (hand = []) => {
  //sorted hand is to assist checking for straights later
  if (royalFlush(hand)) {
    return "rf";
  } else if (straightFlush(hand)) {
    return "sf";
  } else if (fourOfAKind(hand)) {
    return "fk";
  } else if (fullHouse(hand)) {
    return "fh";
  } else if (flush(hand)) {
    return "f";
  } else if (straight(hand)) {
    return "s";
  } else if (threeOfAKind(hand)) {
    return "tk";
  } else if (twoPair(hand)) {
    return "tp";
  } else if (jackHighPair(hand)) {
    return "jp";
  } else {
    return "LOSER";
  }
};

const calculateMove = hand => {
  let sortedHand = sortHand(hand);
  let checkWinOutcome = checkWin(sortedHand);
  console.log(checkWinOutcome);
  if (
    checkWinOutcome === "rf" ||
    checkWinOutcome === "fk" ||
    checkWinOutcome === "sf"
  ) {
    //should hold these ones
    return hand;
  } else if (fourToRoyal(hand)) {
  }
};

export default calculateMove;

// Four of a kind, straight flush, royal flush
// 4 to a royal flush
// Three of a kind, straight, flush, full house
// 4 to a straight flush
// Two pair
// High pair
// 3 to a royal flush
// 4 to a flush
// Low pair
// 4 to an outside straight
// 2 suited high cards
// 3 to a straight flush
// 2 unsuited high cards (if more than 2 then pick the lowest 2)
// Suited 10/J, 10/Q, or 10/K
// One high card
// Discard everything
//from https://wizardofodds.com/games/video-poker/strategy/jacks-or-better/9-6/simple/
