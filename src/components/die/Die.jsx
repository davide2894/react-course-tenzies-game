import { useId, memo } from "react";
import "./Die.scss";

function Die(props) {
  const isHeldClassName = props.isHeld ? "die--held" : "";
  return (
    <div
      id={useId()}
      className={`die ${isHeldClassName}`}
      onClick={(evt) => props.onDieClickHandler(evt, props.id, props.number)}>
      <h2 className="die__number">{props.number}</h2>
    </div>
  );
}

export const MemoizedDie = memo(Die);
