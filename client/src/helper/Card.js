export default class Card {
  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
    this.held = false;
  }

  cardString = () => {
    return this.value + this.suit;
  };

  toggleHeld = () => {
    this.held = !this.held;
    console.log("I am being held", this.held);
  };

  getHeldStatus = () => {
    return this.held;
  };
}
