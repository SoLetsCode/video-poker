export default class Card {
  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
  }

  cardString = () => {
    return this.value + this.suit;
  };
}
