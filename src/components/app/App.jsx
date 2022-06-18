import './App.scss';
import Die from '../die/Die';
import { useState } from 'react';
import { nanoid } from 'nanoid';

function App() {
/**
 * Challenge: Create a `Roll Dice` button that will re-roll
 * all 10 dice
 * 
 * Clicking the button should generate a new array of numbers
 * and set the `dice` state to that new array (thus re-rendering
 * the array to the page)
 */
  const [dice, setDice] = useState(allNewDice());

  function allNewDice(){
    var newDiceArray = [];
    for(var i = 0; i < 10; i++) {
      newDiceArray.push(Math.floor(Math.random() * (6 - 1 + 1) + 1));
    }
    return newDiceArray;
  }

  const diceElements = dice.map(die => <Die key={nanoid()} value={die}/>);

  function rollDice(){
    setDice(allNewDice());
  }

  return (
    <div className="app">
      <main>
        <div className="dices">
          {diceElements}
        </div>
        <button className="rollButton" onClick={rollDice}>Roll</button>
      </main>
    </div>
  );
}

export default App;
