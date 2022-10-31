const CustomButton = (props) => {
  return (
    <div
      id={props.id}
      className={`col-md ${props.type}-btn button-styles`}
      onClick={() => {
        props.mainFunc(props);
      }}
    >
      {props.text}
    </div>
  );
}

export default CustomButton;