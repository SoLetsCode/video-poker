//recommends what cards to hold using the simple strategy from https://wizardofodds.com/games/video-poker/strategy/jacks-or-better/9-6/simple/.
//input: 5 card hand consisting of card objects with {value: "" and suit: ""}
//returns object with 2 keys {hold: array telling you which cards to hold [T,T,T,F,F]; T = hold, F = remove message: "message about what to do"}

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
  let suit = "";
  for (let each of suits) {
    let numSuits = hand.filter(card => card.suit === each).length;
    if (number < numSuits) {
      number = numSuits;
      suit = each;
    }
  }
  return { number: number, suit: suit };
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

const numToRoyal = (hand = [], count) => {
  let cardValues = ["A", "10", "J", "Q", "K"];
  let numOfSameSuitResult = numOfSameSuit(hand);
  if (numOfSameSuitResult.number !== count) {
    return false;
  }
  let counter = 0;
  for (let each of cardValues) {
    if (
      hand.some(
        card => card.value === each && card.suit === numOfSameSuitResult.suit
      )
    ) {
      counter++;
    }
  }

  if (counter === count) {
    return hand.map(card => {
      return (
        (card.value === "10" && card.suit === numOfSameSuitResult.suit) ||
        (card.value === "J" && card.suit === numOfSameSuitResult.suit) ||
        (card.value === "Q" && card.suit === numOfSameSuitResult.suit) ||
        (card.value === "K" && card.suit === numOfSameSuitResult.suit) ||
        (card.value === "A" && card.suit === numOfSameSuitResult.suit)
      );
    });
  } else {
    return false;
  }
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

const numToStraightFlush = (hand = [], count) => {
  //accepts unsorted hand and number of cards towards a straight flush. returns indexes to hold
  let sortedHand = sortHand(hand);
  let numOfSameSuitResult = numOfSameSuit(hand);
  let suitedCards = sortedHand.filter(
    card => card.suit === numOfSameSuitResult.suit
  );

  if (numOfSameSuitResult.number !== count) {
    return false;
  }
  //at this point, we know there must be exactly count suited cards
  //to check for a potential straight, I experimented with cards and found that the value difference between the highest and lowest card must be 4 or less.
  if (
    sequence.indexOf(suitedCards[suitedCards.length - 1].value) -
      sequence.indexOf(suitedCards[0].value) >
    4
  ) {
    return false;
  } else {
    return hand.map(card => card.suit === numOfSameSuitResult.suit);
  }
};

const oneHighCard = (hand = []) => {
  let highCard = hand.filter(
    card =>
      card.value === "A" ||
      card.value === "J" ||
      card.value === "Q" ||
      card.value === "K"
  );

  if (highCard.length < 1) {
    return false;
  }
  return holdMatchCardstoHand(highCard, hand);
};

const findPair = (hand = []) => {
  for (let each of hand) {
    if (hand.filter(card => card.value === each.value).length === 2) {
      return hand.map(card => card.value === each.value);
    }
  }
  return false;
};

const fourOfAKind = (hand = []) => {
  //we know if there aren't 4 of a kind in the 1st and 2nd slot it can't exist in the array. Ignore checking others.

  return (
    hand.filter(card => card.value === hand[0].value).length === 4 ||
    hand.filter(card => card.value === hand[1].value).length === 4
  );
};

const fourToOutsideStraight = (hand = []) => {
  let sortedHand = sortHand(hand);

  if (
    sequence.indexOf(sortedHand[sortedHand.length - 2].value) -
      sequence.indexOf(sortedHand[0].value) ===
      3 &&
    sortedHand[0].value !== "A"
  ) {
    return holdMatchCardstoHand(sortedHand.splice(0, 4), hand);
  } else if (
    sequence.indexOf(sortedHand[sortedHand.length - 1].value) -
      sequence.indexOf(sortedHand[1].value) ===
    3
  ) {
    return holdMatchCardstoHand(sortedHand.splice(1, 4), hand);
  }
  return false;
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

const holdMatchCardstoHand = (cardList = [], hand = []) => {
  //takes a list of cards and finds them in the hand. Returns array telling you to hold the cards in the list true for hold, false for not. i.e. [true, true, false, true, false]
  let holdList = hand.map(myCard =>
    cardList.some(
      listCard =>
        listCard.value === myCard.value && listCard.suit === myCard.suit
    )
  );

  return holdList;
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

const twoSuitedHighCards = (hand = []) => {
  let faceCards = hand.filter(
    card =>
      card.value === "A" ||
      card.value === "J" ||
      card.value === "Q" ||
      card.value === "K"
  );
  let numOfSameSuitResult = numOfSameSuit(faceCards);

  if (numOfSameSuitResult.number === 2) {
    return holdMatchCardstoHand(
      faceCards.filter(card => card.suit === numOfSameSuitResult.suit),
      hand
    );
  }

  return false;
};

const twoUnsuitedHighCards = (hand = []) => {
  let faceCards = sortHand(hand).filter(
    card =>
      card.value === "A" ||
      card.value === "J" ||
      card.value === "Q" ||
      card.value === "K"
  );

  if (faceCards.length < 2) {
    return false;
  }

  if (faceCards[0].value === "A") {
    //if the first card is an Ace we put it to the end of the array (makes it easier to sort grab the two lowest later)
    faceCards.push(faceCards.shift());
  }

  return holdMatchCardstoHand([faceCards[0], faceCards[1]], hand);
};

const twoSuited10face = (hand = []) => {
  let face10Cards = hand.filter(
    card =>
      card.value === "10" ||
      card.value === "J" ||
      card.value === "Q" ||
      card.value === "K"
  );

  let numOfSameSuitResult = numOfSameSuit(face10Cards);

  if (numOfSameSuitResult.number < 2) {
    return false;
  }

  return holdMatchCardstoHand(
    face10Cards.filter(card => card.suit === numOfSameSuitResult.suit),
    hand
  );
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
  let tip = "";
  let holdArray = [false, false, false, false, false];
  if (
    checkWinOutcome === "rf" ||
    checkWinOutcome === "fk" ||
    checkWinOutcome === "sf"
  ) {
    tip = "keep the winning hand";
    //should hold all of these ones
    holdArray = [true, true, true, true, true];
  } else if (numToRoyal(hand, 4)) {
    tip = "keep four to royal flush";
    holdArray = numToRoyal(hand, 4);
  } else if (
    checkWinOutcome === "f" ||
    checkWinOutcome === "fh" ||
    checkWinOutcome === "s"
  ) {
    tip = "keep the winning hand";
    holdArray = [true, true, true, true, true];
  } else if (checkWinOutcome === "tk") {
    tip = "hold the triplet";
    //this function finds the triplet in the hand and tells you to hold them
    for (let each in hand) {
      if (hand.filter(card => card.value === hand[each].value).length === 3) {
        holdArray = hand.map(card => card.value === hand[each].value);
        break;
      }
    }
    //how do we refer the triplets?
  } else if (numToStraightFlush(hand, 4)) {
    tip = "keep 4 to straight flush";
    holdArray = numToStraightFlush(hand, 4);
  } else if (checkWinOutcome === "tp") {
    tip = "keep two pair";
    for (let each in hand) {
      if (hand.filter(card => card.value === hand[each].value).length === 1) {
        holdArray = hand.map(card => card.value !== hand[each].value);
        break;
      }
    }
  } else if (checkWinOutcome === "jp") {
    tip = "keep high pair";
    for (let each in hand) {
      if (hand.filter(card => card.value === hand[each].value).length === 2) {
        holdArray = hand.map(card => card.value === hand[each].value);
        break;
      }
    }
  } else if (numToRoyal(hand, 3)) {
    tip = "3 to royal";
    holdArray = numToRoyal(hand, 3);
  } else if (numOfSameSuit(hand).number === 4) {
    tip = "4 to a flush";
    holdArray = hand.map(card => card.suit === numOfSameSuit(hand).suit);
  } else if (findPair(hand)) {
    tip = "keep low pair";
    holdArray = findPair(hand);
  } else if (fourToOutsideStraight(hand)) {
    tip = "keep four to outside straight";
    holdArray = fourToOutsideStraight(hand);
  } else if (twoSuitedHighCards(hand)) {
    tip = "keep two suited high cards";
    holdArray = twoSuitedHighCards(hand);
  } else if (numToStraightFlush(hand, 3)) {
    tip = "keep 3 to straight flush";
    holdArray = numToStraightFlush(hand, 3);
  } else if (twoUnsuitedHighCards(hand)) {
    tip = "keep 2 unsuited high cards";
    holdArray = twoUnsuitedHighCards(hand);
  } else if (twoSuited10face(hand)) {
    tip = "keep 2 suited 10 face";
    holdArray = twoSuited10face(hand);
  } else if (oneHighCard(hand)) {
    tip = "keep one high card";
    holdArray = oneHighCard(hand);
  } else {
    tip = "discard it all";
    holdArray = [false, false, false, false, false];
  }

  return { tip: tip, hold: holdArray };
};

export default calculateMove;

//hands to hold in order of importance
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
