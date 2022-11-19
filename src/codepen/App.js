const cleanUpFormula = (operation) => operation.replaceAll("x", "*");
const solveFormula = (operation) =>
  Function(`'use strict'; return parseFloat((${operation}).toFixed(4))`)();

const setFormula = (props, characterToAdd, result = null) => {
  console.log(
    `On setFormula - current display formula: ${props.displayFormula}`
  );

  // Set formula.
  let formula = "";

  // Decide as to whtether adding a decimal point to the initial formula of 0.
  // Whether to replace the initial formula of 0 with a number character.
  // Or if append a character to the current formula.
  if (props.displayFormula === "0") {
    // If formula is so far 0 and user click decimal point, add it.
    if (characterToAdd === ".") {
      formula = "0.";
    } else {
      // If formula is so far 0 and user clicks a number, replace 0 with number.
      formula = characterToAdd;
    }
  } else {
    // If formula is already a number or decimal or operation, then...
    const currentFormula = props.displayFormula;
    const lastCharOfFormula = currentFormula[currentFormula.length - 1];
    const secondToLastCharOfFormula = currentFormula[currentFormula.length - 2];

    // If the last character of current formula is an operation character
    // but NOT the minus sign, and the characterToAdd is an operation character then...
    console.warn(secondToLastCharOfFormula, lastCharOfFormula);
    if (
      ["x", "+", "-", "/"].includes(lastCharOfFormula) &&
      ["x", "+", "/"].includes(characterToAdd)
    ) {
      // If the second to last character of the current formula is also an operation character
      // then remove it too.

      // Convert current formula to array.
      const currentFormulaArray = currentFormula.split("");
      if (
        ["x", "+", "-", "/"].includes(secondToLastCharOfFormula) &&
        ["x", "+", "/"].includes(characterToAdd)
      ) {
        console.warn("HERE!", secondToLastCharOfFormula, lastCharOfFormula);
        // Replace last character(S)(operation characters) with the new one.
        currentFormulaArray.splice(-2);
        currentFormulaArray.push(characterToAdd);
        console.warn(currentFormulaArray);
      } else {
        // Convert current formula to array.
        const currentFormulaArray = currentFormula.split("");
        // Replace last character(operation character) with the new one.
        currentFormulaArray.splice(-1, 1, characterToAdd);
      }
      // Make the array back into a string.
      formula = currentFormulaArray.join("");
    } else if (characterToAdd === "-") {
      // If the characterToAdd is the minus sign, then add it while leaving
      // the lastCharOfFormula where it is.
      formula = currentFormula + characterToAdd;
    } else {
      // add characterToAdd to it .
      formula = `${props.displayFormula}` + `${characterToAdd}`;
    }
  }

  // If result has been passed as an argument add it to the formula.
  if (result) {
    formula += result;
    props.setResultGiven(true);
  }

  // If the character to add is an operation sign, after lastResult
  // has been set, then the formula should be: result+characterToAdd.
  // Then lastResult should be set to 0 again, not the best way to do this
  // but let's try this for now.
  if (props.resultGiven && ["x", "+", "-", "/"].includes(characterToAdd)) {
    formula = props.lastResult + characterToAdd;
    props.setResultGiven(false);
  }

  if (
    props.resultGiven &&
    ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(characterToAdd)
  ) {
    // If the character to add is a number, after lastResult
    // has been set, then the formula should start from scratch
    // with that characterToAdd.
    formula = characterToAdd;
    props.setResultGiven(false);
  }

  console.log(`Here formula: ${formula}`);
  props.setDisplayFormula(formula);
};

const setOutput = (props, characterToAdd) => {
  if (props.displayOutput === "0") {
    // Set output.
    if (characterToAdd === ".") {
      props.setDisplayOutput("0.");
    } else {
      props.setDisplayOutput(characterToAdd);
    }
  } else {
    props.setDisplayOutput(`${props.displayOutput}` + characterToAdd);
  }
};

const onClickHandler = (props, result = null) => {
  const characterToAdd =
    props.number || props.operation || props.decimal || props.equals;

  setFormula(props, characterToAdd, result);
  setOutput(props, characterToAdd);
};

const numberButtonClickHandler = (props) => {
  onClickHandler(props);
};

const operationButtonClickHandler = (props) => {
  onClickHandler(props);
  props.setOperationAdded(true);
  props.setDecimalAdded(false);
};

const decimalButtonClickHandler = (props) => {
  if (props.decimalAdded) return;

  onClickHandler(props);
  props.setDecimalAdded(true);
};

const equalsButtonClickHandler = (props) => {
  if (!props.operationAdded) return;

  const cleanedUpFormula = cleanUpFormula(props.displayFormula);
  const result = solveFormula(cleanedUpFormula);
  console.warn(`Result: ${result}`);
  props.setLastResult(result);

  onClickHandler(props, result);

  props.setDisplayOutput(result);
};

const clearButtonClickHandler = (props) => {
  props.setDisplayFormula("");
  props.setDisplayOutput("0");

  props.setOperationAdded(false);
  props.setDecimalAdded(false);

  props.setLastResult(0);
};


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

const App = () => {
  const [displayFormula, setDisplayFormula] = React.useState("");
  const [displayOutput, setDisplayOutput] = React.useState("0");

  const [operationAdded, setOperationAdded] = React.useState(false);
  const [decimalAdded, setDecimalAdded] = React.useState(false);

  const [lastResult, setLastResult] = React.useState(0);
  const [resultGiven, setResultGiven] = React.useState(false);

  return (
    <div className="App">
      <div id="calculator" className="custom-container">
        <div className="row">
          <div className="display-container">
            <div className="formula-display">{displayFormula}</div>
            <div id="display" className="output-display">
              {displayOutput}
            </div>
          </div>
        </div>
        <div className="button-pad-container">
          <div className="row">
            <CustomButton
              id="clear"
              type="clear"
              text="AC"
              mainFunc={clearButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              setOperationAdded={setOperationAdded}
              setDecimalAdded={setDecimalAdded}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
            <CustomButton
              id="divide"
              operation="/"
              type="operation"
              text="/"
              mainFunc={operationButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              setOperationAdded={setOperationAdded}
              setDecimalAdded={setDecimalAdded}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />

            <CustomButton
              id="multiply"
              operation="x"
              type="operation"
              text="x"
              mainFunc={operationButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              setOperationAdded={setOperationAdded}
              setDecimalAdded={setDecimalAdded}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
          </div>

          <div className="row">
            <CustomButton
              id="seven"
              number="7"
              text="7"
              type="number"
              mainFunc={numberButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
            <CustomButton
              id="eight"
              number="8"
              text="8"
              type="number"
              mainFunc={numberButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
            <CustomButton
              id="nine"
              number="9"
              text="9"
              type="number"
              mainFunc={numberButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
            <CustomButton
              id="subtract"
              operation="-"
              text="-"
              type="operation"
              mainFunc={operationButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              setOperationAdded={setOperationAdded}
              setDecimalAdded={setDecimalAdded}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
          </div>

          <div className="row">
            <CustomButton
              id="four"
              number="4"
              text="4"
              type="number"
              mainFunc={numberButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
            <CustomButton
              id="five"
              number="5"
              text="5"
              type="number"
              mainFunc={numberButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
            <CustomButton
              id="six"
              number="6"
              text="6"
              type="number"
              mainFunc={numberButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
            <CustomButton
              id="add"
              operation="+"
              text="+"
              type="operation"
              mainFunc={operationButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              setOperationAdded={setOperationAdded}
              setDecimalAdded={setDecimalAdded}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
          </div>

          <div className="row">
            <CustomButton
              id="one"
              number="1"
              text="1"
              type="number"
              mainFunc={numberButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />

            <CustomButton
              id="two"
              number="2"
              text="2"
              type="number"
              mainFunc={numberButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />

            <CustomButton
              id="three"
              number="3"
              text="3"
              type="number"
              mainFunc={numberButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />

            <CustomButton
              id="decimal"
              decimal="."
              text="."
              type="operation"
              mainFunc={decimalButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              decimalAdded={decimalAdded}
              setDecimalAdded={setDecimalAdded}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
          </div>

          <div className="row">
            <CustomButton
              id="zero"
              number="0"
              text="0"
              type="number"
              mainFunc={numberButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              displayOutput={displayOutput}
              setDisplayOutput={setDisplayOutput}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
            <CustomButton
              id="equals"
              type="equal"
              text="="
              equals="="
              mainFunc={equalsButtonClickHandler}
              displayFormula={displayFormula}
              setDisplayFormula={setDisplayFormula}
              setDisplayOutput={setDisplayOutput}
              operationAdded={operationAdded}
              lastResult={lastResult}
              setLastResult={setLastResult}
              resultGiven={resultGiven}
              setResultGiven={setResultGiven}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);