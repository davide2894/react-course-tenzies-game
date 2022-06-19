import './App.scss';
import Die from '../die/Die';
import { useEffect, useState } from 'react';
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
  const [tenzies, setTenzies] = useState({
    targetNumber: undefined,
    isWin: false,
    currentDieId: ""    
  });

  const isGameWonClassName = "app_win";

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

  function rollDice(){
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

  function onDieClickHandler(evt, id, number){
    console.log({evt, id, number});
    
    setTenzies(prev => {
      return {
        ...prev,
        targetNumber: !prev.targetNumber ? number : prev.targetNumber,
        currentDieId: id
      };
    });
  }

  useEffect(() => {
    console.log(tenzies);

    setDice(dicePrevState => {
      return dicePrevState.map(die => {
        if(die.id === tenzies.currentDieId && die.number === tenzies.targetNumber) {
          return {
            ...die,
            isHeld: !die.isHeld
          }
        } else {
          return die;
        }
      });
    });
  }, [tenzies]);

  useEffect(() => {
    if(!dice.find(dice => !dice.isHeld)){
      document.querySelector("main").style.backgroundColor = "lightgreen";
      document.querySelector(".app").classList.add(isGameWonClassName);
    }
  }, [dice]);

  function resetDice(){
    setTenzies(allNewDice());
  }

  const diceElements = dice.map(die => {     
    return <Die 
      key={die.id}
      id={die.id} 
      number={die.number} 
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
        <button className="button button--roll" onClick={rollDice}>Roll</button>
        {
          tenzies.isWin && 
          <button className="button button--reset" onClick={resetDice}>Reset</button>
        }
      </main>
    </div>
  );
}

export default App;
