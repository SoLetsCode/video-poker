import Card from "./Card";

export default class Deck {
  //this class will only deal a card and keep track of dealt cards

  constructor(dealtCards = []) {
    this.dealtCards = dealtCards;
    //above will be used when we want to simulate many hands with the same cards
    this.deck = [];
  }

  createCards = () => {
    let tempDeck = [];
    let value = [
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
    for (let suit in { d: "diamond", c: "club", h: "heart", s: "spade" }) {
      for (let i = 0; i < 13; i++) {
        tempDeck.push(new Card(value[i], suit));
      }
    }
    this.deck = tempDeck;
  };

  draw = num => {
    //draw NUM of cards. return drawn cards.
    let index = 0;
    let cards = [];

    for (let i = 0; i < num; i++) {
      index = this.randomize(this.deck.length);

      if (this.dealtCards.length > 51) {
        break;
      }
      while (this.dealtCards.some(value => value === index)) {
        index = this.randomize(this.deck.length);
      }
      cards.push(index);
      this.dealtCards.push(index);
    }
    return cards;
  };

  randomize = range => {
    return Math.floor(Math.random() * range);
  };

  getDeck = () => {
    return this.deck;
  };

  getDealtCards = () => {
    return this.dealtCards;
  };

  getDealtCardsByIndex = () => {
    return this.dealtCards.map(card => this.getCardByIndex(card));
  };

  getCardByIndex = index => {
    return this.deck[index];
  };

  getHandByIndex = array => {
    return array.map(value => this.getCardByIndex(value));
  };
}
