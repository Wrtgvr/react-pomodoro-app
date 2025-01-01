

export default function TimeInput(props) {
  return (
    <div id={props.id}>
      <span>{props.label} ({`${props.minTime} - ${props.maxTime}`})</span>
      <input 
        onBlur={e => props.onBlur(e, props.type)}
        defaultValue={props.defaultValue}
        type="number"
        />
    </div>
  )
}