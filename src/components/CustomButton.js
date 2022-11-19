const CustomButton = (props) => {
  return (
    <div
      id={props.id}
      className={`col-md button calculator-btn ${props.type}-btn `}
      onClick={() => {
        props.mainFunc(props);
      }}
    >
      {props.text}
    </div>
  );
}

export default CustomButton;