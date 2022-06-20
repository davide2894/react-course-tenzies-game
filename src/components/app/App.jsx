import './App.scss';
import Die from '../die/Die';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'

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
    winningNumber: undefined,
    isWin: false,
  });
  const [showReset, setShowReset] = useState(false);

  const isGameWonClassName = "app__win";

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
      number: Math.floor(Math.random() * (6 - 1 + 1) + 1),
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
    
    setDice(dicePrevState => {
      return dicePrevState.map(die => {
        if(die.id === id && die.number === number) {
          return {
            ...die,
            isHeld: !dicePrevState[0].number ? true :
              number === dicePrevState[0].number ? true : false,
            }
        }
         else {
          return die;
        }
      });
    });  
  }

  useEffect(() => {
    if(!dice.find(dice => !dice.isHeld)){
      setTenzies(old => {
        return {
          ...old,
          isWin: true,
        }
      });
      setShowReset(true);
    }
  }, [dice]);

  function resetDice(){
    document.querySelector(".app").classList.remove(isGameWonClassName);
    setDice(allNewDice());
    setTenzies({
      targetNumber: undefined,
      isWin: false,
    });
    setShowReset(false);
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
        {tenzies.isWin && <Confetti/>}
        <h1 className="app__title">Tenzies</h1>
        <p className="app__instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dices">
          {diceElements}
        </div>
        {
          showReset 
            ?
              <button className="button button--reset" onClick={resetDice}>Reset</button> 
            :
              <button className="button button--roll" onClick={rollDice}>Roll</button>
        }
      </main>
    </div>
  );
}

export default App;
