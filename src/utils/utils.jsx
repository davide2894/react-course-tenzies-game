import { nanoid } from "nanoid";

export const allNewDice = () => {
  var newDiceArray = [];
  for (var i = 0; i < 10; i++) {
    newDiceArray.push(createNewDie());
  }
  console.log(newDiceArray);
  return newDiceArray;
};

const createNewDie = () => {
  return {
    id: nanoid(),
    isHeld: false,
    number: Math.floor(Math.random() * (6 - 1 + 1) + 1),
  };
};
