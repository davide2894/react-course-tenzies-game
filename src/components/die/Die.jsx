import "./Die.scss";

function Die(props) {
  return (
    <div className="die">
      <h2 className="die__number">{props.value}</h2>
    </div>
  )
}

export default Die