class Deck {
  constructor(dealtCards = []) {
    this.dealtCards = dealtCards;
    //above will be used when we want to simulate many hands with the same cards
    this.deck = [];
    this.hand = [];
  }

  createCards = () => {
    let tempDeck = [];
    for (let suit in { d: "diamond", c: "club", h: "heart", s: "spade" }) {
      for (let i = 1; i <= 13; i++) {
        tempDeck.push(i + suit);
      }
    }
    this.deck = tempDeck;
  };

  getDeck = () => {
    return this.deck;
  };

  getDealtCards = () => {
    return this.dealtCards;
  };

  deal = num => {
    let index = 0;
    for (let i = 0; i < num; i++) {
      index = Math.floor(Math.random() * this.deck.length);
      while (this.dealtCards.some(value => value === index)) {
        console.log(`${index} was dealt, redrawing`);
        index = Math.floor(Math.random() * this.deck.length);
      }
      this.dealtCards.push(index);
      console.log(this.deck[index]);
    }
  };
}

let deck = new Deck([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
deck.createCards();
console.log(deck.getDeck());
console.log(deck.getDealtCards());
deck.deal(5);
console.log(deck.getDealtCards());
