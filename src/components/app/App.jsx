import './App.scss';
import Die from '../die/Die';
import { useState } from 'react';
import { nanoid } from 'nanoid';

function App() {
/**
 * Challenge:
 * 
 * Create state to hold our array of numbers. (Initialize
 * the state by calling our `allNewDice` function so it 
 * loads all new dice as soon as the app loads)
 * 
 * Map over the state numbers array to generate our array
 * of Die elements and render those in place of our
 * manually-written 10 Die elements.
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

  return (
    <div className="app">
      <main>
        <div className="dices">
          {diceElements}
        </div>
      </main>
    </div>
  );
}

export default App;
