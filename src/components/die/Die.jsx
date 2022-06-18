import "./Die.scss";

function Die(props) {
  const isHeldClassName = props.isHeld ? "die--held" : "";
  return (
    <div 
      className={`die ${isHeldClassName}`}
      onClick={(evt) => props.onDieClickHandler(evt, props.id)}
    >
      <h2 className="die__number">{props.value}</h2>
    </div>
  )
}

export default Die