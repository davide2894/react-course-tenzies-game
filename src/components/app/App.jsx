import './App.scss';
import Die from '../die/Die';
import { useState } from 'react';
import { nanoid } from 'nanoid';

function App() {
/**
 * Challenge: Update the `rollDice` function to not just roll
 * all new dice, but instead to look through the existing dice
 * to NOT role any that are being `held`.
 * 
 * Hint: this will look relatively similiar to the `holdDice`
 * function below. When creating new dice, remember to use
 * `id: nanoid()` so any new dice have an `id` as well.
 */

  const [dice, setDice] = useState(allNewDice());

  function allNewDice(){
    var newDiceArray = [];
    for(var i = 0; i < 10; i++) {
      newDiceArray.push(
        createNewDie()
      );
    }
    return newDiceArray;
  }

  function createNewDie(){
    return {
      id: nanoid(),
      isHeld: false,
      number: Math.floor(Math.random() * (6 - 1 + 1) + 1)
    };
  }

  function updateDice(){
    setDice(prevDice => {
      return prevDice.map(die => {
        if(die.isHeld) {
          return die;
        } else {
          return createNewDie();
        }
      })
    })
  }

  function onDieClickHandler(evt, id){
    console.log({evt, id});
    setDice(dicePrevState => {
      return dicePrevState.map(die => {
        if(die.id === id) {
          return {
            ...die,
            isHeld: !die.isHeld
          }
        } else {
          return die;
        }
      });
    });
  }

  const diceElements = dice.map(die => {     
    return <Die 
      key={die.id}
      id={die.id} 
      value={die.number} 
      isHeld={die.isHeld}
      onDieClickHandler={onDieClickHandler}
    />
  });

  return (
    <div className="app">
      <main>
        <h1 className="app__title">Tenzies</h1>
        <p className="app__instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dices">
          {diceElements}
        </div>
        <button className="rollButton" onClick={updateDice}>Roll</button>
      </main>
    </div>
  );
}

export default App;
