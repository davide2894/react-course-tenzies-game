import "./App.scss";
import { MemoizedDie } from "../die/Die";
import { useEffect, useState, useCallback } from "react";
import Confetti from "react-confetti";
import { allNewDice, createNewDie } from "../../utils/utils";

function App() {
  const [dice, setDice] = useState(
    () => JSON.parse(localStorage.getItem("tenzies/dice")) || allNewDice()
  );
  const [tenzies, setTenzies] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [selectedDieNumber, setSelectedDieNumber] = useState(
    () => JSON.parse(localStorage.getItem("tenzies/selectedDieNumber")) || ""
  );

  function rollDice() {
    setDice((prevDice) => {
      const dice = prevDice.map((die) => {
        if (die.isHeld) {
          return die;
        } else {
          return createNewDie();
        }
      });
      console.log(dice);
      return dice;
    });
  }

  const onDieClickHandler = useCallback(
    (evt, id, number) => {
      setDice((dicePrevState) => {
        const dice = dicePrevState.map((die) => {
          if (die.id === id && die.number === number) {
            const tenziesWinningNumberChosen =
              dicePrevState.length && dicePrevState.find((die) => die.isHeld);
            return {
              ...die,
              isHeld: !tenziesWinningNumberChosen
                ? setFirstIsHeldHanlder(die.number)
                : number === selectedDieNumber
                ? true
                : false,
            };
          } else {
            return die;
          }
        });
        console.log(dice);
        return dice;
      });
    },
    [selectedDieNumber]
  );

  function setFirstIsHeldHanlder(number) {
    setSelectedDieNumber(number);
    return true;
  }

  useEffect(() => {
    localStorage.setItem("tenzies/dice", JSON.stringify(dice));
    if (!dice.find((dice) => !dice.isHeld)) {
      setTenzies((old) => {
        return {
          ...old,
          isWin: true,
        };
      });
      setShowReset(true);
    }
  }, [dice]);

  useEffect(() => {
    localStorage.setItem(
      "tenzies/selectedDieNumber",
      JSON.stringify(selectedDieNumber || "")
    );
  }, [selectedDieNumber]);

  function resetDice() {
    setDice(allNewDice());
    setTenzies(false);
    setShowReset(false);
  }

  const diceElements = dice.map((die) => {
    return (
      <MemoizedDie
        key={die.id}
        id={die.id}
        number={die.number}
        isHeld={die.isHeld}
        onDieClickHandler={onDieClickHandler}
      />
    );
  });

  return (
    <div className="app">
      <main>
        {tenzies && <Confetti />}
        <h1 className="app__title">Tenzies</h1>
        <p className="app__instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dices">{diceElements}</div>
        {showReset ? (
          <button className="button button--reset" onClick={resetDice}>
            Reset
          </button>
        ) : (
          <button className="button button--roll" onClick={rollDice}>
            Roll
          </button>
        )}
      </main>
    </div>
  );
}

export default App;
