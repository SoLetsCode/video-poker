const payTable = {
  rf: [250, 500, 750, 1000, 4000],
  sf: [50, 100, 150, 200, 250],
  fk: [25, 50, 75, 100, 125],
  fh: [9, 18, 27, 36, 45],
  f: [6, 12, 18, 24, 30],
  s: [4, 8, 12, 16, 20],
  tk: [3, 6, 9, 12, 15],
  tp: [2, 4, 6, 8, 10],
  jp: [1, 2, 3, 4, 5]
};

let paytableTranslate = {
  rf: "Royal Flush",
  sf: "Straight Flush",
  fk: "Four of a Kind",
  fh: "Full House",
  f: "Flush",
  s: "Stright",
  tk: "Three of A Kind",
  tp: "Two Pair",
  jp: "Jack High"
};

export { payTable, paytableTranslate };
